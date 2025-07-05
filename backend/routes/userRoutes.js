// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ POST /api/users - create or check user
router.post("/", async (req, res) => {
  console.log("🟢 /api/users POST route hit");

  try {
    const { uid, name, email, age, gender, city, role } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // 🔍 Check if user exists by email
    let existing = await User.findOne({ email });
    if (existing) {
      return res.status(200).json({ success: true, message: "User already exists", user: existing });
    }

    // ➕ Create new user
    const user = await User.create({ uid, name, email, age, gender, city, role });

    return res.status(201).json({ success: true, message: "User created", user });
  } catch (err) {
    console.error("MongoDB store error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ GET /api/users/uid/:uid - fetch user by Firebase UID
router.get("/uid/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by UID:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ PUT /api/users/uid/:uid - update user by UID
router.put("/uid/:uid", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid: req.params.uid },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
