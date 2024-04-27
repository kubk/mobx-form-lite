import { makeAutoObservable } from "mobx";
import { FieldWithValue } from "../interfaces/field-with-value";
import { TouchableField } from "../interfaces/touchable-field";
import { CloneableField } from "../interfaces/cloneable-field";
import { FieldWithError } from "../interfaces/field-with-error";

/**
 * Text field suitable for regular and textarea inputs
 */
export class TextField<T>
  implements
    FieldWithValue<T>,
    TouchableField,
    CloneableField<TextField<T>>,
    FieldWithError
{
  isTouched = false;
  isDirty = false;

  readonly initialValue: T;

  constructor(
    public value: T,
    public readonly options?: {
      validate?: (value: any) => string | undefined;
      afterChange?: (newValue: T) => void;
      beforeChange?: (oldValue: unknown) => T;
    },
  ) {
    makeAutoObservable(this, { options: false }, { autoBind: true });
    this.initialValue = value;
  }

  onChange(value: T) {
    this.value = this.options?.beforeChange
      ? this.options.beforeChange(value)
      : value;
    this.isDirty = true;
    this.options?.afterChange?.(value);
  }

  get error() {
    return this.options?.validate?.(this.value);
  }

  touch() {
    this.isTouched = true;
  }

  onBlur() {
    this.touch();
  }

  unTouch() {
    this.isTouched = false;
    this.isDirty = false;
  }

  clone() {
    return new TextField(this.value, this.options);
  }

  reset() {
    this.onChange(this.initialValue);
  }
}
