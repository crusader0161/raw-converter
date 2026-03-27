const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  platform: process.platform,

  // Window
  minimize: () => ipcRenderer.send('win-minimize'),
  maximize: () => ipcRenderer.send('win-maximize'),
  close:    () => ipcRenderer.send('win-close'),
  onMaximizeChange: (cb) => ipcRenderer.on('maximize-change', (_, v) => cb(v)),

  // dnglab
  checkDnglab:      ()  => ipcRenderer.invoke('check-dnglab'),
  setDnglabPath:    (p) => ipcRenderer.invoke('set-dnglab-path', p),
  selectDnglabBin:  ()  => ipcRenderer.invoke('select-dnglab-binary'),

  // File pickers
  selectFiles:        ()  => ipcRenderer.invoke('select-files'),
  selectFolder:       ()  => ipcRenderer.invoke('select-folder'),
  selectOutputFolder: ()  => ipcRenderer.invoke('select-output-folder'),
  selectWatchFolder:  ()  => ipcRenderer.invoke('select-watch-folder'),

  // Path helpers
  resolvePaths: (arr) => ipcRenderer.invoke('resolve-paths', arr),
  getFileSizes: (arr) => ipcRenderer.invoke('get-file-sizes', arr),

  // Conversion
  convertFile:        (opt) => ipcRenderer.invoke('convert-file', opt),
  convertFileToImage: (opt) => ipcRenderer.invoke('convert-file-to-image', opt),
  cancelConversion:   ()    => ipcRenderer.send('cancel-conversion'),

  // Thumbnails & preview
  generateThumbnail: (opt) => ipcRenderer.invoke('generate-thumbnail', opt),
  generatePreview:   (opt) => ipcRenderer.invoke('generate-preview', opt),
  getImageMetadata:  (p)   => ipcRenderer.invoke('get-image-metadata', p),

  // Shell
  revealInExplorer: (p) => ipcRenderer.invoke('reveal-in-explorer', p),

  // Notifications
  showNotification: (opt) => ipcRenderer.invoke('show-notification', opt),

  // Folder watcher
  watchFolder:   (p) => ipcRenderer.invoke('watch-folder', p),
  unwatchFolder: (p) => ipcRenderer.invoke('unwatch-folder', p),
  unwatchAll:    ()  => ipcRenderer.invoke('unwatch-all'),
  onWatcherFile: (cb) => ipcRenderer.on('watcher-file', (_, data) => cb(data)),

  // Codec check + install
  checkRawCodec:   () => ipcRenderer.invoke('check-raw-codec'),
  installRawCodec: () => ipcRenderer.invoke('install-raw-codec'),

  // Auto-updater
  onUpdateStatus: (cb) => ipcRenderer.on('update-status', (_, data) => cb(data)),
  installUpdate:  ()   => ipcRenderer.invoke('install-update'),

  // Thumbnail handler registration (Windows, requires UAC)
  registerThumbnailHandler:   ()  => ipcRenderer.invoke('register-thumbnail-handler', false),
  unregisterThumbnailHandler: ()  => ipcRenderer.invoke('register-thumbnail-handler', true),

  // QuickLook plugin
  checkQuickLook:          ()  => ipcRenderer.invoke('check-quicklook'),
  installQuickLookPlugin:  ()  => ipcRenderer.invoke('install-quicklook-plugin'),

  // File open (from OS / second instance)
  onOpenFiles: (cb) => ipcRenderer.on('open-files', (_, files) => cb(files)),
})
