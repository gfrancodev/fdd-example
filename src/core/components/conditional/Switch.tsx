import React from 'react';

/**
 * Case component for use within the Switch component
 * @param condition The condition to render the children
 * @param children The content to be rendered when the condition is true
 */
const Case: Core.Component.Case = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

/**
 * Component for conditional rendering with multiple cases
 * Should be used in conjunction with the Case component
 * 
 * @param children Case components containing the conditions and contents
 * @param fallback Optional content to be rendered when no case is true
 */
const Switch: Core.Component.Switch = ({ children, fallback }) => {
  const childrenArray = React.Children.toArray(children);
  const matchingCase = childrenArray.find(
    (child) => 
      React.isValidElement(child) && 
      child.type === Case && 
      child.props.condition
  );
  
  return matchingCase ? <>{matchingCase}</> : fallback ? <>{fallback}</> : null;
};

export { Switch, Case }; 