const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

test('should', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.goto(
    'file:///Users/jackdwyer/fs/openCourses/jest/js-testing-introduction/index.html'
  );
  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.click('input#age');
  await page.type('input#age', '28');
  await page.click('button#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Anna (28 years old)');
}, 10000);
