import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke:(channel,data)=>{
    let validChannels = ['get-server-ip']
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data)
    }
  },
  send: (channel, data) => {
    let validChannels = ['start-server','close-server']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  }
})
