import { ReactNode, useState } from "react";
import { NativeHtmlForm } from "./examples/native-html-form.tsx";

const examples: Array<{ name: string; component: ReactNode }> = [
  { name: "Native HTML5 form", component: <NativeHtmlForm /> },
];

export const App = () => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<
    number | null
  >(null);

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
