import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/places.json";
import defaultImage from "../assets/images/mpro.jpg";

export default function ClubDetails({ user: passedUser, setUser }) {
  const { type, city, index } = useParams();
  const navigate = useNavigate();

  const [user, setLocalUser] = useState(passedUser);
  useEffect(() => {
    if (!passedUser) {
      const stored = sessionStorage.getItem("raveoutUser");
      if (stored) setLocalUser(JSON.parse(stored));
    }
  }, [passedUser]);

  const itemList = data[city]?.[type];
  const item = itemList ? itemList[parseInt(index)] : null;

  const [currentImage, setCurrentImage] = useState(0);
  const images =
    item?.images && item.images.length > 0 ? item.images : [defaultImage];

  const [reviews, setReviews] = useState(item?.reviews || []);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleReviewSubmit = () => {
    if (!newComment || newRating === 0) return;

    const newReview = {
      user: user?.username || "Anonymous",
      comment: newComment,
      rating: newRating,
    };

    setReviews((prev) => [...prev, newReview]);
    setNewComment("");
    setNewRating(0);
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <p className="text-center text-red-500">Item not found</p>
      </div>
    );
  }

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
          <p className="text-gray-300">{item.timing || item.timings || "Timing info not available"}</p>
        </section>

        {/* Average Price */}
        {item.average_price && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Average Price</h2>
            <p className="text-gray-300">{item.average_price}</p>
          </section>
        )}

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
            {item.type && (
              <span className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                Type: {item.type}
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
          {reviews && reviews.length > 0 ? (
            <ul className="space-y-3 max-h-48 overflow-y-auto">
              {reviews.map((review, i) => (
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

        {/* Add Review */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Leave a Review</h2>

          <div className="flex space-x-2 mb-3 ">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setNewRating(star)}
                className={`text-2xl bg-blue-900  ${newRating >= star ? "text-yellow-400" : "text-gray-500"}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="w-full p-3 rounded-lg  text-white mb-3"
            rows={3}
            placeholder="Write your review..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            onClick={handleReviewSubmit}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
          >
            Submit Review
          </button>
        </section>
        {/* More Places in Same Area */}
            {item.area && (
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">More in {item.area}</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {itemList
                    .filter((it, idx) => it.area === item.area && idx !== parseInt(index))
                    .map((place, i) => {
                      const bgImage =
                        place.images && place.images.length > 0
                          ? place.images[0]
                          : defaultImage;

                      return (
                        <div
                          key={i}
                          onClick={() => navigate(`/${type}/${city}/${itemList.indexOf(place)}`)}
                          className="min-w-[220px] h-40 rounded-xl relative bg-cover bg-center cursor-pointer flex items-end shadow-md hover:scale-[1.03] transition-transform"
                          style={{ backgroundImage: `url(${bgImage})` }}
                        >
                          <div className="bg-black bg-opacity-60 w-full p-3 rounded-b-xl">
                            <h3 className="text-white text-lg font-bold truncate">
                              {place.name}
                            </h3>
                            <p className="text-sm text-gray-300 truncate">
                              {place.description.slice(0, 40)}...
                            </p>
                            <p className="text-yellow-400 text-sm">Rating: {place.rating || "N/A"}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            )}



        {/* Booking Button */}
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
