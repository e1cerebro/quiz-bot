import React from 'react';
import { ActionControls } from './Button.styles';

type Props = {
  type: string;
  callback: any;
};
const Button: React.FC<Props> = ({ callback, type, ...props }) => {
  return (
    <ActionControls>
      <button className={type} onClick={callback}>
        {props.children}
      </button>
    </ActionControls>
  );
};

export default Button;
