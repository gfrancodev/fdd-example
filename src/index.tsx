import { BrushyDIProvider, Container } from "@brushy/di";
import core from "./core";
import task from "./feature";
import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./providers";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
const container = new Container({
  debug: true,
});
container.import(core, { overrideExisting: true });
container.import(task, { overrideExisting: true });

root.render(
  <React.StrictMode>
    <BrushyDIProvider container={container}>
      <Providers />
    </BrushyDIProvider>
  </React.StrictMode>
);
