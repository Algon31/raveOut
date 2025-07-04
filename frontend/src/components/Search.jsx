import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import data from "../data/places.json";

// Fallback icons using emojis
const SearchIcon = () => <span className="mr-2">🔍</span>;
const MapPin = () => <span className="mr-1">📍</span>;
const Coffee = () => <span>☕</span>;
const Wine = () => <span>🍷</span>;
const ChevronDown = () => <span className="ml-2">⬇️</span>;

export default function Search() {
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState("");
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const city = query.get("city") || "";
    const area = query.get("area") || "";
    setSelectedCity(city);
    setSearchText(area);
  }, [location.search]);

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

  useEffect(() => {
    handleSearch();
  }, [searchText, type]);

  const handleSearch = () => {
    if (!selectedCity || !data[selectedCity]) {
      setResults([]);
      return;
    }

    const matched = [];

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
    setShowDropdown(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {selectedCity ? `Places in ${selectedCity}` : "Search Places"}
          </h1>
          <p className="text-slate-300">Discover great pubs and restaurants near you</p>
        </div>
      </header>

      {/* Search Controls */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Autocomplete Input */}
          <div className="relative flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by area or venue name..."
                value={searchText}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                <SearchIcon />
              </div>
            </div>

            {showDropdown && areaSuggestions.length > 0 && searchText && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                {areaSuggestions.map((area, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchText(area);
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-700 flex items-center gap-2"
                  >
                    <MapPin />
                    <span>{area}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type Dropdown */}
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pr-10 text-white"
            >
              <option value="">All Venues</option>
              <option value="pubs">Pubs Only</option>
              <option value="restaurants">Restaurants Only</option>
            </select>
            <div className="absolute right-3 top-3 text-white">
              <ChevronDown />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-300">
            {results.length === 0 ? "No matches found" : `${results.length} venue${results.length > 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, i) => (
              <Link
                key={i}
                to={`/details/${item.type}/${item.city}/${item.index}`}
                className="group"
              >
                <div className="bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-700 hover:border-slate-600">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-blue-400">{item.name}</h3>
                      <div className="ml-2">
                        {item.type === "pubs" ? <Wine /> : <Coffee />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin />
                      <span className="text-slate-300 text-sm">{item.area || item.location}</span>
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded-full text-xs capitalize">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 max-w-md mx-auto">
              <SearchIcon />
              <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
              <p className="text-slate-400">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-0" onClick={() => setShowDropdown(false)} />
      )}
    </div>
  );
}
