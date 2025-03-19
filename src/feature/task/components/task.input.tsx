import { useInjectComponent } from "@brushy/di";
import { INPUT } from "../../../core";
import { Plus } from "lucide-react";

const TaskInput: Task.Component.Input = ({
  value,
  onChange,
  onSubmit,
  isFocused,
  onFocus,
  onBlur
}) => {
  const Input = useInjectComponent<Core.Component.InputProps>(INPUT);
  
  return (
    <div className="p-4 border-b border-(--task-border) animate-task-fade-in">
      <form 
        onSubmit={onSubmit}
        className={`flex items-center gap-2 p-2 rounded-md border ${
          isFocused ? 'border-(--task-border-focus) shadow-sm' : 'border-(--task-border)'
        } transition-all duration-200`}
      >
        <button 
          type="submit" 
          disabled={!value.trim()}
          className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
            value.trim() ? 'text-(--task-primary) hover:bg-(--task-secondary)' : 'text-(--task-text-placeholder)'
          } transition-colors duration-200`}
        >
          <Plus className="h-5 w-5" />
        </button>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Adicionar uma tarefa"
          className="flex-grow border-0 focus:ring-0 w-full p-0 text-(--task-text-primary) placeholder:(--task-text-placeholder)"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </form>
    </div>
  );
};

export default TaskInput; 