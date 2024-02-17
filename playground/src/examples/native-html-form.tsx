import { useState } from "react";
import { observer } from "mobx-react-lite";
import { TextField } from "../../../src";

class FormStore {
  name = new TextField("");
  email = new TextField("");
}

export const NativeHtmlForm = observer(() => {
  const [store] = useState(() => new FormStore());

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Name: ${store.name.value}, Email: ${store.email.value}`);
      }}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={store.name.value}
          onChange={(e) => store.name.onChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={store.email.value}
          onChange={(e) => store.email.onChange(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
});
