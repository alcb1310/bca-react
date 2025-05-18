import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./components/wrappers/AppWrapper.tsx";

import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Couldn't find the root element");

createRoot(root).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);
