export const required = (errorMessage: string) => (value: any) =>
  value ? undefined : errorMessage;

export const all = (...validators: any[]) => {
  return (value: any): string | undefined => {
    return validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );
  };
};

export const validators = { required, all };
