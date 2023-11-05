/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder } = require("selenium-webdriver");
const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");
const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
const createBeaconVolume = require(path.join(__dirname, "control_volume.js"));
const listenToMusic = require(path.join(__dirname, "listen_to_music.js"));
const ReadNewsController = require(path.join(
  __dirname,
  "read_news_controller.js"
));
const getAudioDevices = require(path.join(__dirname, "detect_device.js"));

const beacon = new BeaconSpeech("Beacon", "Hanoi");
const driver = new Builder().forBrowser("chrome").build();

const beaconVolume = createBeaconVolume().then((result) => result);
const listenToMusicWithDriver = listenToMusic(driver);
const readNews = new ReadNewsController(driver);
const searchNewsBy = readNews.search.bind(readNews);
const selectOneToRead = readNews.selectOneToRead.bind(readNews);

contextBridge.exposeInMainWorld("electron", {
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  beaconVolume,
  listenToMusic: listenToMusicWithDriver,
  readNews: { searchNewsBy, selectOneToRead },
  getAudioDevices,
  quitDriver: () => driver.quit(),
});

contextBridge.exposeInMainWorld("electronAPI", {
  onBeforeQuit: (callback) =>
    ipcRenderer.on("before-quit", () => {
      // Call the callback function or add your custom logic here
      console.log("before-quit");
      driver.quit();
      callback();
    }),
});
