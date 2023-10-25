const { Builder, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

class ChromeDriver {
  constructor() {
    if (!this.driver) this.driver = this.createInstance();
  }
  createInstance() {
    let options = new chrome.Options();
    options.addArguments("disable-infobars");
    options.setUserPreferences({ credential_enable_service: false });
    return new Builder()
      .setChromeOptions(options)
      .forBrowser(Browser.CHROME)
      .build();
  }
  getInstance() {
    return this.driver;
  }
}

module.exports = ChromeDriver;
