const Button: Core.Component.Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary 
      disabled:opacity-50 disabled:pointer-events-none
      bg-primary text-primary-foreground hover:bg-primary-hover h-10 px-4 py-2 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
