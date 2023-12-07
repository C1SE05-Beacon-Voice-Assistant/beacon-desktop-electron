/* eslint-disable @typescript-eslint/no-var-requires */
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
const { PythonShell } = require("python-shell");
const { options } = require("./helpers/optionPyshell");
const { speechConfigDefault } = require("./helpers/config");
const {
  TextSpeak: { OUT_LISTEN, ACTIVE },
} = require("./helpers/enum");

class BeaconSpeech {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    const { subscriptionKey, region, speechRecognitionLanguage, endpointId } =
      speechConfigDefault;
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      subscriptionKey,
      region
    );
    this.speechConfig.speechRecognitionLanguage = speechRecognitionLanguage;
    this.speechConfig.endpointId = endpointId;
    this.speechRecognizer = new sdk.SpeechRecognizer(
      this.speechConfig,
      sdk.AudioConfig.fromDefaultMicrophoneInput(),
      sdk.AutoDetectSourceLanguageConfig.fromLanguages(["vi-VN", "en-US"])
    );
    this.recognizer = null;
    this.keywordRetryCount = 0; // Track the number of consecutive no matches
    this.keywordRetryLimit = 2; // Define the limit for consecutive no matches
    this.keywordRecognitionActive = false; // Flag to track keyword recognition state
  }

  recognize(audioConfig) {
    this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);
    console.log("Say something...");
    return new Promise((resolve, reject) => {
      this.recognizer.recognizeOnceAsync(
        (result) => {
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
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
    if (!this.keywordRecognitionActive) {
      this.keywordRecognize();
    }
    this.speechRecognizer.recognized = async (s, e) => {
      const result = e.result;
      if (
        result.reason === sdk.ResultReason.RecognizedSpeech &&
        result.text.toLowerCase() != "phẩy."
      ) {
        // console.log(`RECOGNIZED: Text=${result.text}`);
        callback(e.result.text);
      } else if (result.reason === sdk.ResultReason.NoMatch) {
        console.log("NOMATCH part", this.keywordRetryCount);
        await this.handleNoMatch(); // Handle no match condition
      }
    };
  }

  stopBackgroundListen() {
    this.speechRecognizer.stopContinuousRecognitionAsync();
  }

  async handleNoMatch() {
    if (this.keywordRecognitionActive) {
      this.keywordRetryCount++;
      if (this.keywordRetryCount >= this.keywordRetryLimit) {
        this.keywordRecognitionActive = false;
        this.keywordRetryCount = 0;
        this.stopBackgroundListen();
        await textToSpeech(
          OUT_LISTEN[Math.floor(Math.random() * OUT_LISTEN.length)]
        );
        await this.keywordRecognize();
      }
    }
  }

  async keywordRecognize() {
    await textToSpeech(OUT_LISTEN[0]);
    const data = await PythonShell.run("keyword_recognition.py", options);
    if (data[0] == "Hey Beacon") {
      await textToSpeech(ACTIVE[Math.floor(Math.random() * ACTIVE.length)]);
      this.keywordRecognitionActive = true;
      this.keywordRetryCount = 0;
      this.speechRecognizer.startContinuousRecognitionAsync();
    } else {
      await textToSpeech("Tôi không nghe rõ, bạn có thể nói lại được không?");
    }
  }
}

const createSpeechConfig = () => {
  const {
    subscriptionKey,
    region,
    speechRecognitionLanguage,
    speechSynthesisVoiceName,
  } = speechConfigDefault;
  const config = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);
  config.speechRecognitionLanguage = speechRecognitionLanguage;
  config.speechSynthesisVoiceName = speechSynthesisVoiceName;
  return config;
};

const textToSpeech = async (text) => {
  const synthesizer = new sdk.SpeechSynthesizer(createSpeechConfig());

  try {
    await new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(
        text,
        (result) => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            resolve();
          } else {
            console.error(
              `Speech synthesis canceled, ${result.errorDetails}\nDid you set the speech resource key and region values?`
            );
            reject(new Error(result.errorDetails));
          }
          synthesizer.close();
        },
        (err) => {
          console.trace("err - " + err);
          synthesizer.close();
          reject(err);
        }
      );
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = {
  BeaconSpeech,
  textToSpeech,
};
