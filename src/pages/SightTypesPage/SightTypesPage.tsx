import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import searchIcon from './img/searchIcon.svg';

import { Footer } from '@/components';
import { SightCard, BigSkeleton } from '@/components/Cards';
import { Button, Dropdown } from '@/components/UI';
import { useSightTypes } from '@/utils/api/hooks';
import type { SightTypes } from '@/@types';

import style from './SightTypesPage.module.css';

interface TypeParams {
  type: string;
}

export const SightTypesPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const { type } = useParams<keyof TypeParams>() as TypeParams;

  const { data, isLoading, isError } = useSightTypes<SightTypes>(type);

  if (isError || !data) return <div>loading...</div>;

  return (
    <div className={style.main_container}>
      <div className={style.title_container}>
        <div className={style.title}>ДОСТОПРИМЕЧАТЕЛЬНОСТИ</div>
        <div className={style.navbar}>главная / достопримечательности / {type}</div>
      </div>
      <div className={style.main_content}>
        <div className={style.search_container}>
          <div className={style.input_container}>
            <img src={searchIcon} alt="searchIcon" className={style.search_icon} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={style.input}
            />
          </div>

          <div className={style.dropdown_container}>
            <Dropdown
              placeholder="По просмотрам"
              cities={[{ city_name: 'По названию' }, { city_name: 'По дате добавления' }]}
              classnames={style.dropdown}
            />
          </div>

          <div className={style.button_container}>
            <Button primary classnames={style.button_find}>
              Найти
            </Button>
          </div>
        </div>

        <div className={style.line} />

        <div className={style.sights_container}>
          <div className={style.card_container}>
            {isLoading
              ? Array(6)
                  .fill('')
                  .map(() => <BigSkeleton key={Math.random()} />)
              : data.map((sight: SightTypes) => (
                  <SightCard
                    key={sight.name}
                    id={sight.id}
                    sightName={sight.name}
                    imgUrl={sight.imgUrl}
                    views={sight.count_views}
                    onClick={() => navigate(`/достопримечательность/${sight.name}`)}
                  />
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
