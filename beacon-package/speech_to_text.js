const dotenv = require('dotenv');
const sdk = require("microsoft-cognitiveservices-speech-sdk");

dotenv.config();

class BeaconSpeech {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
    this.recognizer = new sdk.SpeechRecognizer(this.speechConfig);
  }

  recognize(audio) {
    return new Promise((resolve, reject) => {
      this.recognizer.recognizeOnceAsync(audio, (result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          console.log("Recognizing..." + result.text);
          resolve(result.text);
        } else {
          console.log("Could not recognize speech");
          resolve(null);
        }
      }, (error) => {
        console.log("Error: " + error);
        reject(error);
      });
    });
  }

  recognizeFromMicrophone() {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    return this.recognize(audioConfig);
  }

  recognizeFromFile(file) {
    const audioConfig = sdk.AudioConfig.fromWavFileInput(file);
    return this.recognize(audioConfig);
  }

  backgroundListen() {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);

    recognizer.recognized = (_, result) => {
      console.log("Recognized in background: " + result.text);
    };

    recognizer.startContinuousRecognitionAsync();

    // To stop background listening, call recognizer.stopContinuousRecognitionAsync()
  }
}

if (require.main === module) {
  const beacon = new BeaconSpeech("Beacon", "Hanoi");
  console.log("Say something...");
  beacon.backgroundListen();
  beacon.recognizeFromMicrophone()
    .then((text) => {
      // Process the recognized text
      
    })
    .catch((error) => {
      console.error("Error: " + error);
    });
}








// const dotenv = require('dotenv');
// const sdk = require("microsoft-cognitiveservices-speech-sdk");

// dotenv.config();

// class BeaconSpeech {
//   constructor(name, location) {
//     this.name = name;
//     this.location = location;
//     this.speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
//     this.recognizer = new sdk.SpeechRecognizer(this.speechConfig);
//   }

//   recognize(audio) {
//     return new Promise((resolve, reject) => {
//       this.recognizer.recognizeOnceAsync(audio, (result) => {
//         if (result.reason === sdk.ResultReason.RecognizedSpeech) {
//           console.log("Recognizing..." + result.text);
//           resolve(result.text);
//         } else {
//           console.log("Could not recognize speech");
//           resolve(null);
//         }
//       }, (error) => {
//         console.log("Error: " + error);
//         reject(error);
//       });
//     });
//   }

//   recognizeFromFile() {
//     const audioConfig = sdk.AudioConfig.fromWavFileInput("G:\Test\beacon-desktop-electron\output.wav");
//     return this.recognize(audioConfig);
//   }
// }

// const beacon = new BeaconSpeech("Beacon", "Hanoi");
// console.log("Say something...");
// beacon.recognizeFromFile()
//   .then((text) => {
//     // Process the recognized text
//     console.log("Recognized text:", text);
//   })
//   .catch((error) => {
//     console.error("Error: " + error);
//   });