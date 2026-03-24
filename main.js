const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const path = require('path')
const { execFile } = require('child_process')
const fs = require('fs')

let autoUpdater = null
try { autoUpdater = require('electron-updater').autoUpdater } catch {}

let mainWindow
let dnglabBinaryPath = null

// ── Config persistence ─────────────────────────────────────────────────────
const configPath = path.join(app.getPath('userData'), 'config.json')

function loadConfig() {
  try {
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, 'utf8')
      return JSON.parse(raw)
    }
  } catch {}
  return {}
}

function saveConfig(data) {
  try { fs.writeFileSync(configPath, JSON.stringify(data, null, 2)) } catch {}
}

// ── dnglab binary resolution ───────────────────────────────────────────────
function resolveDnglabPath() {
  const config = loadConfig()
  const candidates = [
    config.dnglabPath,
    path.join(__dirname, 'bin', 'dnglab.exe'),
    path.join(process.resourcesPath || '', 'bin', 'dnglab.exe'),
    'dnglab.exe',
    'dnglab',
  ].filter(Boolean)

  for (const p of candidates) {
    try {
      if (p === 'dnglab.exe' || p === 'dnglab') {
        // Check PATH – will verify by actually running it
        return p
      }
      if (fs.existsSync(p)) return p
    } catch {}
  }
  return config.dnglabPath || path.join(__dirname, 'bin', 'dnglab.exe')
}

function probeDnglab(binPath) {
  return new Promise((resolve) => {
    execFile(binPath, ['--version'], { timeout: 6000, windowsHide: true }, (err, stdout) => {
      if (err) resolve({ available: false })
      else resolve({ available: true, version: stdout.trim().split('\n')[0] })
    })
  })
}

// ── Window ─────────────────────────────────────────────────────────────────
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    minWidth: 700,
    minHeight: 560,
    frame: false,
    backgroundColor: '#0c0c14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false,
  })

  mainWindow.loadFile('index.html')
  mainWindow.once('ready-to-show', () => mainWindow.show())
}

app.whenReady().then(() => {
  createWindow()
  setupAutoUpdater()
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })

// ── Auto-updater ────────────────────────────────────────────────────────────
function setupAutoUpdater() {
  if (!app.isPackaged || !autoUpdater) return
  autoUpdater.autoDownload        = true
  autoUpdater.autoInstallOnAppQuit = true
  const send = (data) => mainWindow?.webContents.send('update-status', data)
  autoUpdater.on('checking-for-update', ()    => send({ type: 'checking' }))
  autoUpdater.on('update-available',    info  => send({ type: 'available',   version: info.version }))
  autoUpdater.on('download-progress',   prog  => send({ type: 'downloading', percent: Math.round(prog.percent) }))
  autoUpdater.on('update-downloaded',   info  => send({ type: 'downloaded',  version: info.version }))
  autoUpdater.on('error', err => console.error('updater:', err.message))
  setTimeout(() => autoUpdater.checkForUpdates().catch(() => {}), 4000)
}

ipcMain.handle('install-update', () => {
  autoUpdater?.quitAndInstall(false, true)
})

// ── Window controls ────────────────────────────────────────────────────────
ipcMain.on('win-minimize', () => mainWindow.minimize())
ipcMain.on('win-maximize', () => mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize())
ipcMain.on('win-close', () => mainWindow.close())

// ── dnglab check & config ──────────────────────────────────────────────────
ipcMain.handle('check-dnglab', async () => {
  dnglabBinaryPath = resolveDnglabPath()
  const probe = await probeDnglab(dnglabBinaryPath)
  return { ...probe, path: dnglabBinaryPath }
})

ipcMain.handle('set-dnglab-path', async (_, binPath) => {
  const probe = await probeDnglab(binPath)
  if (probe.available) {
    dnglabBinaryPath = binPath
    const cfg = loadConfig()
    saveConfig({ ...cfg, dnglabPath: binPath })
  }
  return { ...probe, path: binPath }
})

ipcMain.handle('select-dnglab-binary', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select dnglab.exe',
    filters: [{ name: 'Executables', extensions: ['exe'] }, { name: 'All Files', extensions: ['*'] }],
    properties: ['openFile'],
  })
  return result.canceled ? null : result.filePaths[0]
})

// ── File dialogs ───────────────────────────────────────────────────────────
const CAMERA_RAW_EXTS = new Set([
  'cr3','cr2','crw','nef','nrw','arw','srf','sr2','raf','rw2',
  'orf','pef','srw','x3f','raw','3fr','mef','mrw','kdc','k25',
  'dcs','dcr','erf','iiq','mos','mfw','fff','rwl','rwz','ptx','r3d',
])
const STANDARD_IMAGE_EXTS = new Set([
  'dng','jpg','jpeg','png','heic','heif','tiff','tif','avif','webp','bmp','psd','psb',
])
const ALL_EXTS = [...CAMERA_RAW_EXTS, ...STANDARD_IMAGE_EXTS]

function isCameraRaw(ext) { return CAMERA_RAW_EXTS.has(ext.toLowerCase()) }
function isStandard(ext)   { return STANDARD_IMAGE_EXTS.has(ext.toLowerCase()) }
function isSupported(ext)  { return isCameraRaw(ext) || isStandard(ext) }

ipcMain.handle('select-files', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select images',
    filters: [
      { name: 'Camera RAW + Images', extensions: ALL_EXTS },
      { name: 'All Files', extensions: ['*'] },
    ],
    properties: ['openFile', 'multiSelections'],
  })
  return result.canceled ? [] : result.filePaths
})

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select folder with RAW files',
    properties: ['openDirectory'],
  })
  if (result.canceled) return []
  return scanFolder(result.filePaths[0])
})

ipcMain.handle('select-output-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select output folder',
    properties: ['openDirectory', 'createDirectory'],
  })
  return result.canceled ? null : result.filePaths[0]
})

// Resolve drag-and-drop paths – expand folders to RAW files inside them
ipcMain.handle('resolve-paths', async (_, paths) => {
  const files = []
  for (const p of paths) {
    try {
      const stat = fs.statSync(p)
      if (stat.isDirectory()) {
        files.push(...scanFolder(p))
      } else {
        files.push({ path: p, size: stat.size })
      }
    } catch {}
  }
  return files
})

function scanFolder(dir) {
  const results = []
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        results.push(...scanFolder(full))
      } else {
        const ext = e.name.split('.').pop().toLowerCase()
        if (isSupported(ext)) {
          try { results.push({ path: full, size: fs.statSync(full).size }) } catch {}
        }
      }
    }
  } catch {}
  return results
}

// Get file size for paths already known
ipcMain.handle('get-file-sizes', async (_, paths) => {
  const result = {}
  for (const p of paths) {
    try { result[p] = fs.statSync(p).size } catch { result[p] = 0 }
  }
  return result
})

// ── Conversion ─────────────────────────────────────────────────────────────
let activeProcess = null

// Extract the largest embedded JPEG from any RAW file (all modern cameras embed one)
function extractJpegFromRaw(filePath) {
  const buf = fs.readFileSync(filePath)
  const SOI = Buffer.from([0xFF, 0xD8, 0xFF])

  // Collect all SOI start positions
  const starts = []
  let p = 0
  while ((p = buf.indexOf(SOI, p)) !== -1) { starts.push(p); p++ }
  if (!starts.length) return null

  const blobs = []
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i]
    const limit = i + 1 < starts.length ? starts[i + 1] : buf.length
    // Search backward from the next SOI (or EOF) for the EOI marker
    let end = -1
    for (let j = Math.min(limit, buf.length) - 2; j > start + 2; j--) {
      if (buf[j] === 0xFF && buf[j + 1] === 0xD9) { end = j + 2; break }
    }
    if (end > start + 1000) blobs.push({ start, end, size: end - start })
  }

  if (!blobs.length) return null
  const best = blobs.reduce((a, b) => a.size > b.size ? a : b)
  return buf.slice(best.start, best.end)
}

ipcMain.handle('convert-file', async (_, { filePath, outputPath }) => {
  const inputExt = path.extname(filePath).slice(1).toLowerCase()
  if (!isCameraRaw(inputExt)) {
    throw new Error(`DNG output requires a camera RAW file — "${inputExt.toUpperCase()}" is not supported. Switch to JPEG or PNG format.`)
  }
  const bin = dnglabBinaryPath || resolveDnglabPath()
  const outDir = outputPath || path.dirname(filePath)
  try { fs.mkdirSync(outDir, { recursive: true }) } catch {}

  return new Promise((resolve, reject) => {
    const args = ['convert', '-f', '-v', filePath, outDir]
    activeProcess = execFile(bin, args, { timeout: 300_000, windowsHide: true }, (err, stdout, stderr) => {
      activeProcess = null
      if (err) reject(err.killed ? 'cancelled' : (stderr || err.message))
      else resolve(stdout)
    })
  })
})

ipcMain.handle('convert-file-to-image', async (_, { filePath, outputPath, format, quality }) => {
  const sharp = require('sharp')
  const inputExt = path.extname(filePath).slice(1).toLowerCase()
  const outDir   = outputPath || path.dirname(filePath)
  try { fs.mkdirSync(outDir, { recursive: true }) } catch {}

  const name    = path.basename(filePath, path.extname(filePath))
  const outExt  = format === 'png' ? 'png' : 'jpg'
  const outFile = path.join(outDir, `${name}.${outExt}`)
  const encode  = img => format === 'png'
    ? img.png().toFile(outFile)
    : img.jpeg({ quality: quality || 90 }).toFile(outFile)

  if (isCameraRaw(inputExt) || inputExt === 'dng') {
    const jpegBuf = extractJpegFromRaw(filePath)
    if (jpegBuf) {
      await encode(sharp(jpegBuf))
    } else if (inputExt === 'dng') {
      await encode(sharp(filePath))      // DNG fallback via libvips/TIFF
    } else {
      throw new Error('No embedded preview found in this RAW file')
    }
  } else {
    await encode(sharp(filePath))        // PNG, HEIF, TIFF, AVIF, WebP, BMP, JPG…
  }
  return outFile
})

ipcMain.on('cancel-conversion', () => {
  if (activeProcess) { activeProcess.kill(); activeProcess = null }
})
