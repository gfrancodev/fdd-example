import { BrushyDIProvider, Container, useInject } from "@brushy/di";
import core, { TOAST_PROVIDER } from "./core";
import task from "./feature/task";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskPage from "./app/page";
import { TaskProvider } from "./feature/task/task.context";

const container = new Container({
  debug: true,
});
container.import(core, { overrideExisting: true });
container.import(task, { overrideExisting: true });

const App = () => (
  <BrushyDIProvider container={container}>
    <Providers />
  </BrushyDIProvider>
);

export function Providers() {
  const ToastProvider: React.ExoticComponent = useInject(TOAST_PROVIDER);
  return (
    <BrowserRouter>
      <ToastProvider />
      <TaskProvider>
          <Routes>
            <Route path="/" element={<TaskPage />} />
          </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
