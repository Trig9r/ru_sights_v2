import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import { Menu } from '../Menu';

import logo from './img/logo.svg';

import style from './Header.module.css';
import { ScrollToTop } from '../../utils';

export const Header = () => {
  const [menuActive, setMenuActive] = React.useState(false);

  return (
    <>
      <ScrollToTop />
      <div className={style.header_container}>
        <div className={style.header_content}>
          <Link to="/">
            <div className={style.header_logo_container}>
              <img src={logo} alt="logo" className={style.header_logo} />
              <span>Достопримечательник</span>
            </div>
          </Link>

          <div className={style.burger_button} onClick={() => setMenuActive(!menuActive)}>
            <span />
          </div>
        </div>
      </div>

      <Outlet />

      <Menu menuActive={menuActive} setActive={setMenuActive} />
    </>
  );
};
