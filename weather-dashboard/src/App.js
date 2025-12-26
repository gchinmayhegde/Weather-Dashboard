import React, { useState, useEffect } from "react";


function App() {

  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  if (city.trim() !== "") {
    fetchWeather();
  }
  },[city]);


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
    <div>
      <h1>Weather Information Dashboard</h1>

      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

      <button onClick={fetchWeather}>Get Weather</button>
      </div>

      <div>
        <h2>Weather Details</h2>

        {loading && <p>Loading weather data...</p>}

        {error && <p>{error}</p>}

        {weather && !loading && !error && (
          <div>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
