import React from 'react';
import { Link } from 'react-router-dom';

import searchIcon from './img/searchIcon.svg';

import { Footer } from '@/components';
import { BigCityCard, BigSkeleton } from '@/components/Cards';
import { Button, Dropdown, SearchInput } from '@/components/UI';
import { useCities } from '@/utils/api/hooks';
import { CityTypes } from '@/@types';

import style from './CitiesPage.module.css';

const CATEGORIES = [
  { id: 'count_views', name: 'По просмотрам' },
  { id: 'name', name: 'По названию' },
  { id: 'count_sights', name: 'По кол-ву дост.' },
];

interface CityArray {
  cities: CityTypes[];
}

export const CitiesPage = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [value, setValue] = React.useState('');
  const [sortByASC, setSortByASC] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<{
    id: string;
    name: null | string;
  }>({ id: 'count_views', name: null });

  const {
    data: citiesData,
    isLoading,
    isError,
  } = useCities<CityArray>(selectedCategory.id, sortByASC);

  if (isError || !citiesData) return <div>loading...</div>;

  const emptyCities = citiesData.cities.length === 0;

  const filteredCities = citiesData.cities.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  );

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
              placeholder="Сортировка"
              selectedValue={selectedCategory.name}
              elements={CATEGORIES}
              classnames={style.dropdown}
              setSelectedElement={({ id, name }) => setSelectedCategory({ id: id, name: name })}
              setSort={() => setSortByASC(!sortByASC)}
              isSortable
            />
          </div>

          <div className={style.button_container}>
            <Button primary classnames={style.button_find}>
              Найти
            </Button>
          </div>
        </div>

        <div className={style.line} />

        {isLoading ? (
          <div className={style.cities_container}>
            {Array(6)
              .fill('')
              .map((_, id) => (
                <BigSkeleton key={id} />
              ))}
          </div>
        ) : (
          <>
            {emptyCities ? (
              <div className={style.text_container}>
                <div className={style.no_context}>
                  Пока что нет ни одной достопримечательности для этого города
                </div>
              </div>
            ) : (
              <div className={style.cities_container}>
                {filteredCities.map((city) => (
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
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
