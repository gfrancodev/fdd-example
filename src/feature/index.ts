import { Container } from "@brushy/di";
import TaskInput from "./components/task.input";
import TaskItem from "./components/task.item";
import TaskList from "./components/task.list";
import { TaskHttpService } from "./services/task-http.service";
import { TaskLocalService } from "./services/task-local.service";

export const TASK_SERVICE = Symbol("TASK_SERVICE");
export const TASK_INPUT = Symbol("TASK_INPUT");
export const TASK_ITEM = Symbol("TASK_ITEM");
export const TASK_LIST = Symbol("TASK_LIST");

const task = new Container({
  providers: [
    {
      provide: TASK_SERVICE,
      useClass: TaskHttpService, // (TaskHttpService / TaskLocalService)
    },
    {
      provide: TASK_INPUT,
      useValue: TaskInput,
    },
    {
      provide: TASK_LIST,
      useValue: TaskList,
    },
    {
      provide: TASK_ITEM,
      useValue: TaskItem,
    },
  ],
});

export default task;
