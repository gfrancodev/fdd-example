import { useState } from "react";

export function useTaskGroups(context: Task.ContextProps) {
  const { createTaskGroup, completeOnboardingStep, onboarding } = context;

  const showGroupCreator = useState(false);
  const newGroupName = useState("");
  const hoveredGroupId = useState<string | null>(null);
  const deletingGroupId = useState<string | null>(null);

  const isSubmitEnabled = newGroupName[0].trim().length > 0;

  const handleCreateGroup = () => {
    showGroupCreator[1](true);
  };

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newGroupName[1](e.target.value);
  };

  const handleSubmitGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName[0].trim()) {
      createTaskGroup(newGroupName[0].trim());
      newGroupName[1]("");
      showGroupCreator[1](false);

      if (onboarding.currentStep === "create-group") {
        completeOnboardingStep("create-group");
      }
    }
  };

  const handleCloseGroupCreator = () => {
    showGroupCreator[1](false);
  };

  const handleGroupMouseEnter = (id: string) => {
    hoveredGroupId[1](id);
  };

  const handleGroupMouseLeave = () => {
    hoveredGroupId[1](null);
  };

  const handleStartGroupDelete = (id: string) => {
    deletingGroupId[1](id);
    setTimeout(() => {
      context.deleteTaskGroup(id);
      deletingGroupId[1](null);
    }, 200);
  };

  const handleCreatorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      showGroupCreator[1](false);
    } else if (
      e.key === "Enter" &&
      e.ctrlKey &&
      newGroupName[0].trim().length > 0
    ) {
      handleSubmitGroup(e);
    }
  };

  return {
    states: {
      showGroupCreator: showGroupCreator[0],
      newGroupName: newGroupName[0],
      hoveredGroupId: hoveredGroupId[0],
      deletingGroupId: deletingGroupId[0],
    },
    values: {
      isSubmitEnabled,
      selectedGroup: context.groups.find(
        (group) => group.id === context.selectedGroupId,
      ),
    },
    handlers: {
      handleCreateGroup,
      handleGroupNameChange,
      handleSubmitGroup,
      handleCloseGroupCreator,
      handleGroupMouseEnter,
      handleGroupMouseLeave,
      handleStartGroupDelete,
      handleCreatorKeyDown,
    },
  };
}
