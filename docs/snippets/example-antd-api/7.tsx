const LoginForm = observer(() => {
  const [form] = useState(() => new LoginFormStore());

  return (
    <Card title="Login" style={{ width: 300 }}>
      <Form
        name="loginForm"
        onSubmitCapture={(e) => {
          e.preventDefault();
          form.submit();
        }}
        layout="vertical"
      >
        <InputField label={"Email"} field={form.form.email} />
        <InputField label={"Password"} field={form.form.password} />

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={form.isSubmitting}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});
