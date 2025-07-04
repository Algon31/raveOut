// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! This page doesn't exist or is under construction.</p>
      <Link
        to="/"
        className="bg-indigo-600 px-6 py-3 rounded hover:bg-indigo-700 text-white font-semibold"
      >
        Go Back Home
      </Link>
    </div>
  );
}
