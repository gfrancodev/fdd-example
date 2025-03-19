import { useRef, useState, useEffect, useMemo } from "react";

type GroupStates = {
  newGroupName: string;
  showGroupCreator: boolean;
  hoveredGroupId: string | null;
  deletingGroupId: string | null;
};

export function useTaskList(
  context: Task.ContextProps,
  groupStates: GroupStates,
) {
  const { selectedGroupId, addTask, toggleTask, deleteTask, isLoading } =
    context;

  const newTaskText = useState("");
  const hoveredTaskId = useState<number | null>(null);
  const deletingTaskId = useState<number | null>(null);
  const inputIsFocused = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newTaskText[1](e.target.value);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText[0].trim() && selectedGroupId) {
      addTask(selectedGroupId, newTaskText[0].trim());
      newTaskText[1]("");
    }
  };

  const handleAddSampleTask = () => {
    if (selectedGroupId) {
      addTask(selectedGroupId, "My first task");
      context.completeOnboardingStep("add-task");
    }
  };

  const handleTaskMouseEnter = (id: number) => {
    hoveredTaskId[1](id);
  };

  const handleTaskMouseLeave = () => {
    hoveredTaskId[1](null);
  };

  const handleStartTaskDelete = (id: number) => {
    deletingTaskId[1](id);
    setTimeout(() => {
      deleteTask(selectedGroupId!, id);
      deletingTaskId[1](null);
    }, 200);
  };

  const handleInputFocus = () => {
    inputIsFocused[1](true);
  };

  const handleInputBlur = () => {
    inputIsFocused[1](false);
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedGroupId]);

  const selectedGroup = context.groups.find(
    (group) => group.id === selectedGroupId,
  );

  const taskListProps = useMemo(() => {
    if (!selectedGroup) return null;

    const pendingTasks = selectedGroup.tasks.filter((task) => !task.completed);
    const completedTasks = selectedGroup.tasks.filter((task) => task.completed);
    const completedCount = completedTasks.length;
    const totalCount = selectedGroup.tasks.length;
    const progressPercentage =
      totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return {
      groupId: selectedGroup.id,
      groupName: selectedGroup.name,
      tasks: selectedGroup.tasks,
      pendingTasks,
      completedTasks,
      completedCount,
      totalCount,
      progressPercentage,
      newTaskValue: newTaskText[0],
      onNewTaskChange: handleNewTaskChange,
      onAddTask: handleAddTask,
      onToggleTask: toggleTask,
      onDeleteTask: deleteTask,
      isLoading,
      listRef,
      hoveredTaskId: hoveredTaskId[0],
      deletingTaskId: deletingTaskId[0],
      inputIsFocused: inputIsFocused[0],
      onInputFocus: handleInputFocus,
      onInputBlur: handleInputBlur,
      onTaskMouseEnter: handleTaskMouseEnter,
      onTaskMouseLeave: handleTaskMouseLeave,
    };
  }, [
    selectedGroup,
    newTaskText[0],
    toggleTask,
    deleteTask,
    isLoading,
    hoveredTaskId[0],
    deletingTaskId[0],
    inputIsFocused[0],
  ]);

  return {
    taskListProps,
    handlers: {
      handleNewTaskChange,
      handleAddTask,
      handleAddSampleTask,
      handleTaskMouseEnter,
      handleTaskMouseLeave,
      handleStartTaskDelete,
      handleInputFocus,
      handleInputBlur,
    },
  };
}
