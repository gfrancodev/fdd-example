import { ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";

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
        className={`flex items-start p-3 rounded-md cursor-pointer transition-colors duration-200
        ${isActive 
          ? 'bg-[#f0f8ff] text-[#0078d4]' 
          : isCompleted 
            ? 'hover:bg-[#f3f2f1] text-[#107c10]' 
            : 'hover:bg-[#f3f2f1] text-[#605e5c]'}`}
        onClick={onToggle}
      >
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-[#107c10]" />
          ) : isActive ? (
            <div className="h-5 w-5 rounded-full border-2 border-[#0078d4] flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[#0078d4]"></div>
            </div>
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-[#8a8886]"></div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h3 className={`font-medium ${isActive ? 'text-[#0078d4]' : isCompleted ? 'text-[#107c10]' : 'text-[#323130]'}`}>
              {title}
            </h3>
            <div className="transition-transform duration-200 transform">
              {isOpen ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="pl-11 pr-3 pb-2 animate-slide-down">
          <p className="text-[#605e5c] mb-3">{description}</p>
          {isActive && !isCompleted && (
            <button
              onClick={onClick}
              className="text-sm text-[#0078d4] hover:text-[#106ebe] hover:underline transition-colors duration-200"
            >
              Fazer agora
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskOnboardingItem; 