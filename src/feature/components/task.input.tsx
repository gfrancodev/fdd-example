import { useInjectComponent } from "@brushy/di";
import { INPUT } from "../../core";
import { Plus } from "lucide-react";
import { useState } from "react";

const TaskInput: Task.Component.Input = ({
  value,
  onChange,
  onSubmit,
}) => {
  const Input = useInjectComponent<Core.Component.InputProps>(INPUT);
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="p-4 border-b border-[#edebe9]">
      <form 
        onSubmit={onSubmit}
        className={`flex items-center gap-2 p-2 rounded-md border ${
          isFocused ? 'border-[#0078d4] shadow-sm' : 'border-[#edebe9]'
        } transition-all duration-200`}
      >
        <button 
          type="submit" 
          disabled={!value.trim()}
          className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
            value.trim() ? 'text-[#0078d4] hover:bg-[#f3f2f1]' : 'text-[#a19f9d]'
          } transition-colors duration-200`}
        >
          <Plus className="h-5 w-5" />
        </button>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Adicionar uma tarefa"
          className="flex-grow border-0 focus:ring-0 p-0 text-[#323130] placeholder-[#a19f9d]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </form>
    </div>
  );
};

export default TaskInput; 