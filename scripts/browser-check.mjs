import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

// Run the app first, then npm run test:browser. Portal actions are covered by
// PORTAL_TEST_URL=http://127.0.0.1:3000 npm test (PowerShell: $env:PORTAL_TEST_URL=...).
const baseURL = new URL(process.env.BASE_URL || 'http://127.0.0.1:3000');
const output = resolve('test-results');
const routes = ['/', '/services', '/track', '/quote', '/platform', '/portal-demo', '/about', '/contact'];
const sizes = [
  { name: 'desktop', width: 1440, height: 1000, touch: false },
  { name: 'tablet', width: 768, height: 1024, touch: true },
  { name: 'mobile', width: 390, height: 844, touch: true },
];
const report = { startedAt: new Date().toISOString(), baseURL: baseURL.href, checks: [], browserErrors: [], expectedBrowserErrors: [], links: [], film: null, note: 'Portal action coverage runs separately with PORTAL_TEST_URL. Screenshots require human visual review. Seek checks do not measure frame rate or real-device smoothness.' };
const links = new Set();
await mkdir(output, { recursive: true });

async function waitForServer() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseURL, { signal: AbortSignal.timeout(2000) });
      if (response.ok) return;
    } catch { /* The caller starts the server; allow a bounded startup window. */ }
    await new Promise((done) => setTimeout(done, 500));
  }
  throw new Error(`No successful response from ${baseURL} within 45 seconds. Start the app before running this check.`);
}

function captureErrors(page, expectedFailureURL) {
  page.on('pageerror', (error) => report.browserErrors.push({ url: page.url(), type: 'pageerror', message: error.message }));
  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    const expected = expectedFailureURL && message.location().url === expectedFailureURL && message.text() === 'Failed to load resource: net::ERR_FAILED';
    (expected ? report.expectedBrowserErrors : report.browserErrors).push({ url: page.url(), type: 'console', message: message.text(), source: message.location().url });
  });
}

async function check(name, page, action) {
  const started = Date.now();
  try {
    const details = await action();
    report.checks.push({ name, passed: true, durationMs: Date.now() - started, ...details });
    console.log(`PASS ${name}`);
  } catch (error) {
    report.checks.push({ name, passed: false, durationMs: Date.now() - started, error: error.stack || String(error) });
    console.error(`FAIL ${name}: ${error.message}`);
    if (page && !page.isClosed()) await page.screenshot({ path: resolve(output, `failure-${name.replace(/[^a-z0-9-]/gi, '-')}.png`), fullPage: true }).catch(() => {});
  }
}

async function visit(page, route) {
  const response = await page.goto(new URL(route, baseURL).href, { waitUntil: 'networkidle' });
  assert.ok(response?.ok(), `${route} returned ${response?.status()}`);
  await page.locator('h1').waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
}

async function assertNoOverflow(page) {
  const dimensions = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
  assert.ok(dimensions.content <= dimensions.viewport + 1, `Horizontal overflow: ${dimensions.content}px content in ${dimensions.viewport}px viewport`);
}

async function showHeading(page, name) {
  await page.getByRole('heading', { name, exact: true }).waitFor({ state: 'visible' });
}

async function assertFocused(locator) {
  assert.equal(await locator.evaluate((element) => element === document.activeElement), true, 'Expected field or control to receive keyboard focus');
}

async function assertPosterFallback(page, noScript = false) {
  if (noScript) assert.equal(await page.locator('.hero').getAttribute('data-scrub'), null);
  else await page.waitForFunction(() => document.querySelector('.hero')?.dataset.scrub === 'false');
  const fallback = await page.locator('.hero').evaluate((hero) => {
    const film = hero.querySelector('.hero-video');
    const poster = hero.querySelector('.hero-poster');
    const sticky = hero.querySelector('.hero-sticky');
    const scene = hero.querySelector('.hero-scene');
    const destination = hero.querySelector('.hero-destination');
    return {
      source: film.getAttribute('src'), sourceCount: film.querySelectorAll('source').length,
      filmDisplay: getComputedStyle(film).display,
      posterDecoded: poster.complete && poster.naturalWidth > 0,
      sceneOpacity: Number(getComputedStyle(scene).opacity), sceneInert: scene.inert,
      destinationInert: destination.inert, actionsInert: hero.querySelector('.hero-actions').inert,
      transitionDisplay: getComputedStyle(hero.querySelector('.hero-transition')).display,
      stickyPosition: getComputedStyle(sticky).position,
      destinationPosition: getComputedStyle(destination).position,
      heroHeight: hero.offsetHeight, contentHeight: sticky.offsetHeight,
    };
  });
  assert.equal(fallback.source, null, 'Fallback must release the video source');
  assert.equal(fallback.sourceCount, 0);
  assert.equal(fallback.filmDisplay, 'none');
  assert.equal(fallback.posterDecoded, true, 'Fallback poster must be decoded');
  assert.equal(fallback.sceneOpacity, 1);
  assert.equal(fallback.sceneInert, false);
  assert.equal(fallback.destinationInert, false, 'Fallback must release destination interactions');
  assert.equal(fallback.actionsInert, false);
  assert.equal(fallback.transitionDisplay, 'none');
  assert.notEqual(fallback.stickyPosition, 'sticky', 'Fallback must not trap scrolling in the film sequence');
  assert.notEqual(fallback.destinationPosition, 'absolute', 'Destination must return to normal document flow');
  assert.ok(Math.abs(fallback.heroHeight - fallback.contentHeight) <= 1, 'Fallback height must follow its content rather than retain the tall scrub section');
  const destinationLink = page.locator('.hero-destination a[href]').first();
  await destinationLink.focus();
  await assertFocused(destinationLink);
  await assertNoOverflow(page);
  return fallback;
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  for (const size of sizes) {
    const context = await browser.newContext({ viewport: { width: size.width, height: size.height }, isMobile: size.touch, hasTouch: size.touch, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    page.setDefaultTimeout(15_000);
    captureErrors(page);
    for (const route of routes) {
      const name = `${size.name}-${route === '/' ? 'home' : route.slice(1)}`;
      await check(name, page, async () => {
        await visit(page, route);
        if (route === '/') {
          await page.waitForFunction(() => document.querySelector('.hero')?.dataset.scrub === 'true');
          await page.waitForFunction(() => {
            const film = document.querySelector('.hero-video');
            return film instanceof HTMLVideoElement && film.readyState >= 2 && film.videoWidth > 0;
          });
          assert.equal(await page.locator('.hero-sticky').evaluate(stage => getComputedStyle(stage).position), 'sticky', 'Supported desktop, tablet and phone contexts must enable the film');
        }
        const title = await page.title();
        assert.match(title, /Psametra/i, 'Every route needs branded page metadata');
        assert.equal(await page.locator('h1').count(), 1, 'Every route needs one main heading');
        assert.ok((await page.locator('h1').innerText()).trim().length > 0, 'The main heading cannot be blank');
        await page.evaluate(async () => {
          for (let top = 0; top < document.documentElement.scrollHeight; top += window.innerHeight) {
            window.scrollTo({ top, behavior: 'instant' });
            await new Promise((done) => setTimeout(done, 90));
          }
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
        await page.waitForFunction(() => [...document.images].every((image) => image.complete));
        const brokenImages = await page.locator('img').evaluateAll((images) => images.filter((image) => !image.naturalWidth).map((image) => image.currentSrc || image.src));
        assert.deepEqual(brokenImages, [], 'Images should render successfully');
        await assertNoOverflow(page);
        const routeLinks = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((anchor) => anchor.href));
        for (const href of routeLinks) {
          const url = new URL(href);
          if (url.origin === baseURL.origin) { url.hash = ''; links.add(url.href); }
        }
        const screenshot = `${name}.png`;
        await page.screenshot({ path: resolve(output, screenshot), fullPage: true, animations: 'disabled' });
        return { title, screenshot };
      });
    }
    if (size.name === 'mobile') {
      await check('mobile-navigation-keyboard', page, async () => {
        await visit(page, '/');
        const toggle = page.getByRole('button', { name: 'Open navigation', exact: true });
        await toggle.click();
        const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
        assert.equal(await nav.isVisible(), true);
        await page.keyboard.press('Escape');
        assert.equal(await nav.isVisible(), false);
        await assertFocused(toggle);
        await toggle.click();
        await nav.getByRole('link', { name: 'Services', exact: true }).click();
        await page.waitForURL(new URL('/services', baseURL).href);
        assert.equal(await nav.isVisible(), false);
      });
    }
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', acceptDownloads: true });
  const page = await context.newPage();
  page.setDefaultTimeout(15_000);
  captureErrors(page);

  await check('local-route-links', page, async () => {
    assert.ok(links.size >= routes.length, 'Route inspection should discover all main routes');
    for (const href of links) {
      const response = await context.request.get(href);
      report.links.push({ href, status: response.status() });
      assert.ok(response.ok(), `Local link ${href} returned ${response.status()}`);
    }
    return { count: links.size };
  });

  await check('tracking-empty-invalid-and-sample', page, async () => {
    await visit(page, '/track');
    const reference = page.getByRole('textbox', { name: 'Shipment or booking reference' });
    await page.getByRole('button', { name: 'Track shipment', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: 'Enter a shipment reference' }).waitFor();
    await assertFocused(reference);
    await reference.fill('NOT-A-SHIPMENT-123');
    await page.getByRole('button', { name: 'Track shipment', exact: true }).click();
    await showHeading(page, 'We couldn’t find that reference.');
    await page.getByRole('button', { name: 'Try demo shipment', exact: true }).click();
    await page.getByText('PSX-260914-001', { exact: true }).first().waitFor();
    const result = page.locator('.shipment-detail');
    assert.match(await result.innerText(), /Lahore/);
    assert.match(await result.innerText(), /Dubai/);
    assert.match(await result.innerText(), /Airborne/);
    assert.equal(new URL(page.url()).searchParams.get('ref'), 'PSX-260914-001');
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByText('PSX-260914-001', { exact: true }).first().waitFor();
    await page.screenshot({ path: resolve(output, 'desktop-tracking-result.png'), fullPage: true });
  });

  await check('quote-validation-back-review-and-download', page, async () => {
    await visit(page, '/quote');
    await page.getByRole('button', { name: 'Continue to cargo' }).click();
    await page.getByText('Choose a transport mode.', { exact: true }).waitFor();
    await assertFocused(page.getByRole('radio', { name: 'Air freight', exact: true }));
    await page.getByRole('radio', { name: 'Air freight', exact: true }).check();
    await page.getByLabel('Origin city & country', { exact: true }).fill('Lahore, Pakistan');
    await page.getByLabel('Destination city & country', { exact: true }).fill('Lahore, Pakistan');
    await page.getByLabel('Incoterm', { exact: true }).selectOption('FCA');
    const readyDate = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    await page.getByLabel('Cargo-ready date', { exact: true }).fill(readyDate);
    await page.getByRole('button', { name: 'Continue to cargo' }).click();
    await page.getByText('Choose a destination different from the origin.', { exact: true }).waitFor();
    await assertFocused(page.getByLabel('Destination city & country', { exact: true }));
    await page.getByLabel('Destination city & country', { exact: true }).fill('Dubai, UAE');
    await page.getByRole('button', { name: 'Continue to cargo' }).click();
    await showHeading(page, 'Tell us about the cargo.');
    await page.getByLabel('Cargo description', { exact: true }).fill('Precision components');
    await page.getByLabel('Total gross weight (kg)', { exact: true }).fill('0');
    await page.getByLabel('Number of pieces', { exact: true }).fill('5');
    await page.getByLabel('Length (cm) · optional', { exact: true }).fill('50');
    await page.getByRole('button', { name: 'Continue to contact' }).click();
    assert.equal(await page.getByLabel('Total gross weight (kg)', { exact: true }).getAttribute('aria-invalid'), 'true');
    await assertFocused(page.getByLabel('Total gross weight (kg)', { exact: true }));
    await page.getByLabel('Total gross weight (kg)', { exact: true }).fill('250');
    await page.getByLabel('Width (cm) · optional', { exact: true }).fill('40');
    await page.getByLabel('Height (cm) · optional', { exact: true }).fill('30');
    await page.getByLabel('Total volume (m³) · optional', { exact: true }).fill('0.3');
    await page.getByRole('button', { name: 'Continue to contact' }).click();
    await showHeading(page, 'Who is planning the move?');
    await page.getByLabel('Company', { exact: true }).fill('Meridian Components');
    await page.getByLabel('Contact name', { exact: true }).fill('Sam Taylor');
    await page.getByLabel('Email address', { exact: true }).fill('not-an-email');
    await page.getByRole('button', { name: 'Continue to review' }).click();
    await page.getByText('Enter a valid email address.', { exact: true }).waitFor();
    await assertFocused(page.getByLabel('Email address', { exact: true }));
    await page.getByLabel('Email address', { exact: true }).fill('sam@example.com');
    await page.getByLabel('Handling requirements or notes · optional', { exact: true }).fill('Keep cartons dry. Example inquiry only.');
    await page.getByRole('button', { name: 'Continue to review' }).click();
    await showHeading(page, 'One final look.');
    assert.match(await page.locator('.review-grid').innerText(), /250 kg/);
    assert.match(await page.locator('.review-grid').innerText(), /50 × 40 × 30 cm/);
    await page.getByRole('button', { name: 'Back', exact: true }).click();
    assert.equal(await page.getByLabel('Email address', { exact: true }).inputValue(), 'sam@example.com');
    await page.getByRole('button', { name: 'Back', exact: true }).click();
    assert.equal(await page.getByLabel('Total gross weight (kg)', { exact: true }).inputValue(), '250');
    await page.getByRole('button', { name: 'Back', exact: true }).click();
    assert.equal(await page.getByLabel('Cargo-ready date', { exact: true }).inputValue(), readyDate);
    assert.equal(await page.getByLabel('Destination city & country', { exact: true }).inputValue(), 'Dubai, UAE');
    await page.getByRole('button', { name: 'Continue to cargo' }).click();
    await page.getByRole('button', { name: 'Continue to contact' }).click();
    await page.getByRole('button', { name: 'Continue to review' }).click();
    await page.screenshot({ path: resolve(output, 'desktop-quote-review.png'), fullPage: true });
    await page.getByRole('button', { name: 'Complete demo inquiry' }).click();
    await showHeading(page, 'Your shipment brief is ready.');
    await assertFocused(page.getByRole('heading', { name: 'Your shipment brief is ready.', exact: true }));
    const downloadReady = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download inquiry' }).click();
    const download = await downloadReady;
    assert.equal(download.suggestedFilename(), 'psametra-demo-inquiry.txt');
    const downloadPath = resolve(output, 'psametra-demo-inquiry.txt');
    await download.saveAs(downloadPath);
    const summary = await readFile(downloadPath, 'utf8');
    assert.match(summary, /not been sent/);
    assert.match(summary, /No rate or booking/);
    assert.match(summary, /sam@example.com/);
    assert.match(summary, /Lahore, Pakistan/);
    assert.match(summary, /Dubai, UAE/);
    await page.screenshot({ path: resolve(output, 'desktop-quote-success.png'), fullPage: true });
    await page.getByRole('button', { name: 'Edit inquiry', exact: true }).click();
    await showHeading(page, 'One final look.');
    await page.reload({ waitUntil: 'networkidle' });
    await showHeading(page, 'Where is it going?');
    assert.equal(await page.getByLabel('Origin city & country', { exact: true }).inputValue(), '');
  });

  await check('homepage-desktop-film-seeks', page, async () => {
    await visit(page, '/');
    await page.waitForFunction(() => document.querySelector('.hero')?.dataset.scrub === 'true');
    await page.waitForFunction(() => {
      const film = document.querySelector('.hero-video');
      return film instanceof HTMLVideoElement && film.readyState >= 1 && film.duration > 0 && !film.seeking;
    });
    const geometry = await page.locator('.hero').evaluate((hero) => {
      const stage = hero.querySelector('.hero-sticky');
      return { start: window.scrollY + hero.getBoundingClientRect().top - parseFloat(getComputedStyle(stage).top), travel: hero.offsetHeight - stage.clientHeight };
    });
    assert.ok(geometry.travel > 0, 'Scrub must have a measurable scroll range');
    const scrollToProgress = async (progress) => page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), geometry.start + geometry.travel * progress);
    const before = await page.locator('.hero-video').evaluate((film) => film.currentTime);
    await scrollToProgress(.35);
    await page.waitForFunction((time) => {
      const film = document.querySelector('.hero-video');
      return film instanceof HTMLVideoElement && !film.seeking && film.currentTime > time + 0.5;
    }, before);
    report.film = await page.locator('.hero-video').evaluate((film) => ({ duration: film.duration, timeAfterScroll: film.currentTime, width: film.videoWidth, height: film.videoHeight, muted: film.muted, source: film.currentSrc }));
    assert.ok(report.film.width > 0 && report.film.height > 0, 'Film metadata must include valid dimensions');
    assert.equal(report.film.muted, true);
    assert.equal(await page.locator('.hero').getAttribute('data-phase'), 'film');
    await page.screenshot({ path: resolve(output, 'desktop-home-film-progress.png') });

    await page.locator('.hero').evaluate((hero) => {
      const film = hero.querySelector('.hero-video');
      window.__heroCoverFrames = [];
      const observer = new MutationObserver(() => {
        if (Number(hero.style.getPropertyValue('--cover')) > 0) window.__heroCoverFrames.push({ readyState: film.readyState, seeking: film.seeking, time: film.currentTime, duration: film.duration });
      });
      observer.observe(hero, { attributes: true, attributeFilter: ['style', 'data-phase'] });
      window.__heroCoverObserver = observer;
      const decoded = (_now, metadata) => { window.__heroDecodedTime = metadata.mediaTime; window.__heroFrameCallback = film.requestVideoFrameCallback(decoded); };
      window.__heroFrameCallback = film.requestVideoFrameCallback(decoded);
    });
    // Jump across the decode boundary so the cover guard is exercised while seeking.
    await scrollToProgress(.735);
    await page.waitForFunction(() => {
      const hero = document.querySelector('.hero');
      const film = hero.querySelector('.hero-video');
      return hero.dataset.phase === 'cover' && window.__heroDecodedTime >= film.duration - .1;
    });
    const coverFrames = await page.evaluate(() => { window.__heroCoverObserver.disconnect(); return window.__heroCoverFrames; });
    assert.ok(coverFrames.length > 0, 'The cover must become visible');
    assert.ok(coverFrames.every((frame) => frame.readyState >= 2 && !frame.seeking && frame.time >= frame.duration - .1), 'Every visible cover update must follow the decoded final film frame');
    const cover = await page.locator('.hero').evaluate((hero) => ({ cover: Number(hero.style.getPropertyValue('--cover')), rotate: parseFloat(hero.style.getPropertyValue('--mark-rotation')), split: parseFloat(hero.style.getPropertyValue('--split-down')) }));
    assert.ok(cover.cover > 0 && cover.cover < 1);
    assert.equal(cover.rotate, 0, 'Cover must precede mark rotation');
    assert.equal(cover.split, 0, 'Cover must precede the split');
    await page.screenshot({ path: resolve(output, 'desktop-home-film-cover.png') });

    await scrollToProgress(.81);
    await page.waitForFunction(() => document.querySelector('.hero')?.dataset.phase === 'rotate');
    const rotation = await page.locator('.hero').evaluate((hero) => ({ cover: Number(hero.style.getPropertyValue('--cover')), rotate: parseFloat(hero.style.getPropertyValue('--mark-rotation')), split: parseFloat(hero.style.getPropertyValue('--split-down')), sceneInert: hero.querySelector('.hero-scene').inert }));
    assert.equal(rotation.cover, 1);
    assert.ok(rotation.rotate > 0 && rotation.rotate < 90);
    assert.equal(rotation.split, 0, 'Panels must remain closed during rotation');
    assert.equal(rotation.sceneInert, true, 'Hidden scene links must not remain focusable');

    await scrollToProgress(.93);
    await page.waitForFunction(() => parseFloat(document.querySelector('.hero')?.style.getPropertyValue('--split-down') || '0') > 40);
    const split = await page.locator('.hero').evaluate((hero) => {
      const mark = new DOMMatrixReadOnly(getComputedStyle(hero.querySelector('.hero-transition-mark')).transform);
      return {
        phase: hero.dataset.phase, rotation: parseFloat(hero.style.getPropertyValue('--mark-rotation')),
        markA: mark.a, markB: mark.b,
        upperY: new DOMMatrixReadOnly(getComputedStyle(hero.querySelector('.hero-panel-upper')).transform).m42,
        lowerY: new DOMMatrixReadOnly(getComputedStyle(hero.querySelector('.hero-panel-lower')).transform).m42,
        destinationInert: hero.querySelector('.hero-destination').inert,
      };
    });
    assert.equal(split.phase, 'split');
    assert.equal(split.rotation, 90, 'The mark must finish its quarter turn before splitting');
    assert.ok(Math.abs(split.markA) < .001 && Math.abs(split.markB - 1) < .001, 'The rendered mark must actually rotate 90 degrees');
    assert.ok(split.upperY < 0 && split.lowerY > 0, 'Upper and lower panels must move in opposite directions');
    assert.ok(Math.abs(split.upperY + split.lowerY) < 1, 'Split panel travel must be symmetric');
    assert.equal(split.destinationInert, true, 'Destination must remain inert while the split still covers it');
    await page.screenshot({ path: resolve(output, 'desktop-home-film-split.png') });

    await scrollToProgress(1);
    await page.waitForFunction(() => document.querySelector('.hero-destination')?.inert === false);
    assert.equal(await page.locator('.hero').evaluate((hero) => parseFloat(hero.style.getPropertyValue('--split-down'))), 100);
    const destinationLink = page.locator('.hero-destination a[href]').first();
    await destinationLink.focus();
    await assertFocused(destinationLink);
    await page.screenshot({ path: resolve(output, 'desktop-home-film-destination.png') });

    await scrollToProgress(.2);
    await page.waitForFunction(() => {
      const hero = document.querySelector('.hero');
      const film = hero.querySelector('.hero-video');
      return hero.dataset.phase === 'film' && !film.seeking && film.readyState >= 2 && film.currentTime < film.duration / 2;
    });
    const reversed = await page.locator('.hero').evaluate((hero) => ({ cover: Number(hero.style.getPropertyValue('--cover')), rotation: parseFloat(hero.style.getPropertyValue('--mark-rotation')), split: parseFloat(hero.style.getPropertyValue('--split-down')), opacity: Number(getComputedStyle(hero.querySelector('.hero-scene')).opacity), actionsInert: hero.querySelector('.hero-actions').inert, sceneInert: hero.querySelector('.hero-scene').inert, destinationInert: hero.querySelector('.hero-destination').inert }));
    assert.deepEqual(reversed, { cover: 0, rotation: 0, split: 0, opacity: 1, actionsInert: false, sceneInert: false, destinationInert: true });
    const quoteLink = page.locator('.hero-actions a[href="/quote"]');
    await quoteLink.focus();
    await assertFocused(quoteLink);
    await page.locator('.hero-video').evaluate((film) => film.cancelVideoFrameCallback(window.__heroFrameCallback));
    report.film.sequence = { geometry, firstVisibleCover: coverFrames[0], cover, rotation, split, reversed };
    return { phases: ['film', 'cover', 'rotate', 'split', 'destination', 'reverse'], finalDecodedTime: coverFrames[0].time };
  });

  await check('platform-filters-and-next-actions', page, async () => {
    await visit(page, '/platform');
    const filters = page.getByRole('group', { name: 'Filter operations queue' });
    assert.equal(await page.locator('.tower-shipment').count(), 2);
    for (const [label, reference, heading] of [
      ['On hold', 'PSX-260914-004', 'Packing list required'],
      ['At risk', 'PSX-260907-002', 'Arrival window revised'],
      ['In transit', 'PSX-260914-001', 'Arrival at DXB'],
    ]) {
      await filters.getByRole('button', { name: new RegExp('^' + label) }).click();
      assert.equal(await page.locator('.tower-shipment').count(), 1);
      await page.locator('.tower-detail').getByRole('heading', { name: heading, exact: true }).waitFor();
      assert.equal(await page.getByRole('link', { name: 'View customer-safe update' }).getAttribute('href'), '/track?ref=' + reference);
    }
    await filters.getByRole('button', { name: /Needs attention/ }).click();
    assert.equal(await page.locator('.tower-shipment').count(), 2);
    await page.locator('.tower-shipment').last().click();
    await page.locator('.tower-detail').getByRole('heading', { name: 'Packing list required' }).waitFor();
  });

  await check('homepage-connected-journey', page, async () => {
    await visit(page, '/');
    const journey = page.getByRole('group', { name: 'Explore the freight journey' });
    await journey.getByRole('button', { name: /Resolve/ }).click();
    await showHeading(page, 'An exception deserves a next step.');
    assert.equal(await journey.getByRole('button', { name: /Resolve/ }).getAttribute('aria-pressed'), 'true');
    assert.equal(await page.getByRole('link', { name: 'Explore the control tower', exact: true }).getAttribute('href'), '/platform');
    assert.match(await page.locator('.journey-record').innerText(), /Arrival window revised/);
    await journey.getByRole('button', { name: /Track/ }).click();
    assert.equal(await page.getByRole('link', { name: 'Follow a sample journey' }).getAttribute('href'), '/track?ref=PSX-260907-002');
    await journey.getByRole('button', { name: /Close/ }).click();
    await showHeading(page, 'Every document. In its place.');
    assert.equal(await page.getByRole('link', { name: 'Open sample documents', exact: true }).getAttribute('href'), '/portal-demo?tab=documents');
  });
  await context.close();

  const desktopReduced = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const desktopReducedPage = await desktopReduced.newPage();
  captureErrors(desktopReducedPage);
  await check('desktop-reduced-motion-poster', desktopReducedPage, async () => {
    await visit(desktopReducedPage, '/');
    const fallback = await assertPosterFallback(desktopReducedPage);
    await desktopReducedPage.screenshot({ path: resolve(output, 'desktop-home-reduced-motion.png'), fullPage: true });
    return fallback;
  });
  await desktopReduced.close();

  const failedFilm = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  const failedFilmPage = await failedFilm.newPage();
  const filmURL = new URL('/media/freight-film.mp4', baseURL).href;
  let failedFilmRequests = 0;
  captureErrors(failedFilmPage, filmURL);
  failedFilmPage.on('requestfailed', (request) => { if (request.url() === filmURL) failedFilmRequests += 1; });
  await failedFilm.route(filmURL, (route) => route.abort('failed'));
  await check('desktop-video-error-poster', failedFilmPage, async () => {
    await visit(failedFilmPage, '/');
    const fallback = await assertPosterFallback(failedFilmPage);
    assert.ok(failedFilmRequests > 0, 'The fallback check must actually trigger a video request failure');
    await failedFilmPage.screenshot({ path: resolve(output, 'desktop-home-video-error.png'), fullPage: true });
    return { ...fallback, failedFilmRequests };
  });
  await failedFilm.close();

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  captureErrors(reducedPage);
  await check('mobile-reduced-motion-poster', reducedPage, async () => {
    await visit(reducedPage, '/');
    const fallback = await assertPosterFallback(reducedPage);
    await reducedPage.screenshot({ path: resolve(output, 'mobile-home-reduced-motion.png'), fullPage: true });
    return fallback;
  });
  await reduced.close();
  for (const noScript of [false, true]) {
    const fallbackContext = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'no-preference', javaScriptEnabled: !noScript });
    const fallbackPage = await fallbackContext.newPage();
    captureErrors(fallbackPage);
    if (!noScript) await fallbackPage.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true } }));
    await check(`mobile-${noScript ? 'no-script' : 'save-data'}-poster`, fallbackPage, async () => {
      await visit(fallbackPage, '/');
      return assertPosterFallback(fallbackPage, noScript);
    });
    await fallbackContext.close();
  }
  await check('no-browser-errors', null, async () => assert.deepEqual(report.browserErrors, [], 'Pages must not emit console errors or uncaught exceptions'));
} catch (error) {
  report.checks.push({ name: 'browser-check-setup', passed: false, error: error.stack || String(error) });
  console.error(error.message);
} finally {
  if (browser) await browser.close();
  report.finishedAt = new Date().toISOString();
  report.passed = report.checks.every((check) => check.passed);
  await writeFile(resolve(output, 'browser-report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Browser report: ${resolve(output, 'browser-report.json')}`);
  if (!report.passed) process.exitCode = 1;
}
