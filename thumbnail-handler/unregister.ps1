# ── Unregister RawConverterThumb Shell Extension ─────────────────────────────
# Run as Administrator in PowerShell

$ErrorActionPreference = "Stop"
$dir = Split-Path $MyInvocation.MyCommand.Path
$dll = Join-Path $dir "bin\Release\net48\RawConverterThumb.dll"

if (!(Test-Path $dll)) {
    Write-Error "DLL not found at $dll — was it built and registered?"
    exit 1
}

$regasm = @(
    "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe",
    "C:\Windows\Microsoft.NET\Framework\v4.0.30319\RegAsm.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (!$regasm) { Write-Error "RegAsm.exe not found."; exit 1 }

& $regasm /unregister $dll
Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
Start-Sleep 1
Start-Process explorer
Write-Host "PSD/PSB thumbnail handler unregistered." -ForegroundColor Yellow
