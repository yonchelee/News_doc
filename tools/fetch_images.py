#!/usr/bin/env python3
"""제품명 → Wikipedia thumbnail URL 매핑 수집.

전략:
1) 각 제품에 대해 1~3개의 검색 후보를 만든다 (정확도 높은 → 낮은 순).
2) 각 후보를 Wikipedia 검색 API로 page title 찾고 → pageimages prop으로 thumbnail 받음.
3) 첫 매칭에서 thumbnail이 있으면 사용. 없으면 다음 후보.
4) 최종 결과를 JSON으로 저장 → JS data.js에 합칠 때 사용.
"""
import json
import urllib.parse
import urllib.request
import sys
import time

UA = "ClaudeAssist/1.0 (yonchelee@gmail.com) python-urllib"

# 한국어/일반 명칭 → 영문 위키 페이지 제목으로 다듬는 후보 생성기
def candidates(p):
    model = p["model"]
    mfr_key = p["mfr"]

    # 제조사 풀네임
    mfrs = {
        "apple": "Apple",
        "samsung": "Samsung",
        "xiaomi": "Xiaomi",
        "google": "Google",
        "huawei": "Huawei",
        "oppo_vivo": "OPPO",  # vivo와 구분 어려움, 모델명에서 분리
        "meta": "Meta",
        "motorola": "Motorola",
        "sony": "Sony",
        "asus": "Asus"
    }
    mfr = mfrs.get(mfr_key, "")

    cands = []

    # 0) 모델명 그대로
    cands.append(model)

    # 1) 모델명 첫 단어 + 핵심 변형
    # iPhone 17 Pro Max → "iPhone 17 Pro Max" (이미 0)
    # Galaxy Z Fold7 → 보통 위키에 "Samsung Galaxy Z Fold7"
    if mfr and not model.lower().startswith(mfr.lower()):
        if mfr == "OPPO" and model.startswith("Vivo"):
            cands.append(model)  # already correct
        else:
            cands.append(f"{mfr} {model}")

    # 2) 일부 위키 제목 보정
    if model.startswith("Galaxy "):
        cands.append(f"Samsung {model}")
    if model.startswith("Pixel "):
        cands.append(f"Google {model}")
    if model.startswith("Vivo "):
        cands.append(model)  # already
    if model.startswith("OPPO "):
        cands.append(model.replace("OPPO ", "Oppo "))
    if model.startswith("Mi Band"):
        cands.append(model.replace("Mi Band", "Xiaomi Mi Band"))
    if model.startswith("Xiaomi "):
        cands.append(model)
    if model.startswith("Quest "):
        cands.append(f"Meta {model}")
    if model.startswith("Razr "):
        cands.append(f"Motorola {model}")
    if model.startswith("Edge "):
        cands.append(f"Motorola {model}")
    if model.startswith("Mate "):
        cands.append(f"Huawei {model}")
    if model.startswith("Pura "):
        cands.append(f"Huawei {model}")
    if model.startswith("Watch ") and mfr_key == "huawei":
        cands.append(f"Huawei {model}")
    if "PlayStation Portal" in model:
        cands.append("PlayStation Portal")
    if "Vision Pro" in model:
        cands.append("Apple Vision Pro")
    if "Apple Watch" in model:
        cands.append(model)  # 그대로

    # 3) "Pro Max" / "Plus" 등 변형
    # iPhone 17 Pro Max → 못 찾으면 iPhone 17 도 검색 (시리즈 이미지)
    parts = model.split()
    if len(parts) > 2:
        # 짧은 형태도 마지막 폴백
        cands.append(" ".join(parts[:2]))

    # 중복 제거 + 빈 값 제거
    seen = set()
    out = []
    for c in cands:
        c = c.strip()
        if c and c not in seen:
            seen.add(c)
            out.append(c)
    return out


def wiki_thumb(title, size=400):
    """Wikipedia query: get page thumbnail."""
    params = {
        "action": "query",
        "format": "json",
        "prop": "pageimages|pageprops",
        "piprop": "thumbnail|name",
        "pithumbsize": str(size),
        "redirects": "1",
        "titles": title,
    }
    url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.load(r)
    except Exception as e:
        return None, f"net:{e}"
    pages = data.get("query", {}).get("pages", {})
    for pid, page in pages.items():
        if pid == "-1":
            continue
        thumb = page.get("thumbnail")
        if thumb and thumb.get("source"):
            return {
                "url": thumb["source"],
                "width": thumb.get("width"),
                "height": thumb.get("height"),
                "wiki_title": page.get("title")
            }, None
    return None, "no-thumb"


def fetch_for_product(p, size=400):
    """Try candidates in order, return first hit."""
    tried = []
    for cand in candidates(p):
        tried.append(cand)
        thumb, err = wiki_thumb(cand, size)
        if thumb:
            return thumb, tried, None
        time.sleep(0.10)   # 너무 빠르게 치지 않도록
    return None, tried, "exhausted"


def main():
    # Args: products.json output_path [start_idx end_idx]
    products = json.load(open(sys.argv[1]))
    out_path = sys.argv[2]
    start = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    end   = int(sys.argv[4]) if len(sys.argv) > 4 else len(products)

    # 기존 결과 로드
    try:
        out = json.load(open(out_path))
    except Exception:
        out = {}

    for i in range(start, min(end, len(products))):
        p = products[i]
        if p["model"] in out:
            print(f"[{i+1}/{len(products)}] SKIP {p['model']} (cached)", file=sys.stderr)
            continue
        thumb, tried, err = fetch_for_product(p, size=400)
        if thumb:
            out[p["model"]] = thumb["url"]
            print(f"[{i+1}/{len(products)}] OK   {p['model']:40s} → {thumb['wiki_title']}", file=sys.stderr)
        else:
            out[p["model"]] = None
            print(f"[{i+1}/{len(products)}] MISS {p['model']:40s} ({len(tried)} tried)", file=sys.stderr)
        # 매 5개마다 저장
        if (i+1) % 5 == 0:
            json.dump(out, open(out_path, "w"), ensure_ascii=False, indent=2)

    json.dump(out, open(out_path, "w"), ensure_ascii=False, indent=2)
    found = sum(1 for v in out.values() if v)
    print(f"\n총 {len(products)} / 처리 {len(out)} / 성공 {found}", file=sys.stderr)


if __name__ == "__main__":
    main()
