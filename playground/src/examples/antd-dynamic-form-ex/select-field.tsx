import { observer } from "mobx-react-lite";
import { Select, Space, Typography } from "antd";
import { TextField } from "mobx-form-lite";

type Props = {
  id?: string;
  label?: string;
  field: TextField<string>;
  options: {
    label: string;
    value: string;
  }[];
};

export const SelectField = observer((props: Props) => {
  const { id, label, field, options } = props;
  return (
    <Space style={{ width: "100%" }} direction="vertical" size={4}>
      <Typography.Text strong>{label}</Typography.Text>
      <Select
        id={id}
        style={{ width: "100%" }}
        value={field.value}
        options={options}
        onChange={field.onChange}
      />
      {field.isTouched && field.error && (
        <Typography.Text type={"danger"}>{field.error}</Typography.Text>
      )}
    </Space>
  );
});
