/* eslint-disable @typescript-eslint/no-var-requires */
import type { BrowserWindowConstructorOptions as WindowOptions } from "electron";
import { app, BrowserWindow, dialog, Tray, Menu } from "electron";
import log from "electron-log";
import path, { join } from "path";
import { autoUpdater } from "electron-updater";
import MenuBuilder from "../src/menu";

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
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

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
  // if (process.env.NODE_ENV === "development") {
  mainWindow.webContents.openDevTools();
  // }

  mainWindow.on("closed", () => {
    // hide window instead of closing it
    mainWindow = null;
  });
};

async function handleQuit() {
  if (process.platform !== "darwin") {
    quitDriver().then(() => {
      log.info("75: Driver quit");
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
    private: false,
  });

  autoUpdater.checkForUpdates();
});

async function quitDriver() {
  if (mainWindow) {
    await mainWindow.webContents.send("quit-driver");
  }
}

app.on("before-quit", async () => {
  await quitDriver();
});

app.on("window-all-closed", () => {
  quitDriver().then(() => {
    log.info("122: Driver quit");
  });
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
        title: "Tìm thấy phiên bản mới",
        message: `Phiên bản mới ${updateInfo.version} đã sẵn sàng để tải xuống. Bạn có muốn tải xuống ngay bây giờ?`,
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
