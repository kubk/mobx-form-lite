import { makeAutoObservable, action } from "mobx";
import { TextField } from "mobx-form-lite";

class UserFormStore {
  form = {
    name: new TextField('', { validate: validateName }),
    email: new TextField('', { validate: validateEmail }),
  };

  constructor() {
    makeAutoObservable(this);
  }
}
