import { X } from "lucide-react";
import { useInjectComponent } from "@brushy/di";
import { TASK_ONBOARDING_ITEM } from "../index";
import { If, Show, For } from "@/core";

const TaskOnboarding: Task.Component.Onboarding = ({
  isVisible,
  onboardingSteps,
  currentStep,
  completedSteps,
  expandedStep,
  onToggleStep,
  onClose,
  onCompleteStep,
  onCreateGroup,
  onAddSampleTask,
  onKeyDown
}) => {
  const TaskOnboardingItem = useInjectComponent<Task.Component.OnboardingItemProps>(TASK_ONBOARDING_ITEM);
  
  if (!isVisible) return null;
  
  const allStepsCompleted = onboardingSteps.every(step => 
    completedSteps.includes(step.step)
  );
  
  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-task-fade-in transition-opacity duration-300 ease-in-out"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={onKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      aria-describedby="onboarding-description"
    >
      <div 
        className="bg-(--task-background) rounded-lg shadow-md max-w-md w-full p-6 animate-task-scale-in transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="onboarding-title" className="text-xl font-semibold text-(--task-text-primary) animate-task-slide-in">
            {allStepsCompleted ? "Tutorial Complete!" : "First Steps"}
          </h2>
          <button 
            onClick={onClose}
            aria-label="Close onboarding"
            className="h-8 w-8 rounded-md flex items-center justify-center text-(--task-text-secondary) hover:bg-(--task-secondary) transition-all duration-300 ease-in-out hover:rotate-90 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4 animate-task-slide-in" style={{ animationDelay: '100ms' }}>
          <p id="onboarding-description" className="text-(--task-text-secondary)">
            <Show 
              when={allStepsCompleted}
              fallback="Follow these steps to start using the task application."
            >
              Congratulations! You have completed all steps of the tutorial.
            </Show>
          </p>
        </div>
        
        <div className="space-y-1 mb-4">
          <For each={onboardingSteps}>
            {(step, index) => (
              <div key={step.step} className="animate-task-slide-in" style={{ animationDelay: `${150 + index * 50}ms` }}>
                <TaskOnboardingItem
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  isActive={currentStep === step.step}
                  isCompleted={completedSteps.includes(step.step)}
                  isOpen={expandedStep === step.step}
                  onToggle={() => onToggleStep(step.step)}
                  onClick={() => {
                    if (step.step === 'create-group') {
                      onCreateGroup();
                    } else if (step.step === 'add-task') {
                      onAddSampleTask();
                    } else if (step.step === 'complete-task' || step.step === 'organize-tasks' || step.step === 'create-more-groups') {
                      onCompleteStep(step.step);
                    }
                  }}
                />
              </div>
            )}
          </For>
        </div>
        
        <div className="pt-4 border-t border-(--task-border) flex justify-end animate-task-slide-in" style={{ animationDelay: `${150 + onboardingSteps.length * 50 + 100}ms` }}>
          <button
            onClick={onClose}
            aria-label={allStepsCompleted ? "Close tutorial" : "Close onboarding"}
            className="px-4 py-2 bg-(--task-secondary) text-(--task-text-primary) rounded-md hover:bg-(--task-secondary-hover) transition-all duration-300 ease-in-out hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Show when={allStepsCompleted} fallback="Close">
              Got it!
            </Show>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskOnboarding; 