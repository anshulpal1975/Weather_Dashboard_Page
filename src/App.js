import React from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import SearchHistory from './components/SearchHistory';
import { useWeather } from './hooks/useWeather';

const App = () => {
  const {
    cityName,
    setCityName,
    fetchWeather,
    weatherData,
    forecastData,
    searchHistory,
    clearHistory
  } = useWeather();

  return (
    <div className="container-fluid">
      <header className="text-center text-white bg-dark p-3">
        <h1>Weather Dashboard</h1>
      </header>

      <div className="row">
        <div className="col-lg-3 bg-light p-3">
          <WeatherForm
            cityName={cityName}
            setCityName={setCityName}
            fetchWeather={fetchWeather}
            clearHistory={clearHistory}
          />
        </div>
        <div className="col-lg-9">
          <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
        </div>
      </div>
    </div>
  );
};

export default App;
