import { HTMLInputTypeAttribute, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  formReset,
  isFormEmpty,
  isFormTouched,
  isFormValid,
  TextField,
} from "../../../src";

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

const InputField = observer(
  (props: {
    field: TextField<string>;
    label: string;
    id?: string;
    name: string;
    type?: HTMLInputTypeAttribute;
  }) => {
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
  },
);

class FormStore {
  form = {
    name: new TextField("", { validate: validateName }),
    email: new TextField("", { validate: validateEmail }),
  };
}

export const NativeHtmlFormValidationAdapters = observer(() => {
  const [store] = useState(() => new FormStore());
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
      <button type="submit" disabled={!isFormValid(form) || isFormEmpty(form)}>
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
  );
});
