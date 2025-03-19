const EmptyState: React.FC<Core.Component.EmptyStateProps> = ({ message, action }) => {
  return (
    <div className="bg-(--task-background) rounded-xl shadow-sm h-[300px] flex flex-col items-center justify-center text-(--task-text-secondary) p-8 text-center">
      <p className="mb-4">{message}</p>
      {action}
    </div>
  );
};

export default EmptyState;