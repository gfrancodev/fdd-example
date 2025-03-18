import { JSONStorage } from "@brushy/localstorage";

export class TaskLocalService implements Task.Service {
  private storage = new JSONStorage("@tasks");
  protected DEFAULT_STORAGE_OPTIONS = { pretty: true, ttl: 60, compress: true };

  getAll(): Task.Root[] {
    return this.storage.getJSON("tasks") || [];
  }

  getById(id: number): Task.Root | undefined {
    return this.getAll().find((task) => task.id === id);
  }

  add(task: Task.Root): Task.Root {
    const tasks = this.getAll();
    this.storage.setJSON(
      "tasks",
      [...tasks, task],
      this.DEFAULT_STORAGE_OPTIONS
    );
    return task;
  }

  update(id: number, updatedFields: Partial<Task.Root>): Task.Root | undefined {
    let updatedTask: Task.Root | undefined;
    const tasks = this.getAll().map((task) => {
      if (task.id === id) {
        updatedTask = { ...task, ...updatedFields };
        return updatedTask;
      }
      return task;
    });
    this.storage.setJSON("tasks", tasks, this.DEFAULT_STORAGE_OPTIONS);
    return updatedTask;
  }

  toggle(id: number): Task.Root[] {
    const tasks = this.getAll().map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.storage.setJSON("tasks", tasks, this.DEFAULT_STORAGE_OPTIONS);
    return tasks;
  }

  remove(id: number): Task.Root[] {
    const tasks = this.getAll().filter((task) => task.id !== id);
    this.storage.setJSON("tasks", tasks, this.DEFAULT_STORAGE_OPTIONS);
    return tasks;
  }
}
