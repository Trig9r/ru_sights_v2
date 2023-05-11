import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { Footer, YMap } from '@/components';
import { Button, Dropdown, Input } from '@/components/UI';
import { useCities } from '@/utils/api/hooks';
import { getUserCityName, useFilteredCities } from '@/utils/helpers';
import { API_WEBPURIFY, WEBPURIFY_FORMAT } from '@/constants/api';
import { CityTypes } from '@/@types';

import style from './AddSightPage.module.css';

const TYPES = {
  MUSEUMS: 'Музеи',
  MONUMENTS: 'Памятники',
  PARKS: 'Парки',
  THEATERS: 'Театры',
  CHURCHES: 'Храмы',
  BUILDINGS: 'Здания',
  NATURAL: 'Природные',
  OTHER: 'Другое',
};

const validateLoginForm = (name: string, value: string) => {
  if (!value) {
    return `${name} не может быть пустым!`;
  }
  return null;
};

interface CityArray {
  cities: CityTypes[];
}

export const AddSightPage = () => {
  const navigate = useNavigate();

  const [sightValue, setSightValue] = React.useState({
    name: '',
    desc: '',
  });
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string | null }>({
    name: '',
    desc: '',
  });

  const [selectedCity, setSelectedCity] = React.useState<{
    id: null | number;
    name: null | string;
  }>({ id: null, name: null });

  const [selectedType, setSelectedType] = React.useState<{
    id: null | number;
    name: null | string;
  }>({ id: null, name: null });

  const [placemarkCoords, setPlacemarkCoords] = React.useState({ X: null, Y: null });
  const [sightAddress, setSightAddress] = React.useState('');

  const [selectedImages, setSelectedImages] = React.useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const [isLoadingPost, setIsLoadingPost] = React.useState(false);
  const [backendErrors, setBackendErrors] = React.useState('');

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useCities<CityArray>();

  // получение города пользователя через геолокацию
  const userCity = getUserCityName();
  React.useEffect(() => {
    setSelectedCity({ id: null, name: userCity });
  }, [userCity]);

  if (isError || !data) return <div>loading...</div>;

  const { cities } = data;

  // координаты x и y на карте по выбранному городу
  const mapCity = cities.filter((city) => city.name === selectedCity.name);

  // отфильтрованные города с нужными ключими для dropdown
  const filteredCities = useFilteredCities(cities);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;
    if (images) {
      setSelectedImages(images);
      const previews: string[] = [];
      for (let i = 0; i < images.length; i++) {
        previews.push(URL.createObjectURL(images[i]));
      }
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoadingPost(false);

    const validationRules = [
      { condition: sightValue.name === '', errorMessage: 'Название не может быть пустым' },
      { condition: !selectedCity, errorMessage: 'Выберите город' },
      { condition: sightValue.desc === '', errorMessage: 'Описание не может быть пустым' },
      {
        condition: !placemarkCoords.X && !placemarkCoords.Y,
        errorMessage: 'Выберите точку на карте',
      },
      { condition: !selectedType, errorMessage: 'Выберите тип достопримечательности' },
      { condition: !selectedImages, errorMessage: 'Выберите картинки' },
    ];

    for (let i = 0; i < validationRules.length; i++) {
      const { condition, errorMessage } = validationRules[i];
      if (condition) {
        setBackendErrors(errorMessage);
        return;
      }
    }

    try {
      const { data } = await axios.get(
        `${API_WEBPURIFY}&text=${sightValue.desc}%20${sightValue.name}&${WEBPURIFY_FORMAT}`,
      );

      const isProfanity = Number(data.rsp.found);

      if (!!isProfanity) {
        alert('В описании или названии присутсвует ругательство');
      } else {
        const formData = new FormData();
        formData.append('sightName', sightValue.name);
        formData.append('sightCityId', String(selectedCity.id));
        formData.append('sightDesc', sightValue.desc);
        formData.append('sightAddress', sightAddress);
        formData.append('sightMapCoordsX', String(placemarkCoords.X));
        formData.append('sightMapCoordsY', String(placemarkCoords.Y));
        formData.append('sightTypeId', String(selectedType.id));
        for (let i = 0; i < selectedImages!.length; i++) {
          formData.append('images[]', selectedImages![i]);
        }

        // отправка данных с формы на rest api
        try {
          setIsLoadingPost(true);

          const response = await axios.post(
            'http://localhost/sight_api/sights/img_upload.php',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );

          // console.log('Files uploaded successfully: ', response.data);
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
        <div className={style.title}>Новая достопримечательность</div>
        <div className={style.navbar}>
          <Link to="/">Главная</Link> / Добавить
        </div>
      </div>
      <div className={style.form_container}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.input_container}>
            <Input
              label="Название"
              value={sightValue.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setSightValue({ ...sightValue, name: value });
                const errors = validateLoginForm('Название', value);
                setFormErrors({ ...formErrors, name: errors });
              }}
              {...(!!formErrors.name && {
                isError: !!formErrors.name,
                helperText: formErrors.name,
              })}
            />
          </div>

          <div className={style.dropdown_city_container}>
            <Dropdown
              placeholder="Город"
              elements={filteredCities}
              selectedValue={selectedCity}
              setSelectedElement={({ id, name }) => setSelectedCity({ id: id, name: name })}
              isSearchable
            />
          </div>

          <div className={style.input_container}>
            <Input
              value={sightValue.desc}
              label="Описание"
              classnames={style.desc}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setSightValue({ ...sightValue, desc: value });
                const errors = validateLoginForm('desc', value);
                setFormErrors({ ...formErrors, desc: errors });
              }}
              {...(!!formErrors.desc && {
                isError: !!formErrors.desc,
                helperText: formErrors.desc,
              })}
            />
          </div>

          <div className={style.input_container}>
            <div className={style.map_container}>
              <YMap
                height="250px"
                width="375px"
                pointX={mapCity[0]?.map_points.x ?? 37.6177}
                pointY={mapCity[0]?.map_points.y ?? 55.7559}
                zoom={10}
                placemark={placemarkCoords}
                setPlacemark={(coords) => setPlacemarkCoords(coords)}
                address={sightAddress}
                setAddress={(adress) => setSightAddress(adress)}
                isTouchable
              />
            </div>
          </div>

          <div className={style.dropdown_type_container}>
            <Dropdown
              placeholder="Тип"
              elements={[
                { id: 1, name: TYPES.MUSEUMS },
                { id: 2, name: TYPES.MONUMENTS },
                { id: 3, name: TYPES.PARKS },
                { id: 4, name: TYPES.THEATERS },
                { id: 5, name: TYPES.CHURCHES },
                { id: 6, name: TYPES.BUILDINGS },
                { id: 7, name: TYPES.NATURAL },
                { id: 8, name: TYPES.OTHER },
              ]}
              selectedValue={selectedType}
              setSelectedElement={({ id, name }) => setSelectedType({ id: id, name: name })}
            />
          </div>

          <div className={style.button_photo_container}>
            <Button
              type="button"
              classnames={style.button_photo}
              onClick={() => inputFileRef.current?.click()}>
              Добавить фото
            </Button>
            <span>Кол-во: {selectedImages?.length ?? 0}</span>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={inputFileRef}
              multiple
              onChange={handleFileChange}
            />
          </div>

          <div className={style.image_previews_container}>
            {imagePreviews.map((preview, index) => (
              <div key={index} className={style.image_container}>
                <img key={index} src={preview} alt="preview" className={style.image_preview} />
              </div>
            ))}
          </div>

          <div className={style.button_submit_container}>
            <Button
              type="submit"
              classnames={style.button_submit}
              primary
              isLoading={isLoadingPost}>
              Добавить
            </Button>
            <span style={{ color: 'red', marginTop: '20px' }}>{backendErrors}</span>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
