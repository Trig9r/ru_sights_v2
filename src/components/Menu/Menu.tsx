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
          <li onClick={() => setActive(false)}>
            <Link to="/">Главная</Link>
          </li>

          <li onClick={() => setActive(false)}>
            <Link to="/города">Города</Link>
          </li>

          <li onClick={() => setActive(false)}>Достопримечательности</li>

          <li onClick={() => setActive(false)}>
            <Link to="/избранное">Избранное</Link>
          </li>

          <li onClick={() => setActive(false)}>
            <Link to="/aboutUs">О нас</Link>
          </li>

          <li onClick={() => setActive(false)}>
            <Link to="/addNewSight">Добавить</Link>
          </li>

          <li onClick={() => setActive(false)}>FAQ</li>
        </ul>
      </div>
    </div>
  );
};
