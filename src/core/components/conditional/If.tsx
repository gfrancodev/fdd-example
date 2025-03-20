/**
 * Component for conditional rendering
 * @param condition The condition to render the children
 * @param children The content to be rendered when the condition is true
 * @param fallback Optional content to be rendered when the condition is false
 */
const If: Core.Component.If = ({ condition, children, fallback }) => {
  return condition ? <>{children}</> : fallback ? <>{fallback}</> : null;
};

export default If; 