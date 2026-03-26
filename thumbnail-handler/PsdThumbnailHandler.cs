using System;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using SharpShell.Attributes;
using SharpShell.SharpThumbnailHandler;

namespace RawConverterThumb
{
    /// <summary>
    /// Windows Explorer thumbnail provider for PSD and PSB files.
    /// Extracts the embedded JPEG thumbnail from PSD Image Resource Block 0x0409.
    ///
    /// Registration (run as Administrator):
    ///   regasm /codebase RawConverterThumb.dll
    ///
    /// Unregistration:
    ///   regasm /unregister RawConverterThumb.dll
    /// </summary>
    [ComVisible(true)]
    [COMServerAssociation(AssociationType.ClassOfExtension, ".psd")]
    [COMServerAssociation(AssociationType.ClassOfExtension, ".psb")]
    [Guid("A1B2C3D4-E5F6-7890-ABCD-EF1234567890")]   // replace with a real unique GUID via guidgen.exe
    public class PsdThumbnailHandler : SharpThumbnailHandler
    {
        // ── PSD/PSB file structure constants ─────────────────────────────────
        private const ushort RESOURCE_BLOCK_JPEG_THUMB = 0x0409;   // Adobe spec: JPEG thumbnail (all versions)
        private const ushort RESOURCE_BLOCK_JPEG_THUMB_ALT = 0x040C; // Older Photoshop JPEG thumb (obsolete)
        private const int    PSD_SIGNATURE = 0x38425053;            // "8BPS"

        protected override Bitmap GetThumbnailImage(uint width)
        {
            try
            {
                byte[] jpegData = ExtractPsdThumbnailJpeg(SelectedItemStream);
                if (jpegData == null || jpegData.Length < 4)
                    return null;

                using (var ms = new MemoryStream(jpegData))
                {
                    var bmp = new Bitmap(ms);
                    // Resize to requested thumbnail width while preserving aspect ratio
                    double scale = (double)width / Math.Max(bmp.Width, bmp.Height);
                    int w = Math.Max(1, (int)(bmp.Width  * scale));
                    int h = Math.Max(1, (int)(bmp.Height * scale));
                    return new Bitmap(bmp, new Size(w, h));
                }
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Parses PSD Image Resource blocks and returns the JPEG bytes from
        /// resource block 0x0409 (or legacy 0x040C).
        /// </summary>
        private static byte[] ExtractPsdThumbnailJpeg(Stream stream)
        {
            if (stream == null) return null;
            stream.Seek(0, SeekOrigin.Begin);

            using (var br = new BinaryReader(stream, System.Text.Encoding.ASCII, leaveOpen: true))
            {
                // ── File header ─────────────────────────────────────────────
                uint sig = ReadUInt32BE(br);
                if (sig != PSD_SIGNATURE) return null;   // not a PSD/PSB

                ushort version = ReadUInt16BE(br);       // 1 = PSD, 2 = PSB
                if (version != 1 && version != 2) return null;

                br.BaseStream.Seek(6, SeekOrigin.Current); // 6 reserved bytes

                ushort channels = ReadUInt16BE(br);
                uint   height   = ReadUInt32BE(br);
                uint   width2   = ReadUInt32BE(br);
                ushort depth    = ReadUInt16BE(br);
                ushort mode     = ReadUInt16BE(br);

                // ── Color mode data ──────────────────────────────────────────
                uint colorModeLen = ReadUInt32BE(br);
                br.BaseStream.Seek(colorModeLen, SeekOrigin.Current);

                // ── Image resources ──────────────────────────────────────────
                uint resourcesLen = ReadUInt32BE(br);
                long resourcesEnd = br.BaseStream.Position + resourcesLen;

                while (br.BaseStream.Position + 10 < resourcesEnd)
                {
                    // Each resource: "8BIM" (4) + ID (2) + pascal string (var) + data length (4) + data
                    uint blockSig = ReadUInt32BE(br);
                    if (blockSig != 0x3842494D)          // "8BIM"
                        break;

                    ushort resourceId = ReadUInt16BE(br);

                    // Pascal string (padded to even length)
                    byte nameLen = br.ReadByte();
                    int  padded  = (nameLen % 2 == 0) ? nameLen + 1 : nameLen; // +1 for length byte itself
                    if (padded > 0) br.BaseStream.Seek(padded, SeekOrigin.Current);

                    uint dataLen    = ReadUInt32BE(br);
                    long dataStart  = br.BaseStream.Position;
                    long dataEnd    = dataStart + dataLen + (dataLen % 2);     // padded to even

                    if (resourceId == RESOURCE_BLOCK_JPEG_THUMB ||
                        resourceId == RESOURCE_BLOCK_JPEG_THUMB_ALT)
                    {
                        // Thumbnail resource layout:
                        //   format (4) + width (4) + height (4) + widthBytes (4) +
                        //   totalSize (4) + compressedSize (4) + bpp (2) + planes (2) +
                        //   JPEG data (compressedSize bytes)
                        uint format         = ReadUInt32BE(br);  // 1 = JPEG
                        uint thumbW         = ReadUInt32BE(br);
                        uint thumbH         = ReadUInt32BE(br);
                        uint widthBytes     = ReadUInt32BE(br);
                        uint totalSize      = ReadUInt32BE(br);
                        uint compressedSize = ReadUInt32BE(br);
                        ushort bpp          = ReadUInt16BE(br);
                        ushort planes       = ReadUInt16BE(br);

                        if (format == 1 && compressedSize > 0)
                        {
                            byte[] jpeg = br.ReadBytes((int)compressedSize);
                            return jpeg;
                        }
                    }

                    // Skip to end of this resource (even-padded)
                    br.BaseStream.Seek(dataEnd, SeekOrigin.Begin);
                }
            }
            return null;
        }

        // ── Big-endian read helpers ───────────────────────────────────────────
        private static uint ReadUInt32BE(BinaryReader br)
        {
            byte[] b = br.ReadBytes(4);
            if (BitConverter.IsLittleEndian) Array.Reverse(b);
            return BitConverter.ToUInt32(b, 0);
        }

        private static ushort ReadUInt16BE(BinaryReader br)
        {
            byte[] b = br.ReadBytes(2);
            if (BitConverter.IsLittleEndian) Array.Reverse(b);
            return BitConverter.ToUInt16(b, 0);
        }
    }
}
