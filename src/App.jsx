import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./components/HomePage";
import Hello from "./components/Hello";
import ClubDetails from "./components/ClubDetails";
import BookingPage from "./components/BookingPage";
import AuthPage from "./components/AuthPage";
import NotFound from "./components/NotFound";
import Search from "./components/Search.jsx";

function App() {
  const [user, setUserState] = useState(null);
  const [selectedCity, setSelectedCityState] = useState("Bengaluru");

  // Load user and city from sessionStorage on first load
  useEffect(() => {
    const storedUser = sessionStorage.getItem("raveoutUser");
    const storedCity = sessionStorage.getItem("raveoutCity");

    if (storedUser) setUserState(JSON.parse(storedUser));
    if (storedCity) setSelectedCityState(storedCity);
  }, []);

  // Setters that sync with sessionStorage
  const setUser = (userData) => {
    if (userData) {
      sessionStorage.setItem("raveoutUser", JSON.stringify(userData));
    } else {
      sessionStorage.removeItem("raveoutUser");
    }
    setUserState(userData);
  };

  const setSelectedCity = (city) => {
    sessionStorage.setItem("raveoutCity", city);
    setSelectedCityState(city);
  };

  return (
    <>
      <Navbar
        user={user}
        setUser={setUser}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <div className="pt-16">
        <Routes>
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
          <Route path="/search" element={<Search selectedCity={selectedCity} />} />
          <Route path="/booking" element={<BookingPage user={user} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/details/:type/:city/:index" element={<ClubDetails />} />
          <Route
            path="/auth"
            element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
