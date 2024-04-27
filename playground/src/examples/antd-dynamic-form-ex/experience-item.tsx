import { observer } from "mobx-react-lite";
import { ExperienceItemType } from "./resume-store.ts";
import { Button, Flex, List } from "antd";
import { InputField } from "./input-field.tsx";

type Props = { item: ExperienceItemType; onRemove: () => void };

export const ExperienceItem = observer((props: Props) => {
  const { item, onRemove } = props;
  return (
    <List.Item>
      <Flex align="center" gap={8}>
        <InputField field={item.company} label={"Company"} />
        <InputField field={item.years} label={"Years"} />
        <Button onClick={onRemove}>Remove</Button>
      </Flex>
    </List.Item>
  );
});
