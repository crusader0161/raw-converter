// RawConverterThumb — Pure .NET 4.x COM thumbnail provider for PSD + PSB
// No external dependencies — compiles with csc.exe from .NET Framework 4.x
//
// Compile:
//   csc /target:library /platform:x64
//       /reference:System.Drawing.dll
//       /out:RawConverterThumb.dll
//       PsdThumbnailHandler.cs
//
// Register (as Administrator):
//   regasm /codebase RawConverterThumb.dll
//
// Unregister:
//   regasm /unregister RawConverterThumb.dll

using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;
using Microsoft.Win32;

namespace RawConverterThumb
{
    // ── COM interfaces required by Windows Shell ──────────────────────────────

    [ComImport, Guid("b7d14566-0509-4cce-a71f-0a554233bd9b"),
     InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    public interface IInitializeWithFile
    {
        void Initialize([MarshalAs(UnmanagedType.LPWStr)] string pszFilePath, uint grfMode);
    }

    [ComImport, Guid("e357fccd-a995-4576-b01f-234630154e96"),
     InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    public interface IThumbnailProvider
    {
        void GetThumbnail(uint cx, out IntPtr phbmp, out WTS_ALPHATYPE pdwAlpha);
    }

    public enum WTS_ALPHATYPE
    {
        WTSAT_UNKNOWN = 0,
        WTSAT_RGB     = 1,
        WTSAT_ARGB    = 2,
    }

    // ── COM server ────────────────────────────────────────────────────────────

    [ComVisible(true)]
    [ClassInterface(ClassInterfaceType.None)]
    [Guid("3D5C2AB1-4E6F-4F9A-B2C3-1D4E5F6A7B8C")]   // fixed GUID for this handler
    [ProgId("RawConverterThumb.PsdThumbnailHandler")]
    public class PsdThumbnailHandler : IInitializeWithFile, IThumbnailProvider
    {
        private static readonly string ClsidStr  = "{3D5C2AB1-4E6F-4F9A-B2C3-1D4E5F6A7B8C}";
        private static readonly string ThumbGuid = "{E357FCCD-A995-4576-B01F-234630154E96}";

        private string _filePath;

        // ── IInitializeWithFile ──────────────────────────────────────────────
        public void Initialize(string pszFilePath, uint grfMode)
        {
            _filePath = pszFilePath;
        }

        // ── IThumbnailProvider ───────────────────────────────────────────────
        public void GetThumbnail(uint cx, out IntPtr phbmp, out WTS_ALPHATYPE pdwAlpha)
        {
            phbmp    = IntPtr.Zero;
            pdwAlpha = WTS_ALPHATYPE.WTSAT_UNKNOWN;

            if (string.IsNullOrEmpty(_filePath)) return;

            byte[] jpeg = ExtractPsdThumbnailJpeg(_filePath);
            if (jpeg == null || jpeg.Length < 4) return;

            try
            {
                using (var ms = new MemoryStream(jpeg))
                using (var src = new Bitmap(ms))
                {
                    int longer = Math.Max(src.Width, src.Height);
                    if (longer == 0) return;

                    double scale = (double)cx / longer;
                    int w = Math.Max(1, (int)(src.Width  * scale));
                    int h = Math.Max(1, (int)(src.Height * scale));

                    // Render into a new 32-bit ARGB bitmap
                    var result = new Bitmap(w, h, PixelFormat.Format32bppRgb);
                    result.SetResolution(96, 96);
                    using (var g = Graphics.FromImage(result))
                    {
                        g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                        g.SmoothingMode     = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                        g.DrawImage(src, 0, 0, w, h);
                    }

                    // GetHbitmap returns an HBITMAP; Explorer calls DeleteObject when done
                    phbmp    = result.GetHbitmap();
                    pdwAlpha = WTS_ALPHATYPE.WTSAT_RGB;
                    // Do NOT dispose result — GetHbitmap keeps the handle alive
                }
            }
            catch { /* return null thumbnail on any error */ }
        }

        // ── COM registration / unregistration ────────────────────────────────

        [ComRegisterFunction]
        public static void Register(Type t)
        {
            try
            {
                // Associate the handler with .psd and .psb in HKCR
                foreach (string ext in new[] { ".psd", ".psb" })
                {
                    using (var key = Registry.ClassesRoot.CreateSubKey(
                        ext + @"\ShellEx\" + ThumbGuid, true))
                        key.SetValue(null, ClsidStr);
                }

                // Mark as approved shell extension (required on some systems)
                using (var key = Registry.LocalMachine.CreateSubKey(
                    @"SOFTWARE\Microsoft\Windows\CurrentVersion\Shell Extensions\Approved", true))
                    key.SetValue(ClsidStr, "RAW Converter PSD/PSB Thumbnail Provider");
            }
            catch { /* silently ignore if registry write fails */ }
        }

        [ComUnregisterFunction]
        public static void Unregister(Type t)
        {
            try
            {
                foreach (string ext in new[] { ".psd", ".psb" })
                    Registry.ClassesRoot.DeleteSubKeyTree(
                        ext + @"\ShellEx\" + ThumbGuid, throwOnMissingSubKey: false);

                using (var key = Registry.LocalMachine.OpenSubKey(
                    @"SOFTWARE\Microsoft\Windows\CurrentVersion\Shell Extensions\Approved", true))
                    if (key != null) key.DeleteValue(ClsidStr, throwOnMissingValue: false);
            }
            catch { }
        }

        // ── PSD Image Resource parsing ────────────────────────────────────────
        // Reads resource block 0x0409 (JPEG thumbnail, all PSD/PSB versions).

        private static byte[] ExtractPsdThumbnailJpeg(string path)
        {
            try
            {
                using (var fs = File.OpenRead(path))
                using (var br = new BinaryReader(fs))
                {
                    // File header
                    if (ReadU32(br) != 0x38425053) return null;   // "8BPS"
                    ushort ver = ReadU16(br);                       // 1=PSD, 2=PSB
                    if (ver != 1 && ver != 2) return null;

                    fs.Seek(6,  SeekOrigin.Current);  // 6 reserved bytes
                    fs.Seek(2,  SeekOrigin.Current);  // channels
                    fs.Seek(4,  SeekOrigin.Current);  // height
                    fs.Seek(4,  SeekOrigin.Current);  // width
                    fs.Seek(2,  SeekOrigin.Current);  // depth
                    fs.Seek(2,  SeekOrigin.Current);  // color mode

                    // Color mode data section
                    uint colorLen = ReadU32(br);
                    fs.Seek(colorLen, SeekOrigin.Current);

                    // Image resources section
                    uint resLen = ReadU32(br);
                    long resEnd = fs.Position + resLen;

                    while (fs.Position + 12 < resEnd)
                    {
                        uint blockSig = ReadU32(br);
                        if (blockSig != 0x3842494D) break;   // "8BIM"

                        ushort resId  = ReadU16(br);

                        // Pascal string (skip + pad to even length)
                        byte nameLen = br.ReadByte();
                        int  padBytes = (nameLen % 2 == 0) ? nameLen + 1 : nameLen;
                        if (padBytes > 0) fs.Seek(padBytes, SeekOrigin.Current);

                        uint dataLen = ReadU32(br);
                        long dataEnd = fs.Position + dataLen + (dataLen % 2); // even-padded

                        if (resId == 0x0409 || resId == 0x040C)
                        {
                            // Thumbnail resource layout (Adobe spec):
                            //   format        (4)  — 1 = JPEG
                            //   width         (4)
                            //   height        (4)
                            //   widthBytes    (4)
                            //   totalSize     (4)
                            //   compressedSize(4)
                            //   bpp           (2)
                            //   planes        (2)
                            //   JPEG data     (compressedSize bytes)
                            uint fmt      = ReadU32(br);
                            ReadU32(br); // thumbW
                            ReadU32(br); // thumbH
                            ReadU32(br); // widthBytes
                            ReadU32(br); // totalSize
                            uint cSize    = ReadU32(br);
                            ReadU16(br); // bpp
                            ReadU16(br); // planes

                            if (fmt == 1 && cSize > 0)
                                return br.ReadBytes((int)cSize);
                        }

                        fs.Seek(dataEnd, SeekOrigin.Begin);
                    }
                }
            }
            catch { }
            return null;
        }

        // Big-endian readers
        private static uint   ReadU32(BinaryReader br) { var b = br.ReadBytes(4); Array.Reverse(b); return BitConverter.ToUInt32(b, 0); }
        private static ushort ReadU16(BinaryReader br) { var b = br.ReadBytes(2); Array.Reverse(b); return BitConverter.ToUInt16(b, 0); }
    }
}
