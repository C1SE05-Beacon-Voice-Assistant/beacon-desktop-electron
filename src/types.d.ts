export declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
export declare const MAIN_WINDOW_VITE_NAME: string;

export interface IElectron {
  wakeUp: () => void;
  recognizeFromMicrophone: () => Promise<string>;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
  }
}
