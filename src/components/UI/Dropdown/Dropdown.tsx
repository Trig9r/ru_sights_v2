import React from 'react';
import { debounce } from 'lodash';

import styles from './Dropdown.module.css';

interface DropdownProps {
  placeholder: string;
  elements: any;
  selectedValue: SelectedValueType['name'];
  setSelectedElement: (id: SelectedValueType['id'], name: SelectedValueType['name']) => void;
  classnames?: any;
  isSearchable?: boolean;
  isSortable?: boolean;
  setSort?: React.Dispatch<React.SetStateAction<boolean>>;
}

type SelectedValueType = {
  id: null | number | string;
  name: null | string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  elements,
  selectedValue,
  setSelectedElement,
  classnames,
  isSearchable = false,
  setSort,
  isSortable = false,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isRotatedSvg, setIsRotatedSvg] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');

  const cityRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityRef.current &&
        !event.composedPath().includes(cityRef.current) &&
        inputRef.current &&
        !event.composedPath().includes(inputRef.current)
      ) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const onClickCity = (id: number, name: string) => {
    setSelectedElement(id, name);
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

  console.log(isVisible);

  return (
    <>
      <div className={`${styles.container} ${classnames ? classnames : ''}`} ref={cityRef}>
        <div className={styles.input} onClick={() => setIsVisible(!isVisible)}>
          <div className={styles.selected_value}>{selectedValue ?? placeholder}</div>
          <div className={styles.tools}>
            <div className={styles.tool}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isRotatedSvg ? styles.rotated : ''}
                onClick={(e) => {
                  if (isSortable) {
                    e.stopPropagation();
                    setIsRotatedSvg(!isRotatedSvg);
                    setSort!(() => !isRotatedSvg);
                  }
                }}>
                <g clipPath="url(#clip0_37_370)">
                  <path
                    d="M2.35833 3.68333L10 11.325L17.6417 3.68333L20 6.04167L10 16.0417L0 6.04167L2.35833 3.68333Z"
                    fill="#505050"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_37_370">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {isVisible && (
        <div className={`${styles.menu} ${classnames ? classnames : ''}`}>
          {isSearchable && (
            <div className={styles.search_container}>
              <input
                ref={inputRef}
                type="search"
                placeholder="Поиск"
                onChange={onSearch}
                value={value}
              />
            </div>
          )}
          {elements
            .filter(({ name }: { name: string }) =>
              name.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map(({ id, name }: { id: number; name: string }) => (
              <div
                onClick={() => onClickCity(id, name)}
                key={name}
                className={`${styles.menu_item} ${isSelected(name) && styles.selected}`}>
                {name}
              </div>
            ))}
        </div>
      )}
    </>
  );
};
