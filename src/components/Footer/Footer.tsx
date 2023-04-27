import { Link } from 'react-router-dom';

import style from './Footer.module.css';

export const Footer = () => {
  return (
    <>
      <div className={style.footer_container}>
        <div className={style.footer_content}>
          <ul className={style.footer_info}>
            <li>Контакты</li>
            <li>Политика конфиденциальности</li>
            <li>Условия использования</li>
            <li>Отказ от ответственности</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
    </>
  );
};
