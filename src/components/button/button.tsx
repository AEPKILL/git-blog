import './button.scss';

import * as React from 'react';

export const enum BUTTON_TYPE {
  LINE_BUTTON
}

interface ButtonProps {
  type: BUTTON_TYPE;
}

const Button: React.SFC<ButtonProps> = props => {
  console.log(props);
  return <button />;
};

export default Button;
