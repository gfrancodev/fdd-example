import { Container } from "@brushy/di";
import TaskInput from "./components/task.input";
import TaskItem from "./components/task.item";
import TaskList from "./components/task.list";
import TaskSelector from "./components/task.selector";
import TaskCreator from "./components/task.creator";
import TaskOnboarding from "./components/task.onboarding";
import { TaskHttpService } from "./services/task-http.service";

export const TASK_SERVICE = Symbol("TASK_SERVICE");
export const TASK_INPUT = Symbol("TASK_INPUT");
export const TASK_ITEM = Symbol("TASK_ITEM");
export const TASK_LIST = Symbol("TASK_LIST");
export const TASK_SELECTOR = Symbol("TASK_SELECTOR");
export const TASK_CREATOR = Symbol("TASK_CREATOR");
export const TASK_ONBOARDING = Symbol("TASK_ONBOARDING");

const task = new Container({
  providers: [
    {
      provide: TASK_SERVICE,
      useClass: TaskHttpService,
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
    {
      provide: TASK_SELECTOR,
      useValue: TaskSelector,
    },
    {
      provide: TASK_CREATOR,
      useValue: TaskCreator,
    },
    {
      provide: TASK_ONBOARDING,
      useValue: TaskOnboarding,
    },
  ],
});

export default task;
