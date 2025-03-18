import Button from "../../core/components/button";

const TaskItem: Task.Component.ListItem = ({
  id,
  completed,
  onToggle,
  onRemove,
}) => {
  return (
    <li
      className="task-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <span
        className={completed ? "completed" : ""}
        onClick={() => onToggle(id)}
        style={{ cursor: "pointer" }}
      >
        {completed ? "✅" : "❌"} Task #{id}
      </span>
      <Button onClick={() => onRemove(id)}>✖</Button>
    </li>
  );
};

export default TaskItem;
