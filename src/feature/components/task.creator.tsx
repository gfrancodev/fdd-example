import { useInjectComponent } from "@brushy/di";
import { BUTTON, INPUT } from "../../core";

const TaskCreator: Task.Component.GroupCreator = ({ 
  groupName, 
  onGroupNameChange, 
  onSubmit, 
  onClose 
}) => {
  const Button = useInjectComponent<Core.Component.ButtonProps>(BUTTON);
  const Input = useInjectComponent<Core.Component.InputProps>(INPUT);
  
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6 animate-scale-in">
        <h2 className="text-xl font-semibold mb-4">Criar novo grupo</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              value={groupName}
              onChange={onGroupNameChange}
              placeholder="Nome do grupo"
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-transparent border border-[#8a8886] text-[#323130] hover:bg-[#f3f2f1]"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#0078d4] hover:bg-[#106ebe] text-white"
            >
              Criar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreator; 