import React from 'react';
import { debounce } from 'lodash';

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

  return <input type="text" value={value} onChange={onSearch} className={classes} />;
};
