# News_doc — 모바일 제품 스펙 검색 대시보드

`제조사 정보_검색용.pdf` 의 10개 글로벌 제조사 라인업을 한 페이지에서 검색·필터·비교할 수 있는 정적 웹앱입니다.

## 빠른 시작

```bash
git clone https://github.com/yonchelee/News_doc.git
cd News_doc/dashboard
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

또는 GitHub Pages 라이브 URL: **https://yonchelee.github.io/News_doc/** (Pages 활성화 후)

## 기능

- **47개 제품** × 10개 제조사 × 6개 카테고리 (스마트폰 / 폴더블 / 태블릿 / 웨어러블 / XR / 게이밍)
- **검색**: 모델명·하이라이트·연도·제조사·카테고리 매칭 (90ms 디바운스)
- **필터**: 제조사 × 카테고리 cross-filter (다중 선택, AND 결합)
- **비교 모드**: 카드 두 개 탭 → 하단 트레이 → 비교하기 → side-by-side 모달
- **AI 검색**: 자연어 질문 → Gemma 모델이 비교/필터/검색 액션 결정 (Ollama 옵션, 폴백 모드 자동)
- **다크모드**: `prefers-color-scheme` 자동 대응
- **반응형**: 모바일 1열 → 태블릿 2열 → 데스크탑 3열

## AI 검색 활성화 (선택)

기본 상태에서는 키워드 매칭 폴백으로 동작합니다. Gemma를 연결하면 "5G 폴더블 추천", "아이폰이랑 갤럭시 폴드 비교" 같은 자연어 질문을 처리합니다.

```bash
# 1. Ollama 설치
curl -fsSL https://ollama.com/install.sh | sh
# 또는 https://ollama.com/download

# 2. Gemma 모델 다운로드 (4B 권장, 2B도 동작)
ollama pull gemma3:4b      # ~3GB
# ollama pull gemma2:2b    # 더 가벼운 대안

# 3. CORS 허용해서 서버 실행 (브라우저에서 호출하므로 필수)
OLLAMA_ORIGINS='*' ollama serve
```

대시보드 새로고침 → 입력창의 점이 **🟢 초록**으로 바뀌면 연결 완료. 점이 회색이면 폴백 모드(키워드 매칭).

## GitHub Pages 활성화

이 PR이 머지되면 자동 배포되도록 워크플로우(`.github/workflows/deploy-pages.yml`)가 포함되어 있습니다. 첫 활성화는 한 번만 수동:

1. 레포 → **Settings** → **Pages**
2. **Source**: `GitHub Actions` 선택
3. main 브랜치 push 시 자동 배포
4. ~1분 후 `https://yonchelee.github.io/News_doc/` 에서 라이브 확인

## 디자인

Apple Minimalism — 화이트 BG, 1px hairline divider, `#F5F5F7` surface, generous spacing, asymmetric balance, subtle motion (`cubic-bezier(.2,.8,.2,1)`), SF Pro Display/Text → Pretendard → system sans-serif fallback.

## 데이터 소스

`제조사 정보_검색용.pdf` (이 레포 루트). 제품 스펙은 PDF 발행 시점 기준 대표 라인업으로 큐레이션. 신규 모델 추가는 `dashboard/data.js` 의 `PRODUCTS` 배열에 객체 추가.

```js
{ mfr: "samsung", category: "smartphone", model: "Galaxy S26", year: 2026, highlight: "..." }
```

## 파일 구조

```
News_doc/
├── README.md
├── 제조사 정보_검색용.pdf       # 데이터 소스
├── 클로드 디자인메모리_*.pdf
├── dashboard/
│   ├── index.html               # 마크업
│   ├── data.js                  # 제조사 + 제품 + 카테고리
│   ├── app.js                   # 필터/검색/비교/AI 로직
│   └── style.css                # Apple Minimalism 스타일
└── .github/workflows/
    └── deploy-pages.yml         # GitHub Pages 자동 배포
```

## 라이선스

Personal project. 데이터 출처는 PDF 원본 참조.
