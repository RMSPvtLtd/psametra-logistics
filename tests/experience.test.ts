import assert from 'node:assert/strict';
import test from 'node:test';
import { chromium, type BrowserContextOptions, type Page } from 'playwright';

const base = process.env.PORTAL_TEST_URL;
async function withPage(run: (page: Page) => Promise<void>, context: BrowserContextOptions = {}) {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light', ...context });
    page.setDefaultTimeout(5000);
    await run(page);
  } finally { await browser.close(); }
}
const options = { skip: !base, timeout: 30_000 };

async function heroGeometry(page: Page) {
  const geometry = await page.locator('.hero').evaluate(hero => {
    const stage = hero.querySelector<HTMLElement>('.hero-sticky')!;
    return { start: scrollY + hero.getBoundingClientRect().top - parseFloat(getComputedStyle(stage).top), travel: (hero as HTMLElement).offsetHeight - stage.clientHeight };
  });
  assert.ok(geometry.travel > 0, 'Enhanced hero must have a positive scroll range');
  return geometry;
}

async function scrollHero(page: Page, progress: number) {
  const { start, travel } = await heroGeometry(page);
  await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), start + travel * progress);
}

test('cold hero buffers ahead before the first scroll', options, () => withPage(async page => {
  await page.goto(base! + '/');
  await page.waitForFunction(() => {
    const film = document.querySelector('video');
    return film && film.buffered.length > 0 && film.buffered.end(0) > 2;
  });
  assert.equal(await page.evaluate(() => scrollY), 0);
}, { reducedMotion: 'no-preference' }));

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
}, { colorScheme: 'dark' }));

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
  await scrollHero(page, .82);
  await page.waitForFunction(() => document.querySelector('.hero')?.getAttribute('data-phase') === 'rotate');
  const mark = await page.locator('.hero-transition-mark').first().boundingBox();
  assert.ok(mark && mark.y >= 80 && mark.y + mark.height <= 720, 'Rotating mark must fit inside the visible hero');
}));

for (const viewport of [{ width: 390, height: 844 }, { width: 768, height: 1024 }]) {
  test(`touch hero completes film, rotation, split and latest-target reversal at ${viewport.width}px`, options, () => withPage(async page => {
    await page.goto(base! + '/');
    await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero')?.dataset.scrub === 'true');
    await page.waitForFunction(() => (document.querySelector('video')?.readyState ?? 0) >= 2);
    assert.equal(await page.locator('.hero-video').evaluate((film: HTMLVideoElement) => film.muted && film.playsInline), true);

    await scrollHero(page, .35);
    await page.waitForFunction(() => {
      const film = document.querySelector('video')!;
      return !film.seeking && Math.abs(film.currentTime - film.duration / 2) < .15;
    });
    assert.equal(await page.locator('.hero').getAttribute('data-phase'), 'film');
    await scrollHero(page, .735);
    await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero')?.dataset.phase === 'cover');
    const finalFrame = await page.locator('video').evaluate((film: HTMLVideoElement) => ({ time: film.currentTime, duration: film.duration, seeking: film.seeking, ready: film.readyState }));
    assert.ok(!finalFrame.seeking && finalFrame.ready >= 2 && finalFrame.time >= finalFrame.duration - .1, 'Cover must wait for the final film frame');

    await scrollHero(page, .81);
    await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero')?.dataset.phase === 'rotate');
    const rotation = await page.locator('.hero').evaluate(hero => ({ rotation: parseFloat((hero as HTMLElement).style.getPropertyValue('--mark-rotation')), split: parseFloat((hero as HTMLElement).style.getPropertyValue('--split-down')) }));
    assert.ok(rotation.rotation > 0 && rotation.rotation < 90);
    assert.equal(rotation.split, 0, 'Panels must remain closed during rotation');
    const mark = await page.locator('.hero-transition-mark').first().boundingBox();
    const stage = await page.locator('.hero-sticky').boundingBox();
    assert.ok(mark && stage && mark.x >= stage.x && mark.y >= stage.y && mark.x + mark.width <= stage.x + stage.width && mark.y + mark.height <= stage.y + stage.height, 'Rotated mark must fit inside the touch viewport');

    await scrollHero(page, .93);
    await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero')?.dataset.phase === 'split');
    const split = await page.locator('.hero').evaluate(hero => ({ rotation: parseFloat((hero as HTMLElement).style.getPropertyValue('--mark-rotation')), upper: new DOMMatrixReadOnly(getComputedStyle(hero.querySelector('.hero-panel-upper')!).transform).m42, lower: new DOMMatrixReadOnly(getComputedStyle(hero.querySelector('.hero-panel-lower')!).transform).m42 }));
    assert.equal(split.rotation, 90);
    assert.ok(split.upper < 0 && split.lower > 0, 'Both halves must move outwards');
    await scrollHero(page, 1);
    await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero-destination')?.inert === false);

    await scrollHero(page, .2);
    await page.waitForFunction(() => {
      const film = document.querySelector('video')!;
      return !film.seeking && Math.abs(film.currentTime - film.duration * .2 / .7) < .15;
    });
    assert.equal(await page.locator('.hero').getAttribute('data-phase'), 'film');
    assert.equal(await page.locator('.hero-scene').evaluate((scene: HTMLElement) => scene.inert), false);

    const { start, travel } = await heroGeometry(page);
    await page.evaluate(({ start, travel }) => new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Forward scroll did not start a seek')), 3000);
      document.querySelector('video')!.addEventListener('seeking', () => {
        clearTimeout(timer);
        window.scrollTo({ top: start + travel * .07, behavior: 'instant' });
        resolve();
      }, { once: true });
      window.scrollTo({ top: start + travel * .6, behavior: 'instant' });
    }), { start, travel });
    await page.waitForFunction(() => {
      const film = document.querySelector('video')!;
      return !film.seeking && Math.abs(film.currentTime - film.duration * .1) < .15;
    });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  }, { viewport, hasTouch: true, isMobile: true, reducedMotion: 'no-preference' }));
}

test('short touch landscape keeps all revealed actions reachable with enlarged text', options, () => withPage(async page => {
  await page.goto(base! + '/');
  await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero')?.dataset.scrub === 'true');
  await page.waitForFunction(() => (document.querySelector('video')?.readyState ?? 0) >= 2);
  // Font enlargement exercises content overflow without claiming real-device text zoom coverage.
  await page.locator('.hero-reveal p, .hero-reveal h2, .hero-reveal a span, .hero-reveal a strong').evaluateAll(elements => {
    const sizes = elements.map(element => parseFloat(getComputedStyle(element).fontSize) * 2);
    elements.forEach((element, index) => { (element as HTMLElement).style.fontSize = `${sizes[index]}px`; });
  });
  await scrollHero(page, 1);
  await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero-destination')?.inert === false);
  const links = page.locator('.hero-destination a[href]');
  assert.equal(await links.count(), 3);
  for (const link of await links.all()) {
    await link.evaluate(element => window.scrollBy({ top: element.getBoundingClientRect().top - document.querySelector('.site-header')!.getBoundingClientRect().bottom - 12, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero-destination')?.inert === false);
    const reachable = await link.evaluate(element => {
      const box = element.getBoundingClientRect();
      const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
      (element as HTMLElement).focus({ preventScroll: true });
      return box.top >= document.querySelector('.site-header')!.getBoundingClientRect().bottom && box.bottom <= innerHeight && element.contains(hit) && document.activeElement === element;
    });
    assert.equal(reachable, true, `Revealed action ${await link.getAttribute('href')} must be reachable by page scroll and keyboard`);
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
}, { viewport: { width: 667, height: 375 }, hasTouch: true, isMobile: true, reducedMotion: 'no-preference' }));

for (const selector of ['#connected h2', '.hero-reveal h2']) {
  test(`motion preference changes preserve the reading position at ${selector}`, options, () => withPage(async page => {
    await page.goto(base! + '/');
    await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero')?.dataset.scrub === 'false');
    await page.evaluate(() => document.fonts.ready);
    const heading = page.locator(selector);
    await heading.evaluate(element => window.scrollBy({ top: element.getBoundingClientRect().top - document.querySelector('.site-header')!.getBoundingClientRect().bottom - 24, behavior: 'instant' }));
    const before = await heading.evaluate(element => element.getBoundingClientRect().top);
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      await page.emulateMedia({ reducedMotion });
      await page.waitForFunction(expected => document.querySelector<HTMLElement>('.hero')?.dataset.scrub === expected, reducedMotion === 'reduce' ? 'false' : 'true');
      if (selector === '.hero-reveal h2') await page.waitForFunction(() => document.querySelector<HTMLElement>('.hero-destination')?.inert === false);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(null)))));
      const after = await heading.evaluate(element => element.getBoundingClientRect().top);
      assert.ok(Math.abs(after - before) <= 3, `${reducedMotion} moved the reading position by ${after - before}px`);
    }
  }, { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' }));
}

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
