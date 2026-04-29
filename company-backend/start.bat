@echo off
rem ================================================================
rem  News_doc Gauss 프록시 백엔드 시작 (Windows)
rem  더블 클릭하면 모든 절차 자동:
rem    1. Python 확인
rem    2. 가상환경 (있으면 활성화)
rem    3. 의존성 설치
rem    4. 환경변수 검증
rem    5. uvicorn 실행 (0.0.0.0:8000)
rem ================================================================

setlocal enableextensions enabledelayedexpansion
cd /d "%~dp0"
title News_doc Gauss Proxy

rem -- Python 확인 --
where python >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Python 이 설치되지 않았거나 PATH 에 없습니다.
    echo         https://www.python.org/downloads/ 에서 3.10+ 설치 후 다시 실행하세요.
    pause
    exit /b 1
)
echo [OK] Python 확인됨.

rem -- 가상환경 (선택) --
if exist ".venv\Scripts\activate.bat" (
    call ".venv\Scripts\activate.bat"
    echo [OK] .venv 가상환경 활성화.
)

rem -- 의존성 설치 (조용히, 업그레이드) --
echo [...] 의존성 설치 중 (fastapi, uvicorn, httpx)...
python -m pip install --quiet --disable-pip-version-check --upgrade -r requirements.txt
if errorlevel 1 (
    echo [ERROR] pip install 실패. 네트워크/방화벽 확인.
    pause
    exit /b 1
)
echo [OK] 의존성 OK.

rem -- 환경변수 검증 --
if "%GAUSS_TOKEN%"=="" (
    echo [WARN] GAUSS_TOKEN 환경변수가 비어 있습니다.
    echo        PowerShell에서:
    echo            [Environment]::SetEnvironmentVariable^("GAUSS_TOKEN", "your-token", "User"^)
    echo        설정 후 새 창에서 start.bat 다시 실행.
)
if "%GAUSS_CLIENT%"=="" (
    echo [WARN] GAUSS_CLIENT 환경변수가 비어 있습니다.
)

rem -- 실행 --
echo.
echo ============================================================
echo  서버 시작:  http://10.253.4.90:8000  (또는 http://localhost:8000)
echo  헬스 체크:  http://localhost:8000/health
echo  진단:       http://localhost:8000/_debug
echo  중단:       이 창에서 Ctrl+C
echo ============================================================
echo.

python -m uvicorn proxy:app --host 0.0.0.0 --port 8000

endlocal
