/* ── SVG Icon Library (Lucide stroke style) ─────────────────────────── */
const I = {
  camera:      `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  image:       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  filePlus:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  folderPlus:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`,
  check:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkSm:     `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  xCircle:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  x:           `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  xSm:         `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  retry:       `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  trash:       `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  sun:         `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon:        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  pause:       `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  play:        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  stop:        `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`,
  arrow:       `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  settings:    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  emptyBox:    `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  winMin:      `<svg width="10" height="10" viewBox="0 0 10 1" fill="currentColor"><rect width="10" height="1"/></svg>`,
  winMax:      `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1"><rect x=".5" y=".5" width="9" height="9"/></svg>`,
  winRestore:  `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1"><rect x="2" y="0" width="8" height="8"/><rect x="0" y="2" width="8" height="8" fill="var(--tb-bg)" stroke-width="1"/></svg>`,
  winClose:    `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>`,
  list:        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  grid:        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  eye:         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  externalLink:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  zoomIn:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  zoomOut:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  maximize2:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
  chevLeft:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevRight:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  folderWatch: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="3"/><circle cx="12" cy="13" r="1" fill="currentColor"/></svg>`,
  bell:        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  convert:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
}

/* ── State ──────────────────────────────────────────────────────────────── */
const state = {
  files:       [],
  outputMode:  'same',
  outputPath:  '',
  format:      'dng',
  quality:     90,
  converting:  false,
  paused:      false,
  cancelled:   false,
  viewMode:    'list',  // 'list' | 'grid'
  collision:   'rename',
  resizeEnabled: false,
  resizeMax:   2048,
  watchFolders: [],
  autoConvert:  false,
  notifications: true,
}

let nextId = 0
const CONCURRENCY = 2

// Thumbnail cache (LRU-ish, max 80)
const thumbCache = new Map()
const THUMB_CACHE_MAX = 80

function cacheThumb(id, dataUrl) {
  if (thumbCache.size >= THUMB_CACHE_MAX) {
    thumbCache.delete(thumbCache.keys().next().value)
  }
  thumbCache.set(id, dataUrl)
}

const SUPPORTED_EXTS = new Set([
  'cr3','cr2','crw','nef','nrw','arw','srf','sr2','raf','rw2',
  'orf','pef','srw','x3f','raw','3fr','mef','mrw','kdc','k25',
  'dcs','dcr','erf','iiq','mos','mfw','fff','rwl','rwz','ptx','r3d',
  'dng','jpg','jpeg','png','heic','heif','tiff','tif','avif','webp','bmp','psd','psb',
])

/* ── DOM refs ────────────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id)
const dropZone     = $('dropZone')
const fileList     = $('fileList')
const emptyState   = $('emptyState')
const fileBadge    = $('fileBadge')
const clearBtn     = $('clearBtn')
const clearDoneBtn = $('clearDoneBtn')
const retryBtn     = $('retryBtn')
const pauseBtn     = $('pauseBtn')
const stopBtn      = $('stopBtn')
const convertBtn   = $('convertBtn')
const pendingCount = $('pendingCount')
const statusLine   = $('statusLine')
const etaLine      = $('etaLine')
const progWrap     = $('progWrap')
const progFill     = $('progFill')
const verChip      = $('verChip')
const customRow    = $('customRow')
const outPathInput = $('outPathInput')
const overlay      = $('overlay')
const ovPathInput  = $('ovPathInput')
const themeBtn     = $('themeBtn')
const pauseLabel   = $('pauseLabel')
const ctxMenu      = $('ctxMenu')
const viewer       = $('viewer')

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function ext(name)  { return (name.split('.').pop() || '').toLowerCase() }
function base(p)    { return p.replace(/\\/g, '/').split('/').pop() }
function dir(p)     { const s = p.replace(/\\/g, '/'); const i = s.lastIndexOf('/'); return i > 0 ? s.slice(0, i) : s }
function fmtSize(b) {
  if (!b) return ''
  if (b < 1048576) return (b / 1024).toFixed(0) + ' KB'
  return (b / 1048576).toFixed(1) + ' MB'
}
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;') }
function isSupported(name) { return SUPPORTED_EXTS.has(ext(name)) }
function setStatus(msg, cls = '') {
  statusLine.textContent = msg
  statusLine.className   = 'status-line' + (cls ? ' ' + cls : '')
}
function setEta(msg) { etaLine.textContent = msg }
function setProgress(done, total) {
  if (!total) { progWrap.classList.remove('show'); return }
  progWrap.classList.add('show')
  progFill.style.width = Math.round((done / total) * 100) + '%'
}
function fmtDuration(ms) {
  if (ms < 60000) return Math.ceil(ms / 1000) + 's'
  return Math.ceil(ms / 60000) + 'm'
}

/* ── Settings persistence ────────────────────────────────────────────────── */
function saveSettings() {
  try {
    localStorage.setItem('settings', JSON.stringify({
      format:        state.format,
      quality:       state.quality,
      outputMode:    state.outputMode,
      outputPath:    state.outputPath,
      viewMode:      state.viewMode,
      collision:     state.collision,
      resizeEnabled: state.resizeEnabled,
      resizeMax:     state.resizeMax,
      watchFolders:  state.watchFolders,
      autoConvert:   state.autoConvert,
    }))
  } catch {}
}

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem('settings') || '{}')
    if (s.format)      { state.format  = s.format }
    if (s.quality)     { state.quality = s.quality }
    if (s.outputMode)  { state.outputMode = s.outputMode }
    if (s.outputPath)  { state.outputPath = s.outputPath }
    if (s.viewMode)    { state.viewMode = s.viewMode }
    if (s.collision)   { state.collision = s.collision }
    if (typeof s.resizeEnabled === 'boolean') state.resizeEnabled = s.resizeEnabled
    if (s.resizeMax)   { state.resizeMax = s.resizeMax }
    if (Array.isArray(s.watchFolders)) state.watchFolders = s.watchFolders
    if (typeof s.autoConvert === 'boolean') state.autoConvert = s.autoConvert
  } catch {}
}

/* ── Platform + Theme setup ──────────────────────────────────────────────── */
function setupPlatform() {
  const isWin = window.api.platform === 'win32'
  document.body.classList.add(isWin ? 'win' : 'mac')

  if (isWin) {
    $('btnMinW').innerHTML   = I.winMin
    $('btnMaxW').innerHTML   = I.winMax
    $('btnCloseW').innerHTML = I.winClose
    $('btnMinW').addEventListener('click',   () => window.api.minimize())
    $('btnMaxW').addEventListener('click',   () => window.api.maximize())
    $('btnCloseW').addEventListener('click', () => window.api.close())
  } else {
    $('btnClose').addEventListener('click', () => window.api.close())
    $('btnMin').addEventListener('click',   () => window.api.minimize())
    $('btnMax').addEventListener('click',   () => window.api.maximize())
  }

  window.api.onMaximizeChange?.((isMax) => {
    if (isWin) $('btnMaxW').innerHTML = isMax ? I.winRestore : I.winMax
  })
}

function setupTheme() {
  const saved = localStorage.getItem('theme') || 'dark'
  document.documentElement.setAttribute('data-theme', saved)
  updateThemeBtn()
}

function updateThemeBtn() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
  themeBtn.innerHTML = isDark ? I.sun : I.moon
  themeBtn.title     = isDark ? 'Switch to light theme' : 'Switch to dark theme'
}

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
  updateThemeBtn()
})

/* ── Inject static icons ─────────────────────────────────────────────────── */
function injectStaticIcons() {
  $('dropIcon').innerHTML        = I.camera
  $('icoFilePlus').innerHTML     = I.filePlus
  $('icoFolderPlus').innerHTML   = I.folderPlus
  $('icoRetry').innerHTML        = I.retry
  $('icoTrash').innerHTML        = I.trash
  $('icoClearDone').innerHTML    = I.check
  $('emptyIcon').innerHTML       = I.emptyBox
  $('icoPause').innerHTML        = I.pause
  $('icoStop').innerHTML         = I.stop
  $('icoArrow').innerHTML        = I.arrow
  $('ovIcon').innerHTML          = I.settings
  $('icoList').innerHTML         = I.list
  $('icoGrid').innerHTML         = I.grid
  $('icoZoomOut').innerHTML      = I.zoomOut
  $('icoZoomIn').innerHTML       = I.zoomIn
  $('icoZoomFit').innerHTML      = I.maximize2
  $('icoReveal').innerHTML       = I.externalLink
  $('icoViewerClose').innerHTML  = I.x
  $('icoPrev').innerHTML         = I.chevLeft
  $('icoNext').innerHTML         = I.chevRight
  $('icoCtxView').innerHTML      = I.eye
  $('icoCtxReveal').innerHTML    = I.externalLink
  $('icoCtxConvert').innerHTML   = I.convert
  $('icoCtxRemove').innerHTML    = I.trash
  $('icoWatchAdd').innerHTML     = I.folderWatch
  $('icoCodecBanner').innerHTML  = I.bell
  $('icoCodecClose').innerHTML   = I.x
  $('icoCheckResize').innerHTML  = I.checkSm
  $('titleIcon').innerHTML       = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`
}

/* ── Apply saved settings to DOM ─────────────────────────────────────────── */
function applySavedSettings() {
  // Format
  document.querySelectorAll('.fmt-btn').forEach(b => b.classList.remove('active'))
  const fmtBtn = document.querySelector(`.fmt-btn[data-fmt="${state.format}"]`)
  if (fmtBtn) fmtBtn.classList.add('active')
  $('qualityRow').style.display = state.format === 'jpg' ? 'flex' : 'none'
  $('qualitySlider').value      = state.quality
  $('qualityVal').textContent   = state.quality

  // Output
  if (state.outputMode === 'custom') {
    $('radioCustom').checked = true
    customRow.style.display  = 'flex'
    outPathInput.value       = state.outputPath
  }

  // Collision
  $('collisionPolicy').value = state.collision

  // Resize
  $('resizeEnabled').checked  = state.resizeEnabled
  $('resizeMax').value        = state.resizeMax
  $('resizeMax').disabled     = !state.resizeEnabled

  // View mode
  applyViewMode(state.viewMode, false)

  // Auto-convert
  $('autoConvertToggle').checked = state.autoConvert

  // Watch folders
  renderWatchList()
}

/* ── Render ──────────────────────────────────────────────────────────────── */
function render() {
  const total   = state.files.length
  const pending = state.files.filter(f => f.status === 'pending').length
  const failed  = state.files.filter(f => f.status === 'error').length
  const done    = state.files.filter(f => f.status === 'done').length

  fileBadge.textContent    = total
  fileBadge.className      = total ? 'badge lit' : 'badge'
  retryBtn.style.display   = (failed > 0 && !state.converting) ? '' : 'none'
  clearDoneBtn.style.display = (done > 0 && !state.converting) ? '' : 'none'
  clearBtn.style.display   = (total && !state.converting) ? '' : 'none'
  pendingCount.textContent = pending
  convertBtn.disabled      = state.converting || pending === 0
  convertBtn.style.display = state.converting ? 'none' : ''
  pauseBtn.style.display   = state.converting ? '' : 'none'
  stopBtn.style.display    = state.converting ? '' : 'none'
  pauseLabel.textContent   = state.paused ? 'Resume' : 'Pause'
  $('icoPause').innerHTML  = state.paused ? I.play : I.pause

  // Compact drop zone when files are loaded
  dropZone.classList.toggle('compact', total > 0)

  if (total === 0) {
    if (!fileList.contains(emptyState)) fileList.appendChild(emptyState)
    return
  }
  if (fileList.contains(emptyState)) fileList.removeChild(emptyState)

  if (state.viewMode === 'grid') renderGrid()
  else renderList()
}

/* ── List rendering ──────────────────────────────────────────────────────── */
function renderList() {
  const existing = new Set(Array.from(fileList.children).map(el => el.dataset.id))
  state.files.forEach(f => {
    if (!existing.has(String(f.id))) fileList.appendChild(makeRow(f))
    else updateRow(f)
  })
  const live = new Set(state.files.map(f => String(f.id)))
  Array.from(fileList.children).forEach(el => { if (!live.has(el.dataset.id)) el.remove() })
}

function statusHTML(f) {
  switch (f.status) {
    case 'pending':
    case 'queued':     return '<div class="dot-idle"></div>'
    case 'converting': return '<div class="spinner"></div>'
    case 'done':       return `<span class="icon-ok">${I.check}</span>`
    case 'error':      return `<span class="icon-err" title="${esc(f.error || 'Error')}">${I.xCircle}</span>`
  }
  return ''
}

function makeRow(f) {
  const el = document.createElement('div')
  el.className  = 'file-item ' + f.status
  el.dataset.id = f.id
  el.innerHTML  = `
    <div class="ext-badge">${esc(ext(f.name).toUpperCase() || '?')}</div>
    <div class="file-meta">
      <div class="file-name">${esc(f.name)}</div>
      <div class="file-dir">${esc(f.dir)}</div>
    </div>
    <div class="file-size">${fmtSize(f.size)}</div>
    <div class="file-status-wrap" id="fs-${f.id}">${statusHTML(f)}</div>
    <button class="btn-remove" title="Remove">${I.x}</button>
  `
  el.addEventListener('dblclick', () => openViewer(f.id))
  el.addEventListener('contextmenu', e => showCtxMenu(e, f.id))
  el.querySelector('.btn-remove').addEventListener('click', e => {
    e.stopPropagation()
    if (!state.converting) removeFile(f.id)
  })
  return el
}

function updateRow(f) {
  const el = fileList.querySelector(`[data-id="${f.id}"]`)
  if (!el) return
  el.className = 'file-item ' + f.status
  const sw = el.querySelector(`#fs-${f.id}`)
  if (sw) sw.innerHTML = statusHTML(f)
}

/* ── Grid rendering ──────────────────────────────────────────────────────── */
const thumbObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const el = entry.target
    const id = Number(el.dataset.id)
    if (el.dataset.thumbLoaded) return
    el.dataset.thumbLoaded = '1'
    thumbObserver.unobserve(el)
    loadGridThumb(el, id)
  })
}, { threshold: 0.1 })

function renderGrid() {
  const live = new Set(state.files.map(f => String(f.id)))
  const existing = new Set()
  Array.from(fileList.children).forEach(el => {
    if (!live.has(el.dataset.id)) { thumbObserver.unobserve(el); el.remove() }
    else existing.add(el.dataset.id)
  })
  state.files.forEach(f => {
    if (!existing.has(String(f.id))) {
      const el = makeGridItem(f)
      fileList.appendChild(el)
      thumbObserver.observe(el)
    } else {
      updateGridItem(f)
    }
  })
}

function makeGridItem(f) {
  const el = document.createElement('div')
  el.className  = 'grid-item ' + f.status
  el.dataset.id = f.id
  el.innerHTML = `
    <div class="grid-thumb" id="gt-${f.id}">
      <div class="grid-thumb-shimmer"></div>
      <div class="grid-ext">${esc(ext(f.name).toUpperCase())}</div>
      <div class="grid-status-badge" id="gsb-${f.id}"></div>
    </div>
    <div class="grid-caption">
      <div class="grid-caption-name" title="${esc(f.name)}">${esc(f.name)}</div>
      <div class="grid-caption-size">${fmtSize(f.size)}</div>
    </div>
    <button class="grid-remove" title="Remove">${I.xSm}</button>
  `
  el.addEventListener('dblclick', () => openViewer(f.id))
  el.addEventListener('contextmenu', e => showCtxMenu(e, f.id))
  el.querySelector('.grid-remove').addEventListener('click', e => {
    e.stopPropagation()
    if (!state.converting) removeFile(f.id)
  })
  return el
}

function updateGridItem(f) {
  const el = fileList.querySelector(`[data-id="${f.id}"]`)
  if (!el) return
  el.className = 'grid-item ' + f.status
  const badge = el.querySelector(`#gsb-${f.id}`)
  if (!badge) return
  if (f.status === 'done')       badge.innerHTML = I.checkSm
  else if (f.status === 'error') badge.innerHTML = I.xSm
  else if (f.status === 'converting') badge.innerHTML = `<div class="spinner" style="width:10px;height:10px;border-width:1.5px"></div>`
  else badge.innerHTML = ''
}

async function loadGridThumb(el, id) {
  const f = state.files.find(f => f.id === id)
  if (!f) return
  const thumb = $(`gt-${id}`)
  if (!thumb) return

  if (thumbCache.has(id)) {
    setThumbImg(thumb, thumbCache.get(id), ext(f.name).toUpperCase())
    return
  }
  try {
    const dataUrl = await window.api.generateThumbnail({ filePath: f.path, size: 180 })
    cacheThumb(id, dataUrl)
    setThumbImg(thumb, dataUrl, ext(f.name).toUpperCase())
  } catch {
    // Keep shimmer on failure
    thumb.querySelector('.grid-thumb-shimmer')?.remove()
    thumb.querySelector('.grid-ext')?.remove()
    thumb.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:var(--txt-3)">${I.image}</div>`
  }
}

function setThumbImg(thumbEl, dataUrl, extText) {
  thumbEl.innerHTML = `<img src="${dataUrl}" alt=""><div class="grid-ext">${esc(extText)}</div><div class="grid-status-badge" id="${thumbEl.id.replace('gt-','gsb-')}"></div>`
}

/* ── View mode toggle ────────────────────────────────────────────────────── */
function applyViewMode(mode, save = true) {
  state.viewMode = mode
  if (mode === 'grid') {
    fileList.classList.add('grid-mode')
    $('listViewBtn').classList.remove('active')
    $('gridViewBtn').classList.add('active')
  } else {
    fileList.classList.remove('grid-mode')
    $('listViewBtn').classList.add('active')
    $('gridViewBtn').classList.remove('active')
    // Remove grid items, let list rebuild
    if (fileList.querySelector('.grid-item')) {
      Array.from(fileList.querySelectorAll('.grid-item')).forEach(el => {
        thumbObserver.unobserve(el); el.remove()
      })
    }
  }
  if (save) { saveSettings(); render() }
}

$('listViewBtn').addEventListener('click', () => applyViewMode('list'))
$('gridViewBtn').addEventListener('click', () => applyViewMode('grid'))

/* ── File management ─────────────────────────────────────────────────────── */
function addFile(fpath, size = 0) {
  const name = base(fpath)
  if (!isSupported(name))                      return false
  if (state.files.some(f => f.path === fpath)) return false
  state.files.push({ id: ++nextId, path: fpath, name, dir: dir(fpath), size, status: 'pending', error: null })
  return true
}

function removeFile(id) {
  thumbCache.delete(id)
  state.files = state.files.filter(f => f.id !== id)
  const el = fileList.querySelector(`[data-id="${id}"]`)
  if (el) { thumbObserver.unobserve(el); el.remove() }
  render()
}

async function addPaths(paths) {
  const resolved = await window.api.resolvePaths(paths)
  let added = 0
  for (const { path: p, size } of resolved) { if (addFile(p, size)) added++ }
  render()
  return added
}

/* ── Drop zone ───────────────────────────────────────────────────────────── */
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('over') })
dropZone.addEventListener('dragleave', e => { if (!dropZone.contains(e.relatedTarget)) dropZone.classList.remove('over') })
dropZone.addEventListener('drop', async e => {
  e.preventDefault()
  dropZone.classList.remove('over')
  const paths = Array.from(e.dataTransfer.files).map(f => f.path).filter(Boolean)
  if (!paths.length) return
  const added = await addPaths(paths)
  if (!added) { setStatus('No supported files found', 'err'); setTimeout(() => setStatus(''), 3000) }
})
dropZone.addEventListener('click', e => {
  if (!e.target.closest('.btn')) $('addFilesBtn').click()
})

/* ── File/folder pickers ─────────────────────────────────────────────────── */
$('addFilesBtn').addEventListener('click', async e => {
  e.stopPropagation()
  const paths = await window.api.selectFiles()
  if (paths.length) await addPaths(paths)
})

$('addFolderBtn').addEventListener('click', async e => {
  e.stopPropagation()
  const files = await window.api.selectFolder()
  let added = 0
  for (const { path: p, size } of files) { if (addFile(p, size)) added++ }
  render()
  if (files.length && !added) { setStatus('No supported files found in folder', 'err'); setTimeout(() => setStatus(''), 3000) }
})

retryBtn.addEventListener('click', () => {
  state.files.filter(f => f.status === 'error').forEach(f => { f.status = 'pending'; f.error = null })
  setStatus(''); render()
})

clearBtn.addEventListener('click', () => {
  state.files = []; thumbCache.clear()
  fileList.innerHTML = ''
  setStatus(''); setEta('')
  progWrap.classList.remove('show')
  render()
})

clearDoneBtn.addEventListener('click', () => {
  const doneIds = state.files.filter(f => f.status === 'done').map(f => f.id)
  doneIds.forEach(id => {
    thumbCache.delete(id)
    const el = fileList.querySelector(`[data-id="${id}"]`)
    if (el) { thumbObserver.unobserve(el); el.remove() }
  })
  state.files = state.files.filter(f => f.status !== 'done')
  render()
})

/* ── Output settings ─────────────────────────────────────────────────────── */
$('radioSame').addEventListener('change', () => {
  state.outputMode = 'same'; customRow.style.display = 'none'; saveSettings()
})
$('radioCustom').addEventListener('change', () => {
  state.outputMode = 'custom'; customRow.style.display = 'flex'; saveSettings()
})
$('browseOutBtn').addEventListener('click', async () => {
  const f = await window.api.selectOutputFolder()
  if (f) { state.outputPath = f; outPathInput.value = f; saveSettings() }
})
outPathInput.addEventListener('click', async () => {
  const f = await window.api.selectOutputFolder()
  if (f) { state.outputPath = f; outPathInput.value = f; saveSettings() }
})

/* ── Format tabs ─────────────────────────────────────────────────────────── */
document.querySelectorAll('.fmt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fmt-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    state.format = btn.dataset.fmt
    $('qualityRow').style.display = state.format === 'jpg' ? 'flex' : 'none'
    saveSettings()
  })
})

const qualitySlider = $('qualitySlider')
const qualityVal    = $('qualityVal')
qualitySlider.addEventListener('input', () => {
  state.quality = parseInt(qualitySlider.value)
  qualityVal.textContent = state.quality
  saveSettings()
})

/* ── Options: resize + collision ─────────────────────────────────────────── */
$('resizeEnabled').addEventListener('change', e => {
  state.resizeEnabled    = e.target.checked
  $('resizeMax').disabled = !state.resizeEnabled
  saveSettings()
})
$('resizeMax').addEventListener('change', e => {
  state.resizeMax = parseInt(e.target.value) || 2048
  saveSettings()
})
$('collisionPolicy').addEventListener('change', e => {
  state.collision = e.target.value; saveSettings()
})

/* ── Pause / Stop ────────────────────────────────────────────────────────── */
pauseBtn.addEventListener('click', () => {
  state.paused = !state.paused
  render()
  if (state.paused) setStatus('Paused — click Resume to continue')
  else setStatus('')
})
stopBtn.addEventListener('click', () => {
  state.cancelled = true
  window.api.cancelConversion()
  setStatus('Stopping…')
})

/* ── Conversion ──────────────────────────────────────────────────────────── */
convertBtn.addEventListener('click', startConversion)
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') startConversion()
})

async function startConversion() {
  if (state.converting) return
  if (state.outputMode === 'custom' && !state.outputPath) {
    setStatus('Please select an output folder first', 'err'); return
  }
  const queue = state.files.filter(f => f.status === 'pending')
  if (!queue.length) return

  state.converting = true
  state.cancelled  = false
  state.paused     = false
  render()

  let done = 0, errors = 0, skipped = 0
  const total     = queue.length
  const startTime = Date.now()
  setProgress(0, total)
  setEta('')

  // Semaphore for concurrent conversion
  let active = 0
  let idx    = 0

  const processNext = async () => {
    while (idx < queue.length && active < CONCURRENCY && !state.cancelled) {
      const f = queue[idx++]
      if (state.cancelled) { f.status = 'pending'; break }
      while (state.paused && !state.cancelled) await new Promise(r => setTimeout(r, 150))
      if (state.cancelled) { f.status = 'pending'; break }

      active++
      f.status = 'converting'
      if (state.viewMode === 'list') updateRow(f)
      else updateGridItem(f)

      const outPath = state.outputMode === 'custom' ? state.outputPath : null
      const resize  = state.resizeEnabled ? { maxEdge: state.resizeMax } : null

      ;(async () => {
        try {
          if (state.format === 'dng') {
            await window.api.convertFile({ filePath: f.path, outputPath: outPath, collision: state.collision })
          } else {
            await window.api.convertFileToImage({ filePath: f.path, outputPath: outPath, format: state.format, quality: state.quality, collision: state.collision, resize })
          }
          f.status = 'done'
        } catch (err) {
          const msg = typeof err === 'string' ? err : (err?.message || 'Conversion failed')
          if (msg === 'cancelled') { f.status = 'pending'; skipped++ }
          else { f.status = 'error'; f.error = msg; errors++ }
        }
        active--
        done++
        if (state.viewMode === 'list') updateRow(f)
        else updateGridItem(f)
        render()
        setProgress(done, total)

        // ETA
        if (done < total) {
          const elapsed = Date.now() - startTime
          const rate    = done / elapsed      // files/ms
          const remaining = total - done
          if (rate > 0) setEta(`~${fmtDuration(remaining / rate)} remaining`)
        } else {
          setEta('')
        }

        setStatus(`Converting ${done} / ${total}`)
        processNext()
      })()
    }
  }

  // Start up to CONCURRENCY workers
  const workers = []
  for (let i = 0; i < Math.min(CONCURRENCY, queue.length); i++) workers.push(processNext())
  await new Promise(resolve => {
    const check = setInterval(() => {
      if (done + skipped >= total || state.cancelled) { clearInterval(check); resolve() }
    }, 100)
  })

  // Wait for all active to finish
  while (active > 0) await new Promise(r => setTimeout(r, 100))

  state.converting = false
  state.paused     = false
  render()
  setEta('')

  const ok = done - errors - skipped
  if (state.cancelled)   setStatus(`Stopped — ${ok} converted, ${total - done + skipped} remaining`)
  else if (errors === 0) setStatus(`✓ Converted ${ok} file${ok !== 1 ? 's' : ''} successfully`, 'ok')
  else if (ok === 0)     setStatus(`All ${done} conversions failed`, 'err')
  else                   setStatus(`Done: ${ok} succeeded, ${errors} failed`)

  if (!state.cancelled && state.notifications && done > 0) {
    const notifTitle = errors === 0 ? 'Conversion complete' : 'Conversion finished with errors'
    const notifBody  = errors === 0 ? `${ok} file${ok !== 1 ? 's' : ''} converted successfully`
                                    : `${ok} succeeded, ${errors} failed`
    window.api.showNotification?.({ title: notifTitle, body: notifBody })
  }
}

/* ── Context menu ────────────────────────────────────────────────────────── */
let ctxFileId = null

function showCtxMenu(e, id) {
  e.preventDefault()
  ctxFileId = id
  ctxMenu.classList.remove('hidden')
  const x = Math.min(e.clientX, window.innerWidth  - ctxMenu.offsetWidth  - 8)
  const y = Math.min(e.clientY, window.innerHeight - ctxMenu.offsetHeight - 8)
  ctxMenu.style.left = x + 'px'
  ctxMenu.style.top  = y + 'px'
}

function hideCtxMenu() { ctxMenu.classList.add('hidden'); ctxFileId = null }

document.addEventListener('click',     e => { if (!ctxMenu.contains(e.target)) hideCtxMenu() })
document.addEventListener('contextmenu', e => { if (!e.target.closest('[data-id]')) hideCtxMenu() })
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideCtxMenu() })

$('ctxView').addEventListener('click', () => { if (ctxFileId) openViewer(ctxFileId); hideCtxMenu() })
$('ctxReveal').addEventListener('click', () => {
  const f = state.files.find(f => f.id === ctxFileId)
  if (f) window.api.revealInExplorer?.(f.path)
  hideCtxMenu()
})
$('ctxConvert').addEventListener('click', async () => {
  const f = state.files.find(f => f.id === ctxFileId)
  hideCtxMenu()
  if (!f || f.status === 'converting') return
  if (state.outputMode === 'custom' && !state.outputPath) {
    setStatus('Please select an output folder first', 'err'); return
  }
  if (state.converting) return
  // Temporarily set all other pending files to 'queued' so only this one converts
  const otherPending = state.files.filter(fi => fi.status === 'pending' && fi.id !== f.id)
  otherPending.forEach(fi => { fi._held = true; fi.status = 'queued' })
  f.status = 'pending'
  render()
  await startConversion()
  otherPending.forEach(fi => { if (fi._held) { fi._held = false; fi.status = 'pending' } })
  render()
})
$('ctxRemove').addEventListener('click', () => {
  if (ctxFileId && !state.converting) removeFile(ctxFileId)
  hideCtxMenu()
})

/* ── Keyboard shortcuts (file list) ─────────────────────────────────────── */
// Track which file the mouse is hovering over for Space preview
let hoveredFileId = null

fileList.addEventListener('mouseover', e => {
  const row = e.target.closest('[data-id]')
  hoveredFileId = row ? Number(row.dataset.id) : null
})
fileList.addEventListener('mouseleave', () => { hoveredFileId = null })

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
  // Viewer shortcuts are handled separately
  if (!viewer.classList.contains('hidden')) return

  if (e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault()
    // Open viewer for hovered or first file
    const id = hoveredFileId ?? (state.files[0]?.id ?? null)
    if (id !== null) openViewer(id)
    return
  }

  if (e.key === 'Delete' || e.key === 'Backspace') {
    const focused = document.activeElement?.closest('[data-id]')
    if (focused) removeFile(Number(focused.dataset.id))
  }
})

/* ── Viewer (Lightbox) ───────────────────────────────────────────────────── */
let viewerIdx  = 0
let viewerZoom = 1
let viewerDragStart = null
let viewerTranslate = { x: 0, y: 0 }
let viewerPanOrigin = null

function openViewer(id) {
  const idx = state.files.findIndex(f => f.id === id)
  if (idx === -1) return
  viewerIdx = idx
  viewer.classList.remove('hidden')
  loadViewerImage(idx)
}

function closeViewer() {
  viewer.classList.add('hidden')
  viewerZoom = 1
  viewerTranslate = { x: 0, y: 0 }
  $('viewerImg').style.transform = ''
  $('viewerImg').src = ''
}

function loadViewerImage(idx) {
  const f = state.files[idx]
  if (!f) return
  const img    = $('viewerImg')
  const loading= $('viewerLoading')

  img.src    = ''
  loading.classList.remove('hidden')
  viewerZoom = 1
  viewerTranslate = { x: 0, y: 0 }
  img.style.transform = ''
  $('viewerZoomLabel').textContent = '100%'
  $('viewerName').textContent = f.name
  $('viewerDims').textContent = ''
  $('viewerMetaText').textContent = fmtSize(f.size)
  $('viewerCounter').textContent  = `${idx + 1} / ${state.files.length}`

  window.api.generatePreview({ filePath: f.path, maxEdge: 1920 }).then(dataUrl => {
    img.src = dataUrl
    img.onload = () => {
      loading.classList.add('hidden')
      $('viewerDims').textContent = `${img.naturalWidth} × ${img.naturalHeight}`
    }
  }).catch(() => {
    loading.classList.add('hidden')
    $('viewerDims').textContent = 'Preview unavailable'
  })

  $('viewerPrev').style.opacity = idx === 0 ? '.3' : ''
  $('viewerNext').style.opacity = idx === state.files.length - 1 ? '.3' : ''
}

function viewerNavigate(delta) {
  const next = viewerIdx + delta
  if (next < 0 || next >= state.files.length) return
  viewerIdx = next
  loadViewerImage(viewerIdx)
}

function viewerSetZoom(z) {
  viewerZoom = Math.max(0.25, Math.min(8, z))
  $('viewerImg').style.transform = `translate(${viewerTranslate.x}px, ${viewerTranslate.y}px) scale(${viewerZoom})`
  $('viewerZoomLabel').textContent = Math.round(viewerZoom * 100) + '%'
}

$('viewerClose').addEventListener('click', closeViewer)
$('viewerPrev').addEventListener('click', () => viewerNavigate(-1))
$('viewerNext').addEventListener('click', () => viewerNavigate(1))
$('viewerZoomIn').addEventListener('click', () => viewerSetZoom(viewerZoom * 1.4))
$('viewerZoomOut').addEventListener('click', () => viewerSetZoom(viewerZoom / 1.4))
$('viewerZoomFit').addEventListener('click', () => { viewerZoom = 1; viewerTranslate = { x: 0, y: 0 }; viewerSetZoom(1) })
$('viewerRevealBtn').addEventListener('click', () => {
  const f = state.files[viewerIdx]
  if (f) window.api.revealInExplorer?.(f.path)
})

// Drag to pan
const viewerImg = $('viewerImg')
viewerImg.addEventListener('mousedown', e => {
  if (viewerZoom <= 1) return
  e.preventDefault()
  viewerPanOrigin = { x: e.clientX - viewerTranslate.x, y: e.clientY - viewerTranslate.y }
  viewerImg.classList.add('dragging')
})
document.addEventListener('mousemove', e => {
  if (!viewerPanOrigin) return
  viewerTranslate = { x: e.clientX - viewerPanOrigin.x, y: e.clientY - viewerPanOrigin.y }
  viewerImg.style.transform = `translate(${viewerTranslate.x}px, ${viewerTranslate.y}px) scale(${viewerZoom})`
})
document.addEventListener('mouseup', () => {
  viewerPanOrigin = null
  viewerImg.classList.remove('dragging')
})

// Scroll to zoom
$('viewerStage').addEventListener('wheel', e => {
  e.preventDefault()
  const delta = e.deltaY < 0 ? 1.15 : 0.87
  viewerSetZoom(viewerZoom * delta)
}, { passive: false })

// Keyboard in viewer
document.addEventListener('keydown', e => {
  if (viewer.classList.contains('hidden')) return
  if (e.key === 'Escape')      closeViewer()
  if (e.key === 'ArrowLeft')   viewerNavigate(-1)
  if (e.key === 'ArrowRight')  viewerNavigate(1)
  if (e.key === '+' || e.key === '=') viewerSetZoom(viewerZoom * 1.3)
  if (e.key === '-')           viewerSetZoom(viewerZoom / 1.3)
  if (e.key === '0' || e.key === 'f') { viewerZoom = 1; viewerTranslate = { x: 0, y: 0 }; viewerSetZoom(1) }
})

/* ── Watch folders ───────────────────────────────────────────────────────── */
function renderWatchList() {
  const list  = $('watchList')
  const empty = $('watchEmpty')
  if (!state.watchFolders.length) {
    empty.style.display = ''
    Array.from(list.querySelectorAll('.watch-chip')).forEach(el => el.remove())
    return
  }
  empty.style.display = 'none'
  // Remove chips for folders no longer watched
  Array.from(list.querySelectorAll('.watch-chip')).forEach(el => {
    if (!state.watchFolders.includes(el.dataset.folder)) el.remove()
  })
  // Add new chips
  const existing = new Set(Array.from(list.querySelectorAll('.watch-chip')).map(el => el.dataset.folder))
  state.watchFolders.forEach(fp => {
    if (existing.has(fp)) return
    const chip = document.createElement('div')
    chip.className = 'watch-chip'
    chip.dataset.folder = fp
    const name = fp.replace(/\\/g, '/').split('/').pop() || fp
    chip.innerHTML = `<span class="watch-chip-path" title="${esc(fp)}">${esc(name)}</span><button class="watch-chip-remove" title="Stop watching">${I.xSm}</button>`
    chip.querySelector('.watch-chip-remove').addEventListener('click', async () => {
      await window.api.unwatchFolder?.(fp)
      state.watchFolders = state.watchFolders.filter(f => f !== fp)
      saveSettings()
      renderWatchList()
    })
    list.insertBefore(chip, empty)
  })
}

$('addWatchFolderBtn').addEventListener('click', async () => {
  const fp = await window.api.selectWatchFolder?.()
  if (!fp || state.watchFolders.includes(fp)) return
  const res = await window.api.watchFolder?.(fp)
  if (res?.ok === false) { setStatus('Could not watch folder: ' + (res.error || ''), 'err'); return }
  state.watchFolders.push(fp)
  saveSettings()
  renderWatchList()
})

$('autoConvertToggle').addEventListener('change', e => {
  state.autoConvert = e.target.checked; saveSettings()
})

// Handle watcher events from main process
window.api.onWatcherFile?.(async ({ path: fp, size, folder }) => {
  const added = addFile(fp, size)
  if (added) {
    render()
    if (state.autoConvert && !state.converting) {
      // Small delay to let any burst of files settle
      clearTimeout(window._autoConvertTimer)
      window._autoConvertTimer = setTimeout(startConversion, 800)
    }
  }
})

/* ── Explorer integration (Windows thumbnail handler) ────────────────────── */
async function setupIntegrationSection() {
  if (window.api.platform !== 'win32') return
  const section = $('integrationSection')
  section.classList.remove('hidden')

  // Inject icons
  $('icoThumbReg').innerHTML = I.externalLink

  $('quicklookLink').addEventListener('click', () => {
    window.open('ms-windows-store://pdp/?productid=9NVL5NL4NLLM')
  })

  // Check registration status via registry key existence
  await refreshThumbStatus()

  $('thumbRegisterBtn').addEventListener('click', async () => {
    const btn = $('thumbRegisterBtn')
    btn.disabled = true
    btn.textContent = 'Waiting for UAC…'
    try {
      const res = await window.api.registerThumbnailHandler?.()
      if (res?.ok) {
        localStorage.setItem('thumbHandlerRegistered', '1')
        setStatus('Explorer thumbnails enabled for PSD/PSB ✓', 'ok')
        await refreshThumbStatus()
      } else {
        setStatus('Registration failed: ' + (res?.error || 'Unknown error'), 'err')
      }
    } catch (e) {
      setStatus('Registration error: ' + e.message, 'err')
    }
    btn.disabled = false
    btn.innerHTML = `<span id="icoThumbReg">${I.externalLink}</span> Enable Thumbnails`
  })
}

async function refreshThumbStatus() {
  // Check if our CLSID is registered under .psd
  try {
    const res = await window.api.checkRawCodec?.()
    // We reuse checkRawCodec to also detect our own handler via registry
    // For a simple proxy: just check if the DLL exists and assume registered if so
  } catch {}
  // Show status based on last known state in localStorage
  const registered = localStorage.getItem('thumbHandlerRegistered') === '1'
  const status = $('thumbStatus')
  const btn    = $('thumbRegisterBtn')
  if (status) {
    status.textContent = registered ? '✓ Enabled' : 'Not enabled'
    status.className   = 'thumb-status ' + (registered ? 'enabled' : 'disabled')
  }
  if (btn && registered) {
    btn.innerHTML = `<span>${I.check}</span> Enabled`
    btn.title     = 'Click to re-register if thumbnails stopped working'
  }
}

// After successful registration persist state
const _origRegister = window.api?.registerThumbnailHandler
if (_origRegister) {
  // Wrap to persist state — handled in the click handler above
}

/* ── Codec banner ────────────────────────────────────────────────────────── */
async function checkCodecBanner() {
  if (window.api.platform !== 'win32') return
  if (localStorage.getItem('codecBannerDismissed')) return
  try {
    const res = await window.api.checkRawCodec?.()
    if (res && !res.available) {
      $('codecBanner').classList.remove('hidden')
    }
  } catch {}
}

$('codecGetBtn').addEventListener('click', () => {
  // Open MS Store link via shell (works in packaged Electron)
  const url = 'ms-windows-store://pdp/?productid=9NCTDW2W1BH8'
  window.open(url)
})
$('codecBannerClose').addEventListener('click', () => {
  $('codecBanner').classList.add('hidden')
  localStorage.setItem('codecBannerDismissed', '1')
})

/* ── Setup overlay ───────────────────────────────────────────────────────── */
$('ovBrowseBtn').addEventListener('click', async () => {
  const p = await window.api.selectDnglabBin()
  if (p) ovPathInput.value = p
})

$('ovSaveBtn').addEventListener('click', async () => {
  const p = ovPathInput.value.trim()
  if (!p) { ovPathInput.style.borderColor = 'var(--err)'; return }
  const result = await window.api.setDnglabPath(p)
  if (result.available) {
    overlay.classList.add('hidden')
    verChip.textContent = result.version || 'dnglab'
    ovPathInput.style.borderColor = ''
  } else {
    ovPathInput.style.borderColor = 'var(--err)'
  }
})

$('ghLink').addEventListener('click', () => {
  window.open('https://github.com/dnglab/dnglab/releases')
})

/* ── Auto-updater ────────────────────────────────────────────────────────── */
function handleUpdateStatus(data) {
  const chip = $('updateChip')
  const text = $('updateChipText')
  if (!chip) return
  switch (data.type) {
    case 'available':
      chip.classList.remove('hidden', 'ready')
      text.textContent = `v${data.version} available`
      chip.title = `Version ${data.version} is downloading…`
      break
    case 'downloading':
      chip.classList.remove('hidden', 'ready')
      text.textContent = `↓ ${data.percent}%`
      break
    case 'downloaded':
      chip.classList.remove('hidden')
      chip.classList.add('ready')
      text.textContent = 'Restart to update'
      chip.title = `v${data.version} ready — click to restart & install`
      break
  }
}

$('updateChip').addEventListener('click', () => {
  if ($('updateChip').classList.contains('ready')) window.api.installUpdate?.()
})

/* ── File open from OS ───────────────────────────────────────────────────── */
window.api.onOpenFiles?.(async files => {
  await addPaths(files)
})

/* ── Init ────────────────────────────────────────────────────────────────── */
async function init() {
  loadSettings()
  setupPlatform()
  setupTheme()
  injectStaticIcons()
  applySavedSettings()

  window.api.onUpdateStatus?.(handleUpdateStatus)

  const info = await window.api.checkDnglab()
  if (info.available) verChip.textContent = info.version || 'dnglab'
  else overlay.classList.remove('hidden')

  // Restore watch folders from saved state
  for (const fp of state.watchFolders) {
    window.api.watchFolder?.(fp).catch(() => {})
  }

  checkCodecBanner()
  setupIntegrationSection()
  render()
}

init()
