@echo off
setlocal

set CSC=C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe
set REGASM=C:\Windows\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe
set OUT=%~dp0RawConverterThumb.dll

echo Building RawConverterThumb.dll ...
"%CSC%" /target:library /platform:x64 /optimize+ ^
  /reference:System.Drawing.dll ^
  /out:"%OUT%" ^
  "%~dp0PsdThumbnailHandler.cs"

if errorlevel 1 (
  echo BUILD FAILED
  pause
  exit /b 1
)

echo Build succeeded: %OUT%
echo.
echo Registering COM shell extension (requires Administrator) ...
"%REGASM%" /codebase "%OUT%"

if errorlevel 1 (
  echo Registration failed. Re-run this file as Administrator.
  pause
  exit /b 1
)

echo Restarting Explorer ...
taskkill /f /im explorer.exe >nul 2>&1
ping -n 2 127.0.0.1 >nul
start explorer.exe

echo Done. PSD and PSB files will now show thumbnails in Explorer.
pause
