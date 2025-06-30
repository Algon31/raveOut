import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "../data/places.json";
import itemImage from "../assets/images/mpro.jpg";

function renderStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={"full" + i} className="text-yellow-400">★</span>);
  }
  if (halfStar) {
    stars.push(<span key="half" className="text-yellow-400">☆</span>);
  }
  while (stars.length < 5) {
    stars.push(<span key={"empty" + stars.length} className="text-gray-600">★</span>);
  }
  return stars;
}

export default function HomePage({ user, setUser, selectedCity }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const navigate = useNavigate();

  const pubs = data[selectedCity]?.pubs || [];
  const restaurants = data[selectedCity]?.restaurants || [];

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

  const handleInputChange = (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setAreaSuggestions([]);
      return;
    }

    const filtered = allAreas.filter((a) =>
      a.toLowerCase().includes(value.toLowerCase())
    );

    setAreaSuggestions(filtered.slice(0, 5));
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?city=${selectedCity}&area=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      {/* Title Section */}
      <section className="text-center mb-12 pb-3 pt-3">
        <h2 className="text-4xl font-semibold mb-4">Find the Best Clubs Near You</h2>
        <p className="text-gray-300 mb-6">
          See what's trending {user?.username || ""}, who's going, and book your spot instantly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder={`Search by name or area in ${selectedCity}`}
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full p-3 rounded-md text-black"
            />
            {areaSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-gray-800 text-white border border-gray-600 mt-1 rounded w-full max-h-40 overflow-y-auto shadow">
                {areaSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearchTerm(suggestion);
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
          <button
            onClick={handleSearch}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
          >
            Search
          </button>
        </div>
      </section>

      {/* Pubs Section */}
      <section className="mb-10 p-5">
        <h3 className="text-2xl font-semibold mb-9">Pubs ({selectedCity})</h3>
        <div className="overflow-x-auto">
          <div
            className="grid auto-rows-max grid-flow-col gap-4 pb-3"
            style={{ gridTemplateRows: "repeat(2, 1fr)" }}
          >
            {pubs.slice(0, 12).map((pub, i) => (
              <div key={i} className="w-72 bg-gray-800 p-4 rounded-xl shadow-xl">
                <img
                  src={itemImage}
                  alt={pub.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h4 className="text-xl font-bold mb-1">{pub.name}</h4>
                <p className="text-gray-400 mb-1">{pub.area || pub.location || pub.place}</p>
                <p className="text-gray-400 mb-1">{pub.description}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
                  <span>
                    {pub.features.includes("Serves Alcohol") ? "🍸 Alcohol" : "🚫 Non-Alcoholic"}
                  </span>
                  <span>•</span>
                  <span>{pub.features.includes("Outdoor Seating") ? "Outdoor Seating" : ""}</span>
                </div>
                <div className="flex items-center mb-2">
                  {renderStars(pub.rating)}
                  <span className="ml-2 text-gray-300">{pub.rating.toFixed(1)}</span>
                </div>
                <Link to={`/details/pubs/${selectedCity}/${i}`}>
                  <button className="mt-2 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 text-white">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="mb-10 p-5">
        <h3 className="text-2xl font-semibold mb-4">Restaurants ({selectedCity})</h3>
        <div className="overflow-x-auto">
          <div
            className="grid auto-rows-max grid-flow-col gap-4 pb-3"
            style={{ gridTemplateRows: "repeat(2, 1fr)" }}
          >
            {restaurants.slice(0, 12).map((res, i) => (
              <div key={i} className="w-72 bg-gray-800 p-4 rounded-xl shadow-xl">
                <img
                  src={itemImage}
                  alt={res.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h4 className="text-xl font-bold mb-1">{res.name}</h4>
                <p className="text-gray-400 mb-1">{res.area || res.location || res.place}</p>
                <p className="text-gray-400 mb-1">{res.description}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
                  <span>
                    {res.features.includes("Serves Alcohol") ? "🍸 Alcohol" : "🚫 Non-Alcoholic"}
                  </span>
                  <span>•</span>
                  <span>{res.features.includes("Outdoor Seating") ? "Outdoor Seating" : ""}</span>
                </div>
                <div className="flex items-center mb-2">
                  {renderStars(res.rating)}
                  <span className="ml-2 text-gray-300">{res.rating.toFixed(1)}</span>
                </div>
                <Link to={`/details/restaurants/${selectedCity}/${i}`}>
                  <button className="mt-2 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 text-white">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
