import { useInjectComponent } from "@brushy/di";
import { LOADING_PLACEHOLDER, For } from "@/core";

const TaskListSkeleton = () => {
  const LoadingPlaceholder = useInjectComponent<Core.Component.LoadingPlaceholderProps>(LOADING_PLACEHOLDER);

  return (
    <div className="bg-(--task-background) rounded-xl shadow-sm overflow-hidden border-0">
      <div className="border-b border-(--task-border) py-4 px-6">
        <div className="flex flex-col gap-2">
          <LoadingPlaceholder className="h-6 w-40" />
          <div className="w-full">
            <LoadingPlaceholder className="h-4 w-32 mb-1" />
            <div className="h-1 bg-(--task-secondary) rounded-full w-full">
              <LoadingPlaceholder className="h-1 w-1/3" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-0">
        <div className="p-4 border-b border-(--task-border)">
          <LoadingPlaceholder className="h-10 w-full rounded-md" />
        </div>

        <div className="py-4 px-6">
          <div className="space-y-3 mb-6">
            <For each={[1, 2, 3]}>
              {(i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3 w-full">
                    <LoadingPlaceholder className="h-5 w-5 rounded-full" />
                    <LoadingPlaceholder className="h-5 w-3/4" />
                  </div>
                  <LoadingPlaceholder className="h-5 w-5" />
                </div>
              )}
            </For>
          </div>

          <div>
            <div className="flex items-center gap-2 mt-6 mb-3 px-2">
              <LoadingPlaceholder className="h-4 w-4" />
              <LoadingPlaceholder className="h-4 w-24" />
            </div>
            <div className="space-y-3">
              <For each={[1, 2]}>
                {(i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-(--task-secondary) rounded-md">
                    <div className="flex items-center gap-3 w-full">
                      <LoadingPlaceholder className="h-5 w-5 rounded-full" />
                      <LoadingPlaceholder className="h-5 w-3/4" />
                    </div>
                    <LoadingPlaceholder className="h-5 w-5" />
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListSkeleton; 