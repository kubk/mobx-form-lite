import { useState } from "react";
import { observer } from "mobx-react-lite";
import { isFormValid } from "mobx-form-lite";

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
