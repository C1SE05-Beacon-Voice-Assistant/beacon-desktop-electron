/* eslint-disable @typescript-eslint/no-var-requires */
const { Builder, By, until } = require("selenium-webdriver");
const { contextBridge } = require("electron");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const loudness = require("loudness");

class BeaconSpeech {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      "3d1916eed11c4c2d9be246152c2e5cd1",
      "southeastasia"
    );
    this.speechConfig.speechRecognitionLanguage = "vi-VN";
    this.speechRecognizer = new sdk.SpeechRecognizer(
      this.speechConfig,
      sdk.AudioConfig.fromDefaultMicrophoneInput(),
      sdk.AutoDetectSourceLanguageConfig.fromLanguages(["vi-VN", "en-US"])
    );
  }

  recognize(audioConfig) {
    const recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);
    console.log("Say something...");
    return new Promise((resolve, reject) => {
      recognizer.recognizeOnceAsync(
        (result) => {
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            console.log("Recognizing..." + result.text);
            resolve(result.text);
          } else {
            console.log("Could not recognize speech");
            resolve(null);
          }
        },
        (error) => {
          console.log("Error: " + error);
          reject(error);
        }
      );
    });
  }

  async recognizeFromMicrophone() {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    return this.recognize(audioConfig);
  }

  recognizeFromFile(file) {
    const audioConfig = sdk.AudioConfig.fromWavFileInput(file);
    return this.recognize(audioConfig);
  }

  backgroundListen(callback) {
    this.speechRecognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    this.speechRecognizer.recognized = (s, e) => {
      if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
        callback(e.result.text);
      } else if (e.result.reason == sdk.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    this.speechRecognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason == sdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
      }

      this.speechRecognizer.stopContinuousRecognitionAsync();
    };

    this.speechRecognizer.sessionStopped = (s, e) => {
      console.log("\nSession stopped event.");
      this.speechRecognizer.stopContinuousRecognitionAsync();
    };

    this.speechRecognizer.startContinuousRecognitionAsync();
  }

  stopBackgroundListen() {
    this.speechRecognizer.stopContinuousRecognitionAsync();
  }
}

const beacon = new BeaconSpeech("Beacon", "Hanoi");
// beacon.backgroundListen();

function start(songName) {
  const url = `https://www.youtube.com/results?search_query=${songName}`;
  const driver = new Builder().forBrowser("chrome").build();

  driver
    .get(url)
    .then(() => driver.findElement(By.id("video-title")))
    .then((el) => el.click())
    .then(() =>
      driver.wait(
        until.elementLocated(By.css(".ytp-ad-skip-button-icon")),
        20000
      )
    )
    .then((el) => {
      console.log(el);
      return el.click();
    });
}

function controlVolume(volume) {
  console.log(typeof volume);
  loudness
    .setVolume(volume)
    .then(() => console.log("Volume set to " + volume))
    .catch((err) => console.error(err));
}

contextBridge.exposeInMainWorld("electron", {
  recognizeFromMicrophone: beacon.recognizeFromMicrophone.bind(beacon),
  backgroundListen: beacon.backgroundListen.bind(beacon),
  stopBackgroundListen: beacon.stopBackgroundListen.bind(beacon),
  loudness,
  controlVolume,
});
