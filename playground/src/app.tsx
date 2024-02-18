import { ReactNode } from "react";
import { NativeHtmlForm } from "./examples/native-html-form.tsx";
import { NativeHtmlFormValidation } from "./examples/native-html-form-validation.tsx";
import { NativeHtmlFormValidationAdapters } from "./examples/native-html-form-validation-adapters.tsx";
import { NativeHtmlFormPersist } from "./examples/native-html-form-adapters-persist.tsx";
import { useQueryParam } from "./use-query-param.ts";

const examples: Array<{ name: string; component: ReactNode }> = [
  { name: "Native HTML5 form", component: <NativeHtmlForm /> },
  {
    name: "Native HTML5 form - validation",
    component: <NativeHtmlFormValidation />,
  },
  {
    name: "Native HTML5 form - validation with adapters",
    component: <NativeHtmlFormValidationAdapters />,
  },
  {
    name: "Native HTML5 form - persist",
    component: <NativeHtmlFormPersist />,
  },
];

export const App = () => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useQueryParam(
    "id",
    null,
  );

  if (selectedExampleIndex !== null) {
    const example = examples[selectedExampleIndex];
    return (
      <div>
        <button
          style={{
            position: "absolute",
            top: 40,
            left: 40,
          }}
          onClick={() => setSelectedExampleIndex(null)}
        >
          Back
        </button>
        {example.component}
      </div>
    );
  }

  return (
    <ul>
      {examples.map((example, i) => {
        return (
          <li
            key={i}
            onClick={() => {
              setSelectedExampleIndex(i);
            }}
          >
            {example.name}
          </li>
        );
      })}
    </ul>
  );
};
