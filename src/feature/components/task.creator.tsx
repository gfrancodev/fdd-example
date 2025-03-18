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
  const isSubmitEnabled = groupName.trim().length > 0;
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && e.ctrlKey && isSubmitEnabled) {
      onSubmit(e as any);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitEnabled) {
      onSubmit(e);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
    >
      <div 
        className="bg-white rounded-lg shadow-md max-w-md w-full p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-[#323130] mb-4">Criar novo grupo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              value={groupName}
              onChange={onGroupNameChange}
              placeholder="Nome do grupo"
              className="w-full border-[#8a8886] focus:border-[#0078d4] focus:ring-[#0078d4] transition-all duration-200"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-transparent border border-[#8a8886] text-[#323130] hover:bg-[#f3f2f1] transition-colors duration-200 active:bg-[#edebe9] active:scale-95"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={`${isSubmitEnabled 
                ? 'bg-[#0078d4] hover:bg-[#106ebe] active:bg-[#005a9e] active:scale-95' 
                : 'bg-[#aaaaaa]'} text-white transition-all duration-200`}
              disabled={!isSubmitEnabled}
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