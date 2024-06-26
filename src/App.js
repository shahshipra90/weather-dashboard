import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import {
  fetchWeatherData,
  getFavorites,
  addFavoriteService,
  removeFavorite,
} from "./services/weatherService";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("metric");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
    fetchFavorites();
    loadSearchHistory();
  }, []);

  const fetchWeather = async (city) => {
    try {
      const data = await fetchWeatherData(city, unit);
      setWeatherData(data);
      localStorage.setItem("lastCity", city);
      updateSearchHistory(city);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
    }
  };

  const addFavorite = async (city) => {
    try {
      const data = await fetchWeatherData(city, unit);
      const newFavorite = {
        id: data.city.id,
        name: data.city.name,
        temp: data.list[0].main.temp,
        unit: unit === "metric" ? "C" : "F",
        dateTime: new Date().toLocaleString(),
      };
      await addFavoriteService(newFavorite);
      fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite:", error.message);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
  };

  const handleRemoveFavorite = async (city) => {
    try {
      await removeFavorite(city.id);
      fetchFavorites();
    } catch (error) {
      console.error("Error removing favorite:", error.message);
    }
  };

  const loadSearchHistory = () => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  };

  const updateSearchHistory = (city) => {
    const updatedHistory = [...searchHistory];
    if (!updatedHistory.includes(city)) {
      updatedHistory.push(city);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Weather Dashboard</h1>
        <div className="search-container">
          <Search onSearch={fetchWeather} />
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="toggle-switch"
              className="toggle-switch-checkbox"
              checked={unit === "imperial"}
              onChange={toggleUnit}
            />
            <label className="toggle-switch-label" htmlFor="toggle-switch">
              <span
                className="toggle-switch-inner"
                data-celsius="°C"
                data-fahrenheit="°F"
              />
              <span className="toggle-switch-switch" />
            </label>
          </div>
        </div>
      </div>
      <div className="main-content">
        {weatherData && <WeatherDisplay data={weatherData} unit={unit} />}
        <Favorites
          favorites={favorites}
          onRemove={handleRemoveFavorite}
          onAdd={addFavorite}
          unit={unit}
        />
        <div className="search-history"></div>
      </div>
    </div>
  );
};

export default App;
