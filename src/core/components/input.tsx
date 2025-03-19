const Input: Core.Component.Input = ({ className = "", label, error, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-(--task-text-secondary) text-sm mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-3 py-2 border border-(--task-border) rounded-md
        text-(--task-text-primary) placeholder:(--task-text-placeholder)
        focus:outline-none focus:ring-2 focus:ring-(--task-transparent) focus:border-(--task-primary)
        disabled:bg-(--task-secondary) disabled:text-(--task-text-disabled) disabled:cursor-not-allowed
        transition-colors duration-200 ${error ? 'border-(--task-error) focus:ring-(--task-error)' : ''} ${className}`}
      />
      {error && <p className="mt-1 text-sm text-(--task-error)">{error}</p>}
    </div>
  );
};

export default Input;
