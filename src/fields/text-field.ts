import { makeAutoObservable } from "mobx";
import { FieldWithValue } from "../interfaces/field-with-value";
import { TouchableField } from "../interfaces/touchable-field";
import { ClonableField } from "../interfaces/clonable-field";
import { FieldWithError } from "../interfaces/field-with-error";

/**
 * Text field suitable for regular and textarea inputs
 */
export class TextField<T>
  implements
    FieldWithValue<T>,
    TouchableField,
    ClonableField<TextField<T>>,
    FieldWithError
{
  isTouched = false;

  readonly initialValue: T;

  constructor(
    public value: T,
    public validate?: (value: any) => string | undefined,
    public onChangeCallback?: (newValue: T) => void,
  ) {
    makeAutoObservable(this, { validate: false }, { autoBind: true });
    this.initialValue = value;
  }

  onChange(value: T) {
    this.value = value;
    this.isTouched = true;
    this.onChangeCallback?.(value);
  }

  get error() {
    return this.validate?.(this.value);
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
    return new TextField(this.value, this.validate);
  }

  reset() {
    this.onChange(this.initialValue);
  }
}
