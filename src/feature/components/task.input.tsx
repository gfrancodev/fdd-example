import { Plus } from "lucide-react";
import { useInjectComponent } from "@brushy/di";
import { INPUT } from "../../core";

const TaskInput: Task.Component.Input = ({
  value,
  onChange,
  onSubmit,
}) => {
  const Input = useInjectComponent<Core.Component.InputProps>(INPUT);
  
  return (
    <form onSubmit={onSubmit} className="flex gap-2 p-4 border-b border-[#edebe9]">
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Adicionar uma tarefa"
        className="flex-grow border border-[#edebe9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0078d4]"
      />
      <button 
        type="submit" 
        className="inline-flex items-center justify-center h-10 px-4 py-2 bg-[#0078d4] hover:bg-[#106ebe] text-white rounded-md transition-colors"
        aria-label="Adicionar tarefa"
      >
        <Plus className="h-5 w-5" />
      </button>
    </form>
  );
};

export default TaskInput; 