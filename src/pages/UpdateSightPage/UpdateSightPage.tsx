import React, { ChangeEvent } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';

import viewsIcon from '@/styles/static/icons/views.svg';
import waletIcon from '@/styles/static/icons/walet.svg';
import placeIcon from '@/styles/static/icons/place.svg';
import favouriteIcon from '@/styles/static/icons/favourite.svg';
import calendarIcon from '@/styles/static/icons/calendar.svg';
import saveIcon from '@/styles/static/icons/save.svg';
import plusIcon from '@/styles/static/icons/plus.svg';

import { Footer, YMap } from '@/components';
import { ImgSkeleton } from '../SightPage/ImgSkeleton';
import { useSight } from '@/utils/api/hooks';
import { API_WEBPURIFY, WEBPURIFY_FORMAT } from '@/constants/api';
import type { SightTypes, ImgTypes } from '@/@types';

import style from './UpdateSightPage.module.css';

interface SightParams {
  name: string;
}

interface SightObject {
  images: ImgTypes[];
  sight: SightTypes;
}

export const UpdateSightPage = () => {
  const navigate = useNavigate();

  const previews: string[] = [];

  const { name } = useParams<keyof SightParams>() as SightParams;
  const { data, isLoading, isError } = useSight<SightObject>(name);

  const [sightValue, setSightValue] = React.useState({
    name: data?.sight.name,
    desc: data?.sight.description,
  });
  const [sightAddress, setSightAddress] = React.useState(data?.sight.street);
  const [placemarkCoords, setPlacemarkCoords] = React.useState({
    X: data?.sight.map_points.y,
    Y: data?.sight.map_points.x,
  });

  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

  const [selectedImages, setSelectedImages] = React.useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [isLoadingPost, setIsLoadingPost] = React.useState(false);
  const [backendErrors, setBackendErrors] = React.useState('');

  React.useEffect(() => {
    if (data?.images) {
      const previews = data.images.map((imageName) => {
        // Здесь вы можете использовать путь к папке с фотографиями и imageName
        // для создания полного URL-адреса каждой фотографии
        return `/upload/${imageName.imgUrl}`;
      });
      setImagePreviews(previews);
    }
  }, [data?.images]);

  if (isError || !data) return <div>loading...</div>;

  const { images, sight } = data;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;
    if (images) {
      setSelectedImages(images);
      for (let i = 0; i < images.length; i++) {
        previews.push(URL.createObjectURL(images[i]));
      }
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLDivElement>) => {
    setSightValue({ ...sightValue, desc: event.target.innerText });
  };

  const handleDivClick = () => {
    if (divRef.current) {
      divRef.current.contentEditable = 'true';
      divRef.current.focus();
    }
  };

  const handleDivBlur = () => {
    if (divRef.current) {
      divRef.current.contentEditable = 'false';
    }
  };

  const updateSightValue = async () => {
    try {
      const { data } = await axios.get(
        `${API_WEBPURIFY}&text=${sightValue.desc}&${WEBPURIFY_FORMAT}`,
      );
      console.log(data);
      const isProfanity = Number(data.rsp.found);

      if (!!isProfanity) {
        alert('В описании или названии присутсвует ругательство');
      } else {
        const formData = new FormData();
        formData.append('sightId', String(sight.id));
        formData.append('sightName', sightValue.name!);
        formData.append('sightDesc', sightValue.desc!);
        formData.append('sightCityId', String(sight.city_id));
        formData.append('sightAddress', sightAddress!);
        formData.append('sightMapCoordsX', String(placemarkCoords.X));
        formData.append('sightMapCoordsY', String(placemarkCoords.Y));
        formData.append('sightTypeId', String(sight.category_id));
        if (selectedImages) {
          for (let i = 0; i < selectedImages!.length; i++) {
            formData.append('images[]', selectedImages![i]);
          }
        }

        // отправка данных с формы на rest api ресура
        try {
          setIsLoadingPost(true);

          const response = await axios.post(
            'https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/sights/update.php',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );

          console.log('Files uploaded successfully: ', response.data);
          setIsLoadingPost(false);
          navigate(`/достопримечательность/${sightValue.name}`);
        } catch (error) {
          const { response } = error as AxiosError;
          const { data } = response as AxiosResponse;

          setBackendErrors(data.message);
        }
      }
    } catch (error) {
      console.error('webpurify error:', error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <div className={style.title}>{sight.name}</div>
        <div className={style.navbar}>
          <Link to="/">главная</Link> /
          <Link to={`/города/${sight.city_name}`}>{sight.city_name}</Link> / {sight.name}
        </div>
      </div>

      <div className={style.main_container}>
        <div className={style.images_container}>
          {isLoading
            ? Array(3)
                .fill('')
                .map(() => <div className={style.img_container}>{<ImgSkeleton />}</div>)
            : imagePreviews.map((preview, index) => (
                <div className={style.img_container} key={index}>
                  <img key={index} src={preview} alt="preview" />
                </div>
              ))}
          <div className={style.add_img_container} onClick={() => inputFileRef.current?.click()}>
            <img src={plusIcon} alt="plusIcon" className={style.plus_btn} />
          </div>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={inputFileRef}
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div>
          <div className={style.info_content}>
            <div className={style.info_container} title="Кол-во просмотров">
              <img src={viewsIcon} alt="viewsIcon" />
              <span className={style.count_views}>{sight.count_views}</span>
            </div>

            <div className={style.info_container} title="Кол-во в избранном">
              <img src={favouriteIcon} alt="favouriteIcon" />
              <span className={style.count_likes}>{sight.count_favorite}</span>
            </div>

            <div className={style.info_container} title="Местонахождение">
              <img src={placeIcon} alt="placeIcon" />
              <span className={style.place_text}>{sight.street}</span>
            </div>

            <div className={style.info_container} title="Платно">
              <img src={waletIcon} alt="waletIcon" />
              <span>да</span>
            </div>

            <div className={style.info_container} title="Дата добавления">
              <img src={calendarIcon} alt="calendarIcon" />
              <span>{sight.created}</span>
            </div>
          </div>

          <div className={style.change_container} onClick={() => updateSightValue()}>
            <img src={saveIcon} alt="saveIcon" />
            <span>{isLoading ? 'Подождите, идёт загрузка' : 'Сохранить'}</span>
            {backendErrors && (
              <span style={{ color: 'red', marginTop: '20px' }}>{backendErrors}</span>
            )}
          </div>
        </div>
      </div>

      <div className={style.desc_container}>
        <div
          ref={divRef}
          contentEditable={false}
          onClick={handleDivClick}
          onBlur={handleDivBlur}
          onInput={handleInputChange}
          className={style.text_desc}>
          {sight.description}
        </div>
      </div>

      <div className={style.map_container}>
        <YMap
          height="600px"
          width="75%"
          pointX={sight.map_points.x}
          pointY={sight.map_points.y}
          zoom={16}
          placemark={placemarkCoords}
          setPlacemark={(coords) => setPlacemarkCoords(coords)}
          address={sightAddress}
          setAddress={(adress) => setSightAddress(adress)}
          isTouchable
        />
      </div>

      <Footer />
    </div>
  );
};
