import { makeAutoObservable } from "mobx";
import { FieldWithValue } from "./field-with-value";
import { TouchableField } from "./touchable-field";
import { ClonableField } from "./clonable-field";
import { FieldWithError } from "./field-with-error";

export class TextField<T>
  implements
    FieldWithValue<T>,
    TouchableField,
    ClonableField<TextField<T>>,
    FieldWithError
{
  isTouched = false;

  constructor(
    public value: T,
    public validate?: (value: any) => string | undefined,
    public onChangeCallback?: (newValue: T) => void,
  ) {
    makeAutoObservable(this, { validate: false }, { autoBind: true });
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
}
