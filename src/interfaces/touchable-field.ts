export type TouchableField = {
  isTouched: boolean;
  touch: () => void;
  unTouch: () => void;
  isDirty: boolean;
};

export const isTouchableField = (object: any): object is TouchableField => {
  return (
    typeof object === "object" &&
    object !== null &&
    "isTouched" in object &&
    "touch" in object &&
    "unTouch" in object &&
    "isDirty" in object
  );
};
