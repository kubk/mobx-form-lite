import { observer } from "mobx-react-lite";
import { useState } from "react";

const LoginForm = observer(() => {
  const [form] = useState(() => new LoginFormStore());

  return (
    <Card title="Login" style={{ width: 300 }}>
      <Form
        name="loginForm"
        onSubmitCapture={(e) => {
          e.preventDefault();
          alert(JSON.stringify(form.form, null, 2));
        }}
        layout="vertical"
      >
        <InputField label={"Email"} field={form.form.email} />
        <InputField label={"Password"} field={form.form.password} />

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});
