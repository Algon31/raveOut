import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { User, Settings, CreditCard, Bell, Calendar, LogOut } from "lucide-react";
import axios from "axios";

const sidebarItems = [
  { path: "profile", label: "Edit Profile", icon: <User size={18} /> },
  { path: "payments", label: "Payments", icon: <CreditCard size={18} /> },
  { path: "settings", label: "Settings", icon: <Settings size={18} /> },
  { path: "bookings", label: "Previous Bookings", icon: <Calendar size={18} /> },
  { path: "notifications", label: "Notifications", icon: <Bell size={18} /> },
];

export default function EditProfile({ setUser }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("raveoutUser");
    if (!stored) {
    navigate("/auth");
    return;
    }
    const storedUser = JSON.parse(stored);
    const uid = storedUser.uid;

    axios
      .get(`https://raveout.onrender.com/api/users/uid/${uid}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Failed to load user data", err));
  }, [navigate]);

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("raveoutUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 space-y-6">
        <div>
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
            {userData?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <ul className="space-y-2 text-sm">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet context={userData} />
      </main>
    </div>
  );
}
