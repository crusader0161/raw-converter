const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  platform: process.platform,   // 'win32' | 'darwin' | 'linux'

  // Window
  minimize: () => ipcRenderer.send('win-minimize'),
  maximize: () => ipcRenderer.send('win-maximize'),
  close:    () => ipcRenderer.send('win-close'),

  // dnglab
  checkDnglab:       ()    => ipcRenderer.invoke('check-dnglab'),
  setDnglabPath:     (p)   => ipcRenderer.invoke('set-dnglab-path', p),
  selectDnglabBin:   ()    => ipcRenderer.invoke('select-dnglab-binary'),

  // File pickers
  selectFiles:       ()    => ipcRenderer.invoke('select-files'),
  selectFolder:      ()    => ipcRenderer.invoke('select-folder'),
  selectOutputFolder:()    => ipcRenderer.invoke('select-output-folder'),

  // Path helpers
  resolvePaths:      (arr) => ipcRenderer.invoke('resolve-paths', arr),
  getFileSizes:      (arr) => ipcRenderer.invoke('get-file-sizes', arr),

  // Conversion
  convertFile:        (opt) => ipcRenderer.invoke('convert-file', opt),
  convertFileToImage: (opt) => ipcRenderer.invoke('convert-file-to-image', opt),
  cancelConversion:   ()    => ipcRenderer.send('cancel-conversion'),

  // Auto-updater
  onUpdateStatus: (cb)  => ipcRenderer.on('update-status', (_, data) => cb(data)),
  installUpdate:  ()    => ipcRenderer.invoke('install-update'),
})
