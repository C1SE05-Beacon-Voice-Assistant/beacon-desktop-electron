/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

import {
  BrowserWindowConstructorOptions as WindowOptions,
  ipcMain,
  app,
  BrowserWindow,
  dialog,
} from "electron";
import log from "electron-log";
import path, { join } from "path";
import MenuBuilder from "../src/menu";
import { autoUpdater } from "electron-updater";

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

Object.defineProperty(app, "isPackaged", {
  get() {
    return true;
  },
});

// set path for logs root project in dev mode
if (process.env.NODE_ENV === "development") {
  log.transports.file.resolvePath = () =>
    join(__dirname + "/../../logs", "main.log");
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const createWindow = (options: WindowOptions = {}) => {
  const config: WindowOptions = {
    width: parseInt(process.env.ELECTRON_WIDTH) || 833,
    height: parseInt(process.env.ELECTRON_HEIGHT) || 562,
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
    },
    resizable: false,
    ...options,
  };

  mainWindow = new BrowserWindow(config);

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.webContents.openDevTools();
};

app.on("window-all-closed", () => {
  // send quit message to renderer
  mainWindow?.webContents.send("before-quit");
  if (process.platform !== "darwin") {
    app.quit();
  }
  // mainWindow = null;
});

app.whenReady().then(() => {
  createWindow();

  autoUpdater.setFeedURL({
    provider: "github",
    owner: "C1SE05-Beacon-Voice-Assistant",
    repo: "beacon-desktop-electron",
    private: true,
  });

  autoUpdater.autoDownload = false;
  autoUpdater.allowDowngrade = true;
  autoUpdater.allowPrerelease = true;

  // autoUpdater.checkForUpdates();
});

autoUpdater.on("update-available", (updateInfo) => {
  // show update available notification for user
  dialog
    .showMessageBox({
      type: "info",
      title: "Update available",
      message: `New version ${updateInfo.version} is available and will be downloaded in the background.`,
      buttons: ["OK", "Cancel"],
    })
    .then((result) => {
      console.log(result);
      if (result.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
});
