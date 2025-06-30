import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import data from "../data/places.json";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {

const location = useLocation();

const [selectedCity, setSelectedCity] = useState("");
const [searchText, setSearchText] = useState("");
const [type, setType] = useState(""); // pubs / restaurants / ""
const [results, setResults] = useState([]);
const [allAreas, setAllAreas] = useState([]);
const [areaSuggestions, setAreaSuggestions] = useState([]);

// React to query param changes
useEffect(() => {
  const query = new URLSearchParams(location.search);
  const city = query.get("city") || "";
  const area = query.get("area") || "";

  setSelectedCity(city);
  setSearchText(area);
}, [location.search]);


  // Load areas for selected city
  useEffect(() => {
    const areas = new Set();
    if (!selectedCity || !data[selectedCity]) return;

    for (const cat in data[selectedCity]) {
      data[selectedCity][cat].forEach((item) => {
        const areaText = item.area || item.location || item.place;
        if (areaText) areas.add(areaText.trim());
      });
    }

    setAllAreas([...areas]);
  }, [selectedCity]);

  // Filter when searchText or type changes
  useEffect(() => {
    handleSearch();
  }, [searchText, type]);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }

    const matched = [];

    if (!selectedCity || !data[selectedCity]) return;

    for (const cat in data[selectedCity]) {
      if (type && cat !== type) continue;

      data[selectedCity][cat].forEach((item, i) => {
        const areaText = item.area || item.location || item.place || "";
        const nameText = item.name || "";
        const input = searchText.toLowerCase();

        if (
          areaText.toLowerCase().includes(input) ||
          nameText.toLowerCase().includes(input)
        ) {
          matched.push({
            ...item,
            city: selectedCity,
            type: cat,
            index: i,
          });
        }
      });
    }

    setResults(matched);
  };

  const handleInputChange = (value) => {
    setSearchText(value);

    if (!value.trim()) {
      setAreaSuggestions([]);
      return;
    }

    const filtered = allAreas.filter((a) =>
      a.toLowerCase().includes(value.toLowerCase())
    );

    setAreaSuggestions(filtered.slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Search Results in {selectedCity}</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        {/* Autocomplete Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name or area..."
            value={searchText}
            onChange={(e) => handleInputChange(e.target.value)}
            className="p-2 rounded text-black w-full"
          />
          {areaSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-gray-800 text-white border border-gray-600 mt-1 rounded w-full max-h-40 overflow-y-auto shadow">
              {areaSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearchText(suggestion);
                    setAreaSuggestions([]);
                  }}
                  className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Type Dropdown */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded text-black w-full sm:w-40"
        >
          <option value="">All</option>
          <option value="pubs">Pubs</option>
          <option value="restaurants">Restaurants</option>
        </select>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <p className="text-center text-gray-400">No matches found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {results.map((item, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-1">{item.name}</h3>
              <p className="text-gray-300 text-sm mb-1">
                {item.area || item.location || item.place} • {item.type}
              </p>
              <p className="text-gray-400 text-sm mb-2">{item.description}</p>
              <a
                href={`/details/${item.type}/${item.city}/${item.index}`}
                className="inline-block mt-2 bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
