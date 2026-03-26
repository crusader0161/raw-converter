; ── RAW Converter custom NSIS installer script ───────────────────────────────
; Registers the PSD/PSB thumbnail handler DLL during install.
; Installs the QuickLook plugin if QuickLook is present.
; Unregisters both on uninstall.

!macro customInstall
  ; ── 1. Register PSD/PSB Explorer thumbnail handler ──────────────────────────
  DetailPrint "Registering PSD/PSB thumbnail handler..."
  StrCpy $0 "$INSTDIR\resources\thumbnail-handler\RawConverterThumb.dll"

  IfFileExists "$0" thumb_reg_ok thumb_reg_skip
  thumb_reg_ok:
    ExecWait '"$WINDIR\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe" /codebase "$0"' $1
    ; Notify shell to refresh thumbnails
    System::Call "shell32::SHChangeNotify(i 0x8000000, i 0, p 0, p 0)"
    Goto thumb_reg_end
  thumb_reg_skip:
    DetailPrint "Thumbnail handler DLL not found, skipping."
  thumb_reg_end:

  ; ── 2. Install QuickLook plugin if QuickLook is present ─────────────────────
  DetailPrint "Checking for QuickLook..."
  StrCpy $R0 ""

  ; Search common QuickLook install locations
  IfFileExists "$LOCALAPPDATA\Programs\QuickLook\QuickLook.Common.dll" 0 +2
    StrCpy $R0 "$LOCALAPPDATA\Programs\QuickLook"
  StrCmp $R0 "" 0 ql_found
  IfFileExists "$PROGRAMFILES\QuickLook\QuickLook.Common.dll" 0 +2
    StrCpy $R0 "$PROGRAMFILES\QuickLook"
  StrCmp $R0 "" 0 ql_found
  IfFileExists "$PROGRAMFILES64\QuickLook\QuickLook.Common.dll" 0 +2
    StrCpy $R0 "$PROGRAMFILES64\QuickLook"
  StrCmp $R0 "" ql_not_found ql_found

  ql_found:
    DetailPrint "QuickLook found at $R0 — installing Space-preview plugin..."
    StrCpy $R1 "$APPDATA\QuickLook\Plugins\RawConverter"
    CreateDirectory "$R1"
    StrCpy $R2 "$INSTDIR\resources\quicklook-plugin\RawConverterQLPlugin.dll"
    IfFileExists "$R2" 0 ql_no_plugin
      CopyFiles /SILENT "$R2" "$R1\RawConverterQLPlugin.dll"
      DetailPrint "QuickLook plugin installed. Press Space on RAW/PSD files in Explorer!"
      Goto ql_done
    ql_no_plugin:
      DetailPrint "QuickLook plugin DLL not found in resources, skipping."
    Goto ql_done

  ql_not_found:
    DetailPrint "QuickLook not found — Space-preview plugin not installed."
    DetailPrint "Install QuickLook from the Microsoft Store for Space-bar previews."

  ql_done:
!macroend

!macro customUnInstall
  ; ── Unregister thumbnail handler ────────────────────────────────────────────
  DetailPrint "Unregistering PSD/PSB thumbnail handler..."
  StrCpy $0 "$INSTDIR\resources\thumbnail-handler\RawConverterThumb.dll"
  IfFileExists "$0" thumb_unreg_ok thumb_unreg_skip
  thumb_unreg_ok:
    ExecWait '"$WINDIR\Microsoft.NET\Framework64\v4.0.30319\RegAsm.exe" /unregister "$0"' $1
    System::Call "shell32::SHChangeNotify(i 0x8000000, i 0, p 0, p 0)"
    Goto thumb_unreg_end
  thumb_unreg_skip:
    DetailPrint "Thumbnail DLL not found, skipping unregistration."
  thumb_unreg_end:

  ; ── Remove QuickLook plugin ──────────────────────────────────────────────────
  StrCpy $R1 "$APPDATA\QuickLook\Plugins\RawConverter"
  IfFileExists "$R1\RawConverterQLPlugin.dll" 0 +3
    Delete "$R1\RawConverterQLPlugin.dll"
    RMDir  "$R1"
!macroend
