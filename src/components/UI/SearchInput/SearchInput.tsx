import React from 'react';
import { debounce } from 'lodash';

import deleteIcon from './img/delete.svg';

import style from './SearchInput.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  classes: string;
}

export const SearchInput: React.FC<InputProps> = ({ value, classes, setSearchValue, setValue }) => {
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 500),
    [],
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const handleClickDeleteValue = () => {
    setValue('');
    updateSearchValue('');
  };

  return (
    <div className={style.input_container}>
      <input
        placeholder="Поиск"
        type="text"
        value={value}
        onChange={onSearch}
        className={`${classes} ${style.input}`}
      />
      {value && (
        <img
          src={deleteIcon}
          alt="deleteIcon"
          className={style.delete}
          onClick={handleClickDeleteValue}
        />
      )}
    </div>
  );
};
