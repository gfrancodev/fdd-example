import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useInject } from "@brushy/di";
import { TOAST } from "../../core";
import { TASK_SERVICE } from ".";
import { useErrorNotification } from "@/core/hooks/use-error-notification";

const TaskContext = createContext<Task.ContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const taskService = useInject<Task.Service>(TASK_SERVICE, {
    cachePromises: false,
  });
  const { notify } = useInject<Core.Toast.Hook>(TOAST);
  const { handleError } = useErrorNotification();

  const [groups, setGroups] = useState<Task.Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | undefined>(undefined);
  const [onboarding, setOnboarding] = useState<Task.OnboardingState>({
    showOnboarding: false,
    currentStep: 'create-group',
    completed: [],
    hasCompletedOnboarding: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeData = useCallback(async () => {
    if (isInitialized) return;

    try {
      setIsLoading(true);

      const fetchedGroups = await taskService.getTaskGroups();
      setGroups(fetchedGroups);

      const selectedId = await taskService.getSelectedTaskGroupId();
      if (selectedId) {
        setSelectedGroupId(selectedId);
      } else if (fetchedGroups.length > 0) {
        setSelectedGroupId(fetchedGroups[0].id);
        await taskService.selectTaskGroup(fetchedGroups[0].id);
      }

      const onboardingState = await taskService.getOnboardingState();
      if (onboardingState) {
        setOnboarding(onboardingState);
      }

      setIsInitialized(true);
    } catch (error) {
      handleError(error, "Error initializing data", "An error occurred while initializing the application.");
    } finally {
      setIsLoading(false);
    }
  }, [taskService, handleError, isInitialized]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const createTaskGroup = useCallback(async (name: string) => {
    try {
      const newGroup = await taskService.createTaskGroup(name);
      setGroups(prev => [...prev, newGroup]);

      if (groups.length === 0) {
        setSelectedGroupId(newGroup.id);
      }

      notify({
        title: "Group created",
        description: `The group "${name}" was successfully created.`,
        status: "success",
        isClosable: true,
      });

      return newGroup;
    } catch (error) {
      handleError(error, "Error creating group", "An error occurred while creating the group.");
    }
  }, [taskService, groups.length, notify, handleError]);

  const deleteTaskGroup = useCallback(async (id: string) => {
    try {
      const success = await taskService.deleteTaskGroup(id);

      if (success) {
        setGroups(prev => prev.filter(group => group.id !== id));

        if (selectedGroupId === id) {
          const remainingGroups = groups.filter(group => group.id !== id);
          if (remainingGroups.length > 0) {
            setSelectedGroupId(remainingGroups[0].id);
            await taskService.selectTaskGroup(remainingGroups[0].id);
          } else {
            setSelectedGroupId(undefined);
          }
        }

        notify({
          title: "Group deleted",
          description: "The group was successfully deleted.",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      handleError(error, "Error deleting group", "An error occurred while deleting the group.");
    }
  }, [taskService, groups, selectedGroupId, notify, handleError]);

  const selectTaskGroup = useCallback(async (id: string) => {
    try {
      await taskService.selectTaskGroup(id);
      setSelectedGroupId(id);
    } catch (error) {
      handleError(error, "Error selecting group", "An error occurred while selecting the group.");
    }
  }, [taskService, handleError]);

  const addTask = useCallback(async (groupId: string, text: string) => {
    try {
      const newTask = await taskService.addTask(groupId, text);

      setGroups(prev => prev.map(group =>
        group.id === groupId
          ? { ...group, tasks: [...group.tasks, newTask] }
          : group
      ));

      return newTask;
    } catch (error) {
      handleError(error, "Error adding task", "An error occurred while adding the task.");
    }
  }, [taskService, handleError]);

  const toggleTask = useCallback(async (groupId: string, taskId: number) => {
    try {
      const updatedTasks = await taskService.toggleTask(groupId, taskId);

      setGroups(prev => prev.map(group =>
        group.id === groupId
          ? { ...group, tasks: updatedTasks }
          : group
      ));
    } catch (error) {
      handleError(error, "Error updating task", "An error occurred while updating the task.");
    }
  }, [taskService, handleError]);

  const deleteTask = useCallback(async (groupId: string, taskId: number) => {
    try {
      const updatedTasks = await taskService.deleteTask(groupId, taskId);

      setGroups(prev => prev.map(group =>
        group.id === groupId
          ? { ...group, tasks: updatedTasks }
          : group
      ));
    } catch (error) {
      handleError(error, "Error deleting task", "An error occurred while deleting the task.");
    }
  }, [taskService, handleError]);

  const closeOnboarding = useCallback(async () => {
    try {
      await taskService.closeOnboarding();
      setOnboarding(prev => ({ ...prev, showOnboarding: false }));
    } catch (error) {
      handleError(error, "Error closing tutorial", "An error occurred while closing the tutorial.");
    }
  }, [taskService, handleError]);

  const resetOnboarding = useCallback(async () => {
    try {
      await taskService.resetOnboarding();
      const onboardingState = await taskService.getOnboardingState();
      setOnboarding(onboardingState);
    } catch (error) {
      handleError(error, "Error resetting tutorial", "An error occurred while resetting the tutorial.");
    }
  }, [taskService, handleError]);

  const completeOnboardingStep = useCallback(async (step: string) => {
    try {
      await taskService.completeOnboardingStep(step);
      const onboardingState = await taskService.getOnboardingState();
      setOnboarding(onboardingState);
    } catch (error) {
      handleError(error, "Error updating tutorial", "An error occurred while updating the tutorial.");
    }
  }, [taskService, handleError]);

  const showOnboarding = useCallback(async () => {
    try {
      await taskService.showOnboarding();
      const onboardingState = await taskService.getOnboardingState();
      setOnboarding(onboardingState);
    } catch (error) {
      handleError(error, "Error showing tutorial", "An error occurred while showing the tutorial.");
    }
  }, [taskService, handleError]);

  const value = useMemo(() => ({
    groups,
    selectedGroupId,
    onboarding,
    isLoading,
    createTaskGroup,
    deleteTaskGroup,
    selectTaskGroup,
    addTask,
    toggleTask,
    deleteTask,
    closeOnboarding,
    resetOnboarding,
    completeOnboardingStep,
    showOnboarding
  }), [
    groups,
    selectedGroupId,
    onboarding,
    isLoading,
    createTaskGroup,
    deleteTaskGroup,
    selectTaskGroup,
    addTask,
    toggleTask,
    deleteTask,
    closeOnboarding,
    resetOnboarding,
    completeOnboardingStep,
    showOnboarding
  ]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}; 