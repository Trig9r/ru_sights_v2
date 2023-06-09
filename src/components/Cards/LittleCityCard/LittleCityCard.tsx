import React from 'react';
import { useInView } from 'react-intersection-observer';

import { LittleSkeleton } from '../Skeletons';

import sightIcon from './img/sightIcon.svg';
import peopleIcon from './img/peopleIcon.svg';
import eyeIcon from './img/eyeIcon.svg';

import style from './LittleCityCard.module.css';

interface LittleCityCardProps {
  cityName: string;
  countSight: number;
  countPeople: string;
  countViews: number;
  imgUrl: string;
}

export const LittleCityCard: React.FC<LittleCityCardProps> = ({
  cityName,
  countSight,
  countPeople,
  countViews,
  imgUrl,
}) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className={style.card_container}>
      {inView ? (
        <>
          <div className={style.img_container}>
            <img src={imgUrl} alt={cityName} className={style.city_img} />
            <div className={style.img_tint} />
            <span className={style.city_name}>{cityName}</span>
          </div>
          <div className={style.info_container}>
            <div className={style.city_info}>
              <img src={sightIcon} alt="sightIcon" />
              <span className={style.count_sight}>Кол-во дост.: {countSight}</span>
            </div>

            <div className={style.city_info}>
              <img src={peopleIcon} alt="peopleIcon" />
              <span className={style.count_people}>Численность: {countPeople}</span>
            </div>

            <div className={style.city_info}>
              <img src={eyeIcon} alt="eyeIcon" />
              <span className={style.count_views}>Кол-во просмотров: {countViews}</span>
            </div>
          </div>
        </>
      ) : (
        <LittleSkeleton />
      )}
    </div>
  );
};
