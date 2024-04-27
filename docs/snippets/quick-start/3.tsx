import { makeAutoObservable } from "mobx";
import { TextField } from "mobx-form-lite";
import { apiLoadUser } from "./path/to/api";

type UserForm = {
  name: TextField<string>;
  email: TextField<string>;
};

const createUserForm = (name: string, email: string) => {
  return {
    name: new TextField(name, { validate: validateName }),
    email: new TextField(email, { validate: validateEmail }),
  };
};

class UserFormStore {
  form?: UserForm;
  isUserLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadUser(id?: string) {
    if (!id) {
      this.form = createUserForm("", "");
    }

    this.isUserLoading = true;
    apiLoadUser(id)
      .then(
        action((user) => {
          this.form = createUserForm(user.name, user.email);
        }),
      )
      .finally(
        action(() => {
          this.isUserLoading = false;
        }),
      );
  }
}
