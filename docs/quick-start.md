# Quick start

If you know MobX, you already know `mobx-form-lite`. The library is just a set of stores such as `TextField`, `BooleanField`, and helper functions like `isFormTouched`, `isFormValid` that operate on those stores.

### Simple profile form

Let's build a simple profile form. Run this command to install the library:

```bash
npm install mobx-form-lite
```

The form is going to have 2 fields - name and email. The field `name` must not be empty, and the field `email` must contain the “@” symbol. The form submit button should be disabled if the form isn’t valid:

```tsx
import { observer, useLocalObservable } from "mobx-react-lite";
import { TextField, isFormValid } from "mobx-form-lite";

const validateName = (value: string) =>
  !value ? "Please enter name" : undefined;

const validateEmail = (value: string) =>
  !value.includes("@") ? "Please enter a valid email" : undefined;

export const Example = observer(() => {
  const form = useLocalObservable(() => ({
    name: new TextField("", { validate: validateName }),
    email: new TextField("", { validate: validateEmail }),
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Name: ${form.name.value}, Email: ${form.email.value}`);
      }}
    >
      <InputField field={form.name} label="Name" name="name" />
      <InputField field={form.email} label="Email" name="email" type="email" />
      <button type="submit" disabled={!isFormValid(form)}>
        Submit
      </button>
    </form>
  );
});
```

And your `InputField` may look like this:

```tsx
type Props = {
  field: TextField<string>;
  label: string;
  id?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
};

const InputField = observer((props: Props) => {
  const { field, name, type, id, label } = props;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
      />
      {field.isTouched && field.error ? (
        <div style={{ color: "red" }}>{field.error}</div>
      ) : null}
    </div>
  );
});
```

You write a field component once to adapt to your UI kit and then reuse it anywhere in the project. The `mobx-form-lite` will release ready-to-use fields for the popular UI kits in the future.

### Adding API

If the form's store logic becomes more complicated, you can extract it into a dedicated store and use `TextField` as you would with any other MobX store.

```tsx
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
```

And use it the same way as before:

```tsx
export const Example = observer(() => {
  // Or retrieve via React Context
  const [store] = useState(() => new UserFormStore());
  const { form } = store;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Name: ${form.name.value}, Email: ${form.email.value}`);
      }}
    >
      <InputField field={form.name} label="Name" name="name" />
      <InputField field={form.email} label="Email" name="email" type="email" />
      <button type="submit" disabled={!isFormValid(form)}>
        Submit
      </button>
    </form>
  );
});
```
