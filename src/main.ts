/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";
import { app, BrowserWindow, shell, ipcMain } from "electron";
import type { BrowserWindowConstructorOptions } from "electron";
import {
  autoUpdater,
  AppUpdater as ExternalAppUpdater,
} from "electron-updater";
import log from "electron-log";
import MenuBuilder from "./menu";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
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

const isDebug =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDebug) {
  require("electron-debug")();
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "./assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  let config: BrowserWindowConstructorOptions = {
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
  };

  if (process.env.NODE_ENV === "production") {
    config = {
      ...config,
      autoHideMenuBar: true,
      webPreferences: {
        ...config.webPreferences,
        devTools: false,
      },
    };
  }

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
  new AppUpdater();

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

app.on("ready", () => {
  createWindow()
    .then((mainWindow) => {
      // clear the console
      console.clear();

      autoUpdater.checkForUpdates();
      console.log(mainWindow.webContents);

      mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send("updateMessage", app.getVersion());
      });
      console.log(12345);
    })
    .catch((err) => {
      console.log("162", err);
    });
});

// /*New Update Available*/
// autoUpdater.on("update-available", (info) => {
//   createWindow.displayMessage(`Update available. Current version ${app.getVersion()}`);
//   let pth = autoUpdater.downloadUpdate();
//   createWindow.displayMessage(pth);
// });

// autoUpdater.on("update-not-available", (info) => {
//   curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
// });

// /*Download Completion Message*/
// autoUpdater.on("update-downloaded", (info) => {
//   curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
// });

// autoUpdater.on("error", (info) => {
//   curWindow.showMessage(info);
// });
