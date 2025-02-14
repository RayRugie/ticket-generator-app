import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TabContextProvider } from "./contexts/TabContext.tsx";
import { FormContextProvider } from "./contexts/FormContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TabContextProvider>
      <FormContextProvider>
        <App />
      </FormContextProvider>
    </TabContextProvider>
  </StrictMode>,
);