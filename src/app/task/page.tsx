import { TASK_LIST } from "../../feature";
import { useInjectComponent } from "@brushy/di";

export default function TaskPage() {
  const TaskList = useInjectComponent<Task.Component.ListProps>(TASK_LIST);
  return (
    <div className="container">
      <h1 className="title">Lista de Tarefas</h1>
      <div className="task-input">
        <input type="text" placeholder="Adicione uma tarefa" />
        <button>Adicionar</button>
      </div>
      <TaskList tasks={[]}>
        <li className="task-item">
          <span className={"completed"}></span>
          <button className="remove-button">✖</button>
        </li>
      </TaskList>
    </div>
  );
}
