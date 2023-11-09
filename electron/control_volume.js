/* eslint-disable @typescript-eslint/no-var-requires */
const loudness = require("loudness");
const executeException = require('./situation_except');


async function createBeaconVolume() {
  const volume = await loudness.getVolume();

  function setVolume(newVolume) {
    return loudness.setVolume(newVolume);
  }

  function getVolume() {
    return volume;
  }

  async function increaseVolume(number) {
    try {
      const newVolume = volume + number > 100 ? 100 : volume + number;
      await setVolume(newVolume);
    } catch (error) {
      console.error("An error occurred while increasing the volume:", error);
      executeException('increaseVolume')
    }
  }

  async function decreaseVolume(number) {
    try {
      const newVolume = volume - number < 0 ? 0 : volume - number;
      await setVolume(newVolume);
    } catch (error) {
      console.error("An error occurred while decreasing the volume:", error);
      executeException('decreaseVolume')
    }
  }

  async function mute() {
    try {
      await loudness.setMuted(true);
    } catch (error) {
      console.error("An error occurred while muting the volume:", error);
      executeException('mute')
    }
  }

  async function unmute() {
    try {
      const mute = await loudness.getMuted();
      if (mute) await loudness.setMuted(false);
    } catch (error) {
      console.error("An error occurred while unmuting the volume:", error);
      executeException('unmute')
    }
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
