import { observer } from "mobx-react-lite";
import { useResumeStore } from "./resume-store-context.tsx";
import { List, Typography } from "antd";
import { ExperienceItem } from "./experience-item.tsx";

export const ExperienceList = observer(() => {
  const resumeStore = useResumeStore();
  const { form } = resumeStore;

  return (
    <List>
      {form.experience.value.map((experience, i) => {
        return (
          <ExperienceItem
            key={i}
            item={experience}
            onRemove={() => {
              resumeStore.removeExperience(i);
            }}
          />
        );
      })}
      {form.experience.isTouched && form.experience.error ? (
        <Typography.Text type={"danger"}>
          {form.experience.error}
        </Typography.Text>
      ) : null}
    </List>
  );
});
