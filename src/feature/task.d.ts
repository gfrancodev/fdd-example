declare global {
  namespace Task {
    type Root = {
      id: number;
      text: string;
      completed: boolean;
    };

    interface Service {
      getAll(): Task.Root[] | Promise<Task.Root[]>;
      getById(
        id: number
      ): Task.Root | undefined | Promise<Task.Root | undefined>;
      add(task: Task.Root): Task.Root | Promise<Task.Root>;
      update(
        id: number,
        updatedFields: Partial<Task.Root>
      ): Task.Root | undefined | Promise<Task.Root | undefined>;
      toggle(id: number): Task.Root[] | Promise<Task.Root[]>;
      remove(id: number): Task.Root[] | Promise<Task.Root[]>;
    }

    interface ContextProps {
      tasks: Task.Root[];
      addTask: (task: Task.Root) => void;
      updateTask: (id: number, updatedFields: Partial<Task.Root>) => void;
      toggleTask: (id: number) => void;
      removeTask: (id: number) => void;
      getTaskById: (id: number) => Task.Root | Promise<Task.Root> | undefined;
    }

    namespace Component {

      type ListProps = {
        tasks: { id: number; completed: boolean }[];
        onToggle: (id: number) => void;
        onRemove: (id: number) => void;
        children: (task: { id: number; completed: boolean }) => JSX.Element;
      }
      type List = React.ComponentType<ListProps>

      interface ListItemProps extends <Omit<ListProps, 'tasks' | 'children'>> {
        id: number;
        completed: boolean;
      };

      type ListItem = React.ComponentType<ListItemProps>;
    }
  }
}

export {};
