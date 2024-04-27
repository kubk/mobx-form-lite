import { describe, expect, test } from "vitest";
import { TextField } from "./text-field";

describe("TextField", () => {
  test("value / onChange", () => {
    const field = new TextField("initial value");
    expect(field.value).toBe("initial value");
    field.onChange("new value");
    expect(field.value).toBe("new value");
  });

  test("error", () => {
    const field = new TextField("", {
      validate: (value) => (value ? undefined : "Required"),
    });
    expect(field.error).toBe("Required");
    field.onChange("value");
    expect(field.error).toBe(undefined);
  });

  test("cuts non-numeric symbols", () => {
    const field = new TextField("", {
      beforeChange: (value) =>
        typeof value === "string" ? value.replace(/\D/g, "") : 0,
    });
    field.onChange("123abc");
    expect(field.value).toBe("123");
  });

  test("triggers afterChange", () => {
    let newValue = "";
    const field = new TextField("", {
      afterChange: (value) => {
        newValue = value;
      },
    });
    field.onChange("new value");
    expect(newValue).toBe("new value");
  });

  test("can clone", () => {
    const field = new TextField("", {
      validate: (value) => (!value ? "error" : undefined),
    });
    const cloned = field.clone();
    expect(field.error).toBe("error");
    field.onChange("new value");
    expect(cloned.value).toBe("");
    expect(cloned.error).toBe("error");
  });
});
