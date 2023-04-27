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
              cities={[{ city_name: 'По численности' }, { city_name: 'По кол-ву дост.' }]}
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
        <div className={style.cities_container}>
          <div className={style.card_container}>
            {isLoading
              ? Array(6)
                  .fill('')
                  .map(() => <BigSkeleton key={Math.random()} />)
              : cities
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

            {/* <Link to="/city/Moscow">
              <BigCityCard
                cityName="Москва"
                imgUrl="https://wikiway.com/upload/resize_cache/iblock/d08/1920_1000_2/Moskva.jpg"
                countSight={300}
                countPeople="12 млн."
                countViews={7000}
              />
            </Link>

            <BigCityCard
              cityName="Санкт-Петербург"
              imgUrl="https://wikiway.com/upload/resize_cache/iblock/4fa/1920_1000_2/Sankt_Peterburg.jpg"
              countSight={450}
              countPeople="5 млн."
              countViews={6300}
            />

            <BigCityCard
              cityName="Ростов-на-Дону"
              imgUrl="https://wikiway.com/upload/resize_cache/iblock/9ee/1920_1000_2/Rostov-na-Donu.jpg"
              countSight={340}
              countPeople="1.1 млн."
              countViews={5200}
            />

            <BigCityCard
              cityName="Красноярск"
              imgUrl="https://wikiway.com/upload/resize_cache/iblock/af1/1920_1000_2/Krasnoyarsk.jpeg"
              countSight={287}
              countPeople="1.2 млн."
              countViews={4900}
            />

            <BigCityCard
              cityName="Ярославль"
              imgUrl="https://wikiway.com/upload/resize_cache/iblock/448/1920_1000_2/YAroslavl.jpg"
              countSight={163}
              countPeople="600 тыс."
              countViews={3100}
            />

            <BigCityCard
              cityName="Архангельск"
              imgUrl="https://wikiway.com/upload/resize_cache/iblock/1ff/1920_1000_2/Arkhangelsk.jpg"
              countSight={148}
              countPeople="1 млн."
              countViews={2700}
            />

            <BigCityCard
              cityName="Екатеринбург"
              imgUrl="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQ17JEIZ6gUauV4UExMnE3jpzLCk4GipYWUU6YVqgyPmwLsiL6GCsEqHL8sr2lTT8rn"
              countSight={148}
              countPeople="1 млн."
              countViews={2700}
            />
            <BigCityCard
              cityName="Казань"
              imgUrl="http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSMtV4_6vRJKlqxK-KO9I1wN4OXFPasgcjYCEUaMtI7Tmuxis1E1zl378PTyP2tMMFd"
              countSight={148}
              countPeople="1 млн."
              countViews={2700}
            />

            <BigCityCard
              cityName="Сочи"
              imgUrl="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRr78yCQNSSQ9f31rtWDdT4RP8QoZa5jVuuj6yhZw2w7kv9b9UJWFxuX1m7wD4mvobF"
              countSight={148}
              countPeople="1 млн."
              countViews={2700}
            /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
