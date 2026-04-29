"""사내 Gauss LLM 프록시 — News_doc 대시보드용

- POST /chat   : 클라이언트 페이로드를 Gauss API로 forward
- GET  /health : 헬스 체크
- GET  /       : 서비스 정보

환경변수 (필수):
    GAUSS_TOKEN     — x-openapi-token 헤더값
    GAUSS_CLIENT    — x-generative-ai-client 헤더값

환경변수 (선택):
    GAUSS_URL       — Gauss 엔드포인트 (기본: 사내 dxhq trial api-agent)
    EXTRA_ORIGINS   — CORS 추가 허용 origin (콤마 구분)
    PROXY_API_KEY   — 설정 시 클라이언트가 x-proxy-key 헤더로 같은 값을 보내야 함

실행:
    python -m uvicorn proxy:app --host 0.0.0.0 --port 8000
"""
import os
import sys
import logging
from pathlib import Path
from typing import Any, Dict

import httpx
from fastapi import FastAPI, Request, HTTPException, Header
from fastapi.responses import JSONResponse, Response, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


# ---------- 설정 ----------
GAUSS_URL = os.environ.get(
    "GAUSS_URL",
    "https://genai-openapi.sec.samsung.net/dxhq/trial/api-agent",
)
GAUSS_TOKEN = os.environ.get("GAUSS_TOKEN", "")
GAUSS_CLIENT = os.environ.get("GAUSS_CLIENT", "")
PROXY_API_KEY = os.environ.get("PROXY_API_KEY", "")  # 선택적 인증

DEFAULT_ORIGINS = [
    "http://github.sec.samsung.net",
    "https://github.sec.samsung.net",
    "http://localhost:8000",
    "http://localhost:8765",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8765",
    "http://localhost:3000",
    "http://localhost:5173",
]
extra = os.environ.get("EXTRA_ORIGINS", "").strip()
if extra:
    DEFAULT_ORIGINS.extend([o.strip() for o in extra.split(",") if o.strip()])

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger("proxy")

# proxy.py 위치 기준 절대경로로 dashboard 폴더 찾기 (cwd 영향 없음)
HERE = Path(__file__).resolve().parent
DASHBOARD_DIR = HERE.parent / "dashboard"

app = FastAPI(title="News_doc Gauss Proxy", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=DEFAULT_ORIGINS,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "x-proxy-key"],
    allow_credentials=False,
    max_age=86400,
)


# ---------- 엔드포인트 ----------
@app.get("/")
async def root() -> RedirectResponse:
    """루트 접속 → 대시보드로 자동 이동."""
    return RedirectResponse(url="/dashboard/", status_code=307)


@app.get("/health")
async def health() -> Dict[str, Any]:
    return {"ok": True}


@app.get("/info")
async def info() -> Dict[str, Any]:
    """기존 / 가 dashboard로 redirect 되니, 서비스 메타는 /info에서."""
    return {
        "ok": True,
        "service": "news-doc-gauss-proxy",
        "configured": bool(GAUSS_TOKEN and GAUSS_CLIENT),
        "endpoint": GAUSS_URL,
        "dashboard_path": str(DASHBOARD_DIR) if DASHBOARD_DIR.exists() else "(not mounted)",
    }


@app.post("/chat")
async def chat(request: Request, x_proxy_key: str = Header(default="")) -> Response:
    # 선택적 PROXY_API_KEY 검증
    if PROXY_API_KEY and x_proxy_key != PROXY_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid proxy API key")

    # 환경변수 검증
    if not GAUSS_TOKEN or not GAUSS_CLIENT:
        return JSONResponse(
            status_code=500,
            content={
                "error": "Gauss credentials not configured",
                "hint": "GAUSS_TOKEN, GAUSS_CLIENT 환경변수를 설정하세요. README.md 참조.",
            },
        )

    # body 읽기
    try:
        payload = await request.json()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON body: {e}")

    log.info(
        "POST /chat → Gauss (%s msgs, model=%s)",
        len(payload.get("messages", [])) if isinstance(payload, dict) else "?",
        payload.get("model") if isinstance(payload, dict) else "?",
    )

    headers = {
        "Content-Type": "application/json",
        "x-generative-ai-client": GAUSS_CLIENT,
        "x-openapi-token": GAUSS_TOKEN,
    }

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            upstream = await client.post(GAUSS_URL, headers=headers, json=payload)
    except httpx.TimeoutException:
        return JSONResponse(status_code=504, content={"error": "Gauss timeout"})
    except httpx.RequestError as e:
        return JSONResponse(
            status_code=502,
            content={"error": "Gauss network error", "detail": str(e)},
        )

    # Gauss 응답 그대로 forward (status, content-type, body)
    content_type = upstream.headers.get("content-type", "application/json")
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        media_type=content_type,
    )


# ---------- 진단용 ----------
@app.get("/_debug")
async def debug() -> Dict[str, Any]:
    """배포된 환경 점검 — 토큰 값은 노출 X, 길이/prefix만"""
    return {
        "endpoint": GAUSS_URL,
        "tokenPresent": bool(GAUSS_TOKEN),
        "tokenLength": len(GAUSS_TOKEN),
        "tokenPrefix": (GAUSS_TOKEN[:4] + "...") if GAUSS_TOKEN else "",
        "clientPresent": bool(GAUSS_CLIENT),
        "clientPrefix": (GAUSS_CLIENT[:4] + "...") if GAUSS_CLIENT else "",
        "extraOriginsCount": len(DEFAULT_ORIGINS),
        "proxyAuthEnabled": bool(PROXY_API_KEY),
    }


# ---------- 정적 파일 (대시보드) 마운트 ----------
# 동료들이 http://10.253.4.90:8000/ 로 직접 접속 → /dashboard/ 로 리다이렉트
if DASHBOARD_DIR.exists():
    app.mount(
        "/dashboard",
        StaticFiles(directory=str(DASHBOARD_DIR), html=True),
        name="dashboard",
    )
    log.info("Dashboard mounted at /dashboard from %s", DASHBOARD_DIR)
else:
    log.warning("Dashboard 폴더 없음: %s — 정적 서빙 비활성화", DASHBOARD_DIR)


if __name__ == "__main__":
    import uvicorn
    if not (GAUSS_TOKEN and GAUSS_CLIENT):
        log.warning(
            "GAUSS_TOKEN 또는 GAUSS_CLIENT 가 설정되지 않았습니다. /chat 호출은 500을 반환합니다."
        )
    log.info("Starting on 0.0.0.0:8000 → %s", GAUSS_URL)
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
