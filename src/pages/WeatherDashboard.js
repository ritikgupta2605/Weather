import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Import CSS file

const WeatherDashboard = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve user data from localStorage
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userName = storedData?.name || "User";

  useEffect(() => {
    // Redirect if no user data is found
    if (!storedData) {
      navigate("/");
      return;
    }

    // Fetch user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [navigate]);

  // Fetch weather data from OpenWeather API
  const fetchWeather = async (lat, lon) => {
    const API_KEY = "ed87705e733a88b8b18fbd6eea140ec3"; // Replace with your OpenWeather API key
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar">
  <h1>🌟 Weather App</h1>
  <span className="username">👤 {userName}</span> {/* This moves to the right */}
</div>


      {/* Weather Section */}
      <div className="weather-section">
      {loading ? (
  <p>Loading weather...</p>
) : weather && weather.weather ? ( // ✅ Added null checks
  <>
    <h2>Good Morning, {userName}</h2>
    <p>Here is the weather update for your location</p>

    <div className="weather-card">
      {weather.weather[0] && ( // ✅ Ensure weather[0] exists
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          className="weather-icon"
        />
      )}
      <div className="weather-details">
        <h3>{weather.name}, {weather.sys?.country || "Unknown"}</h3> {/* ✅ Added optional chaining */}
        <h2>{Math.round(weather.main?.temp) || "N/A"}°C</h2>
      </div>
    </div>
  </>
) : (
  <p>Could not fetch weather data.</p>
)}
      </div>
    </div>
  );
};

export default WeatherDashboard;
