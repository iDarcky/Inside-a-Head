const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[PAGE LOG ${msg.type()}]: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[PAGE ERROR]: ${err.message}`);
  });

  await page.goto('http://localhost:3000');

  // Wait a moment for JS to render
  await page.waitForTimeout(2000);

  await browser.close();
})();
