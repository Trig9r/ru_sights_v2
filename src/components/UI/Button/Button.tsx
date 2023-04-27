import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  isLoading?: boolean;
  classnames?: any;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  primary = false,
  classnames,
  ...props
}) => {
  return (
    <button
      className={`${primary ? styles.button_primary : styles.button} ${classnames ?? ''}`}
      disabled={isLoading}
      {...props}>
      {children}
    </button>
  );
};
