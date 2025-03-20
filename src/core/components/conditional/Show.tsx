/**
 * Component for conditional rendering focused on showing content
 * Similar to If, but with more semantic prop names for cases
 * where the expectation is that the condition is frequently true
 * 
 * @param when The condition to render the children
 * @param children The content to be rendered when the condition is true
 * @param fallback Optional content to be rendered when the condition is false
 */
const Show: Core.Component.Show = ({ when, children, fallback }) => {
  return when ? <>{children}</> : fallback ? <>{fallback}</> : null;
};

export default Show; 