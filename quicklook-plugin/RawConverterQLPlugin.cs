// RawConverter QuickLook Plugin
// Provides Space-bar instant preview in Windows Explorer for:
//   PSD, PSB, and all Camera RAW formats (CR3, CR2, NEF, ARW, RAF, RW2, ...)
//
// How it works:
//   - QuickLook discovers this DLL via MEF [Export(typeof(IViewer))]
//   - On Space, QuickLook calls CanHandle → Prepare → View
//   - We extract the embedded JPEG from the file and display it in a WPF Image

using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using QuickLook.Common.Plugin;

namespace RawConverterQLPlugin
{
    [Export(typeof(IViewer))]
    public class RawViewer : IViewer
    {
        // Lower number = higher priority (0 = checked first)
        public int Priority => 0;

        // File extensions we handle
        private static readonly HashSet<string> Exts = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            // Camera RAW
            ".cr3",".cr2",".crw",".nef",".nrw",".arw",".srf",".sr2",
            ".raf",".rw2",".orf",".pef",".srw",".x3f",".raw",".3fr",
            ".mef",".mrw",".kdc",".k25",".dcs",".dcr",".erf",".iiq",
            ".mos",".mfw",".fff",".rwl",".rwz",".ptx",".r3d",
            // Photoshop
            ".psd",".psb",
            // DNG
            ".dng",
        };

        private string   _tempFile;
        private Image    _wpfImage;

        public void Init() { }

        public bool CanHandle(string path)
        {
            return Exts.Contains(Path.GetExtension(path) ?? string.Empty);
        }

        public void Prepare(string path, ContextObject context)
        {
            // Try to get image dimensions from the embedded preview
            byte[] jpeg = ExtractJpeg(path);
            if (jpeg != null)
            {
                try
                {
                    using (var ms = new MemoryStream(jpeg))
                    {
                        var decoder = BitmapDecoder.Create(ms,
                            BitmapCreateOptions.DelayCreation, BitmapCacheOption.None);
                        var frame = decoder.Frames[0];
                        context.PreferredSize = new Size(frame.PixelWidth, frame.PixelHeight);
                    }
                }
                catch { context.PreferredSize = new Size(1280, 853); }
            }
            else
            {
                context.PreferredSize = new Size(1280, 853);
            }
            context.Title = Path.GetFileName(path);
        }

        public void View(string path, ContextObject context)
        {
            byte[] jpeg = ExtractJpeg(path);
            if (jpeg == null)
            {
                context.ViewerContent = MakeError("No embedded preview found in this file.");
                return;
            }

            // Write to temp file so BitmapImage can load it without keeping MemoryStream alive
            _tempFile = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".jpg");
            File.WriteAllBytes(_tempFile, jpeg);

            _wpfImage = new Image
            {
                Source  = new BitmapImage(new Uri(_tempFile, UriKind.Absolute)),
                Stretch = Stretch.Uniform,
                StretchDirection = StretchDirection.Both,
            };
            RenderOptions.SetBitmapScalingMode(_wpfImage, BitmapScalingMode.HighQuality);

            var grid = new Grid { Background = new SolidColorBrush(Color.FromRgb(0x0c, 0x0c, 0x14)) };
            grid.Children.Add(_wpfImage);

            context.ViewerContent = grid;
        }

        public void Cleanup()
        {
            _wpfImage = null;
            if (_tempFile != null && File.Exists(_tempFile))
            {
                try { File.Delete(_tempFile); } catch { }
                _tempFile = null;
            }
        }

        // ── JPEG extraction ───────────────────────────────────────────────────

        private static byte[] ExtractJpeg(string path)
        {
            string ext = (Path.GetExtension(path) ?? "").ToLower();

            if (ext == ".psd" || ext == ".psb")
                return ExtractPsdThumbnailJpeg(path);

            // For all other formats: scan raw bytes for largest embedded JPEG blob
            return ExtractLargestJpegFromBinary(path);
        }

        // Scan any binary file for embedded JPEG (works for all RAW/DNG formats)
        private static byte[] ExtractLargestJpegFromBinary(string path)
        {
            try
            {
                byte[] data = File.ReadAllBytes(path);
                var blobs = new System.Collections.Generic.List<(int start, int end)>();

                for (int i = 0; i < data.Length - 3; i++)
                {
                    if (data[i] != 0xFF || data[i + 1] != 0xD8 || data[i + 2] != 0xFF)
                        continue;

                    // Found SOI — search forward for EOI
                    int j = data.Length - 2;
                    // Search backward from next SOI (or EOF) for EOI
                    int limit = data.Length;
                    for (int k = i + 1; k < data.Length - 3; k++)
                    {
                        if (data[k] == 0xFF && data[k + 1] == 0xD8 && data[k + 2] == 0xFF)
                        { limit = k; break; }
                    }
                    for (j = Math.Min(limit, data.Length) - 2; j > i + 1000; j--)
                    {
                        if (data[j] == 0xFF && data[j + 1] == 0xD9)
                        { blobs.Add((i, j + 2)); break; }
                    }
                }

                if (blobs.Count == 0) return null;
                var best = blobs[0];
                foreach (var b in blobs)
                    if ((b.end - b.start) > (best.end - best.start)) best = b;

                if ((best.end - best.start) < 2000) return null;

                var result = new byte[best.end - best.start];
                Array.Copy(data, best.start, result, 0, result.Length);
                return result;
            }
            catch { return null; }
        }

        // PSD-specific: parse Image Resource Block 0x0409
        private static byte[] ExtractPsdThumbnailJpeg(string path)
        {
            try
            {
                using (var fs = File.OpenRead(path))
                using (var br = new BinaryReader(fs))
                {
                    if (ReadU32(br) != 0x38425053) return null; // "8BPS"
                    ushort ver = ReadU16(br);
                    if (ver != 1 && ver != 2) return null;

                    fs.Seek(6 + 2 + 4 + 4 + 2 + 2, SeekOrigin.Current);
                    fs.Seek(ReadU32(br), SeekOrigin.Current); // skip color mode data

                    uint resLen = ReadU32(br);
                    long resEnd = fs.Position + resLen;

                    while (fs.Position + 12 < resEnd)
                    {
                        if (ReadU32(br) != 0x3842494D) break; // "8BIM"
                        ushort id = ReadU16(br);

                        byte nameLen = br.ReadByte();
                        int pad = (nameLen % 2 == 0) ? nameLen + 1 : nameLen;
                        if (pad > 0) fs.Seek(pad, SeekOrigin.Current);

                        uint dataLen = ReadU32(br);
                        long dataEnd = fs.Position + dataLen + (dataLen % 2);

                        if (id == 0x0409 || id == 0x040C)
                        {
                            uint fmt   = ReadU32(br);
                            ReadU32(br); ReadU32(br); ReadU32(br); ReadU32(br);
                            uint cSize = ReadU32(br);
                            ReadU16(br); ReadU16(br);
                            if (fmt == 1 && cSize > 0) return br.ReadBytes((int)cSize);
                        }

                        fs.Seek(dataEnd, SeekOrigin.Begin);
                    }
                }
            }
            catch { }
            return null;
        }

        private static FrameworkElement MakeError(string msg)
        {
            var tb = new TextBlock
            {
                Text               = msg,
                Foreground         = new SolidColorBrush(Color.FromRgb(0x94, 0x94, 0xb0)),
                HorizontalAlignment= HorizontalAlignment.Center,
                VerticalAlignment  = VerticalAlignment.Center,
                FontSize           = 14,
                TextWrapping       = TextWrapping.Wrap,
            };
            var g = new Grid { Background = new SolidColorBrush(Color.FromRgb(0x0c, 0x0c, 0x14)) };
            g.Children.Add(tb);
            return g;
        }

        private static uint   ReadU32(BinaryReader br) { var b = br.ReadBytes(4); Array.Reverse(b); return BitConverter.ToUInt32(b, 0); }
        private static ushort ReadU16(BinaryReader br) { var b = br.ReadBytes(2); Array.Reverse(b); return BitConverter.ToUInt16(b, 0); }
    }
}
