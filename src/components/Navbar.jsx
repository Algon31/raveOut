import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => setShowProfileMenu((v) => !v);
  const closeProfileMenu = () => setShowProfileMenu(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-2xl font-bold hover:text-indigo-400"
          onClick={closeProfileMenu}
        >
          raveOut
        </NavLink>

        <div className="flex items-center space-x-6 relative">

          {!user ? (
            <>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? "text-indigo-400 font-semibold" : "hover:text-indigo-300"
                }
                onClick={closeProfileMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? "text-indigo-400 font-semibold" : "hover:text-indigo-300"
                }
                onClick={closeProfileMenu}
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.imageUrl}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-indigo-600 cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {showProfileMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg p-4 text-center z-50"
                  onMouseLeave={closeProfileMenu}
                >
                  <img
                    src={user.imageUrl}
                    alt="profile"
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-indigo-500 object-cover"
                  />
                  <p className="font-semibold mb-2">{user.username}</p>
                  <ul className="text-left space-y-2 cursor-pointer">
                    <li className="hover:text-indigo-400">Edit Profile</li>
                    <li className="hover:text-indigo-400">Settings</li>
                    <li className="hover:text-indigo-400">Previous Bookings</li>
                    <li className="hover:text-indigo-400">Notifications</li>
                    <li
                      className="hover:text-red-400 text-red-300"
                      onClick={() => {
                        setUser(null);
                        closeProfileMenu();
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
