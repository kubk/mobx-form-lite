import { makeAutoObservable } from "mobx";
import { FieldWithValue } from "../interfaces/field-with-value";

/**
 * Boolean toggle suitable for toggles
 */
export class BooleanToggle implements FieldWithValue<boolean> {
  readonly initialValue: boolean;

  constructor(public value: boolean) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.initialValue = value;
  }

  toggle() {
    this.value = !this.value;
  }

  setTrue() {
    this.value = true;
  }

  setFalse() {
    this.value = false;
  }

  setValue(value: boolean) {
    this.value = value;
  }

  reset() {
    this.setValue(this.initialValue);
  }
}
