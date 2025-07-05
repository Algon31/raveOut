import React from "react";

export default function Bookings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Previous Bookings</h2>
        <p className="text-gray-400 mt-1">View your past club or restaurant bookings</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <p className="text-gray-300">No previous bookings found.</p>
      </div>
    </div>
  );
}
