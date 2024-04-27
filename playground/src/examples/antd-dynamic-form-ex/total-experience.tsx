import { observer } from "mobx-react-lite";
import { useResumeStore } from "./resume-store-context.tsx";

export const TotalExperience = observer(() => {
  const resumeStore = useResumeStore();
  return <div>Total experience (years): {resumeStore.sumYearExperience}</div>;
});
