let xpaths = {};

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "xpaths_extracted") {
    xpaths = msg.data;
    chrome.storage.local.set({ xpaths });
  }
});