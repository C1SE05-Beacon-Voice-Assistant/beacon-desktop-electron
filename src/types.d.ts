export interface IElectron {
  backgroundListen: (callback: (text: string) => void) => void;
  stopBackgroundListen: () => void;
  listenToMusic: any;
  beaconVolume: any;
  readNews: any;
  getAudioDevices: () => any;
}

export interface IElectronAPI {
  onBeforeQuit: () => void;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
    electronAPI: IElectronAPI;
  }
}
