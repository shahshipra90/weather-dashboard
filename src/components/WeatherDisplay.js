// components/WeatherDisplay.js
import React from "react";
// import "./WeatherDisplay.css"; // Create this CSS file for styling

const WeatherDisplay = ({ data, unit }) => {
  const temperatureUnit = unit === "imperial" ? "°F" : "°C";

  const getCurrentDateTime = () => {
    return new Date().toLocaleString();
  };

  const getFutureDate = (daysAhead) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysAhead);
    return futureDate;
  };

  const formatDate = (dateString, index) => {
    const forecastDate = getFutureDate(index + 1);
    return forecastDate.toLocaleDateString();
  };

  // Function to get the background class based on weather condition
  const getWeatherBackground = (weather) => {
    switch (weather) {
      case "Clear":
        return "clear";
      case "Clouds":
        return "cloudy";
      case "Rain":
      case "Drizzle":
        return "rainy";
      case "Thunderstorm":
        return "thunderstorm";
      case "Snow":
        return "snowy";
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return "foggy";
      default:
        return "default";
    }
  };

  const currentWeather = data.list[0].weather[0].main;
  const weatherBackground = getWeatherBackground(currentWeather);

  return (
    <div
      className={`weather-display ${weatherBackground}`}
      style={{ marginTop: 0 }}
    >
      <h2 style={{ marginBottom: 0 }}>Forecasting {data.city.name}</h2>
      <p
        className="current-date-time"
        style={{ marginBottom: 0, marginTop: 0 }}
      >
        {getCurrentDateTime()}
      </p>
      <p style={{ marginTop: 0 }}>
        Current Temperature: {data.list[0].main.temp} {temperatureUnit} |{" "}
        {currentWeather}
      </p>
      <div className="forecast-container">
        {data.list.slice(1, 6).map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{formatDate(item.dt_txt, index)}</p>
            <p>
              {item.main.temp} {temperatureUnit} | {item.weather[0].main}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
