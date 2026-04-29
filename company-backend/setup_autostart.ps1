# News_doc Gauss 프록시 자동 시작 등록 (Windows Task Scheduler)
#
# 사용:
#   PowerShell 관리자 권한으로 실행
#   1. cd C:\path\to\News_doc\company-backend
#   2. powershell -ExecutionPolicy Bypass -File .\setup_autostart.ps1
#
# 등록 후:
#   - 사용자 로그인 시 자동으로 start.bat 실행
#   - 작업 스케줄러에 'NewsDocGaussProxy' 이름으로 등록
#   - 제거: Unregister-ScheduledTask -TaskName NewsDocGaussProxy -Confirm:$false

$ErrorActionPreference = "Stop"
$taskName = "NewsDocGaussProxy"
$here = Split-Path -Parent $MyInvocation.MyCommand.Definition
$startBat = Join-Path $here "start.bat"

if (-not (Test-Path $startBat)) {
    Write-Host "[ERROR] start.bat 파일을 찾을 수 없습니다: $startBat" -ForegroundColor Red
    exit 1
}

# 기존 작업이 있으면 제거
$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "[INFO] 기존 작업 제거..."
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Action: cmd로 start.bat 실행 (콘솔 창 보임 → 로그 모니터링 가능)
$action = New-ScheduledTaskAction `
    -Execute "cmd.exe" `
    -Argument "/c `"$startBat`"" `
    -WorkingDirectory $here

# Trigger: 사용자 로그인 시
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME

# Principal: 현재 사용자, 일반 권한 (관리자 X)
$principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Limited

# Settings: 배터리, 슬립 등 제약 풀어주기 + 에러 시 재시도
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 0) `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 5)

Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Principal $principal `
    -Settings $settings `
    -Description "News_doc Gauss LLM proxy - 사내 동료가 영채님 PC를 통해 Gauss API 호출" `
    | Out-Null

Write-Host ""
Write-Host "[SUCCESS] 작업 등록 완료: $taskName" -ForegroundColor Green
Write-Host ""
Write-Host "다음 로그인부터 자동으로 백엔드가 실행됩니다."
Write-Host "지금 즉시 실행하려면:"
Write-Host "  Start-ScheduledTask -TaskName $taskName"
Write-Host ""
Write-Host "제거하려면:"
Write-Host "  Unregister-ScheduledTask -TaskName $taskName -Confirm:`$false"
