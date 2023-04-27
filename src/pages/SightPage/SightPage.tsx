import React from 'react';
import { Link, useParams } from 'react-router-dom';

import viewsIcon from './img/views.svg';
import waletIcon from './img/walet.svg';
import placeIcon from './img/place.svg';
import likesIcon from './img/likes.svg';
import calendarIcon from './img/calendar.svg';

import { Footer, YMap } from '@/components';
import { ImgSkeleton } from './ImgSkeleton';
import { useSight } from '@/utils/api/hooks';
import type { SightTypes, ImgTypes } from '@/@types';

import style from './SightPage.module.css';

interface SightParams {
  name: string;
}

interface SightObject {
  images: ImgTypes[];
  sight: SightTypes;
}

export const SightPage = () => {
  const { name } = useParams<keyof SightParams>() as SightParams;

  const { data, isLoading, isError } = useSight<SightObject>(name);

  if (isError || !data) return <div>loading...</div>;

  const { images, sight } = data;

  // console.log(data);

  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <div className={style.title}>{sight.name}</div>
        <div className={style.navbar}>
          <Link to="/">главная</Link> /
          <Link to={`/города/${sight.city_name}`}>{sight.city_name}</Link> / {sight.name}
        </div>
      </div>

      <div className={style.main_container}>
        <div className={style.images_container}>
          {isLoading
            ? Array(3)
                .fill('')
                .map(() => <div className={style.img_container}>{<ImgSkeleton />}</div>)
            : images.map((img) => (
                <div className={style.img_container} key={img.id}>
                  <img src={img.imgUrl} alt="img" />
                </div>
              ))}
        </div>

        <div className={style.info_content}>
          <div className={style.info_container} title="Кол-во просмотров">
            <img src={viewsIcon} alt="viewsIcon" />
            <span className={style.count_views}>{sight.count_views}</span>
          </div>

          <div className={style.info_container} title="Кол-во в избранном">
            <img src={likesIcon} alt="likesIcon" />
            <span className={style.count_likes}>{sight.count_favorite}</span>
          </div>

          <div className={style.info_container} title="Местонахождение">
            <img src={placeIcon} alt="placeIcon" />
            <span className={style.place_text}>{sight.street}</span>
          </div>

          <div className={style.info_container} title="Платно">
            <img src={waletIcon} alt="waletIcon" />
            <span>да</span>
          </div>

          <div className={style.info_container} title="Дата добавления">
            <img src={calendarIcon} alt="calendarIcon" />
            <span>{sight.created}</span>
          </div>
        </div>
      </div>

      <div className={style.desc_container}>
        <div className={style.text_desc}>{sight.description}</div>
      </div>

      <div className={style.map_container}>
        <YMap
          height="600px"
          width="75%"
          pointX={sight.map_points['x']}
          pointY={sight.map_points['y']}
          zoom={16}
        />
      </div>

      <Footer />
    </div>
  );
};
