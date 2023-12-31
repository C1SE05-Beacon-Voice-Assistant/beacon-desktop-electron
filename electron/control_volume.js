/* eslint-disable @typescript-eslint/no-var-requires */
const loudness = require("loudness");
const executeException = require("./execute_exception");

async function beaconVolume() {
  const volume = await loudness.getVolume();

  async function setVolume(newVolume) {
    return await loudness.setVolume(newVolume);
  }

  async function getVolume() {
    const isMute = await loudness.getMuted();
    // if mute, set volume to 30
    if (isMute) {
      await loudness.setMuted(false);
      await setVolume(30);
    }
    return volume;
  }

  async function increaseVolume(number) {
    try {
      if (number > volume) await setVolume(number >= 100 ? 100 : number);
    } catch (error) {
      console.error("An error occurred while increasing the volume:", error);
      executeException("increaseVolume");
    }
  }

  async function decreaseVolume(number) {
    try {
      if (number < volume) await setVolume(number <= 10 ? 10 : number);
    } catch (error) {
      console.error("An error occurred while decreasing the volume:", error);
      executeException("decreaseVolume");
    }
  }

  async function mute() {
    try {
      await loudness.setMuted(true);
    } catch (error) {
      console.error("An error occurred while muting the volume:", error);
      executeException("mute");
    }
  }

  async function unmute() {
    try {
      const mute = await loudness.getMuted();
      if (mute) await loudness.setMuted(false);
    } catch (error) {
      console.error("An error occurred while unmuting the volume:", error);
      executeException("unmute");
    }
  }
  async function setVolumeToMax() {
    await setVolume(100);
  }

  async function setVolumeToMin() {
    await setVolume(10);
  }

  async function autoUnmute() {
    const mute = await loudness.getMuted();
    if (mute) await loudness.setMuted(false);
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
    autoUnmute,
  };
}

module.exports = beaconVolume;
