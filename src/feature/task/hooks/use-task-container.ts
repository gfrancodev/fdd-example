import { useTaskContext } from "../task.context";
import { useTaskGroups } from "./use-task-groups";
import { useTaskList } from "./use-task-list";
import { useTaskOnboarding } from "./use-task-onboarding";

export function useTaskContainer() {
  const context = useTaskContext();
  const { isLoading, groups, selectedGroupId } = context;

  const groupsHook = useTaskGroups(context);
  const listHook = useTaskList(context, groupsHook.states);
  const onboardingHook = useTaskOnboarding(context, groupsHook.handlers);

  return {
    data: {
      groups,
      selectedGroupId,
      onboarding: context.onboarding,
      isLoading,
    },

    states: {
      ...groupsHook.states,
      ...onboardingHook.states,
    },

    values: {
      ...groupsHook.values,
      ...onboardingHook.values,
      taskListProps: listHook.taskListProps,
    },

    actions: {
      selectTaskGroup: context.selectTaskGroup,
      deleteTaskGroup: context.deleteTaskGroup,
      closeOnboarding: context.closeOnboarding,
      completeOnboardingStep: context.completeOnboardingStep,
    },

    handlers: {
      ...groupsHook.handlers,
      ...listHook.handlers,
      ...onboardingHook.handlers,
    },
  };
}
