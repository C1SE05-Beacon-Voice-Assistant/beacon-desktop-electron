/* eslint-disable @typescript-eslint/no-var-requires */
import type { BrowserWindowConstructorOptions as WindowOptions } from "electron";
import { app, BrowserWindow, dialog, Tray, Menu, ipcMain } from "electron";
import log from "electron-log";
import path, { join } from "path";
import { autoUpdater } from "electron-updater";
import MenuBuilder from "../src/menu";

const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// set path for logs root project in dev mode
if (process.env.NODE_ENV === "development") {
  log.transports.file.resolvePath = () =>
    join(__dirname + "../logs", "main.log");

  Object.defineProperty(app, "isPackaged", {
    get() {
      return true;
    },
  });
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let driverInstance: any = null;

const createWindow = (options: WindowOptions = {}) => {
  if (mainWindow) {
    mainWindow.focus();
    return;
  }

  const config: WindowOptions = {
    // show: false,
    width: parseInt(process.env.ELECTRON_WIDTH) || 833,
    height: parseInt(process.env.ELECTRON_HEIGHT) || 562,
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
      // nodeIntegrationInWorker: true,
    },
    // opacity: 0,
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
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    // hide window instead of closing it
    mainWindow = null;
  });
};

async function handleQuit() {
  if (process.platform !== "darwin") {
    quitDriver().then(() => {
      console.log("quitDriver");

      app.quit();
    });
  }
}

const createTray = () => {
  tray = new Tray(path.join(process.env.VITE_PUBLIC, "icon.png"));
  const contextMenu = Menu.buildFromTemplate([
    // let us then add handleQuit to click property
    { label: "Quit", click: handleQuit },
  ]);
  tray.setToolTip("Beacon Voice Assistant");
  tray.setContextMenu(contextMenu);
  tray.addListener("click", () => createWindow());
};

app.whenReady().then(() => {
  createTray();
});

app.on("ready", async () => {
  createWindow();

  autoUpdater.setFeedURL({
    provider: "github",
    owner: "C1SE05-Beacon-Voice-Assistant",
    repo: "beacon-desktop-electron",
    private: true,
  });

  autoUpdater.checkForUpdates();

  try {
    await initDriver();
    ipcMain.handle("get-driver", async (event, args) => {
      return driverInstance; // Send the driver instance to the renderer process
    });
  } catch (err) {
    console.log(err);
  }
});

async function initDriver() {
  if (!driverInstance) {
    driverInstance = await new Builder().forBrowser("chrome").build();
  }
}

async function quitDriver() {
  if (driverInstance) {
    driverInstance.quit().then(() => {
      driverInstance = null;
    });
  }
}

app.on("before-quit", async () => {
  console.log("before-quit");
  await quitDriver();
});

app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") {
  //   app.quit();
  //   process.exit(0);
  // }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

app.setLoginItemSettings({
  openAtLogin: true,
  path: app.getPath("exe"),
});

autoUpdater.autoDownload = false;
autoUpdater.allowDowngrade = true;
autoUpdater.allowPrerelease = true;

autoUpdater.on("update-available", (updateInfo) => {
  // if new version > current version
  if (updateInfo.version > app.getVersion()) {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update available",
        message: `New version ${updateInfo.version} is available and will be downloaded in the background.`,
        buttons: ["OK", "Cancel"],
        textWidth: 300,
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
  }
});
