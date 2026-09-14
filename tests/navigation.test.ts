import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldTransition } from "../src/lib/navigation.ts";

test("only cross-page same-origin navigation is intercepted", () => {
  const current = new URL("https://example.com/services/");
  for (const href of [
    "/services",
    "/services/#ai",
    "/services/?view=all",
    "https://external.example/work",
    "mailto:hello@example.com",
  ]) {
    assert.equal(
      shouldTransition(current, new URL(href, current)),
      false,
      href,
    );
  }
  for (const href of ["/work", "/about/", "/work/#systems"]) {
    assert.equal(shouldTransition(current, new URL(href, current)), true, href);
  }
});
