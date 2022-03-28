const {Builder, By, Key, until} = require('selenium-webdriver');
const {ServiceBuilder, Options} = require('selenium-webdriver/chrome')
const commandExistsSync = require('command-exists').sync;
const path = require('path');

(async function example() {
  let chromeService = null;
  if(!commandExistsSync('chromedriver')) {
    let rootDir = path.resolve(__dirname, '..');
    let driverPath = path.join(rootDir, 'browsers', 'linux64', 'chromedriver')
    chromeService = new ServiceBuilder(driverPath);
  } else {
    chromeService = new ServiceBuilder();
  }
  chromeService.addArguments('--headless').build();

  const screen = {
    width: 640,
    height: 480,
  };

  let options = new Options();
  options.addArguments('--disable-dev-shm-usage')
  options.addArguments('--no-sandbox')

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(chromeService)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
})();