import { useState, useMemo, useRef, useEffect } from "react";
import { useTaskContext } from "../../feature/task/task.context";

export function useTaskContainer() {

  const {
    groups,
    selectedGroupId,
    selectTaskGroup,
    deleteTaskGroup,
    createTaskGroup,
    addTask,
    toggleTask,
    deleteTask,
    onboarding,
    closeOnboarding,
    resetOnboarding,
    completeOnboardingStep,
    isLoading
  } = useTaskContext();

  const [expandedStep, setExpandedStep] = useState<string | null>('welcome');
  const listRef = useRef<HTMLDivElement>(null);
  const states = {
    showGroupCreator: useState(false),
    newGroupName: useState(''),
    newTaskText: useState(''),
    hoveredGroupId: useState<string | null>(null),
    deletingGroupId: useState<string | null>(null),
    hoveredTaskId: useState<number | null>(null),
    deletingTaskId: useState<number | null>(null),
    inputIsFocused: useState(false)
  };

  const values = {
    selectedGroup: groups.find(group => group.id === selectedGroupId),
    onboardingSteps: [
      {
        step: 'create-group' as const,
        title: 'Criar um grupo de tarefas',
        description: 'Primeiro, vamos criar um grupo para organizar suas tarefas. Por exemplo: "Trabalho", "Pessoal" ou "Projetos".',
      },
      {
        step: 'add-task' as const,
        title: 'Adicionar tarefas',
        description: 'Agora, adicione tarefas ao seu grupo. Você pode digitar a tarefa e pressionar Enter para adicionar.',
      },
      {
        step: 'complete-task' as const,
        title: 'Concluir tarefas',
        description: 'Marque suas tarefas como concluídas clicando na caixa de seleção ao lado de cada tarefa.',
      },
      {
        step: 'organize-tasks' as const,
        title: 'Organizar tarefas',
        description: 'Suas tarefas concluídas são automaticamente agrupadas. Você pode ver todas as suas tarefas em um só lugar.',
      },
      {
        step: 'create-more-groups' as const,
        title: 'Criar mais grupos',
        description: 'Crie diferentes grupos para organizar melhor suas tarefas por contexto ou projeto.',
      },
    ],
    isSubmitEnabled: states.newGroupName[0].trim().length > 0
  };

  const handlers = {
    handleCreateGroup: () => {
      states.showGroupCreator[1](true);
    },

    handleGroupNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      states.newGroupName[1](e.target.value);
    },

    handleSubmitGroup: (e: React.FormEvent) => {
      e.preventDefault();
      if (states.newGroupName[0].trim()) {
        createTaskGroup(states.newGroupName[0].trim());
        states.newGroupName[1]('');
        states.showGroupCreator[1](false);

        if (onboarding.currentStep === 'create-group') {
          completeOnboardingStep('create-group');
        }
      }
    },

    handleAddSampleTask: () => {
      if (selectedGroupId) {
        addTask(selectedGroupId, "Minha primeira tarefa");
        completeOnboardingStep('add-task');
      }
    },

    handleAddTask: (e: React.FormEvent) => {
      e.preventDefault();
      if (states.newTaskText[0].trim() && selectedGroupId) {
        addTask(selectedGroupId, states.newTaskText[0].trim());
        states.newTaskText[1]('');
      }
    },

    showOnboardingTutorial: () => {
      resetOnboarding();
    },

    handleToggleStep: (step: string) => {
      setExpandedStep(current => current === step ? null : step);
    },

    handleCloseGroupCreator: () => {
      states.showGroupCreator[1](false);
    },

    handleNewTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      states.newTaskText[1](e.target.value);
    },

    handleTaskMouseEnter: (id: number) => {
      states.hoveredTaskId[1](id);
    },
    
    handleTaskMouseLeave: () => {
      states.hoveredTaskId[1](null);
    },
    
    handleStartTaskDelete: (id: number) => {
      states.deletingTaskId[1](id);
      setTimeout(() => {
        deleteTask(selectedGroupId!, id);
        states.deletingTaskId[1](null);
      }, 200);
    },
    
    handleInputFocus: () => {
      states.inputIsFocused[1](true);
    },
    
    handleInputBlur: () => {
      states.inputIsFocused[1](false);
    },
    
    handleGroupMouseEnter: (id: string) => {
      states.hoveredGroupId[1](id);
    },
    
    handleGroupMouseLeave: () => {
      states.hoveredGroupId[1](null);
    },
    
    handleStartGroupDelete: (id: string) => {
      states.deletingGroupId[1](id);
      setTimeout(() => {
        deleteTaskGroup(id);
        states.deletingGroupId[1](null);
      }, 200);
    },
    
    handleCreatorKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        states.showGroupCreator[1](false);
      } else if (e.key === 'Enter' && e.ctrlKey && states.newGroupName[0].trim().length > 0) {
        handlers.handleSubmitGroup(e);
      }
    },
    
    handleOnboardingKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOnboarding();
      }
    }
  };

  useMemo(() => {
    if (onboarding.currentStep && !expandedStep) {
      setExpandedStep(onboarding.currentStep);
    }
  }, [onboarding.currentStep, expandedStep]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedGroupId]);

  const taskListProps = useMemo(() => {
    if (!values.selectedGroup) return null;

    const pendingTasks = values.selectedGroup.tasks.filter(task => !task.completed);
    const completedTasks = values.selectedGroup.tasks.filter(task => task.completed);
    const completedCount = completedTasks.length;
    const totalCount = values.selectedGroup.tasks.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return {
      groupId: values.selectedGroup.id,
      groupName: values.selectedGroup.name,
      tasks: values.selectedGroup.tasks,
      pendingTasks,
      completedTasks,
      completedCount,
      totalCount,
      progressPercentage,
      newTaskValue: states.newTaskText[0],
      onNewTaskChange: handlers.handleNewTaskChange,
      onAddTask: handlers.handleAddTask,
      onToggleTask: toggleTask,
      onDeleteTask: deleteTask,
      isLoading,
      listRef,
      hoveredTaskId: states.hoveredTaskId[0],
      deletingTaskId: states.deletingTaskId[0],
      inputIsFocused: states.inputIsFocused[0],
      onInputFocus: handlers.handleInputFocus,
      onInputBlur: handlers.handleInputBlur,
      onTaskMouseEnter: handlers.handleTaskMouseEnter,
      onTaskMouseLeave: handlers.handleTaskMouseLeave
    };
  }, [values.selectedGroup, states.newTaskText, toggleTask, deleteTask, isLoading, states.hoveredTaskId[0], states.deletingTaskId[0], states.inputIsFocused[0]]);

  return {
    data: {
      groups,
      selectedGroupId,
      onboarding,
      isLoading,
    },

    states: {
      showGroupCreator: states.showGroupCreator[0],
      newGroupName: states.newGroupName[0],
      expandedStep,
      hoveredGroupId: states.hoveredGroupId[0],
      deletingGroupId: states.deletingGroupId[0],
      inputIsFocused: states.inputIsFocused[0]
    },

    values: {
      selectedGroup: values.selectedGroup,
      onboardingSteps: values.onboardingSteps,
      taskListProps,
      isSubmitEnabled: values.isSubmitEnabled
    },
    actions: {
      selectTaskGroup,
      deleteTaskGroup,
      closeOnboarding,
      completeOnboardingStep,
    },
    handlers
  };
}