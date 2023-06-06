import React from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

import { useStore } from '@/store';
import { getLocalStorage } from '@/utils/hooks';
import { BigSkeleton } from '../Skeletons';
import type { SightTypes } from '@/@types';

import likeIcon from './img/likeIcon.svg';
import likeIconFill from './img/likeIconFill.svg';
import eyeIcon from './img/eyeIcon.svg';
import likesIcon from './img/likes.svg';

import style from './SightCard.module.css';

interface SightCardProps {
  id: number;
  imgUrl: string;
  sightName: string;
  views: number;
  likes: number;
  liked?: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const SightCard: React.FC<SightCardProps> = ({
  id,
  imgUrl,
  sightName,
  views,
  likes,
  onClick,
}) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const liked = getLocalStorage('store').some((sight: SightTypes) => sight.id === id);
  const [isLiked, setIsLiked] = React.useState(liked);

  const { addSight, removeSight } = useStore();

  const sigth = {
    id,
    name: sightName,
    count_views: views,
    likes,
    imgUrl: imgUrl,
  };

  const addFavorite = async (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsLiked(true);
    addSight(sigth);
    event.stopPropagation();
    await axios.get(
      `https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/sights/add_favorite.php?id=${id}`,
    );
  };

  const removeFavorite = async (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsLiked(false);
    removeSight(id);
    event.stopPropagation();
    await axios.get(
      `https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/sights/remove_favorite.php?id=${id}`,
    );
  };

  return (
    <div ref={ref} className={style.card_container} onClick={onClick}>
      {inView ? (
        <div className={style.img_container}>
          <img
            src={`https://www.dropbox.com/home/%D0%9A%D0%B8%D1%80%D0%B8%D0%BB%D0%BB%20%D0%A1%D0%BC%D0%B8%D1%80%D0%BD%D0%BE%D0%B2/upload${imgUrl}`}
            alt={sightName}
            className={style.sight_img}
          />
          <div className={style.img_tint} />
          <span className={style.sight_name}>{sightName}</span>
          <div className={style.views_container}>
            <img src={eyeIcon} alt="eyeIcon" />
            <span>{views}</span>
          </div>
          <div className={style.likes_container}>
            <img src={likesIcon} alt="likesIcon" />
            <span>{likes}</span>
          </div>
          {isLiked ? (
            <img
              src={likeIconFill}
              alt="likeIconFill"
              className={style.like_icon}
              onClick={removeFavorite}
            />
          ) : (
            <img src={likeIcon} alt={likeIcon} className={style.like_icon} onClick={addFavorite} />
          )}
        </div>
      ) : (
        <BigSkeleton />
      )}
    </div>
  );
};
