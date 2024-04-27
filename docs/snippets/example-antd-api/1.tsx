import { Form, Input } from "antd";
import { TextField } from "mobx-form-lite";
import { observer } from "mobx-react-lite";

type Props = { field: TextField<string>; label: string };

const InputField = observer((props: Props) => {
  const { field, label } = props;
  return (
    <Form.Item
      label={label}
      validateStatus={field.isTouched && field.error ? "error" : ""}
      help={field.isTouched && field.error ? field.error : ""}
    >
      <Input
        value={field.value}
        onChange={(e) => field.onChange(e.currentTarget.value)}
        onBlur={field.onBlur}
      />
    </Form.Item>
  );
});
