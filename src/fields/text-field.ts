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

  readonly initialValue: T;

  constructor(
    public value: T,
    public readonly options?: {
      validate?: (value: any) => string | undefined;
      onChangeCallback?: (newValue: T) => void;
    },
  ) {
    makeAutoObservable(this, { options: false }, { autoBind: true });
    this.initialValue = value;
  }

  onChange(value: T) {
    this.value = value;
    this.isTouched = true;
    this.options?.onChangeCallback?.(value);
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
  }

  clone() {
    return new TextField(this.value, this.options);
  }

  reset() {
    this.onChange(this.initialValue);
  }
}
