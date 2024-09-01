import React from 'react';

const WeatherForm = ({ cityName, setCityName, fetchWeather }) => {
  const handleSearch = () => {
    if (cityName) {
      fetchWeather(cityName);
    }
  };

  return (
    <div>
      <h5 className="mt-3">Search for a City:</h5>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter a city"
          aria-label="Enter a city"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherForm;
