declare global {
  namespace Task {
    type Root = {
      id: number;
      text: string;
      completed: boolean;
    };

    interface Group {
      id: string;
      name: string;
      tasks: Task.Root[];
    }

    interface OnboardingStep {
      step: 'create-group' | 'add-task' | 'complete-task' | 'filter-tasks' | 'share-group';
      title: string;
      description: string;
    }

    interface OnboardingState {
      showOnboarding: boolean;
      currentStep: string;
      completed: string[];
      hasCompletedOnboarding: boolean;
    }

    interface Service {
      getTaskGroups(): Group[] | Promise<Group[]>;
      getTaskGroupById(id: string): Group | undefined | Promise<Group | undefined>;
      createTaskGroup(name: string): Group | Promise<Group>;
      deleteTaskGroup(id: string): boolean | Promise<boolean>;
      addTask(groupId: string, text: string): Task.Root | Promise<Task.Root>;
      toggleTask(groupId: string, taskId: number): Task.Root[] | Promise<Task.Root[]>;
      deleteTask(groupId: string, taskId: number): Task.Root[] | Promise<Task.Root[]>;
      selectTaskGroup(id: string): void | Promise<void>;
      getSelectedTaskGroupId(): string | undefined | Promise<string | undefined>;
      closeOnboarding(): void | Promise<void>;
      resetOnboarding(): void | Promise<void>;
      completeOnboardingStep(step: string): void | Promise<void>;
      showOnboarding(): void | Promise<void>;
      getOnboardingState(): OnboardingState | Promise<OnboardingState>;
      onboardingStorage?: any;
    }

    interface ContextProps {
      groups: Group[];
      selectedGroupId: string | undefined;
      onboarding: OnboardingState;
      isLoading: boolean;
      createTaskGroup: (name: string) => void;
      deleteTaskGroup: (id: string) => void;
      selectTaskGroup: (id: string) => void;
      addTask: (groupId: string, text: string) => void;
      toggleTask: (groupId: string, taskId: number) => void;
      deleteTask: (groupId: string, taskId: number) => void;
      closeOnboarding: () => void;
      resetOnboarding: () => void;
      completeOnboardingStep: (step: string) => void;
      showOnboarding: () => void;
    }

    namespace Component {
      type TaskItemValue = { id: number; text: string; completed: boolean };

      type ListProps = {
        groupId: string;
        groupName: string;
        tasks: Task.Root[];
        pendingTasks: Task.Root[];
        completedTasks: Task.Root[];
        completedCount: number;
        totalCount: number;
        progressPercentage: number;
        newTaskValue: string;
        onNewTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onAddTask: (e: React.FormEvent) => void;
        onToggleTask: (groupId: string, taskId: number) => void;
        onDeleteTask: (groupId: string, taskId: number) => void;
        isLoading?: boolean;
        listRef: React.RefObject<HTMLDivElement>;
        hoveredTaskId: number | null;
        deletingTaskId: number | null;
        inputIsFocused: boolean;
        onInputFocus: () => void;
        onInputBlur: () => void;
        onTaskMouseEnter: (id: number) => void;
        onTaskMouseLeave: () => void;
      } & React.JSX.IntrinsicAttributes;

      type List = React.ComponentType<ListProps>;

      type ListItemProps = {
        task: TaskItemValue;
        onToggle: (id: number) => void;
        onDelete: (id: number) => void;
        isHovered: boolean;
        isDeleting: boolean;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
      } & React.JSX.IntrinsicAttributes;

      type ListItem = React.ComponentType<ListItemProps>;

      type InputProps = {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onSubmit: (e: React.FormEvent) => void;
        isFocused: boolean;
        onFocus: () => void;
        onBlur: () => void;
      } & React.JSX.IntrinsicAttributes;
      
      type Input = React.ComponentType<InputProps>;
      
      type GroupSelectorProps = {
        groups: Group[];
        selectedGroupId: string | undefined;
        onSelectGroup: (id: string) => void;
        onDeleteGroup: (id: string) => void;
        onCreateGroup: () => void;
        hoveredGroupId: string | null;
        deletingGroupId: string | null;
        onGroupMouseEnter: (id: string) => void;
        onGroupMouseLeave: () => void;
      } & React.JSX.IntrinsicAttributes;
      
      type GroupSelector = React.ComponentType<GroupSelectorProps>;
      
      type GroupCreatorProps = {
        groupName: string;
        onGroupNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onSubmit: (e: React.FormEvent) => void;
        onClose: () => void;
        isSubmitEnabled: boolean;
        onKeyDown: (e: React.KeyboardEvent) => void;
      } & React.JSX.IntrinsicAttributes;
      
      type GroupCreator = React.ComponentType<GroupCreatorProps>;
      
      type OnboardingStep = {
        step: string;
        title: string;
        description: string;
      }
      
      type OnboardingProps = {
        isVisible: boolean;
        onboardingSteps: OnboardingStep[];
        currentStep: string;
        completedSteps: string[];
        expandedStep: string | null;
        onToggleStep: (step: string) => void;
        onClose: () => void;
        onCompleteStep: (step: string) => void;
        onCreateGroup: () => void;
        onAddSampleTask: () => void;
        onKeyDown: (e: React.KeyboardEvent) => void;
      } & React.JSX.IntrinsicAttributes;
      
      type Onboarding = React.ComponentType<OnboardingProps>;

      type OnboardingItemProps = {
        step: string;
        title: string;
        description: string;
        isActive: boolean;
        isOpen: boolean;
        isCompleted: boolean;
        onToggle: () => void;
        onClick: () => void;
      } & React.JSX.IntrinsicAttributes;

      type OnboardingItem = React.ComponentType<OnboardingItemProps>;

      type SelectorSkeletonProps = {} & React.JSX.IntrinsicAttributes;
      type SelectorSkeleton = React.ComponentType<SelectorSkeletonProps>;

      type ListSkeletonProps = {} & React.JSX.IntrinsicAttributes;
      type ListSkeleton = React.ComponentType<ListSkeletonProps>;
    }
  }
}

export {};