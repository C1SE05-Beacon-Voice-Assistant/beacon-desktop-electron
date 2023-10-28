export declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
export declare const MAIN_WINDOW_VITE_NAME: string;

export interface IElectron {
  recognizeFromMicrophone: () => Promise<string>;
  backgroundListen: (callback: (text: string) => void) => void;
  stopBackgroundListen: () => void;
  listenToMusic: any;
  beaconVolume: any;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
  }
}
