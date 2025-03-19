import { useState } from "react";

type GroupHandlers = {
  handleCreateGroup: () => void;
  handleGroupNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitGroup: (e: React.FormEvent) => void;
  handleCloseGroupCreator: () => void;
  handleGroupMouseEnter: (id: string) => void;
  handleGroupMouseLeave: () => void;
  handleStartGroupDelete: (id: string) => void;
  handleCreatorKeyDown: (e: React.KeyboardEvent) => void;
};

export function useTaskOnboarding(
  context: Task.ContextProps,
  groupHandlers: GroupHandlers,
) {
  const { onboarding, closeOnboarding, resetOnboarding } = context;

  const [expandedStep, setExpandedStep] = useState<string | null>("welcome");

  if (
    onboarding.currentStep &&
    (!expandedStep || onboarding.currentStep !== expandedStep)
  ) {
    setExpandedStep(onboarding.currentStep);
  }

  const onboardingSteps = [
    {
      step: "create-group" as const,
      title: "Create a task group",
      description:
        'First, let\'s create a group to organize your tasks. For example: "Work", "Personal" or "Projects".',
    },
    {
      step: "add-task" as const,
      title: "Add tasks",
      description:
        "Now, add tasks to your group. You can type the task and press Enter to add it.",
    },
    {
      step: "complete-task" as const,
      title: "Complete tasks",
      description:
        "Mark your tasks as completed by clicking the checkbox next to each task.",
    },
    {
      step: "organize-tasks" as const,
      title: "Organize tasks",
      description:
        "Your completed tasks are automatically grouped. You can see all your tasks in one place.",
    },
    {
      step: "create-more-groups" as const,
      title: "Create more groups",
      description:
        "Create different groups to better organize your tasks by context or project.",
    },
  ];

  const showOnboardingTutorial = () => {
    resetOnboarding();
  };

  const handleToggleStep = (step: string) => {
    setExpandedStep((current) => (current === step ? null : step));
  };

  const handleOnboardingKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeOnboarding();
    }
  };

  return {
    states: {
      expandedStep,
    },
    values: {
      onboardingSteps,
    },
    handlers: {
      showOnboardingTutorial,
      handleToggleStep,
      handleOnboardingKeyDown,
    },
  };
}
