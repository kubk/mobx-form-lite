import { observer } from "mobx-react-lite";
import { TextField } from "mobx-form-lite";
import { Form, Input, Space, Typography } from "antd";

type Props = { field: TextField<string>; label: string };

export const InputField = observer((props: Props) => {
  const { field, label } = props;
  return (
    <Space direction={"vertical"} size={4}>
      <Typography.Text strong>{label}</Typography.Text>
      <Form.Item
        validateStatus={field.isTouched && field.error ? "error" : ""}
        help={field.isTouched && field.error ? field.error : ""}
      >
        <Input
          value={field.value}
          onChange={(e) => field.onChange(e.currentTarget.value)}
          onBlur={field.onBlur}
        />
      </Form.Item>
    </Space>
  );
});
