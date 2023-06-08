import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/UI';
import { useMainImg } from '@/utils/api/hooks';
import { getRandomInt } from '@/utils/helpers';

import { MainImgTypes } from '@/@types';

import style from './Offer.module.css';

export const Offer = () => {
  const navigate = useNavigate();

  const { data: imgObj } = useMainImg<MainImgTypes>();

  return (
    <div className={style.offer_container}>
      <span className={style.bg_name}>{imgObj?.location}</span>

      <div className={style.offer_content}>
        <div className={style.text_container}>
          <div className={style.side_text}>Откройте мир новых приключений</div>
          <div className={style.main_text}>Путешествуйте и делитесь своими впечатлениями</div>
        </div>

        <Button onClick={() => navigate('/новаяДост')} classnames={style.offer_button}>
          Добавить
        </Button>
      </div>

      <img
        src={`https://https-requests-script.smirnovkiryusha12.workers.dev/main_images/${imgObj?.img_name}`}
        alt="bgImage"
        className={style.bgImage}
      />
      <div className={style.img_tint} />
    </div>
  );
};
