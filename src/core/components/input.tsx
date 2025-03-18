const Input: Core.Component.Input = ({ label, error, ...props }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input className="input-field" {...props} />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
