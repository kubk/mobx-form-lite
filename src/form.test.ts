import { expect, test } from "vitest";
import { TextField } from "./fields/text-field";
import {
  formReset,
  formToPlain,
  formTouchAll,
  formUnTouchAll,
  isFormDirty,
  isFormEmpty,
  isFormTouched,
  isFormTouchedAndValid,
  isFormValid,
} from "./form";
import { validators } from "./validator";
import { BooleanField } from "./fields/boolean-field";
import { ListField } from "./fields/list-field";

const isRequiredMessage = "is required";

test("isFormTouchedAndHasError", () => {
  const f1 = {
    a: new TextField("a"),
    b: new TextField("b"),
  };
  expect(isFormValid(f1)).toBeTruthy();
  expect(isFormTouchedAndValid(f1)).toBeFalsy();

  expect(
    isFormValid({
      a: new TextField("a"),
      b: [new TextField("b"), new TextField("d")],
    }),
  ).toBeTruthy();

  const f2 = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    b: [
      new TextField("b", { validate: validators.required(isRequiredMessage) }),
      new TextField("d"),
    ],
  };

  f2.a.touch();
  expect(isFormValid(f2)).toBeTruthy();
  expect(isFormTouchedAndValid(f2)).toBeTruthy();

  f2.a.onChange("");
  expect(isFormValid(f2)).toBeFalsy();
  expect(isFormTouchedAndValid(f2)).toBeFalsy();

  f2.a.onChange("smth");
  expect(isFormValid(f2)).toBeTruthy();
  expect(isFormTouchedAndValid(f2)).toBeTruthy();

  f2.b[0].touch();
  expect(isFormTouchedAndValid(f2)).toBeTruthy();

  f2.b[0].onChange("");
  expect(isFormTouchedAndValid(f2)).toBeTruthy();
});

test("is form dirty", () => {
  const f = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    b: [
      new TextField("b", { validate: validators.required(isRequiredMessage) }),
      new TextField("d"),
    ],
  };

  expect(isFormDirty(f)).toBeFalsy();

  f.a.onChange("");
  expect(isFormDirty(f)).toBeTruthy();
});

test("is form invalid by default", () => {
  const f = {
    a: new TextField("", { validate: validators.required(isRequiredMessage) }),
  };

  expect(isFormValid(f)).toBeFalsy();

  f.a.onChange("1");
  expect(isFormValid(f)).toBeTruthy();
});

test("is boolean form dirty", () => {
  const f = {
    a: new BooleanField(false),
  };

  expect(isFormDirty(f)).toBeFalsy();

  f.a.toggle();
  expect(isFormDirty(f)).toBeTruthy();
});

test("is form empty", () => {
  const f = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    b: [
      new TextField("b", { validate: validators.required(isRequiredMessage) }),
      new TextField("d"),
    ],
  };

  expect(isFormEmpty(f)).toBeFalsy();

  f.a.onChange("");
  f.b[0].onChange("");
  expect(isFormEmpty(f)).toBeFalsy();

  f.b[1].onChange("");
  expect(isFormEmpty(f)).toBeTruthy();
});

test("very nested form - only fields", () => {
  const f = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    b: {
      c: {
        d: new TextField("d", {
          validate: validators.required(isRequiredMessage),
        }),
      },
    },
  };

  expect(isFormValid(f)).toBeTruthy();
  expect(isFormDirty(f)).toBeFalsy();

  f.b.c.d.onChange("");

  expect(isFormDirty(f)).toBeTruthy();
  expect(isFormValid(f)).toBeFalsy();
});

test("very nested form - any fields", () => {
  const f = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    num: 12,
    b: {
      c: {
        d: new TextField("d", {
          validate: validators.required(isRequiredMessage),
        }),
        k: null,
      },
    },
  };

  expect(isFormValid(f)).toBeTruthy();
  expect(isFormDirty(f)).toBeFalsy();

  f.b.c.d.onChange("");

  expect(isFormDirty(f)).toBeTruthy();
  expect(isFormValid(f)).toBeFalsy();
});

test("formIsTouched with ListField and nested fields", () => {
  const f = {
    a: new TextField(""),
    b: new ListField([new TextField(""), new TextField("")]),
  };

  expect(isFormTouched(f)).toBeFalsy();
  f.a.touch();
  expect(isFormTouched(f)).toBeTruthy();
  formUnTouchAll(f);
  expect(isFormTouched(f)).toBeFalsy();

  f.b.push(new TextField(""));
  expect(isFormTouched(f)).toBeTruthy();
  formUnTouchAll(f);
  expect(isFormTouched(f)).toBeFalsy();

  const f2 = {
    b: new ListField([
      {
        id: 1,
        text: new TextField(""),
      },
    ]),
  };
  expect(isFormDirty(f2)).toBeFalsy();
  expect(isFormTouched(f2)).toBeFalsy();
  f2.b.value[0].text.onChange("1");
  expect(isFormDirty(f2)).toBeTruthy();
  expect(isFormTouched(f2)).toBeFalsy();
  f2.b.value[0].text.onBlur();
  expect(isFormTouched(f2)).toBeTruthy();
});

test("work with an array of fields", () => {
  const f = {
    a: [new TextField(""), new TextField("")],
  };

  expect(isFormDirty(f)).toBeFalsy();
  expect(isFormTouched(f)).toBeFalsy();
  f.a[0].onChange("1");
  expect(isFormDirty(f)).toBeTruthy();
  expect(isFormTouched(f)).toBeFalsy();
  f.a[0].onBlur();
  expect(isFormTouched(f)).toBeTruthy();
  formUnTouchAll(f);
  expect(isFormDirty(f)).toBeFalsy();
  expect(isFormTouched(f)).toBeFalsy();
});

test("formTouchAll / formUnTouchAll", () => {
  const f = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    b: {
      c: {
        d: new TextField("d", {
          validate: validators.required(isRequiredMessage),
        }),
        k: null,
      },
    },
    e: [new TextField("")],
    d: new ListField<number>([]),
  };

  expect(isFormTouched(f)).toBeFalsy();
  expect(isFormTouched(f)).toBeFalsy();
  expect(isFormTouched(f.b.c)).toBeFalsy();

  formTouchAll(f);

  expect(isFormTouched(f)).toBeTruthy();
  expect(isFormTouched(f)).toBeTruthy();
  expect(isFormTouched(f.b.c)).toBeTruthy();

  formUnTouchAll(f);

  expect(isFormTouched(f)).toBeFalsy();
  expect(isFormTouched(f)).toBeFalsy();
  expect(isFormTouched(f.b.c)).toBeFalsy();

  f.e[0].touch();
  expect(isFormTouched(f)).toBeTruthy();

  formUnTouchAll(f);
  expect(isFormTouched(f)).toBeFalsy();

  f.d.push(1);
  expect(isFormTouched(f)).toBeTruthy();

  formUnTouchAll(f);
  expect(isFormTouched(f)).toBeFalsy();
});

test("form reset - simple", () => {
  const f = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    b: new TextField("b", { validate: validators.required(isRequiredMessage) }),
  };

  f.a.onChange("1");
  f.b.onChange("2");
  expect(f.a.value).toBe("1");
  expect(f.b.value).toBe("2");

  f.a.reset();
  expect(f.a.value).toBe("a");
  expect(f.b.value).toBe("2");

  f.b.reset();
  expect(f.a.value).toBe("a");
  expect(f.b.value).toBe("b");

  f.a.onChange("1");
  f.b.onChange("2");
  expect(f.a.value).toBe("1");
  expect(f.b.value).toBe("2");
  formReset(f);

  expect(f.a.value).toBe("a");
  expect(f.b.value).toBe("b");
});

test("form reset - nested", () => {
  const f = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    b: {
      c: {
        d: new TextField("d", {
          validate: validators.required(isRequiredMessage),
        }),
        e: new BooleanField(true),
        f: new ListField([new TextField("init 1"), new TextField("init 2")]),
        k: null,
      },
    },
  };

  f.a.onChange("1");
  f.b.c.d.onChange("2");
  f.b.c.e.setValue(false);
  f.b.c.f.push(new TextField("3"));
  expect(f.a.value).toBe("1");
  expect(f.b.c.d.value).toBe("2");
  expect(f.b.c.e.value).toBe(false);
  expect(f.b.c.f.value.length).toBe(3);

  formReset(f);

  expect(f.a.value).toBe("a");
  expect(f.b.c.d.value).toBe("d");
  expect(f.b.c.e.value).toBe(true);
  expect(f.b.c.f.value.length).toBe(2);
});

test("formToPlain", () => {
  const f = {
    a: new TextField("a", { validate: validators.required(isRequiredMessage) }),
    b: {
      c: {
        d: new TextField("d", {
          validate: validators.required(isRequiredMessage),
        }),
        e: new BooleanField(true),
        f: new ListField([new TextField("init 1"), new TextField("init 2")]),
        k: null,
      },
    },
  };

  const plain = formToPlain(f);

  expect(plain).toEqual({
    a: "a",
    b: {
      c: {
        d: "d",
        e: true,
        f: ["init 1", "init 2"],
      },
    },
  });
});

test("validator all", () => {
  const onlyNumbers = (value: unknown) => {
    if (typeof value !== "string") {
      return false;
    }

    return value.match(/\d+/g) ? undefined : "Only numbers";
  };
  const lengthMoreThan = (n: number) => (value: unknown) => {
    if (typeof value !== "string") {
      return false;
    }

    return value.length > n ? undefined : `Length should be more than ${n}`;
  };

  const f = {
    name: new TextField("", {
      validate: validators.all(onlyNumbers, lengthMoreThan(3)),
    }),
  };

  expect(isFormValid(f)).toBeFalsy();
  expect(f.name.error).toMatchInlineSnapshot('"Only numbers"');
  f.name.onChange("23");
  expect(isFormValid(f)).toBeFalsy();
  expect(f.name.error).toMatchInlineSnapshot('"Length should be more than 3"');
  f.name.onChange("2323");
  expect(isFormValid(f)).toBeTruthy();
  f.name.onChange("23223");
  expect(isFormValid(f)).toBeTruthy();
});
