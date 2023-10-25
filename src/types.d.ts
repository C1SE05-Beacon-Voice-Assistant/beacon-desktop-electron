export declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
export declare const MAIN_WINDOW_VITE_NAME: string;

export interface IElectron {
  recognizeFromMicrophone: () => Promise<string>;
  backgroundListen: (callback: (text: string) => void) => void;
  stopBackgroundListen: () => void;
  loudness: {
    getVolume: () => Promise<number>;
    setVolume: (volume: number) => Promise<void>;
  };
  controlVolume: (volume: number) => Promise<void>;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
  }
}
