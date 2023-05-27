import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import searchIcon from './img/searchIcon.svg';

import { Footer } from '@/components';
import { BigSkeleton, SightCard } from '@/components/Cards';
import { Dropdown, SearchInput } from '@/components/UI';
import { useCity, useSightCity } from '@/utils/api/hooks';
import type { SightTypes } from '@/@types';
import { CATEGORIES, TYPES } from '@/constants';

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
  const [selectedType, setSelectedType] = React.useState<{
    id: string;
    name: null | string;
  }>({ id: '', name: null });
  const [selectedCategory, setSelectedCategory] = React.useState<{
    id: string;
    name: null | string;
  }>({ id: 'count_views', name: null });
  const [sortByASC, setSortByASC] = React.useState(false);

  const { name } = useParams<keyof CityParams>() as CityParams;

  const { data, isLoading, isError } = useSightCity<DataObject>(
    name,
    selectedType.id,
    selectedCategory.id,
    sortByASC,
  );
  const {
    data: city,
    isLoading: isLoadingCity,
    isError: isErrorCity,
  } = useCity<DataObject['city']>(name);

  if (isError || isErrorCity) return <div>Ошибка загрузки данных</div>;

  const emptySights = data?.sights.length === 0;

  const filteredSights = data?.sights.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className={style.main_container}>
      <div className={style.title_container}>
        <div className={style.img_container}>
          <img src={city?.imgUrl} alt="city" className={style.cityImg} />
          <div className={style.img_tint} />
          <div className={style.title}>{city?.name}</div>
          <div className={style.navbar}>
            <Link to="/">главная</Link> / <Link to="/города">города</Link> / {city?.name}
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
              placeholder="Сортировка"
              selectedValue={selectedCategory.name}
              elements={CATEGORIES}
              classnames={style.dropdown}
              setSelectedElement={({ id, name }) => setSelectedCategory({ id: id, name: name })}
              setSort={() => setSortByASC(!sortByASC)}
              isSortable
            />
          </div>

          <div className={style.dropdown_container}>
            <Dropdown
              placeholder="Тип дост-ти"
              selectedValue={selectedType.name}
              elements={[{ id: '', name: 'Все' }, ...TYPES]}
              classnames={style.dropdown}
              setSelectedElement={({ id, name }) => setSelectedType({ id: id, name: name })}
            />
          </div>
        </div>

        <div className={style.line} />

        {isLoading ? (
          <div className={style.sights_container}>
            {Array(6)
              .fill('')
              .map((_, id) => (
                <BigSkeleton key={id} />
              ))}
          </div>
        ) : (
          <>
            {emptySights ? (
              <div className={style.text_container}>
                <div className={style.no_context}>
                  Пока что нет ни одной достопримечательности для этого города
                </div>
              </div>
            ) : (
              <div className={style.sights_container}>
                {filteredSights?.map((sight: SightTypes) => (
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
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
