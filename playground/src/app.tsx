import { ReactNode } from "react";
import { NativeHtmlForm } from "./examples/native-html-form.tsx";
import NativeHtmlFormCode from "./examples/native-html-form.tsx?raw";
import { NativeHtmlFormValidation } from "./examples/native-html-form-validation.tsx";
import NativeHtmlFormValidationCode from "./examples/native-html-form-validation.tsx?raw";
import { NativeHtmlFormValidationAdapters } from "./examples/native-html-form-validation-adapters.tsx";
import NativeHtmlFormValidationAdaptersCode from "./examples/native-html-form-validation-adapters.tsx?raw";
import { NativeHtmlFormPersist } from "./examples/native-html-form-adapters-persist.tsx";
import NativeHtmlFormPersistCode from "./examples/native-html-form-adapters-persist.tsx?raw";
import { useQueryParam } from "./use-query-param.ts";
import SyntaxHighlighter from "react-syntax-highlighter";

const examples: Array<{
  title: string;
  name: string;
  component: ReactNode;
  code?: string;
}> = [
  {
    title: "Native HTML5 form",
    name: "html5_native",
    component: <NativeHtmlForm />,
    code: NativeHtmlFormCode,
  },
  {
    title: "Native HTML5 form - validation",
    name: "html5_native_validation",
    component: <NativeHtmlFormValidation />,
    code: NativeHtmlFormValidationCode,
  },
  {
    title: "Native HTML5 form - validation with adapters",
    name: "html5_native_validation_adapters",
    component: <NativeHtmlFormValidationAdapters />,
    code: NativeHtmlFormValidationAdaptersCode,
  },
  {
    title: "Native HTML5 form - persist",
    name: "html5_native_persist",
    component: <NativeHtmlFormPersist />,
    code: NativeHtmlFormPersistCode,
  },
];

export const App = () => {
  const [selectedExampleName, setSelectedExampleName] = useQueryParam(
    "id",
    null,
  );

  if (selectedExampleName !== null) {
    const example = examples.find(({ name }) => name === selectedExampleName);
    if (!example) {
      return <div>Example not found</div>;
    }

    return (
      <div style={{ display: "flex", width: "100%" }}>
        <button
          style={{
            position: "absolute",
            top: 40,
            left: 40,
          }}
          onClick={() => setSelectedExampleName(null)}
        >
          Back
        </button>
        <div
          style={{
            width: "50vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {example.component}
        </div>
        <div
          style={{
            height: "100vh",
            overflowY: "auto",
            width: "50vw",
          }}
        >
          <SyntaxHighlighter language="typescript">
            {example.code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ul>
        {examples.map((example, i) => {
          return (
            <li
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedExampleName(example.name);
              }}
            >
              {example.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
