import { CalendarClock, Check } from "lucide-react";
import TaskItem from "./task.item";
import TaskInput from "./task.input";
import { Show, For } from "@/core";

const TaskList: Task.Component.List = ({
  groupId,
  groupName,
  tasks,
  pendingTasks,
  completedTasks,
  completedCount,
  totalCount,
  progressPercentage,
  newTaskValue,
  onNewTaskChange,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  isLoading,
  listRef,
  hoveredTaskId,
  deletingTaskId,
  inputIsFocused,
  onInputFocus,
  onInputBlur,
  onTaskMouseEnter,
  onTaskMouseLeave
}) => {
  if (isLoading) {
    return (
      <div className="bg-(--task-background) rounded-xl shadow-sm overflow-hidden border-0 animate-pulse">
        <div className="border-b border-(--task-border) py-4 px-6">
          <div className="h-6 w-40 bg-(--task-text-disabled/20) rounded mb-2 animate-task-fade-in"></div>
          <div className="h-4 w-32 bg-(--task-text-disabled/20) rounded animate-task-fade-in"></div>
        </div>
        <div className="p-4">
          <div className="h-10 bg-(--task-text-disabled/20) rounded-md mb-4 animate-task-fade-in"></div>
          <div className="space-y-2">
            <For each={[1, 2, 3]}>
              {(i) => (
                <div key={i} className="h-10 bg-(--task-text-disabled/20) rounded-md animate-task-fade-in"></div>
              )}
            </For>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-(--task-background) rounded-xl shadow-md overflow-hidden animate-task-fade-in">
      <div className="p-4 border-b border-(--task-border) animate-task-slide-down">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-(--task-text-primary) animate-task-fade-in">{groupName}</h2>
          
          <Show when={totalCount > 0}>
            <span className="text-(--task-text-secondary) text-sm animate-task-fade-in" aria-label={`${completedCount} of ${totalCount} tasks completed`}>
              {completedCount} of {totalCount} completed
            </span>
          </Show>
        </div>
        
        <Show when={totalCount > 0}>
          <div className="mt-3 h-2 bg-(--task-surface) rounded-full overflow-hidden animate-task-slide-down" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
            <div 
              className="h-full bg-(--task-primary) transition-all duration-500 ease-out animate-task-fade-in"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </Show>
      </div>
      
      <div className="p-0 animate-task-fade-in">
        <TaskInput
          value={newTaskValue}
          onChange={onNewTaskChange}
          onSubmit={onAddTask}
          isFocused={inputIsFocused}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        
        <div 
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto py-2 px-4 scroll-smooth animate-task-fade-in"
        >
          <Show when={pendingTasks.length > 0}>
            <div className="space-y-1 mb-4 animate-task-fade-in">
              <For each={pendingTasks}>
                {(task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={(id) => onToggleTask(groupId, id)}
                    onDelete={(id) => onDeleteTask(groupId, id)}
                    isHovered={hoveredTaskId === task.id}
                    isDeleting={deletingTaskId === task.id}
                    onMouseEnter={() => onTaskMouseEnter(task.id)}
                    onMouseLeave={() => onTaskMouseLeave()}
                  />
                )}
              </For>
            </div>
          </Show>
          
          <Show when={completedTasks.length > 0}>
            <div className="animate-task-fade-in">
              <div className="text-sm font-medium text-(--task-text-secondary) mt-4 mb-2 px-3 flex items-center gap-2 animate-task-slide-down">
                <Check className="h-4 w-4 animate-task-fade-in" />
                Completed ({completedTasks.length})
              </div>
              <div className="space-y-1 animate-task-fade-in">
                <For each={completedTasks}>
                  {(task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={(id) => onToggleTask(groupId, id)}
                      onDelete={(id) => onDeleteTask(groupId, id)}
                      isHovered={hoveredTaskId === task.id}
                      isDeleting={deletingTaskId === task.id}
                      onMouseEnter={() => onTaskMouseEnter(task.id)}
                      onMouseLeave={() => onTaskMouseLeave()}
                    />
                  )}
                </For>
              </div>
            </div>
          </Show>
          
          <Show when={tasks.length === 0}>
            <div className="text-center py-10 text-(--task-text-secondary) animate-task-fade-in">
              <CalendarClock className="h-12 w-12 mx-auto mb-2 text-(--task-text-disabled) animate-task-fade-in" />
              <p className="animate-task-fade-in">No tasks added yet.</p>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default TaskList; 