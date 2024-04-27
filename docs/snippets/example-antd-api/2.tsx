import { TextField } from "mobx-form-lite";

const validateEmail = (value: string) => {
  if (!value.includes("@")) {
    return "Please input a valid email";
  }
};

const validatePassword = (value: string) =>
  value ? "" : "Please input your password";

class LoginFormStore {
  form = {
    email: new TextField("", { validate: validateEmail }),
    password: new TextField("", { validate: validatePassword }),
  };
}
