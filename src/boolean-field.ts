import { makeAutoObservable } from "mobx";
import { TouchableField } from "./touchable-field";
import { ClonableField } from "./clonable-field";
import { FieldWithError } from "./field-with-error";

export class BooleanField
  implements TouchableField, ClonableField<BooleanField>, FieldWithError
{
  isTouched = false;

  constructor(
    public value: boolean,
    public validate?: (value: any) => string | undefined,
  ) {
    makeAutoObservable(this, { validate: false }, { autoBind: true });
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
}
