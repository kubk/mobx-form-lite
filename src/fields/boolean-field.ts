import { makeAutoObservable } from "mobx";
import { TouchableField } from "../interfaces/touchable-field";
import { CloneableField } from "../interfaces/cloneable-field";
import { FieldWithError } from "../interfaces/field-with-error";
import { FieldWithValue } from "../interfaces/field-with-value";

/**
 * Boolean field suitable for checkboxes
 */
export class BooleanField
  implements
    TouchableField,
    CloneableField<BooleanField>,
    FieldWithError,
    FieldWithValue<boolean>
{
  isTouched = false;
  isDirty = false;

  readonly initialValue: boolean;

  constructor(
    public value: boolean,
    public options?: {
      validate?: (value: any) => string | undefined;
    },
  ) {
    makeAutoObservable(this, { options: false }, { autoBind: true });
    this.initialValue = value;
  }

  setValue(value: boolean) {
    this.value = value;
    this.isDirty = true;
  }

  toggle() {
    this.setValue(!this.value);
  }

  get error() {
    return this.options?.validate?.(this.value);
  }

  touch() {
    this.isTouched = true;
  }

  unTouch() {
    this.isTouched = false;
    this.isDirty = false;
  }

  clone() {
    return new BooleanField(this.value, this.options);
  }

  reset() {
    this.setValue(this.initialValue);
  }
}
