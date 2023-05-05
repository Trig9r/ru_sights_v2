import axios from 'axios';

import { useState } from 'react';
import { API_OPENCAGEDATA, API_KEY_OPENCAGEDATA } from '@/constants/api';

export const getUserCityName = () => {
  const [userCity, setUserCity] = useState<null | string>(null);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Call the reverse geocoding service to get the city name from the coordinates
        const response = await axios.get(
          `${API_OPENCAGEDATA + latitude}+${longitude}&key=${API_KEY_OPENCAGEDATA}`,
        );
        const data = await response.data;

        // Extract the city name from the response data
        const city =
          data.results[0].components.city ||
          data.results[0].components.town ||
          data.results[0].components.village;

        //set user city;
        setUserCity(city);
      },
      (error) => {
        setUserCity(null);
        console.log(error);
      },
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
  return userCity;
};
