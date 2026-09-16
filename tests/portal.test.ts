import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { chromium } from "playwright";
import { customers, documents, quotes, shipments } from "../src/data/demo.ts";

// Run against the local app: $env:PORTAL_TEST_URL='http://127.0.0.1:3000'; npm test
test("portal filters, quote acceptance, sample documents and public document privacy", { skip: !process.env.PORTAL_TEST_URL, timeout: 90_000 }, async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const baseURL = process.env.PORTAL_TEST_URL!;
    await page.goto(new URL("/portal-demo", baseURL).href);
    await page.getByRole("tab", { name: /Shipments/ }).waitFor();
    assert.equal(await page.locator(".portal-shipment-row").count(), shipments.filter((shipment) => shipment.status !== "Delivered").length);
    await page.getByRole("button", { name: /^Completed/ }).click();
    assert.equal(await page.locator(".portal-shipment-row").count(), shipments.filter((shipment) => shipment.status === "Delivered").length);
    await page.getByRole("searchbox", { name: /Search shipments/ }).fill("no-such-shipment");
    await page.getByText("No completed shipments match").waitFor();
    assert.equal(await page.locator(".portal-detail").count(), 0);
    await page.getByRole("button", { name: "Clear search" }).click();
    assert.equal(await page.locator(".portal-shipment-row").count(), 1);

    await page.getByRole("tab", { name: /Quotes/ }).click();
    const pendingQuote = quotes.find((quote) => quote.status === "Awaiting acceptance")!;
    await page.getByRole("button", { name: `View quote ${pendingQuote.id}` }).click();
    await page.getByRole("button", { name: /Confirm sample acceptance/ }).focus();
    await page.keyboard.press("Enter");
    const quoteDialog = page.getByRole("dialog");
    assert.match(await quoteDialog.innerText(), /Accepted in this preview/);
    assert.equal(await quoteDialog.getByRole("button", { name: "Accepted", exact: true }).isDisabled(), true);
    assert.equal(await quoteDialog.getByRole("button", { name: "Close quote" }).evaluate(element => element === document.activeElement), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("button", { name: `View quote ${pendingQuote.id}` }).evaluate((element) => element === document.activeElement), true);
    const expiredQuote = quotes.find((quote) => quote.status === "Expired")!;
    await page.getByRole("button", { name: `View quote ${expiredQuote.id}` }).click();
    assert.equal(await page.getByRole("dialog").getByRole("button", { name: "Expired", exact: true }).isDisabled(), true);
    await page.keyboard.press("Escape");

    await page.getByRole("tab", { name: /Documents/ }).click();
    const invoice = documents.find((document) => document.type === "Invoice")!;
    const invoiceButton = page.getByRole("button", { name: `View ${invoice.name}, ${invoice.reference}` });
    await invoiceButton.click();
    assert.match(await page.getByRole("dialog").innerText(), new RegExp(customers[0].name));
    const downloadReady = page.waitForEvent("download");
    await page.getByRole("button", { name: /Download sample .txt/ }).click();
    const download = await downloadReady;
    assert.equal(download.suggestedFilename(), `SAMPLE-${invoice.reference}.txt`);
    const contents = await readFile((await download.path())!, "utf8");
    assert.match(contents, /SAMPLE — FOR DEMONSTRATION ONLY/);
    assert.ok(contents.includes(invoice.shipmentId));
    assert.ok(contents.includes(invoice.lines![0].description));
    await page.keyboard.press("Escape");
    assert.equal(await invoiceButton.evaluate((element) => element === document.activeElement), true);
    const pendingDocument = documents.find((document) => document.status === "Pending")!;
    assert.equal(await page.getByRole("button", { name: `${pendingDocument.name} is pending` }).isDisabled(), true);

    await page.reload();
    await page.getByRole("tab", { name: /Quotes/ }).click();
    await page.getByRole("button", { name: `View quote ${pendingQuote.id}` }).click();
    assert.equal(await page.getByRole("button", { name: /Confirm sample acceptance/ }).isEnabled(), true);

    await page.goto(new URL(`/track?ref=${shipments[0].id}`, baseURL).href);
    await page.locator(".shipment-detail").waitFor();
    assert.equal(await page.getByRole("button", { name: `View ${invoice.name}, ${invoice.reference}` }).count(), 0);
    const publicDocument = documents.find((document) => document.shipmentId === shipments[0].id && document.public && document.status === "Ready")!;
    await page.getByRole("button", { name: `View ${publicDocument.name}, ${publicDocument.reference}` }).click();
    assert.equal((await page.getByRole("dialog").innerText()).includes(customers[0].name), false);
    await page.goto(new URL("/portal-demo?tab=documents", baseURL).href);
    assert.equal(await page.getByRole("tab", { name: /Documents/ }).getAttribute("aria-selected"), "true");
  } finally {
    await browser.close();
  }
});

test("portal header navigation resets a linked section to Shipments", { skip: !process.env.PORTAL_TEST_URL, timeout: 30_000 }, async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(new URL("/portal-demo?tab=quotes", process.env.PORTAL_TEST_URL!).href);
    assert.equal(await page.getByRole("tab", { name: /Quotes/ }).getAttribute("aria-selected"), "true");
    await page.locator(".header-actions").getByRole("link", { name: "Customer portal" }).click();
    await page.waitForURL("**/portal-demo");
    await page.getByRole("tab", { name: /Shipments/, selected: true }).waitFor({ timeout: 5_000 });
    assert.equal(await page.getByRole("tab", { name: /Quotes/ }).getAttribute("aria-selected"), "false");
  } finally {
    await browser.close();
  }
});
