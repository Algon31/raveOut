import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">raveOut</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Login</a></li>
            <li><a href="#" className="hover:underline">Sign Up</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center mb-12">
        <h2 className="text-4xl font-semibold mb-4">Find the Best Clubs Near You</h2>
        <p className="text-gray-300 mb-6">See what's trending, who's going, and book your spot instantly.</p>
        <input
          type="text"
          placeholder="Search clubs by city or name..."
          className="w-full max-w-md p-3 rounded-md text-black"
        />
      </section>

      {/* Trending Clubs */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Trending Clubs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((club) => (
            <div key={club} className="bg-gray-800 p-4 rounded-xl shadow-xl">
              <h4 className="text-xl font-bold mb-2">Club {club}</h4>
              <p className="text-gray-400">City • 8PM - 2AM • Alcohol available</p>
              <button className="mt-4 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
