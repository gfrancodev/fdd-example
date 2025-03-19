import { Suspense } from "react";
import { useInjectComponent } from "@brushy/di";
import {
  TASK_CREATOR,
  TASK_LIST,
  TASK_ONBOARDING,
  TASK_SELECTOR,
  TASK_GRID,
  useTaskContainer
} from "@/feature/task/index";
import {
  HEADER,
  LAYOUT,
  EMPTY_STATE,
  HELP_BUTTON,
  CREATE_GROUP_BUTTON
} from "@/core";
import TaskLoading from "./loading";

export default function TaskPage() {
  const {
    data: {
      groups,
      selectedGroupId,
      onboarding,
      isLoading,
    },
    states: {
      showGroupCreator,
      newGroupName,
      expandedStep,
      hoveredGroupId,
      deletingGroupId,
    },
    values: {
      selectedGroup,
      onboardingSteps,
      taskListProps,
      isSubmitEnabled,
    },
    actions: {
      selectTaskGroup,
      deleteTaskGroup,
      closeOnboarding,
      completeOnboardingStep,
    },
    handlers: {
      handleCreateGroup,
      handleGroupNameChange,
      handleSubmitGroup,
      handleAddSampleTask,
      handleToggleStep,
      handleCloseGroupCreator,
      showOnboardingTutorial,
      handleGroupMouseEnter,
      handleGroupMouseLeave,
      handleCreatorKeyDown,
      handleOnboardingKeyDown,
    }
  } = useTaskContainer();

  const TaskList = useInjectComponent<Task.Component.ListProps>(TASK_LIST);
  const TaskSelector = useInjectComponent<Task.Component.GroupSelectorProps>(TASK_SELECTOR);
  const TaskCreator = useInjectComponent<Task.Component.GroupCreatorProps>(TASK_CREATOR);
  const TaskOnboarding = useInjectComponent<Task.Component.OnboardingProps>(TASK_ONBOARDING);
  const Header = useInjectComponent<Core.Component.HeaderProps>(HEADER);
  const Layout = useInjectComponent<Core.Component.LayoutProps>(LAYOUT);
  const EmptyState = useInjectComponent<Core.Component.EmptyStateProps>(EMPTY_STATE);
  const TaskGrid = useInjectComponent<Core.Component.TaskGridProps>(TASK_GRID);
  const HelpButton = useInjectComponent<Core.Component.HelpButtonProps>(HELP_BUTTON);
  const CreateGroupButton = useInjectComponent<Core.Component.CreateGroupButtonProps>(CREATE_GROUP_BUTTON);

  if (isLoading) {
    return <TaskLoading />;
  }

  return (
    <Suspense fallback={<TaskLoading />}>
      <Layout>
        <Header
          title="My Tasks"
          rightContent={<HelpButton onClick={showOnboardingTutorial} />}
        />

        <TaskGrid
          sidebarContent={
            <TaskSelector
              groups={groups}
              selectedGroupId={selectedGroupId}
              onSelectGroup={selectTaskGroup}
              onDeleteGroup={deleteTaskGroup}
              onCreateGroup={handleCreateGroup}
              hoveredGroupId={hoveredGroupId}
              deletingGroupId={deletingGroupId}
              onGroupMouseEnter={handleGroupMouseEnter}
              onGroupMouseLeave={handleGroupMouseLeave}
            />
          }
          mainContent={
            selectedGroup && taskListProps ? (
              <TaskList {...taskListProps} />
            ) : (
              <EmptyState
                message="Você ainda não tem nenhum grupo de tarefas."
                action={<CreateGroupButton onClick={showOnboardingTutorial} />}
              />
            )
          }
        />

        {showGroupCreator && (
          <TaskCreator
            groupName={newGroupName}
            onGroupNameChange={handleGroupNameChange}
            onSubmit={handleSubmitGroup}
            onClose={handleCloseGroupCreator}
            isSubmitEnabled={isSubmitEnabled}
            onKeyDown={handleCreatorKeyDown}
          />
        )}

        <TaskOnboarding
          isVisible={onboarding.showOnboarding}
          onboardingSteps={onboardingSteps}
          currentStep={onboarding.currentStep}
          completedSteps={onboarding.completed}
          expandedStep={expandedStep}
          onToggleStep={handleToggleStep}
          onClose={closeOnboarding}
          onCompleteStep={completeOnboardingStep}
          onCreateGroup={handleCreateGroup}
          onAddSampleTask={handleAddSampleTask}
          onKeyDown={handleOnboardingKeyDown}
        />
      </Layout>
    </Suspense>
  );
}