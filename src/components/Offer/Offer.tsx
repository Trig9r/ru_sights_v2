import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/UI';

import style from './Offer.module.css';

export const Offer = () => {
  const navigate = useNavigate();

  return (
    <div className={style.offer_container}>
      <span className={style.bg_name}>Чарские пески, Забайкалье</span>

      <div className={style.offer_content}>
        <div className={style.text_container}>
          <div className={style.side_text}>Откройте мир новых приключений</div>
          <div className={style.main_text}>Путешествуйте и делитесь своими впечатлениями</div>
        </div>

        <Button onClick={() => navigate('/addNewSight')}>Добавить</Button>
      </div>
    </div>
  );
};
