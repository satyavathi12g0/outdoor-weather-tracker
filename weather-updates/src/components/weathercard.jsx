import React from 'react';

// Utility function to convert Open-Meteo's WMO code to a simple description
const getWeatherDescription = (code) => {
  if (code === 0) return 'Clear sky';
  if (code >= 1 && code <= 3) return 'Partly cloudy';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code >= 71 && code <= 75) return 'Snow fall';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Various conditions';
};

const WeatherCard = ({ data }) => {
  const current = data.current;
  const description = getWeatherDescription(current.weather_code);
  
  return (
    <div className="weather-card">
      <div className="card-header">
        <h2>{data.cityName}</h2>
        <p className="description">{description}</p>
      </div>
      
      <div className="card-body">
        <div className="temp-main">
          {Math.round(current.temperature_2m)}°C
        </div>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Humidity:</span>
            <span className="value">{current.relative_humidity_2m}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Wind:</span>
            <span className="value">{current.wind_speed_10m} km/h</span>
          </div>
          <div className="detail-item">
            <span className="label">Timezone:</span>
            <span className="value">{data.timezone_abbreviation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;