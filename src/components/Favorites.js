import React, { useState } from "react";

const Favorites = ({ favorites, onRemove, onAdd, unit }) => {
  const [newCity, setNewCity] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showInitialAddButton, setShowInitialAddButton] = useState(true);

  const handleAdd = () => {
    if (newCity.trim()) {
      onAdd(newCity.trim());
      setNewCity("");
      setIsAdding(false); // Close the input field after adding
      setShowInitialAddButton(true); // Show initial "+" button after adding
    }
  };

  const toggleSearchBar = () => {
    setIsAdding(!isAdding);
    setShowInitialAddButton(false); // Hide initial "+" button when showing search bar
  };

  const convertTemperature = (temp) => {
    return unit === "metric" ? (temp * 9) / 5 + 32 : temp;
  };

  return (
    <div className="favorites">
      <h3 style={{ marginTop: 0, fontSize: "1.5rem" }}>
        Favourite Cities{" "}
        {showInitialAddButton && (
          <span
            className="add-button initial-add-button"
            onClick={toggleSearchBar}
            title="Add a new city"
            style={{ borderRadius: "15px", marginLeft: "10px" }}
          >
            +
          </span>
        )}
      </h3>
      {isAdding && (
        <div className="search-bar">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Search city..."
          />
          <span
            className="add-button"
            onClick={handleAdd}
            title="Add this city"
          >
            +
          </span>
        </div>
      )}
      <ul>
        {favorites.map((city) => (
          <li key={city.id}>
            <span>
              {city.name} - {convertTemperature(city.temp).toFixed(1)}°
              {unit === "imperial" ? "C" : "F"} ({city.dateTime})
            </span>
            <span className="remove-button" onClick={() => onRemove(city)}>
              −
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
