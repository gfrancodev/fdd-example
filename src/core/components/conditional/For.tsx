import React from 'react';

/**
 * Component for rendering lists
 * @param each Array of items to be rendered
 * @param children Rendering function that receives an item and its index
 * @param fallback Optional content to be rendered when the array is empty
 */
const For = <T,>({ each, children, fallback }: Core.Component.ForProps<T>) => {
  return each.length > 0 ? (
    <>{each.map((item, index) => (
      <React.Fragment key={index}>
        {children(item, index)}
      </React.Fragment>
    ))}</>
  ) : fallback ? (
    <>{fallback}</>
  ) : null;
};

export default For; 