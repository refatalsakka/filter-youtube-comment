import { LOCAL_STORAGE_KEY } from './global.js';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        function: (LOCAL_STORAGE_KEY) => {
          window.onscroll = () => {
            chrome.storage.sync.get(LOCAL_STORAGE_KEY, (res) => {
              const filtersList = res[LOCAL_STORAGE_KEY] ? JSON.parse(res[LOCAL_STORAGE_KEY]) : [];
              
              [...document.querySelectorAll('#comments #contents #content .ytd-comment-renderer')].forEach((comment) => {
                filtersList.forEach((filter) => {
                  const found = comment.innerText.trim().toLowerCase().includes(filter.trim().toLowerCase());
                  if (found) {
                    comment.closest('.ytd-item-section-renderer').remove();
                    return;
                  }
                });
              });
            });
          };
        },
        args: [LOCAL_STORAGE_KEY]
      },
    );
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'filter_comments') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        return;
      }
      const tabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId },
          function: (filtersList) => {
            [...document.querySelectorAll('#comments #contents #content .ytd-comment-renderer')].forEach((comment) => {
              filtersList.forEach((filter) => {
                const found = comment.innerText.trim().toLowerCase().includes(filter.trim().toLowerCase());
                if (found) {
                  comment.closest('.ytd-item-section-renderer').remove();
                  return;
                }
              });
            });
          },
          args: [message.filtersList]
        },
        () => {
          sendResponse(true);
        }
      );
    });
    return true;
  }
});
