import { Suspense } from "react";
import { Info, Sun } from "lucide-react";
import { useTaskContainer } from "./container";
import { useInjectComponent } from "@brushy/di";
import { TASK_CREATOR, TASK_LIST, TASK_ONBOARDING, TASK_SELECTOR } from "@/feature";
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
      openSteps,
    },
    values: {
      selectedGroup,
      onboardingSteps,
      taskListProps,
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
    }
  } = useTaskContainer();
  const TaskList = useInjectComponent<Task.Component.ListProps>(TASK_LIST)
  const TaskSelector = useInjectComponent<Task.Component.GroupSelectorProps>(TASK_SELECTOR)
  const TaskCreator = useInjectComponent<Task.Component.GroupCreatorProps>(TASK_CREATOR)
  const TaskOnboarding = useInjectComponent<Task.Component.OnboardingProps>(TASK_ONBOARDING)

  return (
    <Suspense fallback={<TaskLoading />}>
      <div className="min-h-screen bg-[#f5f5f5] flex items-start justify-center p-4 md:p-6">
        <div className="w-full max-w-4xl">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Sun className="h-6 w-6 text-[#0078d4]" />
              <h1 className="text-2xl font-bold text-[#323130]">Minhas Tarefas</h1>
            </div>
            <button 
              className="flex items-center gap-2 text-[#605e5c] hover:text-[#323130] hover:bg-[#f3f2f1] px-3 py-2 rounded-md"
              onClick={showOnboardingTutorial}
            >
              <Info className="h-4 w-4" />
              <span>Tutorial</span>
            </button>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-6">
            <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
              <TaskSelector 
                groups={groups}
                selectedGroupId={selectedGroupId}
                onSelectGroup={selectTaskGroup}
                onDeleteGroup={deleteTaskGroup}
                onCreateGroup={handleCreateGroup}
              />
            </div>
            
            <div>
              {selectedGroup && taskListProps ? (
                <TaskList {...taskListProps} />
              ) : (
                <div className="bg-white rounded-xl shadow-sm h-[300px] flex flex-col items-center justify-center text-[#605e5c] p-8 text-center">
                  <p className="mb-4">Você ainda não tem nenhum grupo de tarefas.</p>
                  <button 
                    className="bg-[#0078d4] hover:bg-[#106ebe] text-white transition-colors px-4 py-2 rounded-md"
                    onClick={showOnboardingTutorial}
                  >
                    Criar meu primeiro grupo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {showGroupCreator && (
          <TaskCreator
            groupName={newGroupName}
            onGroupNameChange={handleGroupNameChange}
            onSubmit={handleSubmitGroup}
            onClose={handleCloseGroupCreator}
          />
        )}
        
        <TaskOnboarding 
          isVisible={onboarding.showOnboarding}
          onboardingSteps={onboardingSteps}
          currentStep={onboarding.currentStep}
          completedSteps={onboarding.completed}
          openSteps={openSteps}
          onToggleStep={handleToggleStep}
          onClose={closeOnboarding}
          onCompleteStep={completeOnboardingStep}
          onCreateGroup={handleCreateGroup}
          onAddSampleTask={handleAddSampleTask}
        />
      </div>
    </Suspense>
  );
}