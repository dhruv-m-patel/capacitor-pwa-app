import React, { useState, useCallback } from 'react';
import { fetchWeather } from '../api/weather';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState();

  const handleSearch = useCallback(({ target }) => {
    setQuery(target.value);
  }, []);

  const fetchWeatherInfo = useCallback(async ({ key }) => {
    if (key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  }, [query]);

  return (
    <div className="mainContainer">
      <h1>Get weather information by City, Country</h1>
      <br />
      <br />
      <input
        type="text"
        className="search"
        placeholder="London, UK"
        value={query}
        onChange={handleSearch}
        onKeyPress={fetchWeatherInfo}
      />
      {!!weather?.main && (
        <div className="city">
            <h2 className="cityName">
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
            </h2>
            <div className="cityTemp">
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
            </div>
            <div className="info">
                <img
                  className="cityIcon"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p>{weather.weather[0].description}</p>
            </div>
        </div>
      )}
    </div>
  );
}
