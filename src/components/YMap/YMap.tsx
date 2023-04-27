import { FC, useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import style from './YMap.module.css';

interface YMapProps {
  width: string;
  height: string;
  pointX: number;
  pointY: number;
  zoom: number;
  isTouchable?: boolean;
}

export const YMap: FC<YMapProps> = ({
  width,
  height,
  pointX,
  pointY,
  zoom,
  isTouchable = false,
}) => {
  const [points, setPoints] = useState({ X: pointX, Y: pointY });
  const [placemarkCoords, setPlacemarkCoords] = useState({ X: null, Y: null });

  useEffect(() => {
    setPoints({ X: pointX, Y: pointY });
  }, [pointX, pointY, zoom]);

  const handleClickMap = (e: any) => {
    const coords = e.get('coords');
    setPlacemarkCoords({ X: coords[0], Y: coords[1] });
    console.log(coords);
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
            center: [placemarkCoords.X || points.Y, placemarkCoords.Y || points.X],
            zoom: zoom,
          }}
          onClick={isTouchable ? handleClickMap : ''}>
          <Placemark geometry={[placemarkCoords.X || points.Y, placemarkCoords.Y || points.X]} />
        </Map>
      </YMaps>
    </div>
  );
};
