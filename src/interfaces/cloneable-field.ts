export type CloneableField<T> = {
  clone: () => T;
};
