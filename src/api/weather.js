import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '28c51670bb18b1d9e43a8f094d1decf4';

export const fetchWeather = async (query) => {
  const res = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_KEY,
    },
  }).catch((err) => {
    console.log('err: ', err);
  });
  return res.data;
};
