/* eslint-disable @typescript-eslint/no-var-requires */
const loudness = require("loudness");
const detectSpeakerDeviceIsMuting = async () => {
  const userIsMuted = await loudness.getMuted();
  if (userIsMuted) {
    //  return await loudness.setMuted(false)
  }
};

module.exports = {
  detectSpeakerDeviceIsMuting,
};
