/* eslint-disable @typescript-eslint/no-var-requires */
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { PythonShell } from "python-shell";
const { options } = require("./helpers/optionPyshell");
const { speechConfigDefault } = require("./helpers/config");
const {
  TextSpeak: { OUT_LISTEN, ACTIVE },
} = require("./helpers/enum");

class BeaconSpeech {
  constructor(name, location) {
    this.name = name;
    this.callBotTime = 0;
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
    this.keywordRetryLimit = 4; // Define the limit for consecutive no matches
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

  backgroundListen(callback, showText) {
    if (!this.keywordRecognitionActive) {
      this.keywordRecognize();
    }

    this.speechRecognizer.recognizing = async (s, e) => {
      const result = e.result;
      if (
        result.reason === sdk.ResultReason.RecognizingSpeech &&
        result.text.toLowerCase() != "phẩy"
      ) {
        showText(result.text);
      }
    };

    this.speechRecognizer.recognized = async (s, e) => {
      const result = e.result;
      if (
        result.reason === sdk.ResultReason.RecognizedSpeech &&
        result.text.toLowerCase() != "phẩy."
      ) {
        showText(result.text);
        callback(result.text);
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
        // this.stopBackgroundListen();
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
      if (this.callBotTime === 0) {
        setTimeout(() => {
          textToSpeech("Nói làm sao sử dụng  để nghe hướng dẫn từ bi cần");
        }, 2000);
        ++this.callBotTime;
      }

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

const textToSpeech = async (text, beacon) => {
  if (!text) return;
  if (beacon) {
    if (!beacon.keywordRecognitionActive) return;
    beacon.stopBackgroundListen();
  }
  var synthesizer = new sdk.SpeechSynthesizer(createSpeechConfig());

  try {
    await new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(
        text,
        (result) => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            // calculate the total time in seconds that audio was synthesized
            // convert the time from ticks to seconds
            const audioDuration = result.audioDuration / 10000000;
            //  console.log(`Audio was synthesized for ${audioDuration} seconds`);

            // resolve the promise when audioDuration seconds have passed
            setTimeout(() => {
              resolve();
            }, parseInt(audioDuration * 950));
          } else {
            reject(new Error(result.errorDetails));
          }
          synthesizer.close();
          synthesizer = null;
        },
        (err) => {
          console.trace("err - " + err);
          synthesizer.close();
          synthesizer = null;
          reject(err);
        }
      );
    });

    if (beacon) {
      beacon.speechRecognizer.startContinuousRecognitionAsync();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = {
  BeaconSpeech,
  textToSpeech,
};
