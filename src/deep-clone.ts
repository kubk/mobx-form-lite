/**
 * Uses browser's structuredClone if available,
 * otherwise fallback to JSON.parse(JSON.stringify(obj))
 *
 * JSON.parse(JSON.stringify(obj)) is not a good idea for deep cloning
 * because it doesn't work with functions, RegExp, Maps, Sets, etc.
 * but for our scenario is enough since mobx-form-lite doesn't use these types
 */
export const deepClone = <T>(obj: T): T => {
  return typeof structuredClone === "function"
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj));
};
