import React from 'react';
import { debounce } from 'lodash';

import styles from './Dropdown.module.css';

interface DropdownProps {
  placeholder: string;
  cities: any;
  classnames?: any;
}

const DropdownIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_37_370)">
        <path
          d="M2.35833 3.68333L10 11.325L17.6417 3.68333L20 6.04167L10 16.0417L0 6.04167L2.35833 3.68333Z"
          fill="#CFCFCF"
        />
      </g>
      <defs>
        <clipPath id="clip0_37_370">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({ placeholder, cities, classnames }) => {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');
  const [isVisible, setIsVisible] = React.useState(false);
  const cityRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !event.composedPath().includes(cityRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const onClickCity = (name: any) => {
    setSelectedValue(name);
    const value = selectedValue;
    // onChange();
    setIsVisible(false);
  };

  const isSelected = (cityName: string) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue == cityName;
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 300),
    [],
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <>
      <div className={`${styles.container} ${classnames ? classnames : ''}`} ref={cityRef}>
        <div className={styles.input} onClick={() => setIsVisible(!isVisible)}>
          <div className={styles.selected_value}>{selectedValue ?? placeholder}</div>
          <div className={styles.tools}>
            <div className={styles.tool}>
              <DropdownIcon />
            </div>
          </div>
        </div>

        {isVisible && (
          <div className={styles.menu}>
            <div className={styles.search_container}>
              <input type="search" placeholder="Поиск" onChange={onSearch} value={value} />
            </div>
            {cities
              .filter(({ name }: { name: string }) =>
                name.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .map(({ name }: { name: string }) => (
                <div
                  onClick={() => onClickCity(name)}
                  key={name}
                  className={`${styles.menu_item} ${isSelected(name) && styles.selected}`}>
                  {name}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
