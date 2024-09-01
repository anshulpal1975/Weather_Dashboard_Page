import React from 'react';

const SearchHistory = ({ searchHistory, fetchWeather, clearHistory }) => {
  return (
    <div>
      <h5 className="mt-3">Search History:</h5>
      <div className="list-group">
        {searchHistory.map((historyItem, index) => (
          <button
            key={index}
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => fetchWeather(historyItem)}
          >
            {historyItem}
          </button>
        ))}
      </div>
      <button className="btn btn-danger mt-3" type="button" onClick={clearHistory}>
        Clear History
      </button>
    </div>
  );
};

export default SearchHistory;
