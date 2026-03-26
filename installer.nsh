; ── RAW Converter custom NSIS installer script ───────────────────────────────
; Registers the PSD/PSB thumbnail handler DLL during install,
; and unregisters it during uninstall.
;
; Included via package.json nsis.include

!macro customInstall
  ; ── Register PSD/PSB thumbnail handler ──────────────────────────────────────
  DetailPrint "Registering PSD/PSB thumbnail handler..."

  ; DLL is in resources/thumbnail-handler/ relative to the install dir
  StrCpy $0 "$INSTDIR\resources\thumbnail-handler\RawConverterThumb.dll"

  ; Check it exists (it should, we included it in extraResources)
  IfFileExists "$0" regOk regSkip

  regOk:
    ; Use the 64-bit RegAsm from .NET Framework 4.x
    ExecWait '"$WINDIR\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe" /codebase "$0"' $1
    IntCmp $1 0 regDone regWarn regWarn
    regWarn:
      MessageBox MB_OK|MB_ICONINFORMATION \
        "PSD/PSB thumbnail registration returned code $1.$\n\
         This is non-fatal — the app works fine.$\n\
         To enable Explorer thumbnails manually, run thumbnail-handler\build.bat as Administrator."
    regDone:
      ; Restart shell so thumbnails take effect immediately
      System::Call "shell32::SHChangeNotify(i 0x8000000, i 0, p 0, p 0)"
    Goto regEnd

  regSkip:
    DetailPrint "Thumbnail handler DLL not found, skipping registration."

  regEnd:
!macroend

!macro customUnInstall
  ; ── Unregister PSD/PSB thumbnail handler ────────────────────────────────────
  DetailPrint "Unregistering PSD/PSB thumbnail handler..."

  StrCpy $0 "$INSTDIR\resources\thumbnail-handler\RawConverterThumb.dll"
  IfFileExists "$0" unregOk unregSkip

  unregOk:
    ExecWait '"$WINDIR\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe" /unregister "$0"' $1
    System::Call "shell32::SHChangeNotify(i 0x8000000, i 0, p 0, p 0)"
    Goto unregEnd

  unregSkip:
    DetailPrint "Thumbnail handler DLL not found, skipping unregistration."

  unregEnd:
!macroend
