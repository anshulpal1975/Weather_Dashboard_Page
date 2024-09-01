import { useState, useEffect } from 'react';
import axios from 'axios';

const APIKey = '84b79da5e5d7c92085660485702f4ce8';

export const useWeather = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem('search')) || []
  );

  const fetchWeather = (city) => {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    
    axios.get(queryURL).then((response) => {
      const data = response.data;
      const lat = data.coord.lat;
      const lon = data.coord.lon;

      // Fetch UV Index
      const UVQueryURL = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&cnt=1`;
      axios.get(UVQueryURL).then((uvResponse) => {
        const uvIndex = uvResponse.data[0].value;
        const uvClass = uvIndex < 4 ? 'badge-success' : uvIndex < 8 ? 'badge-warning' : 'badge-danger';
        
        // Set weather data
        setWeatherData({
          name: data.name,
          date: new Date(data.dt * 1000).toLocaleDateString(),
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          temp: k2f(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          uvIndex: { value: uvIndex, class: uvClass }
        });

        // Fetch day forecast
        const forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?id=${data.id}&appid=${APIKey}`;
        axios.get(forecastQueryURL).then((forecastResponse) => {
          const forecastData = forecastResponse.data.list.filter((_, i) => i % 8 === 4).map((item) => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            temp: k2f(item.main.temp),
            humidity: item.main.humidity
          }));
          setForecastData(forecastData);
        });
      });

      // Update search history
      const updatedHistory = [...searchHistory, city];
      setSearchHistory(updatedHistory);
      localStorage.setItem('search', JSON.stringify(updatedHistory));
    });
  };

  const clearHistory = () => {
    localStorage.removeItem('search');
    setSearchHistory([]);
  };

  const k2f = (K) => Math.floor((K - 273.15) * 1.8 + 32);

  useEffect(() => {
    if (searchHistory.length > 0) {
      fetchWeather(searchHistory[searchHistory.length - 1]);
    }
  }, [searchHistory]);

  return {
    cityName,
    setCityName,
    fetchWeather,
    weatherData,
    forecastData,
    searchHistory,
    addToHistory: (city) => {
      setSearchHistory((prev) => [...prev, city]);
      localStorage.setItem('search', JSON.stringify([...searchHistory, city]));
    },
    clearHistory
  };
};
