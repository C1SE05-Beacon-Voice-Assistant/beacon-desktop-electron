export interface IElectron {
  backgroundListen: (
    callback: (text: string) => void,
    showText: (text: string) => void
  ) => void;
  stopBackgroundListen: () => void;
  keywordRecognize: () => Promise<string>;
  storeConversation: () => Promise<any>;
  getAllConversations: () => Promise<any>;
  clearConversations: () => Promise<any>;
  executeIntent: (intent: object, history: object[]) => Promise<any>;
  quitDriver: () => void;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
  }
}
