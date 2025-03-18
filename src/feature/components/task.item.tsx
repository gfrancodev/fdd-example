import { Check, Trash2 } from "lucide-react";
import { useState } from "react";

const TaskItem: Task.Component.ListItem = ({
  task,
  onToggle,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    setIsDeleting(true);
    // Pequeno atraso para mostrar a animação antes de remover
    setTimeout(() => {
      onDelete(task.id);
    }, 200);
  };
  
  return (
    <div 
      className={`flex items-center justify-between p-2 group rounded-md ${
        isHovered ? 'bg-[#f3f2f1]' : ''
      } ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} 
      transition-all duration-200 ${task.completed ? 'bg-[#f3f2f1]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 w-full">
        <button
          onClick={() => onToggle(task.id)}
          className={`h-5 w-5 rounded-full border flex items-center justify-center 
          ${task.completed 
            ? 'bg-[#0078d4] border-[#0078d4] text-white' 
            : 'border-[#8a8886] hover:border-[#0078d4]'} 
          transition-colors duration-200`}
        >
          {task.completed && <Check className="h-3 w-3" />}
        </button>
        <span 
          className={`${task.completed ? 'text-[#a19f9d] line-through' : 'text-[#323130]'} 
          transition-colors duration-200`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className={`h-8 w-8 rounded-md flex items-center justify-center text-[#a19f9d] 
        hover:text-[#d13438] hover:bg-[#fdeff0] ${isHovered ? 'opacity-100' : 'opacity-0'} 
        transition-all duration-200`}
        aria-label="Excluir tarefa"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TaskItem; 