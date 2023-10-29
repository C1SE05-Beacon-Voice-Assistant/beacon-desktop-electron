/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder } = require("selenium-webdriver");
const { contextBridge } = require("electron");
const path = require("path");
const BeaconSpeech = require(path.join(__dirname, "beacon_speech.js"));
const createBeaconVolume = require(path.join(__dirname, "control_volume.js"));
const listenToMusic = require(path.join(__dirname, "listen_to_music.js"));
const ReadNewsController = require(path.join(
  __dirname,
  "read_news_controller.js"
));
// const NewsReader = require("./helpers/newsReader.js"); // remember join path

const beacon = new BeaconSpeech("Beacon", "Hanoi");
const driver = new Builder().forBrowser("chrome").build();
// const newsReader = new NewsReader();

const beaconVolume = createBeaconVolume().then((result) => result);
const listenToMusicWithDriver = listenToMusic(driver);
const readNews = new ReadNewsController(driver);

contextBridge.exposeInMainWorld("electron", {
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  beaconVolume,
  listenToMusic: listenToMusicWithDriver,
  readNews: readNews,
});
