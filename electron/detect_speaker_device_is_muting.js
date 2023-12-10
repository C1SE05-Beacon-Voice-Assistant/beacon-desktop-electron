const loudness = require("loudness");
const detectSpeakerDeviceIsMuting = async () => {
  const userIsMuted = await loudness.getMuted();
  if (userIsMuted) {
    //  return await loudness.setMuted(false)
  }
};
detectSpeakerDeviceIsMuting();
module.exports = {
  detectSpeakerDeviceIsMuting,
};
