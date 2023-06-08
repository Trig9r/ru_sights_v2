import React from 'react';

import style from './Input.module.css';

import cancelIcon from './img/cancelIcon.svg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string;
  isError?: boolean;
  helperText?: string;
  handleInputChange?: any;
  classnames?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  isError = false,
  helperText,
  label,
  classnames,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // const onClickClear = () => {
  //   handleInputChange('');
  //   inputRef.current?.focus();
  // };

  return (
    <>
      <div
        aria-disabled={props.disabled}
        className={`${style.input_container} ${isError ? style.input_container : ''} ${
          classnames ? classnames : ''
        }`}
        onClick={() => {
          inputRef.current?.focus();
        }}>
        <input
          ref={inputRef}
          className={style.input}
          value={value}
          onChange={onChange}
          {...props}
        />
        <label className={style.input_label}>{label}</label>
      </div>
      {isError && helperText && <div className={style.helper_text}>{helperText}</div>}
    </>
  );
};
