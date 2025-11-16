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

  // 🔥 Referral System Fields
  referralCode: { type: String, unique: true }, // Code user will share
  referredBy: { type: String, default: null }, // Code used during signup

  // 🔥 Wallet & Referral Reward
  wallet: { type: Number, default: 0 }, // Money earned from referrals
  referralCount: { type: Number, default: 0 }, // How many users referred
});

module.exports = mongoose.model("User", UserSchema);
