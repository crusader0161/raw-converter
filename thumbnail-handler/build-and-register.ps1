# ── RawConverterThumb — Build & Register Shell Extension ──────────────────────
# Run as Administrator in PowerShell

$ErrorActionPreference = "Stop"
$script = $MyInvocation.MyCommand.Path
$dir    = Split-Path $script

Write-Host "Building RawConverterThumb..." -ForegroundColor Cyan
Push-Location $dir

# Restore NuGet packages and build
dotnet restore
dotnet build -c Release -r win-x64

$dll = Join-Path $dir "bin\Release\net48\RawConverterThumb.dll"
if (!(Test-Path $dll)) {
    # Try without RID
    $dll = Join-Path $dir "bin\Release\net48\RawConverterThumb.dll"
}

if (!(Test-Path $dll)) {
    Write-Error "Build failed — DLL not found at $dll"
    exit 1
}

Write-Host "Registering COM shell extension..." -ForegroundColor Cyan

# Find regasm
$regasm = @(
    "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe",
    "C:\Windows\Microsoft.NET\Framework\v4.0.30319\RegAsm.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (!$regasm) {
    Write-Error "RegAsm.exe not found. Install .NET Framework 4.8."
    exit 1
}

& $regasm /codebase $dll
if ($LASTEXITCODE -ne 0) {
    Write-Error "RegAsm registration failed (exit $LASTEXITCODE)"
    exit 1
}

# Restart Explorer so thumbnails take effect
Write-Host "Restarting Windows Explorer..." -ForegroundColor Yellow
Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1
Start-Process explorer

Pop-Location
Write-Host "Done! PSD/PSB thumbnails registered." -ForegroundColor Green
