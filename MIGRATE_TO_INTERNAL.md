# 사내 GitHub Enterprise 마이그레이션 가이드

현재 외부 `https://github.com/yonchelee/News_doc` → 사내 `http://github.sec.samsung.net/yonche-lee/news_doc` 옮기는 절차.

## 옵션 A — git mirror push (권장, 모든 브랜치/태그/히스토리 그대로)

### 1. 사내 GHE에 빈 레포 생성

`http://github.sec.samsung.net/yonche-lee` 에서 **New repository** → 이름 `news_doc` → **빈 레포로 생성** (README/license 추가 X — mirror push가 깨짐).

### 2. 외부에서 mirror clone + push

```bash
# 외부망에서
git clone --mirror https://github.com/yonchelee/News_doc.git
cd News_doc.git

# 사내 GHE 인증 (HTTPS PAT 또는 SSH key)
git remote add internal http://github.sec.samsung.net/yonche-lee/news_doc.git
git push --mirror internal
```

> 회사 보안정책에 따라 외부 → 사내 직접 push가 막혀 있을 수 있음. 그 경우 옵션 B 사용.

## 옵션 B — ZIP 다운 + 업로드 (보안망에서 안전)

### 1. 외부 레포 ZIP 다운로드

`https://github.com/yonchelee/News_doc/archive/refs/heads/main.zip`

### 2. 사내 GHE 빈 레포 생성 (옵션 A 1단계와 동일)

### 3. ZIP 풀고 사내로 push

```bash
# 사내망 PC에서
unzip News_doc-main.zip
cd News_doc-main

git init
git add .
git commit -m "Initial import from external"
git branch -M main
git remote add origin http://github.sec.samsung.net/yonche-lee/news_doc.git
git push -u origin main
```

> 단점: 커밋 히스토리 손실. 결과물만 옮김.

## Pages 활성화 (사내 GHE)

사내 GHE 인스턴스가 Pages 지원하는 경우:

1. 레포 → **Settings** → **Pages**
2. **Source**: `Deploy from a branch` 선택
3. **Branch**: `main`, **Folder**: `/dashboard`
4. **Save**
5. 1~2분 후 URL 활성화 — 보통 `http://<user>.github.sec.samsung.net/news_doc/` 또는 `http://github.sec.samsung.net/pages/<user>/news_doc/` (사내 GHE 설정에 따라 다름)

> 사내 GHE 가 GitHub Actions 지원하면 `.github/workflows/deploy-pages.yml` 도 그대로 동작 (적절히 actions 미러링 셋업 필요).
> Actions 미지원이거나 외부 actions cache 차단되면 **branch deploy** 모드로 가면 자동 배포는 안 되지만 정적 파일이 그대로 서빙됨.

## 백엔드 자동 시작

사내 마이그레이션 후 `company-backend/README.md` 의 1~4단계 따라 영채님 PC에 백엔드 셋업.

체크리스트:
- [ ] 사내 GHE 에 레포 import 완료
- [ ] 사내 Pages URL 활성화 + 동료 접근 가능
- [ ] 영채님 PC `start.bat` 실행 → `http://localhost:8000/health` 200 OK
- [ ] 동료 PC에서 `http://10.253.4.90:8000/health` 200 OK (방화벽 허용 확인)
- [ ] 사내 대시보드 열고 "AI 인사이트" 점이 🟢 + "사내 Gauss 백엔드" 표시
- [ ] 자연어 질문 → 실 응답 흐름

## 두 환경 동시 운영

대시보드는 호스트네임으로 자동 환경 분기:
- `*.sec.samsung.net` → `BACKEND_URL` (`http://10.253.4.90:8000`)
- 그 외 → Cloudflare Worker → Ollama → … (외부망 폴백 체인)

같은 코드베이스를 두 GHE 인스턴스에 push하면 됨 — 환경 감지는 런타임에 자동.

## 환경변수 override (필요 시)

사내 IP 바뀌거나 다른 PC로 이전 시 `dashboard/index.html` 에 한 줄 추가:

```html
<script>window.NEWS_DOC_BACKEND_URL = "http://10.253.X.X:8000";</script>
```

또는 사내 GHE 레포에서 `dashboard/app.js` 의 `BACKEND_URL` 상수 직접 수정.
