// # npm i -D puppeteer puppeteer-core
const puppeteer = require('puppeteer');
// console.log(JSON.stringify(puppeteer.devices));
const devices = {
  xs: puppeteer.devices['iPhone 5'], sm: puppeteer.devices['iPad'], md: puppeteer.devices['Kindle Fire HDX'],
  lg: puppeteer.devices['iPad Pro'], xl: puppeteer.devices['Kindle Fire HDX landscape'], fp: puppeteer.devices['Kindle Fire HDX landscape']
}
const deviceIds = Object.keys(devices);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const takeSs = (browser, id) => {
  return new Promise(async (resolve) => {
    console.log(`${id} initialized.`);
    const page = await browser.newPage();
    page.once('load', async () => {
      console.log(`${id} page loaded.`);
      await sleep(5000);
      console.log(`${id} screenshot start.`);
      await page.screenshot({ path: `./dist/assets/thumbnail-${id}.jpg`, fullPage: id === 'fp' });
      console.log(`${id} screenshot end.`);
      await sleep(1000);
      await page.close();
      console.log(`${id} closed.`);
    });
    await page.emulate(devices[id]);
    await page.goto('https://nesign.github.io/niview');
    console.log(`${id} page loading.`);
    return resolve();
  });
}
(async () => {
  //const browser = await puppeteer.launch({ headless: false, slowMo: 1250, ignoreHTTPSErrors: true, args: ['--no-sandbox'] });
  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, args: ['--no-sandbox'] });
  for (let i = 0; i < deviceIds.length; i++) {
    await takeSs(browser, deviceIds[i]);
    await sleep(6000);
  }
  console.log('screenshots completed!');
  await sleep(6000);
  browser.close();
})();
