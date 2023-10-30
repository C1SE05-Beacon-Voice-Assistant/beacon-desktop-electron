/* eslint-disable @typescript-eslint/no-var-requires */
import type { BrowserWindowConstructorOptions as WindowOptions } from "electron";
import { BrowserWindow, app, ipcMain, shell } from "electron";
import { autoUpdater } from "electron-updater";
import path, { join } from "path";

import log from "electron-log";
import MenuBuilder from "./menu";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

// set path for logs root project in dev mode
if (process.env.NODE_ENV === "development") {
  log.transports.file.resolvePath = () =>
    join(__dirname + "/../../logs", "main.log");
} else {
  log.transports.file.resolvePath = () =>
    join(__dirname + "/../logs", "main.log");
}

class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.channel = "alpha";
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on("ipc-example", async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply("ipc-example", msgTemplate("pong"));
});

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const createWindow = async (id: string, options: WindowOptions = {}) => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "./assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const config: WindowOptions = {
    show: false,
    width: parseInt(process.env.ELECTRON_WIDTH) || 833,
    height: parseInt(process.env.ELECTRON_HEIGHT) || 562,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
    resizable: false,
    ...options,
  };

  mainWindow = new BrowserWindow(config);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((data: any) => {
    shell.openExternal(data.url);
    return { action: "deny" };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
  // open dev tools
  mainWindow.webContents.openDevTools();
  return mainWindow;
};

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Basic flags
autoUpdater.autoDownload = false;
// tự động cài khi thoát ứng dụng
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.allowPrerelease = true;

app.on("ready", async () => {
  createWindow("main");
  // autoUpdater.checkForUpdatesAndNotify();
  const app = require('electron').app;

  Object.defineProperty(app, 'isPackaged', {
    get() {
      return true;
    }
  });
});
log.info('App Starting');
log.log("Application version =" + app.getVersion());
try {
  // SEtup updater events
  autoUpdater.on("checking-for-update", () => {
    log.info("Checking for updates...");
    console.log("check");
  });

  autoUpdater.on("update-available", (info) => {
    log.info("update available");
    log.info("Version", info.version);
    log.info("release date", info.releaseDate);
  });

  autoUpdater.on("update-not-available", (info) => {
    log.info("update not available");
  });

  autoUpdater.on("update-downloaded", (info) => {
    log.info("update downloaded");
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on("error", (error) => {
    log.info("Error", error);
  });

  autoUpdater.on("download-progress", (progressTrack) => {
    log.info("download-progress");
    log.log(progressTrack);
  });
}
catch (error) {
  log.info('autoupdate failed');
}