@echo off
setlocal

:: ── Find QuickLook.Common.dll ─────────────────────────────────────────────────
set QL_COMMON=
for %%D in (
    "%LOCALAPPDATA%\Programs\QuickLook"
    "%PROGRAMFILES%\QuickLook"
    "%PROGRAMFILES(X86)%\QuickLook"
) do (
    if exist "%%~D\QuickLook.Common.dll" (
        set QL_COMMON=%%~D\QuickLook.Common.dll
        goto :found
    )
)

echo ERROR: QuickLook is not installed.
echo Install QuickLook from the Microsoft Store, then re-run this script.
echo.
echo   ms-windows-store://pdp/?productid=9NVL5NL4NLLM
echo.
pause
exit /b 1

:found
echo Found QuickLook: %QL_COMMON%

:: ── Compiler + output paths ───────────────────────────────────────────────────
set CSC=C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe
set OUT=%~dp0RawConverterQLPlugin.dll

:: WPF assemblies (always in GAC on .NET 4.x Windows)
set WPF_REFS=/reference:PresentationCore.dll /reference:PresentationFramework.dll /reference:WindowsBase.dll /reference:System.Xaml.dll

echo Compiling plugin...
"%CSC%" /target:library /platform:anycpu ^
  /reference:"%QL_COMMON%" ^
  %WPF_REFS% ^
  /reference:System.ComponentModel.Composition.dll ^
  /out:"%OUT%" ^
  "%~dp0RawConverterQLPlugin.cs"

if errorlevel 1 (
    echo BUILD FAILED
    pause
    exit /b 1
)

echo Build succeeded: %OUT%
echo.

:: ── Install plugin ────────────────────────────────────────────────────────────
:: QuickLook looks for plugins in %APPDATA%\QuickLook\Plugins\<PluginName>\
set PLUGIN_DIR=%APPDATA%\QuickLook\Plugins\RawConverter
if not exist "%PLUGIN_DIR%" mkdir "%PLUGIN_DIR%"
copy /y "%OUT%" "%PLUGIN_DIR%\" >nul
echo Plugin installed to: %PLUGIN_DIR%
echo.
echo Done! Restart QuickLook (or Windows Explorer) then press Space on any
echo RAW, PSD, or PSB file in Explorer to get instant preview.
pause
