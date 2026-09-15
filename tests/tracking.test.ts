import assert from "node:assert/strict";
import test from "node:test";
import { chromium } from "playwright";

test("tracking results follow the reference URL across navigation", { skip: !process.env.PORTAL_TEST_URL, timeout: 60_000 }, async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const baseURL = process.env.PORTAL_TEST_URL!;
    await page.goto(new URL("/track", baseURL).href);
    const input = page.getByRole("textbox", { name: "Shipment or booking reference" });
    await page.getByRole("button", { name: "Track shipment" }).click();
    assert.equal(await input.getAttribute("aria-invalid"), "true");
    assert.equal(await input.evaluate((element) => element === document.activeElement), true);

    await page.getByRole("button", { name: /Sea KHI/ }).click();
    await page.getByRole("heading", { name: "PSX-260907-002" }).waitFor();
    await page.waitForFunction(() => document.activeElement?.classList.contains("tracking-result"));
    await page.locator(".desktop-nav").getByRole("link", { name: "About", exact: true }).click();
    await page.waitForURL("**/about");
    await page.goBack();
    await page.waitForURL("**/track?ref=PSX-260907-002");
    await page.getByRole("heading", { name: "PSX-260907-002" }).waitFor({ timeout: 5_000 });
    assert.equal(await input.inputValue(), "PSX-260907-002");

    await page.locator(".header-actions").getByRole("link", { name: "Track shipment" }).click();
    await page.waitForURL("**/track");
    await page.locator(".tracking-welcome").waitFor({ timeout: 5_000 });
    assert.equal(await input.inputValue(), "");
    assert.equal(await page.locator(".shipment-detail").count(), 0);

    await input.fill("missing-reference");
    await page.getByRole("button", { name: "Track shipment" }).click();
    await page.getByRole("heading", { name: "We couldn’t find that reference." }).waitFor();
    assert.equal(new URL(page.url()).searchParams.get("ref"), "missing-reference");
    await page.waitForFunction(() => document.activeElement?.classList.contains("tracking-result"));
    await page.goto(new URL("/track?ref=PSX-260914-001&ref=PSX-260907-002", baseURL).href);
    await page.locator(".tracking-welcome").waitFor();
    assert.equal(await input.inputValue(), "");
  } finally {
    await browser.close();
  }
});
