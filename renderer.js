/* ── SVG Icon Library (Lucide stroke style) ─────────────────────────── */
const I = {
  camera: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  image:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  filePlus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  folderPlus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  xCircle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  x: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  retry: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  trash: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  pause: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  play: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  stop: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`,
  arrow: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  settings: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  emptyBox: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  // Windows frame controls
  winMin:   `<svg width="10" height="10" viewBox="0 0 10 1" fill="currentColor"><rect width="10" height="1"/></svg>`,
  winMax:   `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1"><rect x=".5" y=".5" width="9" height="9"/></svg>`,
  winClose: `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>`,
}

/* ── State ──────────────────────────────────────────────── */
const state = {
  files:      [],
  outputMode: 'same',
  outputPath: '',
  format:     'dng',
  quality:    90,
  converting: false,
  paused:     false,
  cancelled:  false,
}

let nextId = 0

const SUPPORTED_EXTS = new Set([
  // Camera RAW
  'cr3','cr2','crw','nef','nrw','arw','srf','sr2','raf','rw2',
  'orf','pef','srw','x3f','raw','3fr','mef','mrw','kdc','k25',
  'dcs','dcr','erf','iiq','mos','mfw','fff','rwl','rwz','ptx','r3d',
  // Standard images
  'dng','jpg','jpeg','png','heic','heif','tiff','tif','avif','webp','bmp','psd','psb',
])

/* ── DOM ─────────────────────────────────────────────────── */
const $ = id => document.getElementById(id)
const dropZone    = $('dropZone')
const fileList    = $('fileList')
const emptyState  = $('emptyState')
const fileBadge   = $('fileBadge')
const clearBtn    = $('clearBtn')
const retryBtn    = $('retryBtn')
const pauseBtn    = $('pauseBtn')
const stopBtn     = $('stopBtn')
const convertBtn  = $('convertBtn')
const pendingCount= $('pendingCount')
const statusLine  = $('statusLine')
const progWrap    = $('progWrap')
const progFill    = $('progFill')
const verChip     = $('verChip')
const customRow   = $('customRow')
const outPathInput= $('outPathInput')
const overlay     = $('overlay')
const ovPathInput = $('ovPathInput')
const themeBtn    = $('themeBtn')
const pauseLabel  = $('pauseLabel')

/* ── Helpers ─────────────────────────────────────────────── */
function ext(name)  { return (name.split('.').pop() || '').toLowerCase() }
function base(p)    { return p.replace(/\\/g, '/').split('/').pop() }
function dir(p)     { const s = p.replace(/\\/g, '/'); const i = s.lastIndexOf('/'); return i > 0 ? s.slice(0, i) : s }
function fmtSize(b) {
  if (!b) return ''
  if (b < 1048576) return (b / 1024).toFixed(0) + ' KB'
  return (b / 1048576).toFixed(1) + ' MB'
}
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')
}
function isSupported(name) { return SUPPORTED_EXTS.has(ext(name)) }
function setStatus(msg, cls = '') {
  statusLine.textContent = msg
  statusLine.className   = 'status-line' + (cls ? ' ' + cls : '')
}
function setProgress(done, total) {
  if (!total) { progWrap.classList.remove('show'); return }
  progWrap.classList.add('show')
  progFill.style.width = Math.round((done / total) * 100) + '%'
}

/* ── Platform + Theme setup ──────────────────────────────── */
function setupPlatform() {
  const isWin = window.api.platform === 'win32'
  document.body.classList.add(isWin ? 'win' : 'mac')

  if (isWin) {
    // Inject Windows-style control icons
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

/* ── Inject static icons ─────────────────────────────────── */
function injectStaticIcons() {
  $('dropIcon').innerHTML        = I.camera
  $('icoFilePlus').innerHTML     = I.filePlus
  $('icoFolderPlus').innerHTML   = I.folderPlus
  $('icoRetry').innerHTML        = I.retry
  $('icoTrash').innerHTML        = I.trash
  $('emptyIcon').innerHTML       = I.emptyBox
  $('icoPause').innerHTML        = I.pause
  $('icoStop').innerHTML         = I.stop
  $('icoArrow').innerHTML        = I.arrow
  $('ovIcon').innerHTML          = I.settings
  $('titleIcon').innerHTML       = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`
}

/* ── Render ──────────────────────────────────────────────── */
function render() {
  const total   = state.files.length
  const pending = state.files.filter(f => f.status === 'pending').length
  const failed  = state.files.filter(f => f.status === 'error').length

  fileBadge.textContent    = total
  fileBadge.className      = total ? 'badge lit' : 'badge'
  retryBtn.style.display   = (failed > 0 && !state.converting) ? '' : 'none'
  clearBtn.style.display   = (total && !state.converting) ? '' : 'none'
  pendingCount.textContent = pending
  convertBtn.disabled      = state.converting || pending === 0
  convertBtn.style.display = state.converting ? 'none' : ''
  pauseBtn.style.display   = state.converting ? '' : 'none'
  stopBtn.style.display    = state.converting ? '' : 'none'
  pauseLabel.textContent   = state.paused ? 'Resume' : 'Pause'
  $('icoPause').innerHTML  = state.paused ? I.play : I.pause

  if (total === 0) {
    if (!fileList.contains(emptyState)) fileList.appendChild(emptyState)
    return
  }
  if (fileList.contains(emptyState)) fileList.removeChild(emptyState)

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
    case 'pending':    return '<div class="dot-idle"></div>'
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

/* ── File management ─────────────────────────────────────── */
function addFile(fpath, size = 0) {
  const name = base(fpath)
  if (!isSupported(name))                         return false
  if (state.files.some(f => f.path === fpath))    return false
  state.files.push({ id: ++nextId, path: fpath, name, dir: dir(fpath), size, status: 'pending', error: null })
  return true
}

function removeFile(id) {
  state.files = state.files.filter(f => f.id !== id)
  fileList.querySelector(`[data-id="${id}"]`)?.remove()
  render()
}

async function addPaths(paths) {
  const resolved = await window.api.resolvePaths(paths)
  let added = 0
  for (const { path: p, size } of resolved) { if (addFile(p, size)) added++ }
  render()
  return added
}

/* ── Drop zone ───────────────────────────────────────────── */
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

/* ── File/folder pickers ─────────────────────────────────── */
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
  setStatus('')
  render()
})

clearBtn.addEventListener('click', () => {
  state.files = []
  fileList.innerHTML = ''
  setStatus('')
  progWrap.classList.remove('show')
  render()
})

/* ── Output settings ─────────────────────────────────────── */
$('radioSame').addEventListener('change',   () => { state.outputMode = 'same';   customRow.style.display = 'none' })
$('radioCustom').addEventListener('change', () => { state.outputMode = 'custom'; customRow.style.display = 'flex' })

$('browseOutBtn').addEventListener('click', async () => {
  const f = await window.api.selectOutputFolder()
  if (f) { state.outputPath = f; outPathInput.value = f }
})
outPathInput.addEventListener('click', async () => {
  const f = await window.api.selectOutputFolder()
  if (f) { state.outputPath = f; outPathInput.value = f }
})

/* ── Format tabs ─────────────────────────────────────────── */
document.querySelectorAll('.fmt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fmt-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    state.format = btn.dataset.fmt
    $('qualityRow').style.display = state.format === 'jpg' ? 'flex' : 'none'
  })
})

const qualitySlider = $('qualitySlider')
const qualityVal    = $('qualityVal')
qualitySlider.addEventListener('input', () => {
  state.quality = parseInt(qualitySlider.value)
  qualityVal.textContent = state.quality
})

/* ── Pause / Stop ────────────────────────────────────────── */
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

/* ── Conversion ──────────────────────────────────────────── */
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
  const total = queue.length
  setProgress(0, total)

  for (const f of queue) {
    if (state.cancelled) { f.status = 'pending'; skipped++; continue }

    while (state.paused && !state.cancelled) await new Promise(r => setTimeout(r, 150))
    if (state.cancelled) { f.status = 'pending'; skipped++; continue }

    f.status = 'converting'
    updateRow(f)
    setStatus(`Converting ${done + 1} / ${total} — ${f.name}`)

    const outPath = state.outputMode === 'custom' ? state.outputPath : null

    try {
      if (state.format === 'dng') {
        await window.api.convertFile({ filePath: f.path, outputPath: outPath })
      } else {
        await window.api.convertFileToImage({ filePath: f.path, outputPath: outPath, format: state.format, quality: state.quality })
      }
      f.status = 'done'
    } catch (err) {
      const msg = typeof err === 'string' ? err : (err?.message || 'Conversion failed')
      if (msg === 'cancelled') { f.status = 'pending'; skipped++ }
      else { f.status = 'error'; f.error = msg; errors++ }
    }

    updateRow(f)
    done++
    setProgress(done, total)
  }

  state.converting = false
  state.paused     = false
  render()

  const ok = done - errors - skipped
  if (state.cancelled)   setStatus(`Stopped — ${ok} converted, ${total - done + skipped} remaining`)
  else if (errors === 0) setStatus(`✓ Converted ${ok} file${ok !== 1 ? 's' : ''} successfully`, 'ok')
  else if (ok === 0)     setStatus(`All ${done} conversions failed`, 'err')
  else                   setStatus(`Done: ${ok} succeeded, ${errors} failed`)
}

/* ── Setup overlay ───────────────────────────────────────── */
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

/* ── Auto-updater ────────────────────────────────────────── */
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

/* ── Init ────────────────────────────────────────────────── */
async function init() {
  setupPlatform()
  setupTheme()
  injectStaticIcons()

  window.api.onUpdateStatus?.(handleUpdateStatus)

  const info = await window.api.checkDnglab()
  if (info.available) verChip.textContent = info.version || 'dnglab'
  else overlay.classList.remove('hidden')

  render()
}

init()
