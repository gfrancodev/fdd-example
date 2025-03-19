import { Check, Trash2 } from "lucide-react";

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
    >
      <div className="flex items-center gap-3 w-full">
        <button
          onClick={() => onToggle(task.id)}
          className={`h-5 w-5 rounded-full border flex items-center justify-center 
          ${task.completed 
            ? 'bg-(--task-primary) border-(--task-primary) text-white' 
            : 'border-(--task-text-disabled) hover:border-(--task-primary)'} 
          transition-colors duration-200 cursor-pointer`}
        >
          {task.completed && <Check className="h-3 w-3 animate-task-check" />}
        </button>
        <span 
          className={`${task.completed ? 'text-(--task-text-placeholder) line-through animate-task-strike' : 'text-(--task-text-primary)'} 
          transition-colors duration-200`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className={`h-8 w-8 rounded-md flex items-center justify-center text-(--task-text-placeholder) 
        hover:text-(--task-error) hover:bg-(--task-error/10) ${isHovered ? 'opacity-100 animate-task-fade-in' : 'opacity-0'} 
        transition-all duration-200 cursor-pointer`}
        aria-label="Excluir tarefa"
      >
        <Trash2 className="h-4 w-4 animate-task-trash" />
      </button>
    </div>
  );
};

export default TaskItem; 