# Quick start

If you know MobX, you already know `mobx-form-lite`. The library is just a set of stores such as `TextField`, `BooleanField`, and helper functions like `isFormTouched`, `isFormValid` that operate on those stores.

## Simple profile form

Let's build a simple profile form. Run this command to install the library:

```bash
npm install mobx-form-lite
```

The form is going to have 2 fields - name and email. The field `name` must not be empty, and the field `email` must contain the “@” symbol. The form submit button should be disabled if the form isn’t valid:

<<< @/snippets/quick-start/1.tsx

And your `InputField` may look like this:

<<< @/snippets/quick-start/2.tsx

::: info
You write a field component once to adapt it to your UI kit and then reuse it anywhere in the project. The `mobx-form-lite` will release ready-to-use fields for the popular UI kits in the future.
:::

## Using a separate store

If the form's store logic becomes more complicated, you can extract it into a dedicated store and use `TextField` as you would with any other MobX store. In the future the store can even have multiple forms.

<<< @/snippets/quick-start/3.tsx

And use it the same way as before:

<<< @/snippets/quick-start/4.tsx

## What's next

You can find more examples including advanced ones:
- [Login form with Ant Design and API](/example-antd-api)
- [Dynamic form with nested fields](/example-nested-dynamic-form)
