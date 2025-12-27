import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Bangalore");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city === "London") {
      fetchWeather();
    }
  }, []); 

  // Cleanup function demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Weather data is active");
    }, 2000);

    return () => {
      clearTimeout(timer);
      console.log("Cleanup executed");
    };
  }, []);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather Information Dashboard</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name (e.g., London, New York)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      <div className="weather-section">
        <h2>Current Weather</h2>

        {loading && <p className="loading-message">Loading weather data...</p>}

        {error && <p className="error-message">{error}</p>}

        {weather && !loading && !error && (
          <div className="weather-details">
            {/* Temperature - Hero Card */}
            <div className="weather-card temperature-card">
              <div className="weather-icon">🌡️</div>
              <div className="weather-content">
                <p className="weather-label">Temperature</p>
                <p className="weather-value">{Math.round(weather.main.temp)}°C</p>
              </div>
            </div>

            {/* Condition */}
            <div className="weather-card condition-card">
              <div className="weather-icon">☁️</div>
              <div className="weather-content">
                <p className="weather-label">Condition</p>
                <p className="weather-value">{weather.weather[0].description}</p>
              </div>
            </div>

            {/* Humidity */}
            <div className="weather-card">
              <div className="weather-icon">💧</div>
              <div className="weather-content">
                <p className="weather-label">Humidity</p>
                <p className="weather-value">{weather.main.humidity}%</p>
              </div>
            </div>

            {/* Wind Speed */}
            <div className="weather-card">
              <div className="weather-icon">💨</div>
              <div className="weather-content">
                <p className="weather-label">Wind Speed</p>
                <p className="weather-value">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;