import React from 'react';
import axios from 'axios';

import { Footer } from '@/components';
import { Button, Dropdown, Input } from '@/components/UI';
import { useCities } from '@/utils/api/hooks';
import { CityTypes } from '@/@types';

import style from './AddSightPage.module.css';

const validateLoginForm = (name: string, value: string) => {
  if (!value) return `${name} is required`;
  return null;
};

interface CityArray {
  cities: CityTypes[];
}

export const AddSightPage = () => {
  const [sightValue, setSightValue] = React.useState({ name: '', desc: '' });
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string | null }>({
    name: '',
  });
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(null);

  const { data, isLoading, isError } = useCities<CityArray>();

  if (isError || !data) return <div>loading...</div>;

  const { cities } = data;

  // Создаем новый массив объектов с оставленными ключами и значениями
  const filteredCities = cities.map((city) => {
    // Создаем новый объект, содержащий только необходимые ключи и их значения
    const filteredCity = {} as CityTypes; // Можете указать более точный тип, замените any
    if (city.hasOwnProperty('name')) {
      filteredCity['name'] = city['name'];
    }

    return filteredCity;
  });

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFiles) {
      console.log('No files selected.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files[]', selectedFiles[i]);
    }
    formData.append('name', sightValue.name);

    // console.log(sightValue.name);

    try {
      const response = await axios.post(
        'http://localhost/sight_api/sights/img_upload_with_api.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Files uploaded successfully: ', response.data);
    } catch (error) {
      console.error('Failed to upload files:', error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <div className={style.title}>Новая достопримечательность</div>
        <div className={style.navbar}>Главная / Добавить</div>
      </div>
      <div className={style.form_container}>
        <form onSubmit={handleFormSubmit} className={style.form}>
          <div className={style.input_container}>
            <Input
              label="Название"
              value={sightValue.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setSightValue({ ...sightValue, name: value });
                const errors = validateLoginForm('name', value);
                setFormErrors({ ...formErrors, name: errors });
              }}
              {...(!!formErrors.name && {
                isError: !!formErrors.name,
                helperText: formErrors.name,
              })}
            />
          </div>

          <div className={style.dropdown_city_container}>
            <Dropdown placeholder="Город" cities={filteredCities} />
          </div>

          <input type="file" multiple onChange={handleFileInputChange} />
          <button type="submit">Добавить</button>
        </form>

        {/* <form action="" className={style.form}>

          <div className={style.dropdown_city_container}>
            <Dropdown
              placeholder="Город"
              cities={[{ city_name: 'Москва' }, { city_name: 'Санкт-Петербург' }]}
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
            <Input
              value={sightValue.desc}
              label="Карта"
              classnames={style.map}
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

          <div className={style.dropdown_type_container}>
            <Dropdown
              placeholder="Тип"
              cities={[{ city_name: 'Парк' }, { city_name: 'Памятник' }]}
            />
          </div>

          <div className={style.button_photo_container}>
            <Button classnames={style.button_photo}>Добавить фото</Button>
            <span>Кол-во: 0</span>
          </div>

          <div className={style.button_submit_container}>
            <Button type="submit" classnames={style.button_submit} primary>
              Добавить
            </Button>
          </div>
        </form> */}
      </div>
      <Footer />
    </div>
  );
};
