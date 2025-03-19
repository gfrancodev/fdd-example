import { Container } from "@brushy/di";
import TaskInput from "./components/task.input";
import TaskItem from "./components/task.item";
import TaskList from "./components/task.list";
import TaskSelector from "./components/task.selector";
import TaskCreator from "./components/task.creator";
import TaskOnboarding from "./components/task.onboarding";
import TaskOnboardingItem from "./components/task.onboarding-item";
import TaskListSkeleton from "./components/skeletons/task-list-skeleton";
import TaskSelectorSkeleton from "./components/skeletons/task-selector-skeleton";
import { TaskHttpService } from "./services/task-http.service";
import { LOADING_EFFECT } from "@/core";

export const TASK_SERVICE = Symbol("TASK_SERVICE");
export const TASK_INPUT = Symbol("TASK_INPUT");
export const TASK_ITEM = Symbol("TASK_ITEM");
export const TASK_LIST = Symbol("TASK_LIST");
export const TASK_SELECTOR = Symbol("TASK_SELECTOR");
export const TASK_CREATOR = Symbol("TASK_CREATOR");
export const TASK_ONBOARDING = Symbol("TASK_ONBOARDING");
export const TASK_ONBOARDING_ITEM = Symbol("TASK_ONBOARDING_ITEM");
export const TASK_LIST_SKELETON = Symbol("TASK_LIST_SKELETON");
export const TASK_SELECTOR_SKELETON = Symbol("TASK_SELECTOR_SKELETON");

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
    {
      provide: TASK_ONBOARDING_ITEM,
      useValue: TaskOnboardingItem,
    },
    {
      provide: TASK_LIST_SKELETON,
      useValue: TaskListSkeleton,
    },
    {
      provide: TASK_SELECTOR_SKELETON,
      useValue: TaskSelectorSkeleton,
    },
  ],
});

export default task;
