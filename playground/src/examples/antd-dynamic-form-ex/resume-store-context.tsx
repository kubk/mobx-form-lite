import { createContext, ReactNode, useContext } from "react";
import { ResumeStore } from "./resume-store.ts";

const Context = createContext<ResumeStore | null>(null);

export const ResumeStoreProvider = (props: { children: ReactNode }) => {
  return (
    <Context.Provider value={new ResumeStore()}>
      {props.children}
    </Context.Provider>
  );
};

export const useResumeStore = () => {
  const store = useContext(Context);
  if (!store) {
    throw new Error("useResumeStore must be used within a ResumeStoreProvider");
  }
  return store;
};
