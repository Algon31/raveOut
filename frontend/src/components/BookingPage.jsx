import React, { useState, useEffect } from "react";

export default function BookingPage({ user }) {
  const [formData, setFormData] = useState({
    name: user?.username || "",
    phone: "",
    guests: 1,
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Load user from sessionStorage if not passed from props
  useEffect(() => {
    if (!user && !formData.name) {
      const stored = sessionStorage.getItem("raveoutUser");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFormData((prev) => ({ ...prev, name: parsed.username }));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Book Your Spot</h1>

          <label className="block mb-2">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            required
            className="w-full mb-4 p-2 rounded text-black"
          />

          <label className="block mb-2">Phone Number</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            pattern="[0-9]{10}"
            required
            className="w-full mb-4 p-2 rounded text-black"
          />

          <label className="block mb-2">Number of Guests</label>
          <input
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            type="number"
            min="1"
            required
            className="w-full mb-4 p-2 rounded text-black"
          />

          <label className="block mb-2">Date</label>
          <input
            name="date"
            value={formData.date}
            onChange={handleChange}
            type="date"
            required
            className="w-full mb-6 p-2 rounded text-black"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-700 font-semibold"
          >
            Confirm Booking
          </button>
        </form>
      ) : (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Thanks for booking!</h2>
          <p className="text-lg mb-6 text-gray-300">
            You'll receive an SMS shortly confirming your booking.
          </p>
          <a
            href="/"
            className="inline-block bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold text-white"
          >
            Go to Home
          </a>
        </div>
      )}
    </div>
  );
}
