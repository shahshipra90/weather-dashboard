import axios from "axios";

// Use environment variable for API key
const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = "http://api.openweathermap.org/data/2.5";
const JSON_SERVER_URL = "http://localhost:5000";

export const fetchWeatherData = async (city, unit) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites;
  } catch (error) {
    console.error("Error getting favorites:", error.message);
    throw error;
  }
};

export const addFavoriteService = async (favorite) => {
  try {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(favorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error adding favorite:", error.message);
    throw error;
  }
};

export const removeFavorite = async (id) => {
  try {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error removing favorite:", error.message);
    throw error;
  }
};
