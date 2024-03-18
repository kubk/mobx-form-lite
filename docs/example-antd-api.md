# Login form

In this example we'll create a login form with Ant Design and API. First make sure you have installed all the needed libraries:

```bash
npm install mobx-form-lite antd
```

We'll start with creating a `Field` component that connects [Antd](https://ant.design/) with `mobx-form-lite`:

```tsx
import { TextField } from "mobx-form-lite";

type Props = { field: TextField<string>; label: string };

const InputField = observer((props: Props) => {
  const { field, label } = props;
  return (
    <Form.Item
      label={label}
      validateStatus={field.isTouched && field.error ? "error" : ""}
      help={field.isTouched && field.error ? field.error : ""}
    >
      <Input
        value={field.value}
        onChange={(e) => field.onChange(e.currentTarget.value)}
        onBlur={field.onBlur}
      />
    </Form.Item>
  );
});
```

::: info
In the future `mobx-form-lite` will provide a set of such ready-to-use components for popular UI libraries.
:::

### Mobx store

Let's define store that will hold the form state and logic:

```tsx
import { TextField } from "mobx-form-lite";

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
}
```

### React component

It is enough to render a React component like this:

```tsx
export const LoginForm = observer(() => {
  const [form] = useState(() => new LoginFormStore());

  return (
    <Card title="Login" style={{ width: 300 }}>
      <Form
        name="loginForm"
        onSubmitCapture={(e) => {
          e.preventDefault();
          alert(JSON.stringify(form.form, null, 2));
        }}
        layout="vertical"
      >
        <InputField label={"Email"} field={form.form.email} />
        <InputField label={"Password"} field={form.form.password} />

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});
```

### Connecting to API

We'll use mock API for this example. Let's define a function that will simulate the login request:

```tsx
const login = (email: string, password: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "pass") {
        resolve({ token: "123" });
      } else {
        reject("Invalid username or password");
      }
    }, 1000);
  });
```

### Updated store

`mobx-form-lite` is a small library that provides only the form state and validation logic. It does not provide any API-related logic. Thus, we need to add it manually:

- A loader state to indicate that the form is submitting
- A submit method that will send the form data to the server

Inside the submit method we'll first touch all the fields to show validation errors. Then we'll check if the form is valid and if so, we'll send the form data to the server:

```tsx{7,13-33}
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
```

The utility `formToPlain` is not required. It's a shorthand for converting the form state to a plain object. Manual alternative:

```ts
login({
  email: this.form.email.value,
  password: this.form.password.value,
});
```

It recursively converts the form state to a plain object, which is useful when you have nested fields.

### Updated React component

```tsx{10,22}
export const LoginForm = observer(() => {
  const [form] = useState(() => new LoginFormStore());

  return (
    <Card title="Login" style={{ width: 300 }}>
      <Form
        name="loginForm"
        onSubmitCapture={(e) => {
          e.preventDefault();
          form.submit();
        }}
        layout="vertical"
      >
        <InputField label={"Email"} field={form.form.email} />
        <InputField label={"Password"} field={form.form.password} />

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={form.isSubmitting}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});
```

We've finished. Enjoy the clickable demo and play with the code below:

<iframe src="https://stackblitz.com/edit/vite-react-ts-xagd3i?embed=1&view=preview" style="margin-top: 20px" width="100%" height="500px"></iframe>
