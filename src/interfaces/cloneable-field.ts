export type CloneableField<T> = {
  clone: () => T;
};

export const isCloneableField = (
  object: any,
): object is CloneableField<unknown> => {
  return typeof object === "object" && object !== null && "clone" in object;
};
