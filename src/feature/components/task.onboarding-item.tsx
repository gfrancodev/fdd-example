import { ChevronDown, ChevronUp, Circle, CheckCircle, Plus, ListPlus } from "lucide-react";

const TaskOnboardingItem: Task.Component.OnboardingItem = ({
  step,
  title,
  description,
  isActive,
  isOpen,
  isCompleted,
  onToggle,
  onClick,
}) => {
  return (
    <div className="border-b border-[#edebe9] last:border-0">
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer ${isActive ? 'bg-[#f3f2f1]' : ''}`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {isCompleted ? (
              <CheckCircle className="h-5 w-5 text-[#0078d4]" />
            ) : (
              <Circle className="h-5 w-5 text-[#8a8886]" />
            )}
          </div>
          <span className={`font-medium ${isCompleted ? 'text-[#0078d4]' : ''}`}>{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#8a8886]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#8a8886]" />
        )}
      </div>
      
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-[#605e5c] mb-4 pl-8">{description}</p>
          {step === 'create-group' && (
            <div className="pl-8">
              <button 
                className="bg-[#0078d4] hover:bg-[#106ebe] text-white flex items-center gap-2 px-4 py-2 rounded-md"
                onClick={onClick}
              >
                <Plus className="h-4 w-4" />
                Criar novo grupo
              </button>
            </div>
          )}
          {step === 'add-task' && (
            <div className="pl-8">
              <button 
                className="bg-[#0078d4] hover:bg-[#106ebe] text-white flex items-center gap-2 px-4 py-2 rounded-md"
                onClick={onClick}
              >
                <ListPlus className="h-4 w-4" />
                Adicionar tarefa de exemplo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskOnboardingItem; 