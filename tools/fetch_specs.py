#!/usr/bin/env python3
"""Wikipedia infobox + intro 텍스트에서 풀 스펙을 추출.

전략:
- 각 제품의 위키피디아 페이지 fetch (parse API → mobile-friendly HTML).
- Infobox <table class="infobox"> 또는 <table class="infobox vevent"> 파싱.
- 라벨 → 값 페어 추출 후 우리 스키마로 매핑.

한계:
- Wikipedia infobox는 페이지마다 라벨이 다름 (Display, Display(s), Screen 등).
- 정확도 70~80% 목표. 못 찾는 필드는 빈 값.
- 매칭 안 되는 제품은 SPECS에 추가 안 함 (data.js의 manual 데이터가 우선).

사용:
    python3 fetch_specs.py products.json out_specs.json [start end]

GitHub Actions 워크플로우(.github/workflows/refresh-data.yml)에서 주기적 호출.
"""
import json, re, sys, time, urllib.parse, urllib.request

UA = "ClaudeAssist/1.0 (https://github.com/yonchelee/News_doc) python-urllib"

# 라벨 정규화: 영어/별칭 → 우리 스키마 키
LABEL_MAP = {
    "weight": ("design","weight"),
    "dimensions": ("design","dimensions"),
    "size": ("design","dimensions"),
    "form factor": ("design","materials"),
    "casing": ("design","materials"),
    "available colours": ("design","colors"),
    "available colors": ("design","colors"),

    "display": ("display","panel"),
    "display(s)": ("display","panel"),
    "screen": ("display","panel"),
    "resolution": ("display","resolution"),
    "refresh rate": ("display","refreshRate"),

    "soc": ("processor","ap"),
    "system on chip": ("processor","ap"),
    "system-on-chip": ("processor","ap"),
    "cpu": ("processor","ap"),
    "chip": ("processor","ap"),
    "processor": ("processor","ap"),
    "chipset": ("processor","ap"),

    "memory": ("memory","ram"),
    "ram": ("memory","ram"),
    "storage": ("memory","storage"),

    "rear camera": ("camera","rear_text"),
    "rear cameras": ("camera","rear_text"),
    "main camera": ("camera","rear_text"),
    "main cameras": ("camera","rear_text"),
    "front camera": ("camera","front"),
    "selfie camera": ("camera","front"),

    "battery": ("battery","capacity"),
    "charging": ("battery","chargingWired"),

    "connectivity": ("connectivity","summary"),
    "operating system": ("os","initial"),
    "os": ("os","initial"),

    "water resistance": ("durability","ip"),
    "ingress protection": ("durability","ip"),
    "rating": ("durability","ip"),

    "release date": ("price","launchDate"),
    "released": ("price","launchDate"),
    "launch": ("price","launchDate"),
    "introductory price": ("price","usd"),
    "starting price": ("price","usd"),
    "msrp": ("price","usd"),
    "price": ("price","usd"),
}

# 모델명 → 위키 제목 후보 (fetch_images.py의 candidates와 비슷)
def candidates(p):
    model = p["model"]; mfr_key = p["mfr"]
    mfrs = {"apple":"Apple","samsung":"Samsung","xiaomi":"Xiaomi","google":"Google",
            "huawei":"Huawei","oppo_vivo":"Oppo","meta":"Meta","motorola":"Motorola",
            "sony":"Sony","asus":"Asus"}
    mfr = mfrs.get(mfr_key, "")
    cands = [model]
    if mfr and mfr.lower() not in model.lower():
        cands.append(f"{mfr} {model}")
    if model.startswith("Galaxy "):  cands.append(f"Samsung {model}")
    if model.startswith("Pixel "):   cands.append(f"Google {model}")
    if model.startswith("Quest "):   cands.append(f"Meta {model}")
    if model.startswith("Razr "):    cands.append(f"Motorola {model}")
    if model.startswith("Mate "):    cands.append(f"Huawei {model}")
    if "Vision Pro" in model:        cands.append("Apple Vision Pro")
    if "iPhone " in model:           cands.append(model.split(" Pro")[0])  # series fallback
    parts = model.split()
    if len(parts) >= 3: cands.append(" ".join(parts[:2]))
    out, seen = [], set()
    for c in cands:
        if c and c not in seen:
            seen.add(c); out.append(c)
    return out


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=12) as r:
        return r.read().decode("utf-8", "replace")


def wiki_html(title):
    """위키피디아 본문 HTML — parse API."""
    params = {"action":"parse","format":"json","page":title,"prop":"text","redirects":"1"}
    url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params)
    try:
        d = json.loads(fetch(url))
    except Exception:
        return None, None
    p = d.get("parse")
    if not p: return None, None
    return p.get("title"), p.get("text",{}).get("*","")


def parse_infobox(html):
    """간단 infobox 파서 — table.infobox 안의 th/td 추출."""
    # 첫 infobox 테이블 추출
    m = re.search(r'<table class="[^"]*infobox[^"]*"[^>]*>(.*?)</table>', html, re.S | re.I)
    if not m: return {}
    table = m.group(1)
    # 행 단위 분리
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table, re.S | re.I)
    out = {}
    for row in rows:
        th = re.search(r'<th[^>]*>(.*?)</th>', row, re.S | re.I)
        td = re.search(r'<td[^>]*>(.*?)</td>', row, re.S | re.I)
        if not th or not td: continue
        label = clean_html(th.group(1)).lower().strip()
        value = clean_html(td.group(1))
        if label and value:
            out[label] = value
    return out


def clean_html(s):
    """HTML 태그 제거 + 엔티티 정리."""
    s = re.sub(r'<[^>]+>', ' ', s)
    s = s.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    s = re.sub(r'\[\d+\]', '', s)   # 각주 [1] [2] 제거
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def map_to_schema(infobox):
    """infobox 라벨 → 우리 스키마."""
    out = {"design":{}, "display":{}, "processor":{}, "memory":{}, "camera":{},
           "battery":{}, "connectivity":{}, "os":{}, "durability":{}, "price":{}}
    matched = 0
    for label, value in infobox.items():
        if label in LABEL_MAP:
            section, key = LABEL_MAP[label]
            out[section][key] = value
            matched += 1
            continue
        # 부분 매칭 (예: "Display (cover)" → "display")
        for k, target in LABEL_MAP.items():
            if k in label:
                section, key = target
                if key not in out[section]:  # 이미 있으면 덮어쓰지 않음
                    out[section][key] = value
                    matched += 1
                break
    out["lastUpdated"] = time.strftime("%Y-%m-%d")
    return out, matched


def fetch_specs(p):
    for cand in candidates(p):
        title, html = wiki_html(cand)
        if not html: time.sleep(0.2); continue
        infobox = parse_infobox(html)
        if not infobox:
            time.sleep(0.2); continue
        schema, matched = map_to_schema(infobox)
        if matched >= 3:   # 최소 3개 필드는 맞아야 의미 있음
            schema["source"] = f"https://en.wikipedia.org/wiki/{urllib.parse.quote(title.replace(' ','_'))}"
            return schema, cand, matched
        time.sleep(0.2)
    return None, None, 0


def main():
    products = json.load(open(sys.argv[1]))
    out_path = sys.argv[2]
    start = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    end   = int(sys.argv[4]) if len(sys.argv) > 4 else len(products)
    try: out = json.load(open(out_path))
    except Exception: out = {}

    for i in range(start, min(end, len(products))):
        p = products[i]
        if p["model"] in out:
            print(f"[{i+1}/{len(products)}] SKIP {p['model']}", file=sys.stderr); continue
        schema, hit, matched = fetch_specs(p)
        if schema:
            out[p["model"]] = schema
            print(f"[{i+1}/{len(products)}] OK   {p['model']:36s} via '{hit}' ({matched} fields)", file=sys.stderr)
        else:
            out[p["model"]] = None
            print(f"[{i+1}/{len(products)}] MISS {p['model']:36s}", file=sys.stderr)
        if (i+1) % 5 == 0:
            json.dump(out, open(out_path,"w"), ensure_ascii=False, indent=2)
        time.sleep(0.3)

    json.dump(out, open(out_path,"w"), ensure_ascii=False, indent=2)
    got = sum(1 for v in out.values() if v)
    print(f"\n총 {len(products)} / 처리 {len(out)} / 성공 {got}", file=sys.stderr)


if __name__ == "__main__":
    main()
