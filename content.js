function getSelectedFont() {
    const selection = window.getSelection();
  
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let selectedElement = range.commonAncestorContainer.parentElement;
  
      while (selectedElement && selectedElement.nodeType === 1) {
        const computedStyle = window.getComputedStyle(selectedElement);
        const fontFamily = computedStyle.fontFamily;
  
        if (fontFamily && fontFamily !== "initial" && fontFamily !== "") {
          console.log('Detected Font Family:', fontFamily);
          chrome.runtime.sendMessage({ fontFamily });
          return;
        }
        
        selectedElement = selectedElement.parentElement;
      }
  
      chrome.runtime.sendMessage({ fontFamily: "No font detected" });
    } else {
      chrome.runtime.sendMessage({ fontFamily: "No text selected" });
    }
  }
  
  // Call the function to detect the font when the page is loaded
  window.addEventListener('load', getSelectedFont);
  