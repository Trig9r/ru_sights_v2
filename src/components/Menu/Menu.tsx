import React from 'react';
import { Link } from 'react-router-dom';

import style from './Menu.module.css';

interface MenuProps {
  menuActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: React.FC<MenuProps> = ({ menuActive, setActive }) => {
  return (
    <div
      className={menuActive ? style.menu_container_active : style.menu_container}
      onClick={() => setActive(false)}>
      <div className={style.blur} />
      <div className={style.menu_content} onClick={(e) => e.stopPropagation()}>
        <ul>
          <Link to="/">
            <li onClick={() => setActive(false)}>Главная</li>
          </Link>

          <Link to="/города">
            <li onClick={() => setActive(false)}>Города</li>
          </Link>

          <li onClick={() => setActive(false)}>Достопримечательности</li>
          <Link to="/избранное">
            <li onClick={() => setActive(false)}>Избранное</li>
          </Link>

          <Link to="/aboutUs">
            <li onClick={() => setActive(false)}>О нас</li>
          </Link>

          <Link to="/addNewSight">
            <li onClick={() => setActive(false)}>Добавить</li>
          </Link>
          <li onClick={() => setActive(false)}>FAQ</li>
        </ul>
      </div>
    </div>
  );
};
