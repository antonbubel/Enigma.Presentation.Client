const os = require('os');
const { app, BrowserWindow } = require('electron');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 960,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/favicon.png`
  });

  window.loadURL(`file://${__dirname}/dist/index.html`);
}

app.on('ready', createWindow);
