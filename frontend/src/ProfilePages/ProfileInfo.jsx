import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    city: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedUser = JSON.parse(sessionStorage.getItem("raveoutUser"));
  console.log("🔍 Stored user:", storedUser);

  if (!storedUser || !storedUser.uid) return;

  const uid = storedUser.uid;

  axios
    .get(`https://raveout.onrender.com/api/users/uid/${uid}`)
    .then((res) => {
      console.log("✅ User fetched from Mongo:", res.data);

      const user = res.data;
      setFormData({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        city: user.city || "",
        role: user.role || "",
      });

      setLoading(false);
    })
    .catch((err) => {
      console.error("❌ Error fetching user:", err);
      setLoading(false);
    });
}, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("raveoutUser"));
    if (!storedUser || !storedUser.uid) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE}/api/users/uid/${storedUser.uid}`,
        formData
      );

      alert("Profile updated ✅");
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Failed to update profile ❌");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["name", "age", "gender", "city", "role"].map((field) => (
          <div key={field}>
            <label className="text-sm text-gray-300 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
        ))}

        <div>
          <label className="text-sm text-gray-300">Email (read-only)</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full p-3 mt-1 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
