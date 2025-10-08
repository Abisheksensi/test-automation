const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('UI Test #2 — Add Item Flow', function () {
  this.timeout(20000);
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: true }); // ✅ fix here
    page = await browser.newPage();
  });

  after(async () => {
    if (browser) await browser.close();
  });

  it('should add a new item successfully', async () => {
    await page.goto('file://' + __dirname + '/../../public/add-item.html');

    await page.type('#itemName', 'Laptop');
    await page.type('#itemPrice', '1500');
    await page.click('#addBtn');

    await page.waitForSelector('#successMessage', { timeout: 5000 });
    const message = await page.$eval('#successMessage', el => el.textContent);

    expect(message).to.include('Item added');
  });
});
