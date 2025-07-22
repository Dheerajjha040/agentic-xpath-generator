document.getElementById("extract").onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: extractXpaths
  });
};

document.getElementById("download").onclick = async () => {
  chrome.storage.local.get("xpaths", (result) => {
    const xpaths = result.xpaths || {};
    const className = "GeneratedPage";
    let content = `from selenium.webdriver.common.by import By\n\n
class ${className}:
    def __init__(self, driver):
        self.driver = driver\n\n`;

    for (const key in xpaths) {
      const method = key.replace(/_xpath$/, '').replace(/_/g, ' ');
      const camelMethod = method.replace(/ (\w)/g, (_, c) => c.toUpperCase()).replace(/^./, s => s.toLowerCase());
      content += `    ${key} = (By.XPATH, "${xpaths[key]}")\n`;
      content += `\n    def get_${camelMethod}(self):\n        return self.driver.find_element(*self.${key})\n\n`;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename: `${className}.py` });
  });
};

function extractXpaths() {
  const tags = ["input", "button", "a", "select", "textarea", "label", "img", "div", "span"];
  const attributes = ["placeholder", "name", "title", "aria-label", "type", "value"];
  const results = {};

  tags.forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
      let added = false;
      for (let attr of attributes) {
        const val = el.getAttribute(attr);
        if (val && val.length < 60) {
          const key = `${tag}_${val.replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase()}_xpath`;
          results[key] = `//${tag}[@${attr}='${val}']`;
          added = true;
          break;
        }
      }
      if (!added) {
        const text = el.textContent?.trim();
        if (text && text.length < 50) {
          const key = `${tag}_${text.replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase()}_xpath`;
          results[key] = `//${tag}[contains(text(),'${text}')]`;
        }
      }
    });
  });

  chrome.runtime.sendMessage({ type: "xpaths_extracted", data: results });
  chrome.storage.local.set({ xpaths: results });
  alert("✅ XPaths extracted! Ready to download Python POM class.");
}
