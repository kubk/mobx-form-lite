import { HTMLInputTypeAttribute, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  FieldWithValue,
  formReset,
  isFormEmpty,
  isFormTouched,
  isFormValid,
  TextField,
} from "../../../src";
import { makePersistable } from "mobx-persist-store";

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

export const persistableField = <T extends FieldWithValue<unknown>>(
  field: T,
  storageKey: string,
  expireIn?: number,
): T => {
  makePersistable(field, {
    name: storageKey,
    properties: ["value"],
    storage: window.localStorage,
    expireIn: expireIn,
  });

  return field;
};

class FormStore {
  form = {
    name: persistableField(new TextField("", validateName), "demo-name"),
    email: persistableField(new TextField("", validateEmail), "demo-email"),
  };
}

export const NativeHtmlFormPersist = observer(() => {
  const [store] = useState(() => new FormStore());
  const { form } = store;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Name: ${form.name.value}, Email: ${form.email.value}`);
      }}
    >
      <InputField field={form.name} label="Name" id="name" name="name" />
      <InputField
        field={form.email}
        label="Email"
        id="email"
        name="email"
        type="email"
      />
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
