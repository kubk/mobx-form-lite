import { TextField } from "mobx-form-lite";
import { HTMLInputTypeAttribute } from "react";
import { observer } from "mobx-react-lite";

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
