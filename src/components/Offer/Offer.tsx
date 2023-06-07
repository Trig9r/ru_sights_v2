import { useNavigate } from 'react-router-dom';

import bgImage from '@/styles/static/img/bg2.png';

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

        <Button onClick={() => navigate('/новаяДост')} classnames={style.offer_button}>
          Добавить
        </Button>
      </div>

      <img src={bgImage} alt="bgImage" className={style.bgImage} />
      <div className={style.img_tint} />
    </div>
  );
};
