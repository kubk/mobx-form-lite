import { action, makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Card, Form, Input, message } from "antd";
import {
  formToPlain,
  formTouchAll,
  isFormValid,
  TextField,
} from "mobx-form-lite";

type Credentials = {
  email: string;
  password: string;
};

const login = ({ email, password }: Credentials) =>
  new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      if (email === "admin@gmail.com" && password === "pass") {
        resolve();
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 1000);
  });

const validateEmail = (value: string) => {
  if (!value) {
    return "Please input your email";
  }
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
        void message.success("Login successful");
      })
      .catch((reason: Error) => {
        void message.error(reason.message);
      })
      .finally(
        action(() => {
          this.isSubmitting = false;
        }),
      );
  }
}

type InputFieldProps = {
  field: TextField<string>;
  label: string;
};

const InputField = observer(({ field, label }: InputFieldProps) => (
  <Form.Item
    label={label}
    validateStatus={field.isTouched && field.error ? "error" : ""}
    help={field.isTouched && field.error ? field.error : ""}
  >
    <Input
      value={field.value}
      onChange={(event) => field.onChange(event.currentTarget.value)}
      onBlur={field.onBlur}
    />
  </Form.Item>
));

export const AntdLoginForm = observer(() => {
  const [store] = useState(() => new LoginFormStore());

  return (
    <Card title="Login" style={{ width: 300 }}>
      <Form
        name="loginForm"
        onSubmitCapture={(event) => {
          event.preventDefault();
          store.submit();
        }}
        layout="vertical"
      >
        <InputField label="Email" field={store.form.email} />
        <InputField label="Password" field={store.form.password} />

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={store.isSubmitting}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});
