import { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  formReset,
  isFormEmpty,
  isFormTouched,
  isFormValid,
  TextField,
} from "mobx-form-lite";

const validateEmail = (value: string) => {
  if (!value) {
    return "Please enter email";
  }

  if (!value.includes("@")) {
    return "Please enter a valid email";
  }
};

const validateName = (value: string) => {
  if (!value) {
    return "Please enter name";
  }
};

class FormStore {
  form = {
    name: new TextField("", { validate: validateName }),
    email: new TextField("", { validate: validateEmail }),
  };
}

export const NativeHtmlFormValidation = observer(() => {
  const [store] = useState(() => new FormStore());
  const { form } = store;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Name: ${form.name.value}, Email: ${form.email.value}`);
      }}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name.value}
          onChange={(e) => form.name.onChange(e.target.value)}
          onBlur={form.name.onBlur}
        />
        {form.name.isTouched && form.name.error ? (
          <div style={{ color: "red" }}>{form.name.error}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email.value}
          onChange={(e) => form.email.onChange(e.target.value)}
          onBlur={form.email.onBlur}
        />
      </div>
      {form.email.isTouched && form.email.error ? (
        <div style={{ color: "red" }}>{form.email.error}</div>
      ) : null}
      <button type="submit" disabled={!isFormValid(form) || isFormEmpty(form)}>
        Submit
      </button>
      <button
        type="button"
        disabled={!isFormTouched(form)}
        onClick={() => {
          formReset(form);
        }}
      >
        Reset
      </button>
    </form>
  );
});
