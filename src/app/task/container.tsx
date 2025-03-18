import { useState, useMemo } from "react";
import { useTaskContext } from "../../feature/task.context";

export function useTaskContainer() {
  // Context
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
  
  // States
  const states = {
    showGroupCreator: useState(false),
    newGroupName: useState(''),
    openSteps: useState<string[]>([]),
    newTaskText: useState('')
  };
  
  
  // Values
  const values = {
    selectedGroup: groups.find(group => group.id === selectedGroupId),
    onboardingSteps: [
      {
        step: 'create-group',
        title: 'Criar um grupo de tarefas',
        description: 'Primeiro, vamos criar um grupo para organizar suas tarefas. Por exemplo: "Trabalho", "Pessoal" ou "Projetos".',
      },
      {
        step: 'add-task',
        title: 'Adicionar tarefas',
        description: 'Agora, adicione tarefas ao seu grupo. Você pode digitar a tarefa e pressionar Enter para adicionar.',
      },
      {
        step: 'complete-task',
        title: 'Concluir tarefas',
        description: 'Marque suas tarefas como concluídas clicando na caixa de seleção ao lado de cada tarefa.',
      },
      {
        step: 'organize-tasks',
        title: 'Organizar tarefas',
        description: 'Suas tarefas concluídas são automaticamente agrupadas. Você pode ver todas as suas tarefas em um só lugar.',
      },
      {
        step: 'create-more-groups',
        title: 'Criar mais grupos',
        description: 'Crie diferentes grupos para organizar melhor suas tarefas por contexto ou projeto.',
      },
    ]
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
      states.openSteps[1](prev => 
        prev.includes(step) 
          ? prev.filter(s => s !== step) 
          : [...prev, step]
      );
    },
    
    handleCloseGroupCreator: () => {
      states.showGroupCreator[1](false);
    },
    
    handleNewTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      states.newTaskText[1](e.target.value);
    }
  };
  
  useMemo(() => {
    if (onboarding.currentStep && !states.openSteps[0].includes(onboarding.currentStep)) {
      states.openSteps[1](prev => [...prev, onboarding.currentStep]);
    }
  }, [onboarding.currentStep, states.openSteps[0]]);
  
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
      onDeleteTask: deleteTask
    };
  }, [values.selectedGroup, states.newTaskText[0], toggleTask, deleteTask]);
  
  return {
    // Context data
    data: {
        groups,
        selectedGroupId,
        onboarding,
        isLoading,
    },
    
     // State getters
    states: {
        showGroupCreator: states.showGroupCreator[0],
        newGroupName: states.newGroupName[0],
        openSteps: states.openSteps[0],
    },

    values: {
        selectedGroup: values.selectedGroup,
        onboardingSteps: values.onboardingSteps,
        taskListProps,
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