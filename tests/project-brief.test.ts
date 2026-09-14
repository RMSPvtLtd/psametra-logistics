import { test } from "node:test";
import assert from "node:assert/strict";
import {
  briefFieldError,
  formatProjectBrief,
  projectEmailUrl,
} from "../src/lib/project-brief.ts";

test("brief preserves Unicode, multiline requirements, and omitted optional company", () => {
  const result = formatProjectBrief({
    name: "  Zoë  ",
    email: "zoe@example.com",
    company: "  ",
    service: "AI Systems",
    details: "Source references.\nHuman review & approval.",
  });
  assert.ok(result.includes("Name: Zoë\n"));
  assert.ok(result.includes("Company: Not specified\n"));
  assert.ok(result.endsWith("Source references.\nHuman review & approval."));
});

test("meaningful name and description are required, not whitespace padding", () => {
  assert.ok(briefFieldError("name", " \t\n "));
  assert.ok(briefFieldError("details", "                    "));
  assert.ok(
    briefFieldError("details", "                 short                 "),
  );
  assert.equal(briefFieldError("name", "  Saad  "), "");
  assert.equal(
    briefFieldError("details", "A focused operations platform."),
    "",
  );
});

test("email draft round-trips Unicode, newlines and query characters without extra parameters", () => {
  const brief = {
    name: "Zoë & Khan",
    email: "qa@example.com",
    company: "R&D",
    service: "AI Systems",
    details: "Review source A?\nThen evaluate B & C #1.",
  };
  const url = new URL(projectEmailUrl("rmspvtltd.software@gmail.com", brief));
  assert.equal(url.pathname, "rmspvtltd.software@gmail.com");
  assert.equal(url.searchParams.size, 2);
  assert.equal(url.searchParams.get("body"), formatProjectBrief(brief));
});
