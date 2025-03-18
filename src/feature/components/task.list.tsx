const TaskList: Task.Component.List = ({ tasks, children }) => {
  return (
    <ul className="task-list" style={{ listStyleType: "none", padding: "0" }}>
      {tasks.map((task) => children(task))}
    </ul>
  );
};

export default TaskList;
