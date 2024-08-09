// background.js

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'colorPicked') {
        // Send the picked color to the popup script
        chrome.runtime.sendMessage({ action: 'updateColor', color: message.color });
    }
});
