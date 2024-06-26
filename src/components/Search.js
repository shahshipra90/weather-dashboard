import React, { useState, useEffect } from "react";

const Search = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = () => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setRecentSearches(history);
  };

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      updateSearchHistory(city);
    }
    setCity("");
  };

  const updateSearchHistory = (city) => {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    history = history.filter((item) => item !== city); // Remove city if already exists
    history.unshift(city); // Add city to the beginning of the array
    history = history.slice(0, 5); // Limit to last 5 searches
    localStorage.setItem("searchHistory", JSON.stringify(history));
    setRecentSearches(history);
  };

  const removeFromSearchHistory = (city) => {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    history = history.filter((item) => item !== city);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    setRecentSearches(history);
  };

  return (
    <div className="search">
      <div
        className="search-bar"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </button>
        {showDropdown && recentSearches.length > 0 && (
          <div className="search-dropdown">
            <ul className={recentSearches.length > 0 ? "scrollable" : ""}>
              {recentSearches.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setCity(item);
                    setShowDropdown(false);
                  }}
                >
                  {item}
                  <span
                    className="remove-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromSearchHistory(item);
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
