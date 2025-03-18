const Input: Core.Component.Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <input 
        className={`flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm 
        placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary 
        focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50 ${className}`} 
        {...props} 
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
};

export default Input;
