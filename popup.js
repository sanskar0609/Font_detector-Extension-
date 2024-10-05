
document.getElementById('detect-font').addEventListener('click', () => {
  // Inject script into the current tab to detect font family
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: detectFontFamily
    }, (results) => {
      // Display the detected font family in the popup
      const fontFamily = results[0].result || 'No font detected';
      // Display the detected font family in the popup
      document.getElementById('font-name').textContent = fontFamily;
      
      copyToClipboard(fontFamily);
   
    });
  });
});


document.getElementById('detect-font-size').addEventListener('click', () => {
  // Inject script into the current tab to detect font size
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: detectFontSize
    }, (results) => {
      // Display the detected font size in the popup
      const fontSize = results[0].result || 'No font size detected';
      // Display the detected font size in the popup
      document.getElementById('font-size').textContent = fontSize;
     
      copyToClipboard(fontSize);
     
    });
  });
});


function detectFontFamily() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const element = range.startContainer.parentElement;
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.fontFamily;
  }
  return null;
}


function detectFontSize() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const element = range.startContainer.parentElement;
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.fontSize;
  }
  return null;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard:', text);
    showToast(`Copied to clipboard: ${text}`);
  }).catch(err => {
    console.error('Failed to copy to clipboard:', err);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message; 
  toast.className = "show"; 


  setTimeout(() => {
    toast.className = toast.className.replace("show", ""); 
  }, 1000); 
}
