export interface IElectron {
  backgroundListen: (callback: (text: string) => void) => void;
  stopBackgroundListen: () => void;
  keywordRecognize: () => Promise<string>;
  storeConversation: () => Promise<any>;
  getAllConversations: () => Promise<any>;
  clearConversations: () => Promise<any>;
  executeIntent: (intent: object, history: object[]) => Promise<any>;
}

export interface ISelenium {
  getDriver: () => Promise<any>;
}

declare global {
  interface Window extends Window {
    electron: IElectron;
    selenium: ISelenium;
  }
}
