import { useNavigate, Link } from 'react-router-dom';

import { Footer } from '@/components';
import { SightCard } from '@/components/Cards';
import { useStore } from '@/store';

import style from './FavoritePage.module.css';

export const FavoritePage = () => {
  const navigate = useNavigate();

  const { favoriteSights } = useStore();

  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <div className={style.title}>ИЗБРАННОЕ</div>
        <div className={style.navbar}>
          <Link to="/">Главная</Link> / Избранное
        </div>
      </div>
      {favoriteSights.length === 0 ? (
        <div className={style.text_container}>
          <div className={style.no_context}>
            Пока что нет ни одной избранной достопримечательности
          </div>
        </div>
      ) : (
        <div className={style.sights_container}>
          <div className={style.card_container}>
            {favoriteSights.map((sight) => (
              <SightCard
                key={sight.name}
                id={sight.id}
                sightName={sight.name}
                imgUrl={sight.imgUrl}
                views={sight.count_views}
                likes={sight.likes}
                liked
                onClick={() => navigate(`/достопримечательность/${sight.name}`)}
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
