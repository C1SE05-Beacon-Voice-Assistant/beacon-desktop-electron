export declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
export declare const MAIN_WINDOW_VITE_NAME: string;

export interface IElectron {
  backgroundListen: (callback: (text: string) => void) => void;
  stopBackgroundListen: () => void;
  controlVolume: (volume: number) => Promise<void>;
  listenToMusic: () => any;
  readNews: () => any;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
  }
}
