export type FieldWithValue<T> = {
  value: T;
  reset: () => void;
};

export const isFieldWithValue = (
  object: unknown,
): object is FieldWithValue<unknown> => {
  return (
    typeof object === "object" &&
    object !== null &&
    "value" in object &&
    "reset" in object
  );
};
