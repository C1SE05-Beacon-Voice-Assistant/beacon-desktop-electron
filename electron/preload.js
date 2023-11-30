/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");
const executeIntent = require(path.join(__dirname, "execute_intent.js"));
const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
const {
  storeConversation,
  getAllConversations,
  clearConversations,
} = require(path.join(__dirname, "conversation.js"));

const beacon = new BeaconSpeech("Beacon", "Hanoi");

contextBridge.exposeInMainWorld("electron", {
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  keywordRecognize: beacon.keywordRecognize.bind(beacon),
  storeConversation,
  getAllConversations,
  clearConversations,
  executeIntent: executeIntent,
});

contextBridge.exposeInMainWorld("selenium", {
  getDriver: async () => {
    try {
      const driver = await ipcRenderer.invoke("get-driver");
      return driver;
    } catch (error) {
      console.error("Error getting WebDriver:", error);
      return null;
    }
  },
});
