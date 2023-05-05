import { CityTypes } from '@/@types';

export const useFilteredCities = (cities: CityTypes[]) => {
  // Создаем новый массив объектов с оставленными ключами и значениями
  const filteredCities = cities.map((city) => {
    // Создаем новый объект, содержащий только необходимые ключи и их значения
    const filteredCity = {} as CityTypes;
    if (city.hasOwnProperty('name')) {
      filteredCity['name'] = city['name'];
    }

    return filteredCity;
  });

  return filteredCities;
};
