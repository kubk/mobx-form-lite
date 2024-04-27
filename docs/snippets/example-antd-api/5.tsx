import {
  TextField,
  formTouchAll,
  isFormValid,
  formToPlain,
} from "mobx-form-lite";
import { action, makeAutoObservable } from "mobx";

class LoginFormStore {
  form = {
    email: new TextField("", { validate: validateEmail }),
    password: new TextField("", { validate: validatePassword }),
  };

  isSubmitting = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  submit() {
    formTouchAll(this.form);
    if (!isFormValid(this.form)) {
      return;
    }

    this.isSubmitting = true;

    login(formToPlain(this.form))
      .then(() => {
        alert("Login successful");
      })
      .catch((reason) => {
        alert(reason.message);
      })
      .finally(
        action(() => {
          this.isSubmitting = false;
        }),
      );
  }
}
