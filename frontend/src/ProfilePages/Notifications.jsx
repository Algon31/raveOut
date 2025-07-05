import React from "react";

export default function Notifications() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Notifications</h2>
        <p className="text-gray-400 mt-1">View your recent alerts and updates</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <p className="text-gray-300">You have no notifications at this time.</p>
      </div>
    </div>
  );
}
