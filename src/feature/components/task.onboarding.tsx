import { X } from "lucide-react";
import TaskOnboardingItem from "./task.onboarding-item";

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
  if (!isVisible) return null;
  
  const totalSteps = onboardingSteps.length;
  const completedCount = completedSteps.length;
  const progress = (completedCount / totalSteps) * 100;
  
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="border-b border-[#edebe9] p-4 flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">Vamos organizar suas tarefas</h2>
          <button
            onClick={onClose}
            className="text-[#8a8886] hover:text-[#323130] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative">
          <div className="h-1 bg-[#edebe9]">
            <div 
              className="h-1 bg-[#0078d4] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="absolute right-4 -bottom-6 text-xs text-[#8a8886]">
            {completedCount}/{totalSteps}
          </div>
        </div>
        <div className="p-0 mt-6">
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
              onClick={
                step.step === 'create-group' 
                  ? onCreateGroup 
                  : step.step === 'add-task'
                  ? onAddSampleTask
                  : () => onCompleteStep(step.step)
              }
            />
          ))}
        </div>
        <div className="p-4 flex justify-end">
          <button
            className="bg-[#323130] hover:bg-[#505050] text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskOnboarding; 