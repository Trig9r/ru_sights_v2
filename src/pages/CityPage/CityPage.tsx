import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import searchIcon from './img/searchIcon.svg';

import { Footer } from '@/components';
import { BigSkeleton, SightCard } from '@/components/Cards';
import { Button, Dropdown, SearchInput } from '@/components/UI';
import { useSightCity } from '@/utils/api/hooks';
import type { SightTypes } from '@/@types';

import style from './CityPage.module.css';

interface CityParams {
  name: string;
}

interface DataObject {
  sights: SightTypes[];
  city: {
    name: string;
    imgUrl: string;
  };
}

export const CityPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [value, setValue] = React.useState('');
  const [sightType, setSightType] = React.useState('Все');

  const { name } = useParams<keyof CityParams>() as CityParams;
  const { data, isLoading, isError } = useSightCity<DataObject>(name);

  if (isError || !data) return <div>loading...</div>;

  const { city, sights } = data;
  const emptySights = sights.length === 0;

  // console.log(data);

  return (
    <div className={style.main_container}>
      <div className={style.title_container}>
        <div className={style.img_container}>
          <img src={city.imgUrl} alt="city" className={style.cityImg} />
          <div className={style.img_tint} />
          <div className={style.title}>{city.name}</div>
          <div className={style.navbar}>
            <Link to="/">главная</Link> / <Link to="/города">города</Link> / {city.name}
          </div>
        </div>
      </div>
      <div className={style.main_content}>
        <div className={style.search_container}>
          <div className={style.input_container}>
            <img src={searchIcon} alt="searchIcon" className={style.search_icon} />
            <SearchInput
              value={value}
              searchValue={searchValue}
              setValue={setValue}
              setSearchValue={setSearchValue}
              classes={style.input}
            />
          </div>

          <div className={style.dropdown_container}>
            <Dropdown
              placeholder="По просмотрам"
              cities={[{ city_name: 'По названию' }, { city_name: 'По дате добавления' }]}
              classnames={style.dropdown}
            />
          </div>

          <div className={style.dropdown_container}>
            <Dropdown
              placeholder={sightType}
              cities={[{ city_name: 'По названию' }, { city_name: 'По дате добавления' }]}
              classnames={style.dropdown}
            />
          </div>
        </div>
        <div className={style.button_container}>
          <Button primary classnames={style.button_find}>
            Найти
          </Button>
        </div>
        <div className={style.line} />

        {emptySights && (
          <div className={style.text_container}>
            <div className={style.no_context}>
              Пока что нет ни одной достопримечательности для этого города
            </div>
          </div>
        )}

        <div className={style.sights_container}>
          <div className={style.card_container}>
            {isLoading
              ? Array(6)
                  .fill('')
                  .map(() => <BigSkeleton key={Math.random()} />)
              : sights
                  .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((sight: SightTypes) => (
                    <SightCard
                      key={sight.name}
                      id={sight.id}
                      onClick={() => navigate(`/достопримечательность/${sight.name}`)}
                      sightName={sight.name}
                      imgUrl={sight.imgUrl}
                      views={sight.count_views}
                    />
                  ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
