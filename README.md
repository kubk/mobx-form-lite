# mobx-form-lite

[![Npm Version](https://badge.fury.io/js/mobx-form-lite.svg)](https://badge.fury.io/js/mobx-form-lite)
[![NPM downloads](http://img.shields.io/npm/dm/mobx-form-lite.svg)](https://www.npmjs.com/package/mobx-form-lite)
[![Tests](https://github.com/kubk/mobx-form-lite/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/kubk/mobx-form-lite/actions/workflows/node.js.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Lightweight form management library based on MobX

---
Key ideas:

- ✅ If you know MobX, you already know `mobx-form-lite`. The library is just a set of stores such as `TextField`, `BooleanField`, and helper functions like `isFormTouched`, `isFormValid` that operate on those stores.
- 🛠️ Type-safe, including nested forms. No JSON-based configuration.
- 🔄 Flexibility. No need to extend your stores from the library's classes.
- 🪶 Lightweight (N kb gzipped) since MobX does all the heavy lifting.
- 🚀 Performant - it avoids unnecessary re-renders, thanks to MobX.

### Installation

```
npm i mobx-form-lite
```

### Example with adapters

```tsx
import { observer, useLocalObservable } from "mobx-react-lite"
import { TextField, isFormValid, isFormTouched, formReset } from "mobx-form-lite"

const validateName = (value: string) =>
  !value ? "Please enter name" : undefined

const validateEmail = (value: string) =>
  !value.includes("@") ? "Please enter a valid email" : undefined

export const Example = observer(() => {
  const form = useLocalObservable(() => ({
    name: new TextField("", validateName),
    email: new TextField("", validateEmail),
  }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        alert(`Name: ${form.name.value}, Email: ${form.email.value}`)
      }}
    >
      <InputField field={form.name} label="Name" name="name" />
      <InputField field={form.email} label="Email" name="email" type="email" />
      <button type="submit" disabled={!isFormValid(form)}>
        Submit
      </button>
      <button
        type="button"
        disabled={!isFormTouched(form)}
        onClick={() => formReset(form)}
      >
        Reset
      </button>
    </form>
  )
})
```

And your `InputField` may look like this:

```tsx
type Props = {
  field: TextField<string>
  label: string
  id?: string
  name: string
  type?: HTMLInputTypeAttribute
}

const InputField = observer((props: Props) => {
  const { field, name, type, id, label } = props

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
  )
})
```

You write a field component once to adapt to your UI kit and then reuse it anywhere in the project.

If the form's store logic becomes more complicated, you can extract it into a dedicated store and use `TextField` as you would with any other MobX store.

```tsx
import { makeAutoObservable } from "mobx"
import { TextField } from "mobx-form-lite"
import { apiLoadUser } from "./path/to/api"

type UserForm = {
  name: TextField<string>
  email: TextField<string>
}

const createUserForm = (name: string, email: string) => {
  return {
    name: new TextField(name, validateName),
    email: new TextField(email, validateEmail),
  }
}

class UserFormStore {
  form?: UserForm
  isUserLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  loadUser(id?: string) {
    if (!id) {
      this.form = createUserForm("", "")
    }

    this.isUserLoading = true
    apiLoadUser(id)
      .then(action((user) => {
        this.form = createUserForm(user.name, user.email)
      }))
      .finally(action(() => {
        this.isUserLoading = false
      }))
  }
}
```

And use it the say way as before:

```tsx
export const Example = observer(() => {
  // Or retrieve via React Context
  const [store] = useState(() => new UserFormStore())
  const { form } = store

  // The rest is the same
  // return ...
})

```

### More examples:

- [Native HTML form](./playground/src/examples/native-html-form.tsx)
- [Native HTML5 form - validation](./playground/src/examples/native-html-form-validation.tsx)
- [Validation with adapters](./playground/src/examples/native-html-form-validation-adapters.tsx)
- [Persist to LocalStorage](./playground/src/examples/native-html-form-adapters-persist.tsx)

To run the examples folder you can clone the repo, go to `playground` folder and execute `npm run dev` there.

### State

The package is work in progress. The API is not stable and may change in the future. Use at your own risk. Check the unit tests to see what it can do.
