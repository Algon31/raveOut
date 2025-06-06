import React from "react";

export default function ClubDetails() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Club Header */}
      <div className="max-w-4xl mx-auto">
        <img
          src="src\assets\images\mpro.jpg"
          alt="Club Banner"
          className="w-full rounded-xl mb-6"
        />

        <h1 className="text-4xl font-bold mb-2">Club RaveOut</h1>
        <p className="text-gray-400 mb-4">Mumbai • 8PM - 2AM • Entry Fee: ₹1000</p>

        {/* Description */}
        <p className="mb-6 text-lg text-gray-300">
          Experience the ultimate night at Club RaveOut with electrifying music, amazing crowd, and a vibrant atmosphere. Perfect for weekend getaways and party nights.
        </p>

        {/* Available Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Available</h2>
          <div className="flex flex-wrap gap-4">
            {['Food', 'Drinks', 'Hookah', 'Live DJ'].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <button className="mt-4 bg-indigo-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700">
          Book Now
        </button>
      </div>
    </div>
  );
}
