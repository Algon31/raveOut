import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/places.json";

const itemImage = "../assets/images/mpro.jpg";

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

export default function HomePage({ user, setUser }) {
  const [cityPubs, setCityPubs] = useState("Bengaluru");
  const [cityRestaurants, setCityRestaurants] = useState("Mysuru");
  const [showProfileWidget, setShowProfileWidget] = useState(false);

  const toggleCityPubs = () => {
    setCityPubs((prev) => (prev === "Bengaluru" ? "Mysuru" : "Bengaluru"));
  };

  const toggleCityRestaurants = () => {
    setCityRestaurants((prev) => (prev === "Bengaluru" ? "Mysuru" : "Bengaluru"));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">

      <section className="text-center mb-12">
        <h2 className="text-4xl font-semibold mb-4">Find the Best Clubs Near You</h2>
        <p className="text-gray-300 mb-6">See what's trending, who's going, and book your spot instantly.</p>
        <input
          type="text"
          placeholder="Search clubs by city or name..."
          className="w-full max-w-md p-3 rounded-md text-black mx-auto"
        />
      </section>

      {/* Pubs Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Pubs ({cityPubs})</h3>
          <button
            onClick={toggleCityPubs}
            className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded"
          >
            Switch to {cityPubs === "Bengaluru" ? "Mysuru" : "Bengaluru"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data[cityPubs].pubs.map((pub, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl shadow-xl">
              <img
                src={itemImage}
                alt={pub.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h4 className="text-xl font-bold mb-1">{pub.name}</h4>
              <p className="text-gray-400 mb-1">{pub.location || pub.place}</p>
              <p className="text-gray-400 mb-1">{pub.description}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
                <span>{pub.features.includes("Serves Alcohol") ? "🍸 Alcohol" : "🚫 Non-Alcoholic"}</span>
                <span>•</span>
                <span>{pub.features.includes("Outdoor Seating") ? "Outdoor Seating" : ""}</span>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(pub.rating)}
                <span className="ml-2 text-gray-300">{pub.rating.toFixed(1)}</span>
              </div>
              <Link to={`/details/pubs/${cityPubs}/${i}`}>
                <button className="mt-2 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 text-white">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Restaurants ({cityRestaurants})</h3>
          <button
            onClick={toggleCityRestaurants}
            className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded"
          >
            Switch to {cityRestaurants === "Bengaluru" ? "Mysuru" : "Bengaluru"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data[cityRestaurants].restaurants.map((res, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl shadow-xl">
              <img
                src={itemImage}
                alt={res.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h4 className="text-xl font-bold mb-1">{res.name}</h4>
              <p className="text-gray-400 mb-1">{res.location || res.place}</p>
              <p className="text-gray-400 mb-1">{res.description}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
                <span>{res.features.includes("Serves Alcohol") ? "🍸 Alcohol" : "🚫 Non-Alcoholic"}</span>
                <span>•</span>
                <span>{res.features.includes("Outdoor Seating") ? "Outdoor Seating" : ""}</span>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(res.rating)}
                <span className="ml-2 text-gray-300">{res.rating.toFixed(1)}</span>
              </div>
              <Link to={`/details/restaurants/${cityRestaurants}/${i}`}>
                <button className="mt-2 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 text-white">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
