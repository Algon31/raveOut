import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/places.json";

export default function ClubDetails({ user, setUser }) {
  const { type, city, index } = useParams();
  const navigate = useNavigate();

  const itemList = data[city]?.[type];
  const item = itemList ? itemList[parseInt(index)] : null;

  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: user?.username || "",
    people: 1,
    date: "",
  });

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <p className="text-center text-red-500">Item not found</p>
      </div>
    );
  }

  const images = item.images && item.images.length > 0 ? item.images : ["../assets/images/mpro.jpg"];

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(
      `Booking confirmed for ${bookingData.name} on ${bookingData.date} for ${bookingData.people} people.`
    );
    setShowBookingForm(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 mt-6">{item.name}</h1>

        {/* Image Slider */}
        <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
          <img
            src={images[currentImage]}
            alt={`${item.name} image ${currentImage + 1}`}
            className="w-full h-full object-cover rounded-xl"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-300">{item.description}</p>
        </section>

        {/* Timing */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Timing</h2>
          <p className="text-gray-300">{item.timing || "Timing info not available"}</p>
        </section>

        {/* Features */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Features</h2>
          <div className="flex flex-wrap gap-3">
            {item.features.map((feature, idx) => (
              <span
                key={idx}
                className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-md"
              >
                {feature}
              </span>
            ))}
            {item.foodType && (
              <span className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                Food: {item.foodType}
              </span>
            )}
            {item.alcohol !== undefined && (
              <span className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                Alcohol: {item.alcohol ? "Available" : "Not Available"}
              </span>
            )}
            {item.entryPolicy && (
              <span className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                Entry: {item.entryPolicy}
              </span>
            )}
          </div>
        </section>

        {/* Location */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Location</h2>
          <p className="text-gray-300">{item.location || item.address || "Location info not available"}</p>
        </section>

        {/* Reviews */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
          {item.reviews && item.reviews.length > 0 ? (
            <ul className="space-y-3 max-h-48 overflow-y-auto">
              {item.reviews.map((review, i) => (
                <li key={i} className="bg-gray-800 p-3 rounded-md">
                  <p className="font-semibold">{review.user}</p>
                  <p className="text-gray-300">{review.comment}</p>
                  <p className="text-yellow-400">Rating: {review.rating}/5</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No reviews yet</p>
          )}
        </section>

        {/* Booking */}
        <section>
          <button
            className="bg-indigo-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700"
            onClick={() => navigate("/booking")}
          >
            Book Now
          </button>
          </section>
      </div>
    </div>
  );
}
