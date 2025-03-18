import { delay } from "../../core/utils/delay";
import { JSONStorage } from "@brushy/localstorage";

export class TaskHttpService implements Task.Service {
  private storage = new JSONStorage("@tasks:async");
  protected DEFAULT_STORAGE_OPTIONS = { pretty: true };

  async getAll(): Promise<Task.Root[]> {
    await delay(2000);
    return this.storage.getJSON("tasks") || [];
  }

  async getById(id: number): Promise<Task.Root | undefined> {
    await delay(2000);
    const tasks = await this.getAll();
    return tasks.find((task) => task.id === id);
  }

  async add(task: Task.Root): Promise<Task.Root> {
    const tasks = await this.getAll();
    this.storage.setJSON(
      "tasks",
      [...tasks, task],
      this.DEFAULT_STORAGE_OPTIONS
    );
    return task;
  }

  async update(
    id: number,
    updatedFields: Partial<Task.Root>
  ): Promise<Task.Root | undefined> {
    const tasks = await this.getAll();
    let updatedTask: Task.Root | undefined;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        updatedTask = { ...task, ...updatedFields };
        return updatedTask;
      }
      return task;
    });

    this.storage.setJSON("tasks", updatedTasks, this.DEFAULT_STORAGE_OPTIONS);
    return updatedTask;
  }

  async toggle(id: number): Promise<Task.Root[]> {
    const tasks = await this.getAll();
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    this.storage.setJSON("tasks", updatedTasks, this.DEFAULT_STORAGE_OPTIONS);
    return updatedTasks;
  }

  async remove(id: number): Promise<Task.Root[]> {
    const tasks = await this.getAll();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    this.storage.setJSON("tasks", updatedTasks, this.DEFAULT_STORAGE_OPTIONS);
    return updatedTasks;
  }
}
