/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge } = require("electron");
const path = require("path");
const executeIntent = require(path.join(__dirname, "execute_intent.js"));
const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
const {
  storeConversation,
  getAllConversations,
  clearConversations,
} = require(path.join(__dirname, "conversation.js"));
const UserManual = require(path.join(__dirname, "user_manual.js"));

const beacon = new BeaconSpeech("Beacon", "Hanoi");
const userManual = new UserManual(beacon);

contextBridge.exposeInMainWorld("electron", {
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  keywordRecognize: beacon.keywordRecognize.bind(beacon),
  storeConversation,
  getAllConversations,
  clearConversations,
  executeIntent: executeIntent,
});
