import { useInject } from "@brushy/di";
import "./core/styles/main.css";
import TaskPage from "./app/task/page";
import { TOAST_PROVIDER } from "./core";

export default function Providers() {
  const ToastProvider: React.ExoticComponent = useInject(TOAST_PROVIDER);
  return (
    <main>
      <ToastProvider />
      <TaskPage />
    </main>
  );
}
