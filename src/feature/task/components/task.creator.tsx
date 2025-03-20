import { useInjectComponent } from "@brushy/di";
import { BUTTON, INPUT, Show } from "@/core";
import { X, Check } from "lucide-react";

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
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-group-title"
      aria-describedby="create-group-description"
    >
      <div 
        className="bg-(--task-background) rounded-xl shadow-lg max-w-md w-full p-8 animate-task-scale-in"
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-group-title"
        aria-describedby="create-group-description"
      >
        <h2 
          id="create-group-title"
          className="text-2xl font-bold text-(--task-text-primary) mb-6"
        >
          Create New Group
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="groupName" 
              className="block text-(--task-text-secondary) text-sm mb-2"
            >
              Group Name
            </label>
            <Input
              id="groupName"
              type="text"
              value={groupName}
              onChange={onGroupNameChange}
              placeholder="Enter your group name"
              className="w-full border border-(--task-border) focus:border-(--task-primary) focus:ring-2 focus:ring-(--task-primary) rounded-md p-3 text-(--task-text-primary) placeholder-(--task-text-placeholder) transition-all duration-200"
              autoFocus
              aria-required="true"
              aria-invalid={groupName.trim().length === 0}
              aria-describedby="group-name-error"
            />
            <Show when={groupName.trim().length === 0}>
              <p 
                id="group-name-error"
                className="text-(--task-text-secondary) text-sm mt-2"
              >
                Please enter a name for the group.
              </p>
            </Show>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-300 text-(--task-text-primary) px-6 py-2 rounded-md transition-colors duration-200 cursor-pointer"
              aria-label="Cancel group creation"
            >
              <X className="inline-block h-5 w-5 mr-2" aria-hidden="true" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isSubmitEnabled}
              className={`bg-(--task-primary) hover:bg-(--task-primary-hover) text-white px-6 py-2 rounded-md transition-colors duration-200 ${!isSubmitEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label="Create new group"
            >
              <Check className="inline-block h-5 w-5 mr-2" aria-hidden="true" />
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreator;