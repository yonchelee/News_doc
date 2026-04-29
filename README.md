# 모바일 제품 비교 AI플랫폼

10개 글로벌 제조사의 80여 개 라인업(2024–2026)을 한 화면에서 검색·필터·비교하고, 자연어로 AI에게 직접 질문할 수 있는 정적 웹앱입니다.

## 빠른 시작

```bash
git clone https://github.com/yonchelee/News_doc.git
cd News_doc/dashboard
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

라이브 URL: **https://yonchelee.github.io/News_doc/** (Pages 활성화 후)

## 기능 요약

- **80여 개 제품** × 10개 제조사 × 6개 카테고리 (스마트폰 / 폴더블 / 태블릿 / 웨어러블 / XR / 게이밍)
- **2024–2026 라인업 반영** — iPhone 17 시리즈, Galaxy S25/Z Fold7, Pixel 10 시리즈, Vision Pro M5, Quest 3S, Razr 60 등 최신 + 발표/유출 단계 제품
- **통합 입력창** — 검색과 자연어 질의가 하나의 입력창에서 처리
- **듀얼 패널 레이아웃**
  - 왼쪽: 필터된 카드 그리드
  - 오른쪽: AI 인사이트 텍스트 응답
  - 모바일: 위/아래, 데스크탑 (≥980px): 좌/우 split
- **3단계 LLM 어댑터** (자동 우선순위)
  1. **Ollama** (localhost) — 무료, 로컬, 키 불필요
  2. **Groq API** — 무료 티어, 매우 빠름 (llama-3.3-70b)
  3. **Gemini API** — 무료 티어 (gemini-2.0-flash)
  4. **키워드 폴백** — AI 미연결 시에도 한국어 별칭 매칭으로 동작
- **한국어 별칭 검색** — "갤럭시", "아이폰", "픽셀", "폴드", "워치" 등 자동 매칭
- **비교 모드** — "X vs Y" 자연어 → 자동으로 두 제품 비교 모달
- **다크모드** + 모바일 우선 반응형 + 접근성 (aria-pressed, role=dialog)

## AI 엔진 설정

기본은 **키워드 매칭 폴백**으로 동작합니다 (AI 없이도 검색·비교 가능). 더 풍부한 인사이트를 원하면 아래 셋 중 하나 활성화:

### 옵션 A: Ollama (권장 — 로컬, 무료, 키 없음)

```bash
# 설치
curl -fsSL https://ollama.com/install.sh | sh
# 또는 https://ollama.com/download

# 모델 다운로드
ollama pull gemma3:4b       # ~3GB, 한국어 양호
# ollama pull gemma2:2b     # 더 가벼운 대안

# CORS 허용 + 서버 실행 (브라우저에서 호출하므로 필수)
OLLAMA_ORIGINS='*' ollama serve
```

대시보드 새로고침 → 입력창의 점이 🟢 초록 + "Ollama" 표시.

### 옵션 B: Groq API 키

1. https://console.groq.com/keys 에서 무료 키 발급 (이메일 가입)
2. 대시보드 → 우측 상단 "설정" 버튼
3. Groq 키 입력 → 저장
4. 즉시 활성화 (브라우저 localStorage 에만 저장, 서버 전송 없음)

### 옵션 C: Google Gemini API 키

1. https://aistudio.google.com/apikey 에서 무료 키 발급
2. 대시보드 → 설정 → Gemini 키 입력 → 저장

## GitHub Pages 활성화 (회사 보고용 공개 URL)

이 레포는 자동 배포 워크플로우(`.github/workflows/deploy-pages.yml`)를 포함합니다.

1. 레포 → **Settings** → **Pages**
2. **Source**: `GitHub Actions` 선택
3. ~1~2분 후 https://yonchelee.github.io/News_doc/ 라이브

## 디자인

Apple Minimalism — 화이트 BG, 1px hairline divider, `#F5F5F7` surface, generous spacing, asymmetric balance, subtle motion (`cubic-bezier(.2,.8,.2,1)`), SF Pro Display/Text → Pretendard → system sans-serif fallback.

## 데이터

- 소스: `제조사 정보_검색용.pdf` (이 레포 루트)
- 갱신 기준: 2024 출시 + 2025 출시 + 2026 발표/유출
- 스펙은 발표 시점 대표값. 신규 모델 추가는 `dashboard/data.js` PRODUCTS 배열에 객체 추가:

```js
{ mfr: "samsung", category: "smartphone", model: "Galaxy S26", year: 2026, status: "rumored", highlight: "..." }
```

`status`: `"released"` | `"announced"` | `"rumored"`

## 파일 구조

```
News_doc/
├── README.md
├── 제조사 정보_검색용.pdf       # 데이터 소스
├── 클로드 디자인메모리_*.pdf
├── dashboard/
│   ├── index.html               # 마크업 (입력창, 듀얼 패널, 모달)
│   ├── data.js                  # 80여 개 제품 데이터
│   ├── app.js                   # 검색/필터/비교/LLM 어댑터/폴백
│   └── style.css                # Apple Minimalism + split layout
└── .github/workflows/
    └── deploy-pages.yml         # GitHub Pages 자동 배포
```

## 라이선스 / 면책

개인 프로젝트. 제품 스펙은 공개된 발표 자료 기반으로 큐레이션 — 정확성을 보장하지 않으며, 출시 예정 제품은 유출/루머 단계의 정보일 수 있습니다.
