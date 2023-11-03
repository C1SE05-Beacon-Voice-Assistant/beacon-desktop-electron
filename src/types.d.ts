export interface IElectron {
  backgroundListen: (callback: (text: string) => void) => void;
  stopBackgroundListen: () => void;
  listenToMusic: any;
  beaconVolume: any;
  readNews: any;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
  }
}
