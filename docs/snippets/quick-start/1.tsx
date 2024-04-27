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
