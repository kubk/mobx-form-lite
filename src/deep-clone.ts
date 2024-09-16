import { TextField } from "./fields/text-field";
import { isCloneableField } from "./interfaces/cloneable-field";

/**
 * Uses browser's structuredClone if available,
 * otherwise fallback to JSON.parse(JSON.stringify(obj))
 *
 * JSON.parse(JSON.stringify(obj)) is not a good idea for deep cloning
 * because it doesn't work with functions, RegExp, Maps, Sets, etc.
 * but for our scenario is enough since mobx-form-lite doesn't use these types
 */
export const deepClone = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(deepClone) as any as T;
  }
  if (isCloneableField(obj)) {
    return obj.clone() as any as T;
  }

  return typeof structuredClone === "function"
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj));
};
