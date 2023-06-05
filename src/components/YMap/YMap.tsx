import React from 'react';
import { YMaps, Map, Placemark, SearchControl, TypeSelector } from '@pbe/react-yandex-maps';

import style from './YMap.module.css';

interface PlacemarkData {
  X: number;
  Y: number;
}

interface GeoObject {
  GeoObject: any;
}

interface YMapProps {
  width: string;
  height: string;
  pointX: number;
  pointY: number;
  placemark?: PlacemarkData;
  setPlacemark?: React.Dispatch<React.SetStateAction<PlacemarkData>>;
  address?: string;
  setAddress?: React.Dispatch<React.SetStateAction<string>>;
  zoom: number;
  isTouchable?: boolean;
}

const API_KEY = '05f8d2ae-bd94-4329-b9f9-7351e2ec9627';

export const YMap: React.FC<YMapProps> = ({
  width,
  height,
  pointX,
  pointY,
  placemark,
  setPlacemark,
  address,
  setAddress,
  zoom,
  isTouchable = false,
}) => {
  const [points, setPoints] = React.useState<PlacemarkData>({ X: pointX, Y: pointY });
  const ref = React.useRef<any>();
  const ref2 = React.useRef<any>();
  const ymaps = React.useRef<any>(null);
  const [value, setValue] = React.useState('');
  const [options, setOptions] = React.useState<GeoObject[]>([]);

  React.useEffect(() => {
    setPoints({ X: pointX, Y: pointY });

    (async () => {
      try {
        if (value) {
          const res = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${value}`,
          );
          const data = await res.json();
          const collection = data.response.GeoObjectCollection.featureMember.map(
            (item: { GeoObject: any }) => {
              item.GeoObject;
            },
          );
          setOptions(() => collection);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [pointX, pointY]);

  const handleClickMap = (e: any) => {
    const coords = e.get('coords');
    setPlacemark!({ X: coords[0], Y: coords[1] });
    setPoints({ X: coords[1], Y: coords[0] });

    ymaps.current?.geocode(coords).then((res: { geoObjects: { get: (arg0: number) => any } }) => {
      const firstGeoObject = res.geoObjects.get(0);
      const newAddress = [
        firstGeoObject.getLocalities().length
          ? firstGeoObject.getLocalities()
          : firstGeoObject.getAdministrativeAreas(),
        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
        firstGeoObject.getPremiseNumber(),
      ]
        .filter(Boolean)
        .join(', ');
      ref.current?.getMap().hint.open(coords, newAddress);
      setAddress!(newAddress);
      setValue(() => newAddress);

      // console.log(coords);
    });
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
      <YMaps
        query={{
          load: 'package.full',
          apikey: API_KEY,
        }}>
        <Map
          instanceRef={ref2}
          width={width}
          height={height}
          state={{
            center: [points.Y, points.X],
            zoom: zoom,
            controls: ['zoomControl'],
          }}
          onLoad={(e) => {
            ymaps.current = e;

            e.geocode([points.Y, points.X]).then((res: any) => {
              const firstGeoObject = res.geoObjects.get(0);
              const newAddress = [
                firstGeoObject.getLocalities().length
                  ? firstGeoObject.getLocalities()
                  : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                firstGeoObject.getPremiseNumber(),
              ]
                .filter(Boolean)
                .join(', ');

              setAddress!(newAddress);
              setValue(() => newAddress);
            });
          }}
          onClick={isTouchable ? handleClickMap : ''}>
          <SearchControl options={{ float: 'right' }} />
          <TypeSelector />
          <Placemark
            instanceRef={ref}
            onDragEnd={(e: any) => {
              const coords = e.get('target').geometry.getCoordinates();
              ymaps.current?.geocode(coords).then((res: any) => {
                const firstGeoObject = res.geoObjects.get(0);
                const newAddress = [
                  firstGeoObject.getLocalities().length
                    ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                  firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                  firstGeoObject.getPremiseNumber(),
                ]
                  .filter(Boolean)
                  .join(', ');
                ref.current?.getMap().hint.open(coords, newAddress);
                setAddress!(newAddress);
                setValue(() => newAddress);
              });
            }}
            geometry={[placemark?.X || points.Y, placemark?.Y || points.X]}
            options={{
              iconImageSize: [30, 30],
              draggable: true,
              preset: 'islands#redIcon',
              hideIconOnBalloonOpen: false,
              openEmptyHint: true,
            }}
            properties={{
              iconContent: '',
              hintContent: address,
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
};
