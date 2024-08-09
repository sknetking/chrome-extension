// content.js

// Function to pick color from clicked element
function pickColor(event) {
    // Prevent default action
    event.preventDefault();

    // Get the background color of the clicked element
    const color = window.getComputedStyle(event.target).backgroundColor;

    // Convert RGB to HEX
    const rgbToHex = (rgb) => {
        let [r, g, b] = rgb.match(/\d+/g).map(Number);
        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    };
    const hexColor = rgbToHex(color);

    // Send the color back to the background script
    chrome.runtime.sendMessage({ action: 'colorPicked', color: hexColor });

    // Remove the event listener after picking a color
    document.removeEventListener('click', pickColor);
}

// Start color picking when user clicks on the page
document.addEventListener('click', pickColor);
