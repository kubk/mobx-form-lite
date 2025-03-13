import { TextField } from "./fields/text-field";
import { BooleanField } from "./fields/boolean-field";
import { ListField } from "./fields/list-field";
import { isTouchableField } from "./interfaces/touchable-field";
import { isFieldWithValue } from "./interfaces/field-with-value";

export type Form = Record<string, unknown>;

const walkAndCheck = (
  check: (
    field: TextField<unknown> | BooleanField | ListField<unknown>,
  ) => boolean,
  iterateArray: "some" | "every",
  defaultValue = false,
) => {
  return (form: Form): boolean => {
    return Object.values(form)[iterateArray]((value) => {
      if (value instanceof TextField || value instanceof BooleanField) {
        return check(value);
      }
      if (value instanceof ListField) {
        const listFieldChecked = check(value);
        const listItemsChecked: boolean = value.value[iterateArray](
          (listItem) => {
            return listItem instanceof TextField
              ? check(listItem)
              : walkAndCheck(check, iterateArray, defaultValue)(listItem);
          },
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
 * Check if form has any field with error
 */
export const isFormValid = walkAndCheck((field) => !field.error, "every", true);

/**
 * Check if form has any touched field
 *
 * A touched field is a field that has been focused and then blurred
 */
export const isFormTouched = walkAndCheck((field) => field.isTouched, "some");

/**
 * Check if form has any touched field with error
 *
 * A touched field is a field that has been focused and then blurred
 */
export const isFormTouchedAndHasError = walkAndCheck(
  (field) => field.isTouched && !!field.error,
  "some",
);

/**
 * Check if form has any touched field with error
 *
 * A touched field is a field that has been focused and then blurred
 */
export const isFormTouchedAndValid = walkAndCheck(
  (field) => field.isTouched && !field.error,
  "some",
);

/**
 * Check if form has any changed field
 */
export const isFormDirty = walkAndCheck((field) => {
  return isTouchableField(field) && field.isDirty;
}, "some");

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
 * Set all fields as touched recursively
 *
 * A touched field is a field that has been focused and then blurred
 */
export const formTouchAll = walkAndDo((field: unknown) => {
  if (isTouchableField(field)) {
    field.touch();
  }
});

/**
 * Set all fields as untouched
 *
 A touched field is a field that has been focused and then blurred
 */
export const formUnTouchAll = walkAndDo((field: unknown) => {
  if (isTouchableField(field)) {
    field.unTouch();
  }
});

/**
 * Reset all fields recursively
 */
export const formReset = walkAndDo((field: unknown) => {
  if (isFieldWithValue(field)) {
    field.reset();
  }
});

