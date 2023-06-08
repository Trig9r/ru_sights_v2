import React from 'react';

import style from './Textarea.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
  helperText?: string;
  handleInputChange?: any;
  classnames?: string;
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  isError = true,
  helperText,
  classnames,
  label,
  ...props
}) => {
  return (
    <div>
      <textarea
        value={value}
        placeholder={label}
        className={`${style.textarea_container} ${isError ? style.textarea_container : ''} ${
          classnames ? classnames : ''
        }`}
        onChange={onChange}>
        {value}
      </textarea>
      {isError && helperText && <div className={style.helper_text}>{helperText}</div>}
    </div>
  );
};
