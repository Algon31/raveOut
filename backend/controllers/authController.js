// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const user = await User.create({ name, email, password, age, role });
    const token = generateToken(user);

    res.status(201).json({ user: { name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed", message: err.message });

  }
};

exports.login = async (req, res) => {
  try {
    console.log("Login route hit");

    const { email, password } = req.body;
    console.log("Email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Password mismatch");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    console.log("Login successful, sending response");

    return res.status(200).json({
      user: { name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed", message: err.message });
  }
};


