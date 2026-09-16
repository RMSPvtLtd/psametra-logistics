import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const base = process.env.BASE_URL || 'http://127.0.0.1:3001';
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const report = [];
try {
  for (const colorScheme of ['light', 'dark']) {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, colorScheme });
    for (const route of ['/', '/services', '/track?ref=PSX-260914-001', '/quote', '/platform', '/portal-demo', '/portal-demo?tab=quotes', '/portal-demo?tab=documents', '/about', '/contact']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.addScriptTag({ path: require.resolve('axe-core') });
      const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) })));
      report.push({ colorScheme, width, route, violations });
      console.log(`${violations.length ? 'FAIL' : 'PASS'} ${colorScheme} ${width} ${route} ${violations.map(v => v.id).join(', ')}`);
    }
    await page.close();
  }
  }
} finally {
  await browser.close();
  await mkdir('test-results', { recursive: true });
  await writeFile('test-results/accessibility-report.json', JSON.stringify(report, null, 2));
}
assert.ok(report.every(item => item.violations.length === 0), 'Accessibility violations: see test-results/accessibility-report.json');
