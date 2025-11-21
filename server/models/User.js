// const mongoose = require("mongoose");
// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true, unique: true }, // 👈 ensures no duplicate emails
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", UserSchema);
// module.exports = User;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Referral System Fields
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  wallet: { type: Number, default: 0 },
  referralCount: { type: Number, default: 0 },

  // Lesson Progress Tracking
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  currentLevel: { type: String, default: "beginner" }, // beginner | medium | expert
  quizzesPassed: [{ type: Number }], // Array of quiz numbers passed (5, 10, 15, etc.)
});

module.exports = mongoose.model("User", UserSchema);
