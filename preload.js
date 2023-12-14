const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // We can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("require", require);
contextBridge.exposeInMainWorld("__dirname", __dirname);