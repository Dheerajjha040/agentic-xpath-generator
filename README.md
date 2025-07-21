# AgenticXpathGenerator – Chrome Extension 🚀

**AgenticXpathGenerator** is a lightweight Chrome Extension that automatically extracts robust XPath selectors and generates Python Page Object Model (POM) classes for use in Selenium or Playwright automation frameworks.

![Logo](icon128.png)

---

## 🔧 Features

- ✅ One-click XPath extraction
- ✅ Attribute-based XPath selectors (stable locators)
- ✅ Python Page Object Class auto-generation
- ✅ Download or copy POM class directly
- ✅ Lightweight and blazing fast

---

## 🛠️ Installation (Local Dev)

1. Clone this repo or download the ZIP.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer Mode**.
4. Click **Load Unpacked** → Select the extension folder.
5. Done ✅

---

## 🧪 How to Use

1. Open any website you'd like to test.
2. Click the **AgenticXpathGenerator** icon.
3. Click "Extract XPaths".
4. Click "Download Python Class".
5. A Python `.py` file with generated locators will be saved.

---

## 💡 Generated Python Output Example

```python
class PageObject:
    input_Username_xpath = "//input[@placeholder='Username']"
    input_Password_xpath = "//input[@name='password']"
    button_Login_xpath = "//button[contains(text(),'Log in')]"
