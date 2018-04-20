import React from 'react';

export default function cloneRealDomElement<P>(
  element: React.ReactElement<P>,
  props?: Partial<P> & React.Attributes,
  ...children: React.ReactNode[]
): React.ReactElement<P> {
  const temp = React.Children.only(element);
  if (typeof temp.type === 'string') {
    return React.cloneElement(
      element,
      props,
      ...React.Children.toArray(temp.props.children).concat(
        children as React.ReactChild[]
      )
    );
  } else {
    return React.cloneElement(
      temp,
      {},
      cloneRealDomElement(temp.props.children, props, ...children)
    );
  }
}
