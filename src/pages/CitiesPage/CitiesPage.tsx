import React from 'react';
import { Link } from 'react-router-dom';

import searchIcon from './img/searchIcon.svg';

import { Footer } from '@/components';
import { BigCityCard, BigSkeleton } from '@/components/Cards';
import { Button, Dropdown, SearchInput } from '@/components/UI';
import { useCities } from '@/utils/api/hooks';
import { CityTypes } from '@/@types';

import style from './CitiesPage.module.css';

interface CityArray {
  cities: CityTypes[];
}

export const CitiesPage = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [value, setValue] = React.useState('');

  const { data, isLoading, isError } = useCities<CityArray>();

  if (isError || !data) return <div>loading...</div>;

  const { cities } = data;

  return (
    <div className={style.main_container}>
      <div className={style.title_container}>
        <div className={style.title}>ГОРОДА</div>
        <div className={style.navbar}>
          <Link to="/">главная</Link> / города
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
              elements={[{ name: 'По численности' }, { name: 'По кол-ву дост.' }]}
              classnames={style.dropdown}
              selectedValue={null}
              setSelectedElement={() => {}}
            />
          </div>

          <div className={style.button_container}>
            <Button primary classnames={style.button_find}>
              Найти
            </Button>
          </div>
        </div>
        <div className={style.line} />
        <div className={style.cities_container}>
          {cities
            .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((city) => (
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
      </div>
      <Footer />
    </div>
  );
};
