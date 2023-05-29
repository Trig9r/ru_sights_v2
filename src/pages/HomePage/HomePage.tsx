import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Offer, Footer } from '@/components';
import { Button } from '@/components/UI';
import {
  BigCityCard,
  TypeCard,
  LittleCityCard,
  BigSkeleton,
  LittleSkeleton,
} from '@/components/Cards';
import { useCities } from '@/utils/api/hooks';
import type { CityTypes } from '@/@types';

import monumentIcon from './img/monument.svg';
import museumIcon from './img/museum.svg';
import parkIcon from './img/park.svg';
import theaterIcon from './img/theater.svg';
import churchIcon from './img/church.svg';
import builingIcon from './img/building.svg';
import natureIcon from './img/nature.svg';
import questionIcon from './img/question.svg';

import style from './HomePage.module.css';

const sightTypes = [
  { name: 'памятники', icon: monumentIcon },
  { name: 'музеи', icon: museumIcon },
  { name: 'парки', icon: parkIcon },
  { name: 'театры', icon: theaterIcon },
  { name: 'храмы', icon: churchIcon },
  { name: 'здания', icon: builingIcon },
  { name: 'природные', icon: natureIcon },
  { name: 'другое', icon: questionIcon },
];

interface CityArray {
  cities: CityTypes[];
}

export const HomePage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCities<CityArray>('count_views', false);

  if (isError || !data) return <div>loading...</div>;

  const { cities } = data;

  const mostPopularCities = cities.slice(0, 3);
  const otherCities = cities.slice(3, 7);

  return (
    <div>
      <div className={style.offer_container}>
        <Offer />
      </div>

      <div className={style.sights_container}>
        <div className={style.sight_content}>
          <div className={style.title}>посмотреть достопримечательности по Городам</div>

          <div className={style.big_cities_cards_container}>
            {isLoading
              ? Array(3)
                  .fill('')
                  .map(() => <BigSkeleton key={Math.random()} />)
              : mostPopularCities.map((city) => (
                  <Link to={`/города/${city.name}`} key={city.name}>
                    <BigCityCard
                      key={city.name}
                      cityName={city.name}
                      imgUrl={city.imgUrl}
                      countSight={city.count_sights}
                      countPeople={city.count_people}
                      countViews={city.count_views}
                    />
                  </Link>
                ))}
          </div>

          <div className={style.little_cities_cards_container}>
            {isLoading
              ? Array(4)
                  .fill('')
                  .map(() => <LittleSkeleton key={Math.random()} />)
              : otherCities.map((city) => (
                  <Link to={`/города/${city.name}`} key={city.name}>
                    <LittleCityCard
                      key={city.name}
                      cityName={city.name}
                      imgUrl={city.imgUrl}
                      countSight={city.count_sights}
                      countPeople={city.count_people}
                      countViews={city.count_views}
                    />
                  </Link>
                ))}
          </div>

          <Button primary onClick={() => navigate('/города')}>
            Все города
          </Button>
        </div>
      </div>

      <div className={style.sight_types_container}>
        <div className={style.sight_types_content}>
          <div className={style.title}>типы достопримечательностей</div>
          <div className={style.types_container}>
            {sightTypes.map((sight) => (
              <Link to={`/достопримечательности/${sight.name}`} key={sight.name}>
                <TypeCard icon={sight.icon} text={sight.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={style.about_us_container}>
        <div className={style.left_img} />
        <div className={style.about_us_content}>
          <div className={style.text_container}>
            <div className={style.title}>немного о нас</div>
            <div className={style.main_text}>
              Мы команда энтузиастов, которые любят путешествовать и открывать новые места. Наша
              миссия - сделать путешествия более увлекательными и запоминающимися, позволяя людям
              находить и делиться интересными местами со всего мира.
            </div>
            <Button primary classnames={style.button} onClick={() => navigate('/aboutUs')}>
              подробнее
            </Button>
          </div>
          <div className={style.bg_block} />
        </div>
        <div className={style.right_img} />
      </div>

      <Footer />
    </div>
  );
};
