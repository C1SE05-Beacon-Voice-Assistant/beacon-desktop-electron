/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");
const { Builder } = require("selenium-webdriver");
const ExecuteIntent = require(path.join(__dirname, "execute_intent.js"));
const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
const {
  storeConversation,
  getAllConversations,
  clearConversations,
} = require(path.join(__dirname, "conversation.js"));

const beacon = new BeaconSpeech("Beacon", "Hanoi");
const driver = new Builder().forBrowser("chrome").build();
const executeIntent = new ExecuteIntent(driver);

contextBridge.exposeInMainWorld("electron", {
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  keywordRecognize: beacon.keywordRecognize.bind(beacon),
  storeConversation,
  getAllConversations,
  clearConversations,
  executeIntent: executeIntent.run.bind(executeIntent),
  quitDriver: async () => {
    await driver.close();
    await driver.quit();
  },
});

contextBridge.exposeInMainWorld("electronAPI", {
  quitDriver: (callback) => ipcRenderer.on("quit-driver", callback),
});
