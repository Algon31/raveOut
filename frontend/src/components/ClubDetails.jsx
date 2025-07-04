import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import data from "../data/places.json";
import defaultImage from "../assets/images/mpro.jpg";

export default function ClubDetails({ user: passedUser, setUser }) {
  const { type, city, index } = useParams();
  const navigate = useNavigate();

  const [user, setLocalUser] = useState(passedUser);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!passedUser) {
      const stored = sessionStorage.getItem("raveoutUser");
      if (stored) setLocalUser(JSON.parse(stored));
    }
  }, [passedUser]);

  const itemList = data[city]?.[type];
  const item = itemList ? itemList[parseInt(index)] : null;

  useEffect(() => {
    if (item?.reviews) setReviews(item.reviews);
  }, [item]);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Place not found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="relative h-96 overflow-hidden">
        <img
          src={item.images?.[0] || defaultImage}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex items-center space-x-2 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{item.name}</h1>
          <div className="flex items-center space-x-4 text-gray-200">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{item.area || item.location || city}</span>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(item.rating || 0) ? "fill-yellow-400" : "fill-gray-600"}`}
                  fill={i < Math.round(item.rating || 0) ? "currentColor" : "none"}
                />
              ))}
              <span className="text-white ml-2">{item.rating || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
        </div>

        {item.average_price && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-4">Price</h2>
            <p className="text-gray-300 text-lg">{item.average_price}</p>
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.features?.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6">Leave a Review</h2>
          <div className="flex space-x-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setNewRating(star)}
                className={`text-2xl ${newRating >= star ? "text-yellow-400" : "text-gray-500"}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-3 rounded-lg text-white bg-gray-700 mb-3"
            rows={3}
            placeholder="Write your review..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleReviewSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-white"
          >
            Submit Review
          </button>
        </div>

        {item.area && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">More in {item.area}</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {itemList
                .filter((it, idx) => it.area === item.area && idx !== parseInt(index))
                .map((place, i) => {
                  const bgImage =
                    place.images && place.images.length > 0 ? place.images[0] : defaultImage;

                  return (
                    <div
                      key={i}
                      onClick={() => navigate(`/details/${type}/${city}/${itemList.indexOf(place)}`)}
                      className="min-w-[220px] h-40 rounded-xl relative bg-cover bg-center cursor-pointer flex items-end shadow-md hover:scale-[1.03] transition-transform"
                      style={{ backgroundImage: `url(${bgImage})` }}
                    >
                      <div className="bg-black bg-opacity-60 w-full p-3 rounded-b-xl">
                        <h3 className="text-white text-lg font-bold truncate">{place.name}</h3>
                        <p className="text-sm text-gray-300 truncate">{place.description?.slice(0, 40)}...</p>
                        <p className="text-yellow-400 text-sm">Rating: {place.rating || "N/A"}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
