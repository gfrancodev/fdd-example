import { useInjectComponent } from "@brushy/di";
import { LOADING_PLACEHOLDER, For } from "@/core";

const TaskSelectorSkeleton = () => {
  const LoadingPlaceholder = useInjectComponent<Core.Component.LoadingPlaceholderProps>(LOADING_PLACEHOLDER);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <LoadingPlaceholder className="h-6 w-32" />
        <LoadingPlaceholder className="h-8 w-8 rounded-md" />
      </div>
      
      <div className="space-y-2">
        <For each={[1, 2, 3]}>
          {(i) => (
            <div key={i} className="flex justify-between items-center p-2 rounded-md">
              <div className="flex items-center gap-2">
                <LoadingPlaceholder className="h-4 w-4 rounded-full" />
                <LoadingPlaceholder className="h-5 w-24" />
              </div>
              <LoadingPlaceholder className="h-5 w-5 opacity-0" />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default TaskSelectorSkeleton; 