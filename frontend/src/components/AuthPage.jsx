import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    gender: "male",
    phone: "",
    city: "Mysuru",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      }

      const firebaseUser = userCredential.user;

      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          name: form.firstName + " " + form.lastName,
          email: firebaseUser.email,
          age: form.age,
          gender: form.gender,
          city: form.city,
          role: "user",
        }),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      const userObj = data.user;

      setUser(userObj);
      sessionStorage.setItem("raveoutUser", JSON.stringify(userObj));
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const backendRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
          age: 18,
          gender: "unknown",
          city: "Mysuru",
          role: "user",
        }),
      });

      const backendData = await backendRes.json();

      const userObj = backendData.user;

      setUser(userObj);
      sessionStorage.setItem("raveoutUser", JSON.stringify(userObj));
      navigate("/");
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700"
              />
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700"
              />
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-700"
              >
                <option value="Mysuru">Mysuru</option>
                <option value="Bengaluru">Bengaluru</option>
              </select>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold mt-2"
          >
            Continue with Google
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
