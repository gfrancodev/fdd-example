import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useInject } from "@brushy/di";
import { TOAST } from "../core";
import { TASK_SERVICE } from ".";

const TaskContext = createContext<Task.ContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const taskService = useInject<Task.Service>(TASK_SERVICE);
  const { notify } = useInject<Core.Toast.Hook>(TOAST);

  const [tasks, setTasks] = useState<Task.Root[]>([]);

  useMemo(() => {
    (async () => {
      try {
        const fetchedTasks = await taskService.getAll();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        notify({
          title: "Erro ao carregar tarefas",
          description: "Ocorreu um erro ao buscar as tarefas.",
          status: "error",
        });
      }
    })();
  }, [taskService, notify]);

  const addTask = useCallback(
    async (task: Task.Root) => {
      try {
        const newTask = await taskService.add(task);
        setTasks((prevTasks) => [...prevTasks, newTask]);
        notify({
          title: "Tarefa adicionada",
          description: "Sua nova tarefa foi criada com sucesso!",
          status: "success",
        });
      } catch (error) {
        console.error("Error adding task:", error);
        notify({
          title: "Erro ao adicionar tarefa",
          description: "Não foi possível adicionar a tarefa.",
          status: "error",
        });
      }
    },
    [taskService, notify]
  );

  const updateTask = useCallback(
    async (id: number, updatedFields: Partial<Task.Root>) => {
      try {
        const updatedTask = await taskService.update(id, updatedFields);
        if (updatedTask) {
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? updatedTask : task))
          );
          notify({
            title: "Tarefa atualizada",
            description: "Sua tarefa foi atualizada com sucesso!",
            status: "success",
          });
        }
      } catch (error) {
        console.error("Error updating task:", error);
        notify({
          title: "Erro ao atualizar tarefa",
          description: "Não foi possível atualizar a tarefa.",
          status: "error",
        });
      }
    },
    [taskService, notify]
  );

  const toggleTask = useCallback(
    async (id: number) => {
      try {
        const updatedTasks = await taskService.toggle(id);
        setTasks(updatedTasks);
        notify({
          title: "Tarefa alterada",
          description: "O status da tarefa foi atualizado.",
          status: "info",
        });
      } catch (error) {
        console.error("Error toggling task:", error);
        notify({
          title: "Erro ao alterar tarefa",
          description: "Não foi possível atualizar o status da tarefa.",
          status: "error",
        });
      }
    },
    [taskService, notify]
  );

  const removeTask = useCallback(
    async (id: number) => {
      try {
        const updatedTasks = await taskService.remove(id);
        setTasks(updatedTasks);
        notify({
          title: "Tarefa removida",
          description: "A tarefa foi excluída com sucesso!",
          status: "warning",
        });
      } catch (error) {
        console.error("Error removing task:", error);
        notify({
          title: "Erro ao remover tarefa",
          description: "Não foi possível excluir a tarefa.",
          status: "error",
        });
      }
    },
    [taskService, notify]
  );

  const getTaskById = useCallback(
    async (id: number) => (await taskService.getById(id)) as Task.Root,
    [taskService]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        toggleTask,
        removeTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): Task.ContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
