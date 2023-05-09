import { FC, useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import style from './YMap.module.css';

type Placemark = {
  X: null;
  Y: null;
};

interface YMapProps {
  width: string;
  height: string;
  pointX: number;
  pointY: number;
  placemark?: Placemark;
  setPlacemark?: React.Dispatch<React.SetStateAction<Placemark>>;
  zoom: number;
  isTouchable?: boolean;
}

export const YMap: FC<YMapProps> = ({
  width,
  height,
  pointX,
  pointY,
  placemark,
  setPlacemark,
  zoom,
  isTouchable = false,
}) => {
  const [points, setPoints] = useState({ X: pointX, Y: pointY });

  useEffect(() => {
    setPoints({ X: pointX, Y: pointY });
  }, [pointX, pointY]);

  const handleClickMap = (e: any) => {
    const coords = e.get('coords');
    setPlacemark({ X: coords[0], Y: coords[1] });
    setPoints({ X: coords[1], Y: coords[0] });
    // console.log(coords);
  };

  const deleteTint = () => {
    document.getElementById('map_tint')?.remove();
  };

  return (
    <div className={style.map_container}>
      {!isTouchable && (
        <div className={style.tint} id="map_tint" onDoubleClick={deleteTint}>
          Дважды нажмите, чтобы начать перемещаться по карте
        </div>
      )}
      <YMaps>
        <Map
          id="ymaps"
          width={width}
          height={height}
          state={{
            center: [points.Y, points.X],
            zoom: zoom,
          }}
          onClick={isTouchable ? handleClickMap : ''}>
          <Placemark geometry={[placemark?.X || points.Y, placemark?.Y || points.X]} />
        </Map>
      </YMaps>
    </div>
  );
};
