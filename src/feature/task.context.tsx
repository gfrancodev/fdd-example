import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useInject } from "@brushy/di";
import { TOAST } from "../core";
import { TASK_SERVICE } from ".";

const TaskContext = createContext<Task.ContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const taskService = useInject<Task.Service>(TASK_SERVICE, {
    cachePromises: false,
  });
  const { notify } = useInject<Core.Toast.Hook>(TOAST);

  const [groups, setGroups] = useState<Task.Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | undefined>(undefined);
  const [onboarding, setOnboarding] = useState<Task.OnboardingState>({
    showOnboarding: true,
    currentStep: 'create-group',
    completed: []
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useMemo(() => {
    if (isInitialized) return;

    const initializeData = async () => {
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

        const onboardingState = await taskService.onboardingStorage?.getJSON("onboarding");
        if (onboardingState) {
          setOnboarding(onboardingState);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Erro ao inicializar dados:", error);
        notify({
          title: "Erro ao carregar dados",
          description: "Ocorreu um erro ao inicializar a aplicação.",
          status: "error",
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [taskService, notify, isInitialized]);

  const createTaskGroup = useCallback(async (name: string) => {
    try {
      const newGroup = await taskService.createTaskGroup(name);
      setGroups(prev => [...prev, newGroup]);

      if (groups.length === 0) {
        setSelectedGroupId(newGroup.id);
      }

      notify({
        title: "Grupo criado",
        description: `O grupo "${name}" foi criado com sucesso.`,
        status: "success",
        isClosable: true,
      });

      return newGroup;
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
      notify({
        title: "Erro ao criar grupo",
        description: "Ocorreu um erro ao criar o grupo.",
        status: "error",
        isClosable: true,
      });
    }
  }, [taskService, groups.length, notify]);

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
          title: "Grupo excluído",
          description: "O grupo foi excluído com sucesso.",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Erro ao excluir grupo:", error);
      notify({
        title: "Erro ao excluir grupo",
        description: "Ocorreu um erro ao excluir o grupo.",
        status: "error",
        isClosable: true,
      });
    }
  }, [taskService, groups, selectedGroupId, notify]);

  const selectTaskGroup = useCallback(async (id: string) => {
    try {
      await taskService.selectTaskGroup(id);
      setSelectedGroupId(id);
    } catch (error) {
      console.error("Erro ao selecionar grupo:", error);
    }
  }, [taskService]);

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
      console.error("Erro ao adicionar tarefa:", error);
      notify({
        title: "Erro ao adicionar tarefa",
        description: "Ocorreu um erro ao adicionar a tarefa.",
        status: "error",
        isClosable: true,
      });
    }
  }, [taskService, notify]);

  const toggleTask = useCallback(async (groupId: string, taskId: number) => {
    try {
      const updatedTasks = await taskService.toggleTask(groupId, taskId);

      setGroups(prev => prev.map(group =>
        group.id === groupId
          ? { ...group, tasks: updatedTasks }
          : group
      ));
    } catch (error) {
      console.error("Erro ao alternar estado da tarefa:", error);
      notify({
        title: "Erro ao atualizar tarefa",
        description: "Ocorreu um erro ao atualizar o estado da tarefa.",
        status: "error",
        isClosable: true,
      });
    }
  }, [taskService, notify]);

  const deleteTask = useCallback(async (groupId: string, taskId: number) => {
    try {
      const updatedTasks = await taskService.deleteTask(groupId, taskId);

      setGroups(prev => prev.map(group =>
        group.id === groupId
          ? { ...group, tasks: updatedTasks }
          : group
      ));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      notify({
        title: "Erro ao excluir tarefa",
        description: "Ocorreu um erro ao excluir a tarefa.",
        status: "error",
        isClosable: true,
      });
    }
  }, [taskService, notify]);

  const closeOnboarding = useCallback(async () => {
    try {
      await taskService.closeOnboarding();
      setOnboarding(prev => ({ ...prev, showOnboarding: false }));
    } catch (error) {
      console.error("Erro ao fechar onboarding:", error);
    }
  }, [taskService]);

  const resetOnboarding = useCallback(async () => {
    try {
      await taskService.resetOnboarding();
      setOnboarding({
        showOnboarding: true,
        currentStep: 'create-group',
        completed: []
      });
    } catch (error) {
      console.error("Erro ao resetar onboarding:", error);
    }
  }, [taskService]);

  const completeOnboardingStep = useCallback(async (step: string) => {
    try {
      await taskService.completeOnboardingStep(step);

      const steps = ['create-group', 'add-task', 'complete-task', 'organize-tasks', 'create-more-groups'];
      const currentIndex = steps.indexOf(step);
      let nextStep = step;

      if (currentIndex < steps.length - 1) {
        nextStep = steps[currentIndex + 1];
      }

      setOnboarding(prev => ({
        ...prev,
        currentStep: nextStep,
        completed: [...prev.completed, step],
      }));
    } catch (error) {
      console.error("Erro ao completar passo do onboarding:", error);
    }
  }, [taskService]);

  const contextValue = useMemo(() => ({
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
  ]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext deve ser usado dentro de um TaskProvider");
  }
  return context;
}; 