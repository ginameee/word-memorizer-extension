// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const sendResponseWithId = (response) => {
    sendResponse({ id: request.id, response });
  };

  if (request.action === "GET_EXTENSION_ID") {
    const extensionId = chrome.runtime.id;
    sendResponseWithId({ extensionId });
  }

  if (request.action === "SAVE_SETTING") {
    const data = request.data;
    chrome.storage.local.set({ setting: data }, () => {
      sendResponseWithId({ success: true });
    });
  }

  if (request.action === "UPDATE_SETTING") {
    const data = request.data;
    chrome.storage.local.get(["setting"], ({ setting }) => {
      chrome.storage.local.set({ setting: { ...setting, ...data } }, () => {
        sendResponseWithId({ success: true });
      });
    });
  }

  if (request.action === "GET_SETTING") {
    chrome.storage.local.get(["setting"], (result) => {
      sendResponseWithId(result.setting);
    });
  }

  return true; // Indicates we will send a response asynchronously
});
