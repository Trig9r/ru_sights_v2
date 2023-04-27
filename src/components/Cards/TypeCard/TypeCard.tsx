import React from 'react';

import style from './TypeCard.module.css';

interface TypeProps {
  icon: any;
  text: any;
}

export const TypeCard: React.FC<TypeProps> = ({ icon, text }) => {
  return (
    <div className={style.type_container}>
      <div className={style.icon_container}>
        <img src={icon} alt="icon" />
      </div>
      <div className={style.type_name}>{text}</div>
    </div>
  );
};
