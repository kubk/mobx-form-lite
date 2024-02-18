import { test, expect } from "vitest";
import { deepClone } from "./deep-clone";

test("deepClone - simple", () => {
  expect(deepClone(1)).toBe(1);
  expect(deepClone("a")).toBe("a");
});

test("deepClone - nested", () => {
  const original = { a: { b: { c: 1 } } };
  const clone = deepClone(original);
  expect(clone).toMatchInlineSnapshot(`
    {
      "a": {
        "b": {
          "c": 1,
        },
      },
    }
  `);
});

test("deepClone - array", () => {
  const original = [1, 2, 3];
  const clone = deepClone(original);
  expect(clone).toMatchInlineSnapshot(`
    [
      1,
      2,
      3,
    ]
  `);
});
