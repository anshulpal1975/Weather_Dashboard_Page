import React from 'react';

const WeatherDisplay = ({ weatherData, forecastData }) => {
  
  
  return (
    <>
      <div className={`card m-3 ${weatherData ? '' : 'd-none'}`} id="today-weather">
        <div className="card-body">
          <h3 id="city-name" className="card-title">{weatherData?.name}</h3>
          <img id="current-pic" className="card-img-top" alt={weatherData?.weather[0]?.description} src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} />
          <p id="temperature" className="card-text">Temperature: {weatherData ? `${Math.floor((weatherData.main.temp - 273.15) * 1.8 + 32)} °F` : ''}</p>
          <p id="humidity" className="card-text">Humidity: {weatherData?.main?.humidity}%</p>
          <p id="wind-speed" className="card-text">Wind Speed: {weatherData?.wind?.speed} MPH</p>
          <p id="UV-index" className="card-text">UV Index: {weatherData?.uvIndex}</p>
        </div>
      </div>

      <div className={`d-none ${forecastData ? '' : 'd-none'}`} id="fiveday-header">
        <h3>2-Day Forecast</h3>
      </div>
      <div className="row">
        {forecastData && forecastData.map((forecast, index) => (
          <div key={index} className="col-md-2 forecast bg-primary text-white m-2 rounded p-3">
            <p className="mb-1">{forecast.date}</p>
            <img src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} alt={forecast.description} />
            <p className="mb-1">Temp: {forecast.temp} °F</p>
            <p className="mb-1">Humidity: {forecast.humidity}%</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherDisplay;
