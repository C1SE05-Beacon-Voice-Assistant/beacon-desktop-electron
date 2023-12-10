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
const { BeaconSpeech, textToSpeech } = require(path.join(__dirname, "beacon_speech.js"));
const { UserManual } = require("./user_manual.js");
const {
  storeConversation,
  getAllConversations,
  clearConversations,
} = require(path.join(__dirname, "conversation.js"));

const beacon = new BeaconSpeech("Beacon", "Hanoi");
let driver;
if (process.env.NODE_ENV === "development") {
  driver = new Builder().forBrowser("chrome").build();
} else {
  const chromeService = new ServiceBuilder(chromedriverPath);
  driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(chromeService)
    .build();
}
const userManual = new UserManual(beacon)
const initExecute = new ExecuteIntent(driver, userManual);
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
module.exports = {
  userManual
}
