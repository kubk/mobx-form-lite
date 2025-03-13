import { BooleanField } from "./fields/boolean-field";
import { ListField } from "./fields/list-field";
import { TextField } from "./fields/text-field";
import { Form } from "./form";

// Define a type that recursively transforms a form type to its plain value type
export type FormToPlain<T> = T extends TextField<infer U>
  ? U
  : T extends BooleanField
  ? boolean
  : T extends ListField<infer U>
  ? FormToPlain<U>[]
  : T extends Array<infer U>
  ? FormToPlain<U>[]
  : T extends object
  ? { [K in keyof T]: FormToPlain<T[K]> }
  : T;

const getValueFromField = <T>(field: T): FormToPlain<T> => {
    if (field instanceof TextField || field instanceof BooleanField) {
      return field.value as FormToPlain<T>;
    }
    if (field instanceof ListField) {
      return field.value.map(getValueFromField) as FormToPlain<T>;
    }
    if (Array.isArray(field)) {
      return field.map(getValueFromField) as FormToPlain<T>;
    }
    if (typeof field === "object" && field !== null) {
      return Object.fromEntries(
        Object.entries(field).map(([key, value]) => [
          key,
          getValueFromField(value),
        ]),
      ) as FormToPlain<T>;
    }

    // Return primitive values as-is
    return field as FormToPlain<T>;
  };
  
  /**
   * Convert form to plain object recursively
   */
  export const formToPlain = <T extends Form>(form: T): FormToPlain<T> => {
    const result = {} as FormToPlain<T>;
    Object.entries(form).forEach(([key, value]) => {
      (result as any)[key] = getValueFromField(value);
    });
    return result;
  };