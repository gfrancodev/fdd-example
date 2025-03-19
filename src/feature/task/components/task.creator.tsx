import { useInjectComponent } from "@brushy/di";
import { BUTTON, INPUT } from "../../../core";

const TaskCreator: Task.Component.GroupCreator = ({ 
  groupName, 
  onGroupNameChange, 
  onSubmit, 
  onClose,
  isSubmitEnabled,
  onKeyDown
}) => {
  const Button = useInjectComponent<Core.Component.ButtonProps>(BUTTON);
  const Input = useInjectComponent<Core.Component.InputProps>(INPUT);
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-100 flex items-center justify-center p-4 animate-task-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={onKeyDown}
    >
      <div 
        className="bg-(--task-background) rounded-xl shadow-lg max-w-md w-full p-8 animate-task-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-(--task-text-primary) mb-6">Criar novo grupo</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label htmlFor="groupName" className="block text-(--task-text-secondary) text-sm mb-2">
              Nome do grupo
            </label>
            <Input
              id="groupName"
              type="text"
              value={groupName}
              onChange={onGroupNameChange}
              placeholder="Digite o nome do seu grupo"
              className="w-full border border-(--task-border) focus:border-(--task-primary) focus:ring-2 focus:ring-(--task-primary) rounded-md p-3 text-(--task-text-primary) placeholder-(--task-text-placeholder) transition-all duration-200"
              autoFocus
            />
            {groupName.trim().length === 0 && (
              <p className="text-(--task-text-secondary) text-sm mt-2">
                Por favor, insira um nome para o grupo.
              </p>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-300 text-(--task-text-primary) px-6 py-2 rounded-md transition-colors duration-200 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isSubmitEnabled}
              className={`bg-(--task-primary) hover:bg-(--task-primary-hover) text-white px-6 py-2 rounded-md transition-colors duration-200 ${!isSubmitEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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