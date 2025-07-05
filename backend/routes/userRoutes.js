const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  console.log("🟢 /api/users route hit"); // should show up

  try {
    const { uid, name, email, age, gender, city, role } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    let existing = await User.findOne({ email });
    if (existing) {
      return res.status(200).json({ success: true, message: "User already exists" });
    }

    const user = await User.create({ uid, name, email, age, gender, city, role });

    return res.status(201).json({ success: true, message: "User created", user });
  } catch (err) {
    console.error("MongoDB store error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
