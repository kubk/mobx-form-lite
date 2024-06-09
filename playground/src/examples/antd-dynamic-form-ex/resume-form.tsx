import { observer } from "mobx-react-lite";
import { Button, Card, Flex, Form, Space } from "antd";
import { InputField } from "./input-field.tsx";
import { SelectField } from "./select-field.tsx";
import { useResumeStore } from "./resume-store-context.tsx";
import { ExperienceList } from "./experience-list.tsx";
import { TotalExperience } from "./total-experience.tsx";

export const ResumeForm = observer(() => {
  const resumeStore = useResumeStore();
  const { form } = resumeStore;

  return (
    <Form
      onSubmitCapture={(e) => {
        e.preventDefault();
        resumeStore.submit();
      }}
    >
      <Card style={{ maxWidth: 600 }}>
        <Space direction="vertical" size={16}>
          <Flex gap={8}>
            <InputField field={form.name} label="First name" />
            <InputField field={form.lastname} label="Last name" />
            <InputField field={form.fatherName} label="Father name" />
          </Flex>
          <Flex gap={8}>
            <InputField field={form.age} label="Age" />
            <SelectField
              label="Occupation"
              field={form.jobTitle}
              options={[
                { label: "Con man", value: "conman" },
                { label: "Fortune teller", value: "fortune_teller" },
              ]}
            />
          </Flex>
          <Card
            actions={[
              <Button onClick={resumeStore.addExperience}>
                Add experience
              </Button>,
            ]}
          >
            <ExperienceList />
          </Card>
          <Flex justify="space-between">
            <TotalExperience />
            <Button htmlType={"submit"}>Submit</Button>
          </Flex>
        </Space>
      </Card>
    </Form>
  );
});
