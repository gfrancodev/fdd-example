import { Check, Trash2 } from "lucide-react";
import { If, Show } from "@/core";

const TaskItem: Task.Component.ListItem = ({
  task,
  onToggle,
  onDelete,
  isHovered,
  isDeleting,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div 
      className={`flex items-center justify-between p-2 group rounded-md cursor-pointer ${
        isHovered ? 'bg-(--task-secondary)' : ''
      } ${isDeleting ? 'opacity-0 scale-95 animate-task-fade-out' : 'opacity-100 scale-100'} 
      transition-all duration-200 ${task.completed ? 'bg-(--task-secondary)' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="listitem"
      aria-label={`Task: ${task.text}`}
      aria-checked={task.completed}
    >
      <div className="flex items-center gap-3 w-full">
        <button
          onClick={() => onToggle(task.id)}
          className={`h-5 w-5 rounded-full border flex items-center justify-center 
          ${task.completed 
            ? 'bg-(--task-primary) border-(--task-primary) text-white' 
            : 'border-(--task-text-disabled) hover:border-(--task-primary)'} 
          transition-colors duration-200 cursor-pointer`}
          aria-label={task.completed ? "Mark as not completed" : "Mark as completed"}
        >
          <If condition={task.completed}>
            <Check className="h-3 w-3 animate-task-check" />
          </If>
        </button>
        <span 
          className={`${task.completed ? 'text-(--task-text-placeholder) line-through animate-task-strike' : 'text-(--task-text-primary)'} 
          transition-colors duration-200`}
        >
          {task.text}
        </span>
      </div>
      <Show when={isHovered}>
        <button
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 rounded-md flex items-center justify-center text-(--task-text-placeholder) 
          hover:text-(--task-error) hover:bg-(--task-error/10) opacity-100 animate-task-fade-in
          transition-all duration-200 cursor-pointer"
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4 animate-task-trash" />
        </button>
      </Show>
    </div>
  );
};

export default TaskItem; 