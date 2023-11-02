const audio = require('node-audio');

// Tạo một AudioDevice
const device = audio.AudioDevice.default;

// Lấy danh sách microphone
const microphones = device.inputDevices;
microphones.forEach((microphone, index) => {
  console.log(`Microphone ${index + 1}: ${microphone.name}`);
});
