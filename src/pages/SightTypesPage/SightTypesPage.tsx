import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import searchIcon from './img/searchIcon.svg';

import { Footer } from '@/components';
import { SightCard, BigSkeleton } from '@/components/Cards';
import { Dropdown } from '@/components/UI';
import { useSightTypes } from '@/utils/api/hooks';

import { CATEGORIES } from '@/constants';
import type { SightTypes } from '@/@types';

import style from './SightTypesPage.module.css';

interface TypeParams {
  type: string;
}

export const SightTypesPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<keyof TypeParams>() as TypeParams;

  const [searchValue, setSearchValue] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<{
    id: string;
    name: null | string;
  }>({ id: 'count_views', name: null });
  const [sortByASC, setSortByASC] = React.useState(false);

  const {
    data: sights,
    isLoading,
    isError,
  } = useSightTypes<SightTypes>(type, selectedCategory.id, sortByASC);

  if (isError || !sights) return <div>loading...</div>;

  const filteredSights = sights?.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className={style.main_container}>
      <div className={style.title_container}>
        <div className={style.title}>ДОСТОПРИМЕЧАТЕЛЬНОСТИ</div>
        <div className={style.navbar}>
          <Link to="/">главная</Link> / достопримечательности / {type}
        </div>
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
              placeholder="Сортировка"
              selectedValue={selectedCategory.name}
              elements={CATEGORIES}
              classnames={style.dropdown}
              setSelectedElement={({ id, name }) => setSelectedCategory({ id: id, name: name })}
              setSort={() => setSortByASC(!sortByASC)}
              isSortable
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
          <div className={style.sights_container}>
            {filteredSights?.map((sight: SightTypes) => (
              <SightCard
                key={sight.name}
                id={sight.id}
                onClick={() => navigate(`/достопримечательность/${sight.name}`)}
                sightName={sight.name}
                imgUrl={sight.imgUrl}
                views={sight.count_views}
                likes={sight.likes}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
