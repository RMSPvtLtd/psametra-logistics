import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { themeBootstrap } from "../src/components/navigation/theme-config.ts";

test("prepaint theme honors system, explicit choices, and storage denial", () => {
  for (const [stored, systemDark, denied, expected] of [
    [null, true, false, "dark"],
    [null, false, false, "light"],
    ["light", true, false, "light"],
    ["dark", false, false, "dark"],
    ["invalid", true, false, "dark"],
    [null, true, true, "dark"],
  ] as const) {
    const dataset: Record<string, string> = {};
    runInNewContext(themeBootstrap, {
      document: { documentElement: { dataset } },
      localStorage: {
        getItem: () => {
          if (denied) throw new Error("Storage denied");
          return stored;
        },
      },
      matchMedia: () => ({ matches: systemDark }),
    });
    assert.equal(dataset.theme, expected);
  }
});
