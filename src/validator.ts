// https://codesandbox.io/s/github/final-form/react-final-form/tree/master/examples/field-level-validation?file=/index.js
export const validators = {
  required: (errorMessage: string) => (value: any) =>
    value ? undefined : errorMessage,
  all:
    (...validators: any[]) =>
    (value: any): string | undefined =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined,
      ),
};
