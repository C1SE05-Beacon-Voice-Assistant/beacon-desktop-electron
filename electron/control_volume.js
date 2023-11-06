/* eslint-disable @typescript-eslint/no-var-requires */
const loudness = require("loudness");
const { exec } = require('child_process');
const player = require('play-sound')();


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

  async function increaseVolume(number) {
  try {
    const newVolume = volume + number > 100 ? 100 : volume + number;
    await setVolume(newVolume);
  } catch (error) {
    console.error("An error occurred while increasing the volume:", error);
    playErrorSound();
  }
}

async function decreaseVolume(number) {
  try {
    const newVolume = volume - number < 0 ? 0 : volume - number;
    await setVolume(newVolume);
  } catch (error) {
    console.error("An error occurred while decreasing the volume:", error);
    playErrorSound();
  }
}

async function mute() {
  try {
    await loudness.setMuted(true);
  } catch (error) {
    console.error("An error occurred while muting the volume:", error);
    playErrorSound();
  }
}

async function unmute() {
  try {
    const mute = await loudness.getMuted();
    if (mute) await loudness.setMuted(false);
  } catch (error) {
    console.error("An error occurred while unmuting the volume:", error);
    playErrorSound();
  }
}

// async function setVolumeToMax() {
//   try {
//     await setVolume(100);
//   } catch (error) {
//     console.error("An error occurred while setting the volume to maximum:", error);
//     playErrorSound();
//   }
// }

// async function setVolumeToMin() {
//   try {
//     await setVolume(0);
//   } catch (error) {
//     console.error("An error occurred while setting the volume to minimum:", error);
//     playErrorSound();
//   }
// }
async function setVolumeToMax() {
  await setVolume(100);
}

async function setVolumeToMin() {
  await setVolume(0);
}

function playErrorSound() {
  const audioPath = "C:\\Users\\USER\\Documents\\beacon-desktop-electron\\Youtobe.mp3"; // Đường dẫn đến file âm thanh lỗi
  const play = player.play(audioPath, (err) => {
    if (err) {
      console.error("An error occurred while playing the error sound:", err);
    }
  });
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
