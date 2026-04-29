#!/usr/bin/env python3
"""제품 이미지 자동 수집 v2 — Wikimedia 메타 필터링.

전략:
1. 제품 Wikipedia 페이지 → pageimage thumbnail (1차 후보, 위키 편집자 큐레이션)
2. URL/파일명에 negative 키워드 (FCC, back, side, user, review, inside, hand) → 점수 -10
3. URL/파일명에 positive 키워드 (Vector, Render, Front, Press, Official, Official_Press) → +5
4. 음수면 reject, 양수면 accept, 0이면 borderline (accept하되 flag)

추후 확장: prop=images 로 모든 이미지 후보 받고 extmetadata로 더 정밀 필터.
"""
import json, urllib.parse, urllib.request, sys, time, re

UA = "ClaudeAssist/1.0 (https://github.com/yonchelee/News_doc) python-urllib"

NEGATIVE = ["fcc", "user", "review", "_back", "backside", "_side", "rear", "dirty", "blur", "inside", "hand", "_in_hand", "leak", "rumored"]
POSITIVE = ["vector", "render", "front", "press", "official", "press_release", "official_press"]

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
    parts = model.split()
    if len(parts) >= 3: cands.append(" ".join(parts[:2]))
    out, seen = [], set()
    for c in cands:
        if c and c not in seen: seen.add(c); out.append(c)
    return out


def url_score(url):
    """URL/파일명 기반 점수. 양수면 좋은 이미지."""
    fname = url.split("/")[-1].lower()
    score = 0
    for n in NEGATIVE:
        if n in fname: score -= 10
    for p in POSITIVE:
        if p in fname: score += 5
    return score


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=10) as r:
        return r.read().decode("utf-8", "replace")


def wiki_pageimage(title, size=500):
    """Wikipedia query: get page thumbnail (curated)."""
    params = {"action":"query","format":"json","prop":"pageimages",
              "piprop":"thumbnail|name","pithumbsize":str(size),
              "redirects":"1","titles":title}
    url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params)
    try:
        d = json.loads(fetch(url))
    except Exception: return None
    for pid, page in d.get("query",{}).get("pages",{}).items():
        if pid == "-1": continue
        thumb = page.get("thumbnail")
        if thumb and thumb.get("source"):
            return {"url": thumb["source"], "title": page.get("title")}
    return None


def fetch_image(p):
    for cand in candidates(p):
        thumb = wiki_pageimage(cand)
        if not thumb:
            time.sleep(0.15); continue
        score = url_score(thumb["url"])
        if score > 0:
            return {"url": thumb["url"], "wiki_title": thumb["title"], "score": score, "decision": "good"}
        elif score < 0:
            return {"url": thumb["url"], "wiki_title": thumb["title"], "score": score, "decision": "rejected"}
        # borderline (score=0): 첫 후보면 그대로 사용 (위키 편집자 큐레이션 신뢰)
        return {"url": thumb["url"], "wiki_title": thumb["title"], "score": 0, "decision": "borderline"}
    return None


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
        r = fetch_image(p)
        if r:
            out[p["model"]] = r
            print(f"[{i+1}/{len(products)}] {r['decision'].upper():10s} {p['model']:36s} score={r['score']:+d}", file=sys.stderr)
        else:
            out[p["model"]] = None
            print(f"[{i+1}/{len(products)}] MISS    {p['model']}", file=sys.stderr)
        if (i+1) % 5 == 0:
            json.dump(out, open(out_path,"w"), ensure_ascii=False, indent=2)
        time.sleep(0.2)
    json.dump(out, open(out_path,"w"), ensure_ascii=False, indent=2)

    good = sum(1 for v in out.values() if v and v.get("decision") == "good")
    border = sum(1 for v in out.values() if v and v.get("decision") == "borderline")
    rej = sum(1 for v in out.values() if v and v.get("decision") == "rejected")
    miss = sum(1 for v in out.values() if not v)
    print(f"\n총 {len(products)} / good {good} / borderline {border} / rejected {rej} / miss {miss}", file=sys.stderr)


if __name__ == "__main__":
    main()
