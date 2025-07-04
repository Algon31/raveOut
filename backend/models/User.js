const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    city: { type: String },
    role: { type: String, enum: ["user", "owner"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
