import { ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";
import { Show, Switch, Case } from "@/core";

const TaskOnboardingItem: Task.Component.OnboardingItem = ({
  step,
  title,
  description,
  isActive,
  isOpen,
  isCompleted,
  onToggle,
  onClick
}) => {
  return (
    <div className="mb-2">
      <div 
        className={`flex items-start p-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out
        ${isActive 
          ? 'bg-(--task-primary/10) text-(--task-primary)' 
          : isCompleted 
            ? 'hover:bg-(--task-secondary) text-(--task-success)' 
            : 'hover:bg-(--task-secondary) text-(--task-text-secondary)'}`}
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        aria-current={isActive ? 'step' : undefined}
        aria-label={`${title} - ${isCompleted ? 'Completed' : isActive ? 'Current step' : 'Pending step'}`}
      >
        <div className="flex-shrink-0 mr-3 mt-0.5 transition-transform duration-300 ease-in-out">
          <Switch>
            <Case condition={isCompleted}>
              <CheckCircle2 className="h-5 w-5 text-(--task-success) animate-task-pulse" />
            </Case>
            <Case condition={isActive}>
              <div className="h-5 w-5 rounded-full border-2 border-(--task-primary) flex items-center justify-center transition-all duration-300">
                <div className="h-2 w-2 rounded-full bg-(--task-primary) animate-task-pulse"></div>
              </div>
            </Case>
            <Case condition={true}>
              <div className="h-5 w-5 rounded-full border-2 border-(--task-text-disabled) transition-all duration-300"></div>
            </Case>
          </Switch>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h3 className={`font-medium ${isCompleted ? 'text-(--task-success)' : isActive ? 'text-(--task-primary)' : 'text-(--task-text-primary)'}`}>
              {title}
            </h3>
            <div className="transition-transform duration-300 ease-in-out transform">
              <Show when={isOpen} fallback={<ChevronRight className="h-5 w-5 transition-transform duration-300 transform" />}>
                <ChevronDown className="h-5 w-5 transition-transform duration-300 transform" />
              </Show>
            </div>
          </div>
        </div>
      </div>
      
      <Show when={isOpen}>
        <div className="pl-11 pr-3 pb-2 animate-task-slide-down overflow-hidden transition-all duration-300 ease-in-out">
          <p className="text-(--task-text-secondary) mb-3 animate-task-fade-in">{description}</p>
          <Show when={isActive && !isCompleted}>
            <button
              onClick={onClick}
              className="text-sm text-(--task-primary) hover:text-(--task-primary-hover) hover:underline transition-all duration-300 ease-in-out transform hover:translate-x-1"
              aria-label={`Complete step: ${title}`}
            >
              Do it now
            </button>
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default TaskOnboardingItem; 