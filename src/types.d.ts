declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

export interface IElectron {
  wakeUp: () => void;
}

declare global {
  interface Window {
    electron: IElectron;
  }
}
