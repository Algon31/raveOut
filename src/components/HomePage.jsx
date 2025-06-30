import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Stars } from "lucide-react";
import data from "../data/places.json";
import itemImage from "../assets/images/mpro.jpg";

function renderStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={"full" + i} className="text-yellow-400">★</span>);
  }
  if (halfStar) stars.push(<span key="half" className="text-yellow-400">☆</span>);
  while (stars.length < 5) {
    stars.push(<span key={"empty" + stars.length} className="text-gray-600">★</span>);
  }
  return stars;
}

export default function HomePage({ user, selectedCity }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [ctaSearch, setCtaSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const navigate = useNavigate();

  const pubs = data[selectedCity]?.pubs || [];
  const restaurants = data[selectedCity]?.restaurants || [];

  useEffect(() => {
    const areas = new Set();
    if (!data[selectedCity]) return;
    ["pubs", "restaurants"].forEach(type => {
      data[selectedCity][type]?.forEach(item => {
        const area = item.area || item.location || item.place;
        if (area) areas.add(area.trim());
      });
    });
    setAllAreas([...areas]);
  }, [selectedCity]);

  const handleInputChange = (val) => {
    setSearchTerm(val);
    if (!val.trim()) return setSuggestions([]);
    const filtered = allAreas.filter(area => area.toLowerCase().includes(val.toLowerCase()));
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSearch = (term) => {
    const query = term.trim();
    if (query) {
      navigate(`/search?city=${selectedCity}&area=${encodeURIComponent(query)}`);
    }
  };

  const handleViewDetails = (type, index) => {
    navigate(`/details/${type}/${selectedCity}/${index}`);
  };

  const renderCard = (place, type, index) => (
    <div
      key={index}
      className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl p-4 shadow hover:shadow-lg transition duration-300 flex flex-col justify-between min-w-[260px] max-w-[260px]"
    >
      <div>
        <img
          src={itemImage}
          alt={place.name}
          className="rounded-xl mb-4 h-40 w-full object-cover"
        />
        <h3 className="text-xl font-bold mb-1 text-white">{place.name}</h3>
        <p className="text-sm text-gray-400 mb-1">{place.area || place.location}</p>
        <p className="text-sm text-gray-400 mb-2">{place.description}</p>
        <div className="text-sm text-gray-300 mb-2">
          {place.features?.join(" • ") || "No Features"}
        </div>
        <div className="flex items-center text-sm mb-3">
          {renderStars(place.rating)}
          <span className="ml-2">{place.rating.toFixed(1)}</span>
        </div>
      </div>
      <button
        onClick={() => handleViewDetails(type, index)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-xl text-white font-medium mt-auto"
      >
        View Details
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="mb-8">
            <div className="flex justify-center space-x-2 mb-4">
              <MapPin className="w-8 h-8 text-blue-400" />
              <Stars className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text mb-4">
              Discover Nightlife & Dining
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Explore the best pubs and restaurants in {selectedCity}
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                placeholder={`Search areas in ${selectedCity}`}
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
                className="w-full px-4 py-3 rounded-lg text-black"
              />
              <button onClick={() => handleSearch(searchTerm)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                Search
              </button>
              {suggestions.length > 0 && (
                <ul className="absolute top-12 left-0 w-full bg-gray-800 border border-gray-700 rounded shadow z-10 max-h-40 overflow-auto">
                  {suggestions.map((s, i) => (
                    <li key={i} onClick={() => { setSearchTerm(s); setSuggestions([]); }} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="px-6 py-20 max-w-7xl mx-auto space-y-20">
        <div>
          <h2 className="text-4xl font-semibold mb-8 text-white">Featured Pubs</h2>
          <div className="flex overflow-x-auto space-x-6 pb-2">
            {pubs.slice(0, 5).map((pub, i) => renderCard(pub, "pubs", i))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-semibold mb-8 text-white">Featured Restaurants</h2>
          <div className="flex overflow-x-auto space-x-6 pb-2">
            {restaurants.slice(0, 5).map((res, i) => renderCard(res, "restaurants", i))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
