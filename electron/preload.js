/* eslint-disable @typescript-eslint/no-var-requires */
const { PythonShell } = require("python-shell");
const { contextBridge, ipcRenderer } = require("electron");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
// const dotenv = require("dotenv");

// dotenv.config();
const { Builder, By, until } = require("selenium-webdriver");
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

function wakeUp() {
  // const options = {
  //   mode: "text",
  //   pythonPath: "./beacon-package/venv39/Scripts/python.exe",
  //   pythonOptions: ["-u"], // get print results in real-time
  //   encoding: "utf8",
  //   scriptPath: "./beacon-package",
  // };
  // PythonShell.run("beacon_speech.py", options)
  //   .then((messages) => {
  //     console.log("messages: %j", messages);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}
const driver = new Builder().forBrowser("chrome").build();

async function listenToMusic() {
  let platformName = null;
  let songName = null;

  async function exit() {
    await driver.quit();
  }

  async function searchSong(newSongName) {
    songName = newSongName;
  }

  async function playOnYoutube() {
    platformName = "youtube";
    const url = `https://yewtu.be/search?q=${songName}`;
    await driver.get(url);

    const songList = await driver.findElements(By.className("video-card-row"));
    if (songList.length > 0) {
      await driver.sleep(1000);
      await songList[0].click();
    }
  }

  async function playOnMp3() {
    platformName = "mp3";
    const url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${songName}`;

    await driver.get(url);

    const showPlayButtons = await driver.findElements(
      By.css("div.zm-carousel-item")
    );

    if (showPlayButtons.length > 0) {
      await driver.sleep(1000);
      await showPlayButtons[0].click();

      const playButton = await driver.findElements(
        By.css("button.action-play")
      );

      if (playButton.length > 0) {
        await driver.sleep(1000);
        await playButton[0].click();
        return "Done";
      } else {
        throw new Error("No play button found");
      }
    } else {
      throw new Error("No show play buttons found");
    }
  }

  async function toggle(isPlay = false) {
    if (platformName === "mp3") {
      const mp3PauseButton = await driver.findElement(
        By.css(`i.ic-${isPlay ? "play" : "pause"}-circle-outline`)
      );
      await driver.sleep(1000);
      await mp3PauseButton.click();
    } else {
      const youtubePauseButton = await driver.findElement(By.tagName("video"));
      await driver.sleep(1000);
      await youtubePauseButton.click();
    }
  }

  async function pause() {
    await toggle(false);
  }

  async function resume() {
    await toggle(true);
  }

  async function next() {
    if (platformName === "mp3") {
      const nextButton = await driver.findElement(By.css("i.ic-skip-next"));
      await driver.sleep(1000);
      await nextButton.click();
    } else {
      const nextButton = await driver.findElement(By.css("a.ytp-next-button"));
      await driver.sleep(1000);
      await nextButton.click();
    }
  }

  return {
    exit,
    searchSong,
    playOnYoutube,
    playOnMp3,
    pause,
    resume,
    next,
  };
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
  listenToMusic,
});

let bridge = {
  updateMessage: (callback) => ipcRenderer.on("updateMessage", callback),
};

contextBridge.exposeInMainWorld("bridge", bridge);
