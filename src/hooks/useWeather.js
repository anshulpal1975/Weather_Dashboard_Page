import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '84b79da5e5d7c92085660485702f4ce8';

export const useWeather = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('search')) || []);

  const fetchWeather = async (city) => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const lat = weatherResponse.data.coord.lat;
      const lon = weatherResponse.data.coord.lon;
      const uvResponse = await axios.get(`https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=1`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${weatherResponse.data.id}&appid=${API_KEY}`);

      setWeatherData({
        ...weatherResponse.data,
        uvIndex: uvResponse.data[0].value
      });
      
      setForecastData(forecastResponse.data.list.slice(1, 6).map(item => {
        const date = new Date(item.dt * 1000);
        return {
          date: date.toLocaleDateString('en-US'),
          icon: item.weather[0].icon,
          temp: Math.floor((item.main.temp - 273.15) * 1.8 + 32),
          humidity: item.main.humidity,
          description: item.weather[0].description
        };
      }));
      
      setSearchHistory(prevHistory => {
        const newHistory = [...new Set([city, ...prevHistory])];
        localStorage.setItem('search', JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search');
  };

  return { cityName, setCityName, fetchWeather, weatherData, forecastData, searchHistory, clearHistory };
};
