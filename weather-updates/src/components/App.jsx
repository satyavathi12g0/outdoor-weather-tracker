import React, { useState, useEffect, useCallback } from 'react';

// 🛑 IMPORTANT: Replace "YOUR_API_KEY_HERE" with your actual OpenWeatherMap API Key
// If this is not done, you will see a specific error message in the UI/Console.
const API_KEY = "YOUR_API_KEY_HERE"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ----------------------------------------------------
// 1. WeatherCard Component (Renders the weather details)
// ----------------------------------------------------

// Utility function to convert Unix timestamp to local time string
const formatTime = (timestamp, timezoneOffset) => {
    if (!timestamp || timezoneOffset === undefined) return 'N/A';
    
    // Convert UTC timestamp to milliseconds
    const utcTimeMs = timestamp * 1000;
    
    // Apply the local time offset (in seconds, converted to milliseconds)
    const localTimeMs = utcTimeMs + (timezoneOffset * 1000);
    
    // Create a Date object from the adjusted time
    const date = new Date(localTimeMs);
    
    // Format the time string based on the local time of the user's browser, 
    // adjusting for the weather location's timezone offset
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC' // Display the time as UTC after applying the offset
    });
};

const WeatherCard = ({ data }) => {
    // Check if data is null or required fields are missing
    if (!data || !data.main || !data.weather || data.weather.length === 0) {
        return <div className="weather-card empty">No weather data available.</div>;
    }

    // Destructure required data
    const { 
        name, 
        main: { temp, temp_min, temp_max, humidity }, 
        weather, 
        wind: { speed }, 
        sys: { country, sunrise, sunset },
        timezone // Timezone offset in seconds from UTC
    } = data;

    const weatherInfo = weather[0]; // Get the main weather description

    // Construct the icon URL
    const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

    // Format times
    const sunriseTime = formatTime(sunrise, timezone);
    const sunsetTime = formatTime(sunset, timezone);


    return (
        <div className="weather-card">
            <h2 className="city-name">{name}, {country}</h2>
            
            <div className="main-info">
                <img 
                    src={iconUrl} 
                    alt={weatherInfo.description} 
                    className="weather-icon"
                />
                <p className="temperature">
                    {Math.round(temp)}°C
                </p>
            </div>

            <p className="description">{weatherInfo.main} ({weatherInfo.description})</p>

            <div className="details-grid">
                <div className="detail-item">
                    <span className="label">High/Low:</span>
                    <span className="value">{Math.round(temp_max)}°C / {Math.round(temp_min)}°C</span>
                </div>
                <div className="detail-item">
                    <span className="label">Humidity:</span>
                    <span className="value">{humidity}%</span>
                </div>
                <div className="detail-item">
                    <span className="label">Wind Speed:</span>
                    <span className="value">{speed} m/s</span>
                </div>
                <div className="detail-item">
                    <span className="label">Sunrise:</span>
                    <span className="value">{sunriseTime}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Sunset:</span>
                    <span className="value">{sunsetTime}</span>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------
// 2. Main App Component (Handles state, fetching, and layout)
// ----------------------------------------------------

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch weather data for a given city
  const fetchWeather = useCallback(async (searchCity) => {
    // Key Check: Prevents fetching if the placeholder API key is still present
    if (!searchCity || !API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
        setError('Please enter a city and ensure your API key is set in the code.');
        setWeatherData(null);
        return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      // Fetching data from the API
      const url = `${BASE_URL}?q=${searchCity}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        // Handle specific errors like 404 (City not found)
        if (response.status === 404) {
            throw new Error(`City not found: ${searchCity}`);
        }
        throw new Error(`Failed to fetch weather data (Status: ${response.status})`);
      }

      const data = await response.json();
      setWeatherData(data);

    } catch (err) {
      console.error("Fetch error:", err);
      // Display a user-friendly error message
      setError(err.message || "An unknown error occurred while fetching data.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means the function is created only once

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only fetch if the city input is not empty
    if (city.trim()) {
        fetchWeather(city.trim());
    } else {
        setError('Please enter a city name to search.');
    }
  };
  
  // Set an initial fetch for a default city when the component mounts
  useEffect(() => {
    fetchWeather('New York'); 
  }, [fetchWeather]); 