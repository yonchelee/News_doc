# 사내 Gauss 프록시 백엔드 — 셋업 가이드 (Windows)

영채님 PC(`10.253.4.90:8000`)가 사내 동료들이 News_doc 대시보드에서 Gauss LLM에 접근하는 단일 게이트웨이입니다. Gauss whitelist된 IP가 영채님 PC뿐이라, 다른 사람들은 이 프록시를 거쳐 호출하게 됩니다.

## 사전 조건

- Windows 10/11
- Python 3.10+ (https://www.python.org/downloads/ — "Add Python to PATH" 체크 필수)
- 사내망 연결 + Gauss 자격증명

확인:
```powershell
python --version       # 3.10 이상
where python           # PATH 확인
```

## 1단계 — 환경변수 등록 (한 번만)

PowerShell에서:

```powershell
[Environment]::SetEnvironmentVariable("GAUSS_TOKEN",  "<your-token>",  "User")
[Environment]::SetEnvironmentVariable("GAUSS_CLIENT", "<your-client>", "User")
```

선택 (default 그대로 두면 됨):

```powershell
# Gauss endpoint 변경 시
[Environment]::SetEnvironmentVariable("GAUSS_URL",   "https://genai-openapi.sec.samsung.net/dxhq/trial/api-agent", "User")

# 동료 외 추가 origin 허용 (사내 다른 GHE 인스턴스 등)
[Environment]::SetEnvironmentVariable("EXTRA_ORIGINS", "http://other.sec.samsung.net", "User")

# 프록시 자체에 인증 추가 (사내망이라 보통 불필요)
[Environment]::SetEnvironmentVariable("PROXY_API_KEY", "<random-secret>", "User")
```

> **주의**: PowerShell 창을 새로 열어야 변경된 환경변수가 적용됩니다.

## 2단계 — 백엔드 시작

`start.bat` 더블 클릭:

- 자동으로 의존성 (`fastapi`, `uvicorn`, `httpx`) 설치
- `0.0.0.0:8000`에서 서비스 시작
- 콘솔 창이 열려 있는 동안 동작 (Ctrl+C 로 중단)

또는 수동:
```powershell
cd company-backend
python -m pip install -r requirements.txt
python -m uvicorn proxy:app --host 0.0.0.0 --port 8000
```

## 3단계 — 검증

다른 PowerShell 창에서:

```powershell
# 로컬 헬스 체크
curl http://localhost:8000/health
# → {"ok":true}

# 환경변수 진단 (값은 노출 X, prefix/length만)
curl http://localhost:8000/_debug
# → {"endpoint":"...","tokenPresent":true,"tokenLength":NN,...}

# 동료 PC에서 (같은 사내망)
curl http://10.253.4.90:8000/health
```

성공하면 동료들이 사내 대시보드 (`http://github.sec.samsung.net/yonche-lee/news_doc`) 열어서 자연어 질문 → 자동으로 영채님 PC로 라우팅 → Gauss 응답.

## 4단계 (선택) — Windows 자동 시작

PC 재시작 후에도 자동 실행되게:

```powershell
# 관리자 권한 PowerShell
cd company-backend
powershell -ExecutionPolicy Bypass -File .\setup_autostart.ps1
```

작업 스케줄러에 `NewsDocGaussProxy` 작업 등록됨. 사용자 로그인 시마다 자동 실행.

제거:
```powershell
Unregister-ScheduledTask -TaskName NewsDocGaussProxy -Confirm:$false
```

## 방화벽 안내

Windows Defender 방화벽이 `python.exe` 인바운드를 차단할 수 있음. 첫 실행 시 팝업 뜨면 **개인 + 사내 네트워크** 둘 다 허용 (공용은 OFF). 동료 PC에서 `10.253.4.90:8000` 접근 안 되면 가장 흔한 원인.

수동 추가:
```powershell
# 관리자 권한
New-NetFirewallRule -DisplayName "News_doc Gauss Proxy 8000" -Direction Inbound -Protocol TCP -LocalPort 8000 -Action Allow -Profile Private,Domain
```

## 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| `python` not found | PATH 미등록 | python.org 재설치 시 "Add to PATH" 체크 |
| `pip install` 실패 | 사내망 프록시 | `pip install --proxy http://proxy.sec.samsung.net:8080 ...` |
| `/chat` 500 응답 + "credentials not configured" | env 미설정 | 1단계 다시 + PowerShell 재시작 |
| `/chat` 401/403 | Gauss 토큰 만료/잘못됨 | 사내 포털에서 토큰 재발급 |
| 동료 PC에서 접근 불가 | Windows 방화벽 | 위 방화벽 안내 참조 |
| `/chat` 504 timeout | 사내망 / Gauss slow | proxy.py 의 `httpx.AsyncClient(timeout=60.0)` 늘리기 |

## 디렉토리 구조

```
company-backend/
├── proxy.py             # FastAPI 본체 (단일 파일)
├── requirements.txt     # fastapi / uvicorn / httpx
├── start.bat            # Windows 시작 스크립트 (더블 클릭)
├── setup_autostart.ps1  # 자동 시작 등록 (선택)
└── README.md            # 이 파일
```

## 보안

- `GAUSS_TOKEN`, `GAUSS_CLIENT`는 환경변수에만, 코드/저장소에 박지 않음
- CORS: 사내 origin (`*.sec.samsung.net`) + localhost만 허용
- 선택적 `PROXY_API_KEY`로 프록시 자체에 인증 추가 가능 (헤더 `x-proxy-key`)
- `/_debug`는 토큰 prefix만 노출 (값 노출 X)
