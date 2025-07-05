import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ClubDetails from "./components/ClubDetails";
import BookingPage from "./components/BookingPage";
import AuthPage from "./components/AuthPage";
import NotFound from "./components/NotFound";
import Search from "./components/Search.jsx";
import Footer from "./components/Footer.jsx";

import EditProfile from "./components/EditProfile";
import ProfileInfo from "./ProfilePages/ProfileInfo";
import Payments from "./ProfilePages/Payments";
import Settings from "./ProfilePages/Settings";
import Bookings from "./ProfilePages/Bookings";
import Notifications from "./ProfilePages/Notifications";

import "./App.css";

function App() {
  const [user, setUserState] = useState(null);
  const [selectedCity, setSelectedCityState] = useState("Bengaluru");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("raveoutUser");
    const storedCity = sessionStorage.getItem("raveoutCity");

    if (storedUser) setUserState(JSON.parse(storedUser));
    if (storedCity) setSelectedCityState(storedCity);
  }, []);

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
          <Route path="/details/:type/:city/:index" element={<ClubDetails />} />
          <Route
            path="/auth"
            element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/" />}
          />

          {/* Profile routes inside EditProfile layout */}
          <Route path="/profile" element={<EditProfile />}>
            <Route path="profile" element={<ProfileInfo />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
