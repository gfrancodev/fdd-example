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
      type ListItemValue = { id: number; completed: boolean }

      type ListProps = {
        tasks: ListItemValue[];
        onToggle: (id: number) => void;
        onRemove: (id: number) => void;
        children: (task: ListItemValue) => JSX.Element;
      } & React.JSX.IntrinsicAttributes;

      type List = React.ComponentType<ListProps>

      type ListItemProps = Omit<ListProps, 'tasks' | 'children'> & React.JSX.IntrinsicAttributes & ListItemValue;

      type ListItem = React.ComponentType<ListItemProps>;

      type InputProps = {
        taskText: string;
        note: string;
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        handleSubmit: (e: React.FormEvent) => void;
      } & React.JSX.IntrinsicAttributes;
      type Input = React.ComponentType<InputProps>;
    }
  }
}

export { };