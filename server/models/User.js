const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // 👈 ensures no duplicate emails
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;  