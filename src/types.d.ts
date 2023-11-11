export interface IElectron {
  backgroundListen: (callback: (text: string) => void) => void;
  stopBackgroundListen: () => void;
  keywordRecognize: () => Promise<string>;
  // listenToMusic: any;
  // beaconVolume: any;
  // readNews: any;
  // getAudioDevices: () => any;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
  }
}
