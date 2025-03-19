import { useInjectComponent } from "@brushy/di";
import { 
  HEADER, 
  LAYOUT, 
  TASK_GRID, 
  LOADING_EFFECT, 
  LOADING_BUTTON_SKELETON 
} from "@/core";
import {
  TASK_LIST_SKELETON,
  TASK_SELECTOR_SKELETON
} from "@/feature/task/index";

export default function TaskLoading() {
  const Header = useInjectComponent<Core.Component.HeaderProps>(HEADER);
  const Layout = useInjectComponent<Core.Component.LayoutProps>(LAYOUT);
  const TaskGrid = useInjectComponent<Core.Component.TaskGridProps>(TASK_GRID);
  const LoadingEffect = useInjectComponent<Core.Component.LoadingEffectProps>(LOADING_EFFECT);
  const LoadingButtonSkeleton = useInjectComponent<Core.Component.LoadingButtonSkeletonProps>(LOADING_BUTTON_SKELETON);
  const TaskSelectorSkeleton = useInjectComponent<Task.Component.SelectorSkeletonProps>(TASK_SELECTOR_SKELETON);
  const TaskListSkeleton = useInjectComponent<Task.Component.ListSkeletonProps>(TASK_LIST_SKELETON);

  return (
    <Layout>
      <Header 
        title="Minhas Tarefas" 
        rightContent={<LoadingButtonSkeleton />} 
      />
      <LoadingEffect>
        <TaskGrid
          sidebarContent={<TaskSelectorSkeleton />}
          mainContent={<TaskListSkeleton />}
        />
      </LoadingEffect>
    </Layout>
  );
}
