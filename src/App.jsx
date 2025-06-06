import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./components/HomePage";
import Hello from "./components/Hello";
import ClubDetails from "./components/ClubDetails";
import BookingPage from "./components/BookingPage";
import AuthPage from "./components/AuthPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/booking" element={<BookingPage user={user} />} />
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
