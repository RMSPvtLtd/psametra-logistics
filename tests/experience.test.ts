import assert from 'node:assert/strict';
import test from 'node:test';
import { chromium, type Page } from 'playwright';

const base = process.env.PORTAL_TEST_URL;
async function withPage(run: (page: Page) => Promise<void>, colorScheme: 'light' | 'dark' = 'light') {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme });
    page.setDefaultTimeout(5000);
    await run(page);
  } finally { await browser.close(); }
}
const options = { skip: !base, timeout: 30_000 };

test('theme follows the system and preserves an explicit choice across routes and reloads', options, () => withPage(async page => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base! + '/');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.getByRole('button', { name: 'Use light theme' }).click();
  await page.locator('.desktop-nav').getByRole('link', { name: 'Services' }).click();
  await page.waitForURL('**/services');
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  await page.setViewportSize({ width: 360, height: 800 });
  await page.getByRole('button', { name: 'Use dark theme' }).click();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  assert.deepEqual(errors, []);
}, 'dark'));

test('theme works when browser storage is unavailable', options, () => withPage(async page => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Denied', 'SecurityError'); } });
  });
  await page.goto(base! + '/quote');
  await page.getByRole('button', { name: 'Use dark theme' }).click();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
}));

test('mobile navigation stays reachable in landscape and resets at desktop width', options, () => withPage(async page => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.goto(base! + '/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const contact = page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Contact psametra' });
  await contact.scrollIntoViewIfNeeded();
  const box = await contact.boundingBox();
  assert.ok(box && box.y >= 70 && box.y + box.height <= 375, 'Last menu action must be reachable within the viewport');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#mobile-menu')!).display === 'none');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
}));

test('short desktop hero keeps actions visible and ultrawide transition contains its mark', options, () => withPage(async page => {
  await page.setViewportSize({ width: 1440, height: 500 });
  await page.goto(base! + '/');
  await page.waitForFunction(() => document.querySelector('.hero')?.getAttribute('data-scrub') === 'true');
  const actions = await page.locator('.hero-actions').boundingBox();
  assert.ok(actions && actions.y + actions.height <= 500, 'Sticky hero must not strand its actions below the viewport');
  await page.setViewportSize({ width: 2560, height: 720 });
  await page.waitForFunction(() => (document.querySelector('video')?.readyState ?? 0) >= 2);
  await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('.hero')!;
    const film = document.querySelector('video')!;
    window.scrollTo({ top: (hero.offsetHeight - film.clientHeight) * .82, behavior: 'instant' });
  });
  await page.waitForFunction(() => document.querySelector('.hero')?.getAttribute('data-phase') === 'rotate');
  const mark = await page.locator('.hero-transition-mark').first().boundingBox();
  assert.ok(mark && mark.y >= 80 && mark.y + mark.height <= 720, 'Rotating mark must fit inside the visible hero');
}));

test('quote completion wraps every accepted route value on mobile', options, () => withPage(async page => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base! + '/quote');
  await page.locator('#quote-mode-Air').check();
  await page.locator('#quote-origin').fill('A'.repeat(120));
  await page.locator('#quote-destination').fill('Dubai, UAE');
  await page.locator('#quote-incoterm').selectOption('FCA');
  const ready = new Date(); ready.setDate(ready.getDate() + 7);
  await page.locator('#quote-readyDate').fill(`${ready.getFullYear()}-${String(ready.getMonth()+1).padStart(2,'0')}-${String(ready.getDate()).padStart(2,'0')}`);
  await page.getByRole('button', { name: 'Continue to cargo' }).click();
  await page.locator('#quote-cargo').fill('Sample components');
  await page.locator('#quote-weightKg').fill('250');
  await page.locator('#quote-pieces').fill('5');
  await page.getByRole('button', { name: 'Continue to contact' }).click();
  await page.locator('#quote-company').fill('Example');
  await page.locator('#quote-contactName').fill('Sample Person');
  await page.locator('#quote-email').fill('sample@example.com');
  await page.getByRole('button', { name: 'Continue to review' }).click();
  await page.getByRole('button', { name: 'Complete demo inquiry' }).click();
  await page.getByRole('heading', { name: 'Your shipment brief is ready.' }).waitFor();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
}));
