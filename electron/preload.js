/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");
const { Builder } = require("selenium-webdriver");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const chromedriverPath = require("chromedriver").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
const ExecuteIntent = require(path.join(__dirname, "execute_intent.js"));
const { BeaconSpeech } = require(path.join(__dirname, "beacon_speech.js"));
const {
  storeConversation,
  getAllConversations,
  clearConversations,
} = require(path.join(__dirname, "conversation.js"));
const chrome = require("selenium-webdriver/chrome");

const beacon = new BeaconSpeech("Beacon", "Hanoi");
let driver;
let chromeOptions = new chrome.Options();
chromeOptions.setUserPreferences({
  "profile.managed_default_content_settings.images": 2, // disbale img
  // "profile.default_content_setting_values.notifications": 2, // disable notify popup
  // 'profile.managed_default_content_settings.popups' : 2, // disable popup
});

if (process.env.NODE_ENV === "development") {
  driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
} else {
  const chromeService = new ServiceBuilder(chromedriverPath);
  driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(chromeService)
    .setChromeOptions(chromeOptions)
    .build();
}
const initExecute = new ExecuteIntent(driver);

contextBridge.exposeInMainWorld("electron", {
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  storeConversation,
  getAllConversations,
  clearConversations,
  executeIntent: initExecute.executeIntent.bind(initExecute),
  quitDriver: async () => {
    await driver.close();
    await driver.quit();
  },
});

contextBridge.exposeInMainWorld("electronAPI", {
  quitDriver: (callback) => ipcRenderer.on("quit-driver", callback),
});
