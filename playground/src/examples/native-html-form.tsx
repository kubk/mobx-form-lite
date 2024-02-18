import { useState } from "react";
import { observer } from "mobx-react-lite";
import { formReset, isFormTouched, TextField } from "../../../src";

class FormStore {
  form = {
    name: new TextField(""),
    email: new TextField(""),
  };
}

export const NativeHtmlForm = observer(() => {
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
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email.value}
          onChange={(e) => form.email.onChange(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
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
