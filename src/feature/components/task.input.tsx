import { CheckCircle, Edit } from "lucide-react";

const TaskInput: Task.Component.Input = ({
  handleChange,
  handleNoteChange,
  handleSubmit,
  taskText,
  note,
}) => {
  return (
    <div className="task-input-container">
      <div className="input-group">
        <input
          className="task-input"
          type="text"
          placeholder="Enter your task..."
          value={taskText}
          onChange={handleChange}
        />
        <button className="task-btn" onClick={handleSubmit}>
          <CheckCircle size={20} />
        </button>
      </div>

      <div className="note-group">
        <textarea
          className="task-note"
          placeholder="Add a note..."
          value={note}
          onChange={handleNoteChange}
        />
        <button className="note-btn">
          <Edit size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
