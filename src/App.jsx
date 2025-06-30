import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./components/HomePage";
import ClubDetails from "./components/ClubDetails";
import BookingPage from "./components/BookingPage";
import AuthPage from "./components/AuthPage";
import NotFound from "./components/NotFound";
import Search from "./components/Search.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [user, setUserState] = useState(null); // Logged-in user state
  const [selectedCity, setSelectedCityState] = useState("Bengaluru"); // Default city

  // Load saved user and city from sessionStorage on initial load
  useEffect(() => {
    const storedUser = sessionStorage.getItem("raveoutUser");
    const storedCity = sessionStorage.getItem("raveoutCity");

    if (storedUser) setUserState(JSON.parse(storedUser));
    if (storedCity) setSelectedCityState(storedCity);
  }, []);

  // Setter for user that also saves to sessionStorage
  const setUser = (userData) => {
    if (userData) {
      sessionStorage.setItem("raveoutUser", JSON.stringify(userData));
    } else {
      sessionStorage.removeItem("raveoutUser");
    }
    setUserState(userData);
  };

  // Setter for selected city that syncs with sessionStorage
  const setSelectedCity = (city) => {
    sessionStorage.setItem("raveoutCity", city);
    setSelectedCityState(city);
  };

  return (
    <>
      {/* Navbar stays fixed on all pages */}
      <Navbar
        user={user}
        setUser={setUser}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* Route container (with top padding for fixed navbar) */}
      <div className="pt-16">
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                setUser={setUser}
                selectedCity={selectedCity}
              />
            }
          />

          {/* Search results page */}
          <Route path="/search" element={<Search selectedCity={selectedCity} />} />

          {/* Booking page (requires user) */}
          <Route path="/booking" element={<BookingPage user={user} />} />

          {/* 404 fallback route */}
          <Route path="*" element={<NotFound />} />

          {/* Club/restaurant details page */}
          <Route path="/details/:type/:city/:index" element={<ClubDetails />} />

          {/* Auth page: redirects to home if already logged in */}
          <Route
            path="/auth"
            element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
