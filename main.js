const { app, BrowserWindow, ipcMain, dialog, shell, Notification } = require('electron')
const path = require('path')
const { execFile } = require('child_process')
const fs = require('fs')

let autoUpdater = null
try { autoUpdater = require('electron-updater').autoUpdater } catch {}

// ── Single-instance lock ────────────────────────────────────────────────────
const gotLock = app.requestSingleInstanceLock()
if (!gotLock) { app.quit(); process.exit(0) }

let mainWindow
let dnglabBinaryPath = null
let pendingOpenFiles  = []   // files queued before window is ready

// ── Config persistence ──────────────────────────────────────────────────────
const configPath = path.join(app.getPath('userData'), 'config.json')

function loadConfig() {
  try {
    if (fs.existsSync(configPath)) return JSON.parse(fs.readFileSync(configPath, 'utf8'))
  } catch {}
  return {}
}

function saveConfig(data) {
  try { fs.writeFileSync(configPath, JSON.stringify(data, null, 2)) } catch {}
}

// ── dnglab binary resolution ────────────────────────────────────────────────
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
      if (p === 'dnglab.exe' || p === 'dnglab') return p
      if (fs.existsSync(p)) return p
    } catch {}
  }
  return config.dnglabPath || path.join(__dirname, 'bin', 'dnglab.exe')
}

function probeDnglab(binPath) {
  return new Promise(resolve => {
    execFile(binPath, ['--version'], { timeout: 6000, windowsHide: true }, (err, stdout) => {
      if (err) resolve({ available: false })
      else resolve({ available: true, version: stdout.trim().split('\n')[0] })
    })
  })
}

// ── Window ──────────────────────────────────────────────────────────────────
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 980,
    height: 720,
    minWidth: 720,
    minHeight: 580,
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

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (pendingOpenFiles.length) {
      mainWindow.webContents.send('open-files', pendingOpenFiles)
      pendingOpenFiles = []
    }
  })

  mainWindow.on('maximize',   () => mainWindow.webContents.send('maximize-change', true))
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('maximize-change', false))
}

app.on('second-instance', (_, argv) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
  // argv may contain file paths (electron passes them after the exe path)
  const files = argv.slice(process.defaultApp ? 2 : 1).filter(a => !a.startsWith('-') && fs.existsSync(a))
  if (files.length) {
    if (mainWindow?.webContents) mainWindow.webContents.send('open-files', files)
    else pendingOpenFiles.push(...files)
  }
})

// macOS open-file event
app.on('open-file', (event, filePath) => {
  event.preventDefault()
  if (mainWindow?.webContents) mainWindow.webContents.send('open-files', [filePath])
  else pendingOpenFiles.push(filePath)
})

app.whenReady().then(() => {
  // Handle file open from CLI args
  const args = process.argv.slice(process.defaultApp ? 2 : 1)
  pendingOpenFiles = args.filter(a => !a.startsWith('-') && fs.existsSync(a))
  createWindow()
  setupAutoUpdater()
})

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })

// ── Auto-updater ─────────────────────────────────────────────────────────────
function setupAutoUpdater() {
  if (!app.isPackaged || !autoUpdater) return
  autoUpdater.autoDownload        = true
  autoUpdater.autoInstallOnAppQuit = true
  const send = d => mainWindow?.webContents.send('update-status', d)
  autoUpdater.on('checking-for-update', ()   => send({ type: 'checking' }))
  autoUpdater.on('update-available',    info => send({ type: 'available',   version: info.version }))
  autoUpdater.on('download-progress',   prog => send({ type: 'downloading', percent: Math.round(prog.percent) }))
  autoUpdater.on('update-downloaded',   info => send({ type: 'downloaded',  version: info.version }))
  autoUpdater.on('error', err => console.error('updater:', err.message))
  setTimeout(() => autoUpdater.checkForUpdates().catch(() => {}), 4000)
}

ipcMain.handle('install-update', () => { autoUpdater?.quitAndInstall(false, true) })

// ── Window controls ──────────────────────────────────────────────────────────
ipcMain.on('win-minimize', () => mainWindow.minimize())
ipcMain.on('win-maximize', () => mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize())
ipcMain.on('win-close',    () => mainWindow.close())

// ── dnglab check & config ────────────────────────────────────────────────────
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

// ── File extensions ──────────────────────────────────────────────────────────
const CAMERA_RAW_EXTS = new Set([
  'cr3','cr2','crw','nef','nrw','arw','srf','sr2','raf','rw2',
  'orf','pef','srw','x3f','raw','3fr','mef','mrw','kdc','k25',
  'dcs','dcr','erf','iiq','mos','mfw','fff','rwl','rwz','ptx','r3d',
])
const STANDARD_IMAGE_EXTS = new Set([
  'dng','jpg','jpeg','png','heic','heif','tiff','tif','avif','webp','bmp','psd','psb',
])
const ALL_EXTS = [...CAMERA_RAW_EXTS, ...STANDARD_IMAGE_EXTS]

function isCameraRaw(e) { return CAMERA_RAW_EXTS.has(e.toLowerCase()) }
function isStandard(e)   { return STANDARD_IMAGE_EXTS.has(e.toLowerCase()) }
function isSupported(e)  { return isCameraRaw(e) || isStandard(e) }

// ── File dialogs ─────────────────────────────────────────────────────────────
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

ipcMain.handle('select-watch-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select folder to watch',
    properties: ['openDirectory'],
  })
  return result.canceled ? null : result.filePaths[0]
})

ipcMain.handle('resolve-paths', async (_, paths) => {
  const files = []
  for (const p of paths) {
    try {
      const stat = fs.statSync(p)
      if (stat.isDirectory()) files.push(...scanFolder(p))
      else files.push({ path: p, size: stat.size })
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

ipcMain.handle('get-file-sizes', async (_, paths) => {
  const result = {}
  for (const p of paths) {
    try { result[p] = fs.statSync(p).size } catch { result[p] = 0 }
  }
  return result
})

// ── Embedded JPEG extraction ──────────────────────────────────────────────────
function extractJpegFromRaw(filePath) {
  const buf = fs.readFileSync(filePath)
  const SOI = Buffer.from([0xFF, 0xD8, 0xFF])
  const starts = []
  let p = 0
  while ((p = buf.indexOf(SOI, p)) !== -1) { starts.push(p); p++ }
  if (!starts.length) return null
  const blobs = []
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i]
    const limit = i + 1 < starts.length ? starts[i + 1] : buf.length
    let end = -1
    for (let j = Math.min(limit, buf.length) - 2; j > start + 2; j--) {
      if (buf[j] === 0xFF && buf[j + 1] === 0xD9) { end = j + 2; break }
    }
    if (end > start + 1000) blobs.push({ start, end, size: end - start })
  }
  if (!blobs.length) return null
  return buf.slice(blobs.reduce((a, b) => a.size > b.size ? a : b).start,
                   blobs.reduce((a, b) => a.size > b.size ? a : b).end)
}

// ── Thumbnail generation ──────────────────────────────────────────────────────
ipcMain.handle('generate-thumbnail', async (_, { filePath, size = 180 }) => {
  const sharp = require('sharp')
  const inputExt = path.extname(filePath).slice(1).toLowerCase()
  let sharpInst
  if (isCameraRaw(inputExt) || inputExt === 'dng') {
    const jpegBuf = extractJpegFromRaw(filePath)
    if (jpegBuf) sharpInst = sharp(jpegBuf)
    else if (inputExt === 'dng') sharpInst = sharp(filePath)
    else throw new Error('No embedded preview found')
  } else {
    sharpInst = sharp(filePath)
  }
  const buf = await sharpInst
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 60 })
    .toBuffer()
  return 'data:image/jpeg;base64,' + buf.toString('base64')
})

// ── Preview generation (larger, for viewer) ───────────────────────────────────
ipcMain.handle('generate-preview', async (_, { filePath, maxEdge = 1920 }) => {
  const sharp = require('sharp')
  const inputExt = path.extname(filePath).slice(1).toLowerCase()
  let sharpInst
  if (isCameraRaw(inputExt) || inputExt === 'dng') {
    const jpegBuf = extractJpegFromRaw(filePath)
    if (jpegBuf) sharpInst = sharp(jpegBuf)
    else if (inputExt === 'dng') sharpInst = sharp(filePath)
    else throw new Error('No embedded preview found')
  } else {
    sharpInst = sharp(filePath)
  }
  const buf = await sharpInst
    .resize(maxEdge, maxEdge, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88 })
    .toBuffer()
  return 'data:image/jpeg;base64,' + buf.toString('base64')
})

// ── Image metadata ────────────────────────────────────────────────────────────
ipcMain.handle('get-image-metadata', async (_, filePath) => {
  const sharp = require('sharp')
  const inputExt = path.extname(filePath).slice(1).toLowerCase()
  try {
    let meta
    if (isCameraRaw(inputExt)) {
      const jpegBuf = extractJpegFromRaw(filePath)
      meta = jpegBuf ? await sharp(jpegBuf).metadata() : null
    } else {
      meta = await sharp(filePath).metadata()
    }
    if (!meta) return null
    const result = { width: meta.width, height: meta.height, format: meta.format,
                     space: meta.space, channels: meta.channels, depth: meta.depth }
    if (meta.exif) {
      try {
        const exifReader = require('exif-reader')
        const exif = exifReader(meta.exif)
        if (exif.Photo) {
          result.iso          = exif.Photo.ISOSpeedRatings
          result.exposure     = exif.Photo.ExposureTime
          result.fNumber      = exif.Photo.FNumber
          result.focalLength  = exif.Photo.FocalLength
          result.dateTaken    = exif.Photo.DateTimeOriginal
        }
        if (exif.Image) {
          result.make  = exif.Image.Make
          result.model = exif.Image.Model
        }
      } catch {}
    }
    return result
  } catch { return null }
})

// ── Shell reveal ──────────────────────────────────────────────────────────────
ipcMain.handle('reveal-in-explorer', async (_, filePath) => {
  shell.showItemInFolder(filePath)
})

// ── Desktop notification ──────────────────────────────────────────────────────
ipcMain.handle('show-notification', async (_, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({ title, body, silent: false }).show()
  }
})

// ── Folder watcher ────────────────────────────────────────────────────────────
const watchers = new Map()

ipcMain.handle('watch-folder', async (_, folderPath) => {
  if (watchers.has(folderPath)) return { ok: true }
  try {
    const watcher = fs.watch(folderPath, { recursive: false }, (eventType, filename) => {
      if (!filename || eventType !== 'rename') return
      const full = path.join(folderPath, filename)
      try {
        const stat = fs.statSync(full)
        if (!stat.isFile()) return
        const ext = filename.split('.').pop().toLowerCase()
        if (!isSupported(ext)) return
        mainWindow?.webContents.send('watcher-file', { path: full, size: stat.size, folder: folderPath })
      } catch {}
    })
    watcher.on('error', () => { watchers.delete(folderPath) })
    watchers.set(folderPath, watcher)
    return { ok: true }
  } catch (e) { return { ok: false, error: e.message } }
})

ipcMain.handle('unwatch-folder', async (_, folderPath) => {
  const w = watchers.get(folderPath)
  if (w) { w.close(); watchers.delete(folderPath) }
})

ipcMain.handle('unwatch-all', async () => {
  for (const [, w] of watchers) w.close()
  watchers.clear()
})

// ── Check RAW codec (Windows Raw Image Extension) ────────────────────────────
ipcMain.handle('check-raw-codec', async () => {
  if (process.platform !== 'win32') return { available: true, platform: process.platform }
  // Check registry for Raw Image Extension
  return new Promise(resolve => {
    execFile('reg', ['query', 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AppModel\\PackageRepository\\Packages',
                     '/f', 'Microsoft.RawImageExtension', '/k', '/s'], { windowsHide: true }, (err, stdout) => {
      resolve({ available: !err && stdout.includes('Microsoft.RawImageExtension'), platform: 'win32' })
    })
  })
})

// ── Collision policy helper ───────────────────────────────────────────────────
function resolveOutFile(outFile, policy) {
  if (!fs.existsSync(outFile)) return outFile
  if (policy === 'overwrite') return outFile
  if (policy === 'skip') return null
  // rename: find next available (1), (2), ...
  const dir  = path.dirname(outFile)
  const base = path.basename(outFile, path.extname(outFile))
  const ext  = path.extname(outFile)
  let n = 1, candidate
  do { candidate = path.join(dir, `${base} (${n})${ext}`); n++ }
  while (fs.existsSync(candidate))
  return candidate
}

// ── Conversion ────────────────────────────────────────────────────────────────
let activeProcess = null

ipcMain.handle('convert-file', async (_, { filePath, outputPath, collision = 'rename' }) => {
  const inputExt = path.extname(filePath).slice(1).toLowerCase()
  if (!isCameraRaw(inputExt)) {
    throw new Error(`DNG output requires a camera RAW file — "${inputExt.toUpperCase()}" is not supported. Switch to JPEG or PNG.`)
  }
  const bin    = dnglabBinaryPath || resolveDnglabPath()
  const outDir = outputPath || path.dirname(filePath)
  try { fs.mkdirSync(outDir, { recursive: true }) } catch {}

  // Check collision
  const outFile = resolveOutFile(path.join(outDir, path.basename(filePath, path.extname(filePath)) + '.dng'), collision)
  if (!outFile) return 'skipped'

  return new Promise((resolve, reject) => {
    const args = ['convert', '-f', '-v', filePath, outDir]
    activeProcess = execFile(bin, args, { timeout: 300_000, windowsHide: true }, (err, stdout, stderr) => {
      activeProcess = null
      if (err) reject(err.killed ? 'cancelled' : (stderr || err.message))
      else resolve(stdout)
    })
  })
})

ipcMain.handle('convert-file-to-image', async (_, { filePath, outputPath, format, quality, collision = 'rename', resize = null }) => {
  const sharp    = require('sharp')
  const inputExt = path.extname(filePath).slice(1).toLowerCase()
  const outDir   = outputPath || path.dirname(filePath)
  try { fs.mkdirSync(outDir, { recursive: true }) } catch {}

  const name    = path.basename(filePath, path.extname(filePath))
  const outExt  = format === 'png' ? 'png' : 'jpg'
  const rawOut  = path.join(outDir, `${name}.${outExt}`)
  const outFile = resolveOutFile(rawOut, collision)
  if (!outFile) return 'skipped'

  let sharpInst
  if (isCameraRaw(inputExt) || inputExt === 'dng') {
    const jpegBuf = extractJpegFromRaw(filePath)
    if (jpegBuf)              sharpInst = sharp(jpegBuf)
    else if (inputExt === 'dng') sharpInst = sharp(filePath)
    else throw new Error('No embedded preview found in this RAW file')
  } else {
    sharpInst = sharp(filePath)
  }

  // Apply resize if requested
  if (resize && resize.maxEdge > 0) {
    sharpInst = sharpInst.resize(resize.maxEdge, resize.maxEdge, { fit: 'inside', withoutEnlargement: true })
  }

  if (format === 'png') await sharpInst.png().toFile(outFile)
  else                  await sharpInst.jpeg({ quality: quality || 90 }).toFile(outFile)

  return outFile
})

ipcMain.on('cancel-conversion', () => {
  if (activeProcess) { activeProcess.kill(); activeProcess = null }
})

// ── Register / unregister PSD thumbnail handler from inside the app ─────────
ipcMain.handle('register-thumbnail-handler', async (_, unregister = false) => {
  if (process.platform !== 'win32') return { ok: false, error: 'Windows only' }

  // Locate the DLL (works in dev and packaged)
  const dllPath = app.isPackaged
    ? path.join(process.resourcesPath, 'thumbnail-handler', 'RawConverterThumb.dll')
    : path.join(__dirname, 'thumbnail-handler', 'RawConverterThumb.dll')

  if (!fs.existsSync(dllPath)) return { ok: false, error: 'DLL not found at ' + dllPath }

  const regasm = 'C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\RegAsm.exe'
  if (!fs.existsSync(regasm)) return { ok: false, error: 'RegAsm.exe not found' }

  const flag = unregister ? '/unregister' : '/codebase'

  // Launch via PowerShell Start-Process -Verb RunAs to get UAC elevation
  const psCmd = `Start-Process -FilePath '${regasm}' -ArgumentList '${flag}','${dllPath}' -Verb RunAs -Wait`

  return new Promise(resolve => {
    execFile('powershell.exe', ['-NoProfile', '-Command', psCmd],
      { windowsHide: true, timeout: 30_000 },
      (err) => {
        if (err) resolve({ ok: false, error: err.message })
        else {
          // Notify shell to refresh thumbnail cache
          execFile('ie4uinit.exe', ['-show'], { windowsHide: true }, () => {})
          resolve({ ok: true })
        }
      })
  })
})
