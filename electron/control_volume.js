/* eslint-disable @typescript-eslint/no-var-requires */
const loudness = require("loudness");

async function createBeaconVolume() {
  const volume = await loudness.getVolume();

  function setVolume(newVolume) {
    return loudness.setVolume(newVolume);
  }

  function getVolume() {
    return volume;
  }

  async function increaseVolume(number) {
    const newVolume = volume + number > 100 ? 100 : volume + number;
    await setVolume(newVolume);
  }

  async function decreaseVolume(number) {
    const newVolume = volume - number < 0 ? 0 : volume - number;
    await setVolume(newVolume);
  }

  async function mute() {
    await loudness.setMuted(true);
  }

  async function unmute() {
    const mute = await loudness.getMuted();
    if (mute) await loudness.setMuted(false);
  }

  async function setVolumeToMax() {
    await setVolume(100);
  }

  async function setVolumeToMin() {
    await setVolume(0);
  }

  return {
    setVolume,
    getVolume,
    increaseVolume,
    decreaseVolume,
    mute,
    unmute,
    setVolumeToMax,
    setVolumeToMin,
  };
}

module.exports = createBeaconVolume;
