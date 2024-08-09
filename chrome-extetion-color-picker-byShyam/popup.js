document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('colorPicker');
    const saveColorButton = document.getElementById('saveColor');
    const colorGrid = document.getElementById('colorGrid');
    const resetColorsButton = document.getElementById('resetColors');

    colorPicker.value = '#0000ff';
    // Load colors from local storage and display them
    function loadColors() {
        chrome.storage.local.get(['colors'], (result) => {
            const colors = result.colors || [];
            colorGrid.innerHTML = colors.map(color => 
                `<div class="color-box" style="background-color: ${color}" data-color="${color}"></div>`
            ).join('');
        });
    }

    // Save the selected color to local storage
    function saveColor(color) {
        chrome.storage.local.get(['colors'], (result) => {
            const colors = result.colors || [];
            if (!colors.includes(color)) {
                colors.push(color);
                chrome.storage.local.set({ colors }, loadColors);
            }
        });
    }

    // Show a toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 2000); // Hide after 2 seconds
    }

    // Copy color hex code to clipboard
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copied: ${text}`);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    // Handle color picker button click
    saveColorButton.addEventListener('click', () => {
        const selectedColor = colorPicker.value;
        saveColor(selectedColor);
    });

    // Handle color grid click to copy color
    colorGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-box')) {
            const color = event.target.dataset.color;
            copyToClipboard(color);
        }
    });

    // Handle reset button click to clear all saved colors
    resetColorsButton.addEventListener('click', () => {
        chrome.storage.local.remove('colors', () => {
            loadColors(); // Reload colors (should be empty now)
            showToast('All colors have been reset.');
        });
    });

    // Initialize
    loadColors();
});
