import { X } from "lucide-react";
import TaskOnboardingItem from "./task.onboarding-item";
import { useEffect } from "react";

const TaskOnboarding: Task.Component.Onboarding = ({
  isVisible,
  onboardingSteps,
  currentStep,
  completedSteps,
  openSteps,
  onToggleStep,
  onClose,
  onCompleteStep,
  onCreateGroup,
  onAddSampleTask
}) => {
  // Fechar com ESC
  useEffect(() => {
    if (!isVisible) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  const handleStepAction = (step: string) => {
    switch (step) {
      case 'create-group':
        onCreateGroup();
        break;
      case 'add-task':
        onAddSampleTask();
        break;
      default:
        onCompleteStep(step);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-white rounded-lg shadow-md max-w-md w-full p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#323130]">Primeiros passos</h2>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-md flex items-center justify-center text-[#605e5c] hover:bg-[#f3f2f1] transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-[#605e5c]">
            Siga estes passos para começar a usar o aplicativo de tarefas.
          </p>
        </div>
        
        <div className="space-y-1">
          {onboardingSteps.map((step) => (
            <TaskOnboardingItem
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
              isActive={currentStep === step.step}
              isOpen={openSteps.includes(step.step)}
              isCompleted={completedSteps.includes(step.step)}
              onToggle={() => onToggleStep(step.step)}
              onClick={() => handleStepAction(step.step)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskOnboarding; 