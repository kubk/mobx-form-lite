import { makeAutoObservable } from "mobx";
import { TouchableField } from "../interfaces/touchable-field";
import { FieldWithValue } from "../interfaces/field-with-value";
import { deepClone } from "../deep-clone";

export class ListField<T> implements TouchableField, FieldWithValue<T[]> {
  isTouched = false;

  readonly initialValue: T[];

  constructor(
    public value: T[],
    public validate?: (value: T[]) => string | undefined,
  ) {
    makeAutoObservable(this, { validate: false }, { autoBind: true });
    this.initialValue = deepClone(value);
  }

  push(value: T) {
    this.touch();
    this.value.push(value);
  }

  setValue(value: T[]) {
    this.touch();
    this.value = value;
  }

  removeByIndex(index: number) {
    this.touch();
    this.value.splice(index, 1);
  }

  removeByCondition(condition: (value: T) => boolean) {
    this.touch();
    this.value = this.value.filter((value) => !condition(value));
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

  reset() {
    this.setValue(this.initialValue);
  }
}
