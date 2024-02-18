import { makeAutoObservable } from "mobx";
import { TouchableField } from "../interfaces/touchable-field";
import { ClonableField } from "../interfaces/clonable-field";
import { FieldWithError } from "../interfaces/field-with-error";
import { FieldWithValue } from "../interfaces/field-with-value";

export class BooleanField
  implements
    TouchableField,
    ClonableField<BooleanField>,
    FieldWithError,
    FieldWithValue<boolean>
{
  isTouched = false;

  readonly initialValue: boolean;

  constructor(
    public value: boolean,
    public validate?: (value: any) => string | undefined,
  ) {
    makeAutoObservable(this, { validate: false }, { autoBind: true });
    this.initialValue = value;
  }

  setValue(value: boolean) {
    this.value = value;
    this.isTouched = true;
  }

  toggle() {
    this.setValue(!this.value);
  }

  get error() {
    return this.validate?.(this.value);
  }

  touch() {
    this.isTouched = true;
  }

  unTouch() {
    this.isTouched = false;
  }

  clone() {
    return new BooleanField(this.value, this.validate);
  }

  reset() {
    this.setValue(this.initialValue);
  }
}
