import React, { useState } from "react";
import { useInjectComponent } from "@brushy/di";
import { TASK_LIST, TASK_INPUT, TASK_ITEM } from "../../feature";
import { useTaskContext } from "../../feature/task.context";

export default function TaskPage() {
  const [taskText, setTaskText] = useState("");
  const [note, setNote] = useState("");
  const { tasks, addTask, toggleTask, removeTask } = useTaskContext();

  const TaskList = useInjectComponent<Task.Component.ListProps>(TASK_LIST);
  const TaskInput = useInjectComponent<Task.Component.InputProps>(TASK_INPUT);
  const TaskItem = useInjectComponent<Task.Component.ListItemProps>(TASK_ITEM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    const newTask: Task.Root = { id: Date.now(), text: taskText, completed: false };
    addTask(newTask);
    setTaskText("");
    setNote("");
  };

  return (
    <div className="container">
      <h1 className="title">Lista de Tarefas</h1>
      <form onSubmit={handleSubmit} className="task-input">
        <TaskInput
          taskText={taskText}
          note={note}
          handleChange={(e) => setTaskText(e.target.value)}
          handleNoteChange={(e) => setNote(e.target.value)}
          handleSubmit={handleSubmit}
        />
      </form>
      <TaskList
        tasks={tasks.map((task) => ({
          id: task.id,
          completed: task.completed,
        }))}
        onToggle={toggleTask}
        onRemove={removeTask}
      >
        {(taskProps) => (
          <TaskItem
            key={taskProps.id}
            id={taskProps.id}
            completed={taskProps.completed}
            onToggle={toggleTask}
            onRemove={removeTask}
          />
        )}
      </TaskList>
    </div>
  );
}