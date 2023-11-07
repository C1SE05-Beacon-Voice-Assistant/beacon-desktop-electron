export const getDevice = async () => {
  const devices = await window.electron.getAudioDevices();

  // half of the devices are input, half are output
  const inputDevices = devices.slice(0, devices.length / 2);
  const outputDevices = devices.slice(devices.length / 2);

  return {
    inputDevices,
    outputDevices,
  };
};
