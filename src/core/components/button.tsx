const Button: Core.Component.Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={"button"}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
    >
      {children}
    </button>
  );
};

export default Button;
