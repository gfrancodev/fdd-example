import { Check, Trash2 } from "lucide-react";

const TaskItem: Task.Component.ListItem = ({
  task,
  onToggle,
  onDelete,
}) => {
  return (
    <div className={`flex items-center justify-between p-2 group ${task.completed ? 'bg-[#f3f2f1]' : 'bg-white'}`}>
      <div className="flex items-center gap-3">
        <div 
          className={`w-5 h-5 flex items-center justify-center rounded-md border cursor-pointer transition-colors
            ${task.completed 
              ? 'bg-[#0078d4] border-[#0078d4] text-white' 
              : 'border-[#8a8886] hover:border-[#0078d4]'}`}
          onClick={() => onToggle(task.id)}
          role="checkbox"
          aria-checked={task.completed}
          tabIndex={0}
        >
          {task.completed && (
            <Check className="h-3 w-3 text-white" />
          )}
        </div>
        <span 
          className={`flex-grow ${task.completed ? 'line-through text-[#8a8886]' : 'text-[#323130]'}`}
        >
          {task.text}
        </span>
      </div>
      <button 
        className="opacity-0 group-hover:opacity-100 text-[#8a8886] hover:text-[#d83b01] transition-all"
        onClick={() => onDelete(task.id)}
        aria-label="Excluir tarefa"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TaskItem; 