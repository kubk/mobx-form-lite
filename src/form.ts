import { TextField } from "./fields/text-field";
import { BooleanField } from "./fields/boolean-field";

import { ListField } from "./fields/list-field";
import { isTouchableField } from "./interfaces/touchable-field";
import { isFieldWithValue } from "./interfaces/field-with-value";

type Form = Record<string, unknown>;

const walkAndCheck = (
  check: (
    field: TextField<unknown> | BooleanField | ListField<unknown>,
  ) => boolean,
  iterateArray: "some" | "every",
  defaultValue = false,
) => {
  return (form: Form) => {
    return Object.values(form)[iterateArray]((value) => {
      if (value instanceof TextField || value instanceof BooleanField) {
        return check(value);
      }
      if (value instanceof ListField) {
        const listFieldChecked = check(value);
        const listItemsChecked = value.value[iterateArray](
          walkAndCheck(check, iterateArray, defaultValue),
        );
        return [listItemsChecked, listFieldChecked][iterateArray](Boolean);
      }
      if (Array.isArray(value)) {
        return value[iterateArray](check);
      }
      if (typeof value === "object" && value !== null) {
        return Object.values(value)[iterateArray](
          walkAndCheck(check, iterateArray, defaultValue),
        );
      }
      return defaultValue;
    });
  };
};

/**
 * Check if form has any touched field with error
 */
export const isFormTouchedAndHasError = walkAndCheck(
  (field) => field.isTouched && !!field.error,
  "some",
);

/**
 * Check if form has any touched field
 */
export const isFormTouched = walkAndCheck((field) => field.isTouched, "some");
/**
 * Check if form has any field with error
 */
export const isFormValid = walkAndCheck((field) => !field.error, "every", true);
/**
 * Check if form has any touched field with error
 */
export const isFormTouchedAndValid = walkAndCheck(
  (field) => field.isTouched && !field.error,
  "some",
);
/**
 * Check if form has all the fields empty
 */
export const isFormEmpty = walkAndCheck((field) => !field.value, "every");

export const walkAndDo = (fn: (field: unknown) => void) => (form: Form) => {
  fn(form);

  const isObject = typeof form === "object" && form !== null;
  if (!isObject) {
    return;
  }

  Object.values(form).forEach((value) => {
    fn(value);
    if (Array.isArray(value)) {
      value.forEach(walkAndDo(fn));
    }
    if (value instanceof ListField) {
      value.value.forEach(walkAndDo(fn));
    }
    if (typeof value === "object" && value !== null) {
      Object.values(value).forEach(walkAndDo(fn));
    }
  });
};

/**
 * Set all fields as touched
 */
export const formTouchAll = walkAndDo((field: unknown) => {
  if (isTouchableField(field)) {
    field.touch();
  }
});

/**
 * Reset all fields
 */
export const formReset = walkAndDo((field: unknown) => {
  if (isFieldWithValue(field)) {
    field.reset();
  }
});

/**
 * Set all fields as untouched
 */
export const formUnTouchAll = walkAndDo((field: unknown) => {
  if (isTouchableField(field)) {
    field.unTouch();
  }
});

const getValueFromField = (field: unknown): unknown => {
  if (field instanceof TextField || field instanceof BooleanField) {
    return field.value;
  }
  if (field instanceof ListField) {
    return field.value.map(getValueFromField);
  }
  if (Array.isArray(field)) {
    return field.map(getValueFromField);
  }
  if (typeof field === "object" && field !== null) {
    return Object.fromEntries(
      Object.entries(field).map(([key, value]) => [
        key,
        getValueFromField(value),
      ]),
    );
  }
};

// TODO: Add recursive typescript return type
/**
 * Convert form to plain object recursively
 */
export const formToPlain = (form: Form): any => {
  const result: Form = {};
  Object.entries(form).forEach(([key, value]) => {
    result[key] = getValueFromField(value);
  });
  return result;
};
