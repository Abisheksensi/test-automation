const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('UI Test #1 — Login Flow', function () {
  this.timeout(20000); // allow 20 seconds
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: true }); // ✅ fix here
    page = await browser.newPage();
  });

  after(async () => {
    if (browser) await browser.close();
  });

  it('should login successfully', async () => {
    await page.goto('file://' + __dirname + '/../../public/login.html');

    await page.type('#email', 'test@example.com');
    await page.type('#password', 'password123');
    await page.click('#loginBtn');

    await page.waitForSelector('#successMessage', { timeout: 5000 });
    const message = await page.$eval('#successMessage', el => el.textContent);

    expect(message).to.include('Login successful');
  });
});

