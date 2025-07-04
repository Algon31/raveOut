const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { uid, name, email, age, gender, city, role } = req.body;

  try {
    const existing = await User.findOne({ uid });
    if (existing) return res.status(200).json({ user: existing });

    const newUser = await User.create({ uid, name, email, age, gender, city, role });
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

module.exports = router;
