declare global {
  interface Window {
    sendMessageToContentScript: (message: string) => void;
  }
}

export {};
