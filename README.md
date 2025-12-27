# 🌦️ Weather Information Dashboard
It demonstrates the use of `useEffect` for API fetching and side-effect management in React.
---
## 🔗 Live Demo
https://weather-dashboard-henna-xi.vercel.app/
---
## ✅ Assignment Objectives Covered
- Using `useEffect` for handling side effects
- Fetching data from an external API
- Managing dependency arrays correctly
- Handling loading and error states
- Preventing infinite re-renders
- Implementing cleanup logic
- Conditional side effects
---
## 🧠 useEffect Usage Explanation

### 1️⃣ Weather Data Fetching
- Weather data is fetched from the OpenWeatherMap API.
- The API call is triggered:
- On initial component mount (default city)
- Whenever the city value changes

useEffect(() => {
  if (city.trim() !== "") {
    fetchWeather();
  }
}, [city]);

2️⃣ Dependency Array Handling
city is included in the dependency array.
This ensures the effect runs only when required.
Prevents unnecessary API calls and infinite re-render loops.

3️⃣ Loading & Error Management
A loading message is displayed while fetching weather data.
Error messages are shown when the API request fails or the city is not found.
This improves user experience during asynchronous operations.

4️⃣ Cleanup Function
A cleanup function is implemented using useEffect to demonstrate side-effect cleanup.

useEffect(() => {
  const timer = setTimeout(() => {
    console.log("Weather data active");
  }, 2000);
  return () => {
    clearTimeout(timer);
  };
}, []);

This prevents potential memory leaks.
Demonstrates proper lifecycle management in React functional components.

5️⃣ Conditional Side Effects
API calls are executed only when valid input is present.
Prevents unnecessary network requests and improves performance.

▶️ How to Run the Project
npm install
npm start
The application runs on:
http://localhost:3000