import * as React from 'react';
import classnames from '../../utils/classnames';

import './menu-button.scss';

interface MenuButtonProps {
  closed?: boolean;
  onClick?: () => void;
  className?: string;
}

const MenuButton: React.SFC<MenuButtonProps> = props => {
  return (
    <button
      className={classnames(
        props.className,
        { close: !props.closed },
        'menu-button'
      )}
      onClick={props.onClick}
    >
      <div className="top bar" />
      <div className="middle bar" />
      <div className="bottom bar" />
    </button>
  );
};

export default MenuButton;
