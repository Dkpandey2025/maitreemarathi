// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const User = require("./models/User");
// const axios = require("axios");
// const app = express();
// const PORT = process.env.PORT || 5000;
// const bodyParser = require("body-parser");

// app.use(cors({ origin: "http://localhost:5173" }));
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/maitreemarathi")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running ✅");
// });

// // ========== REGISTER ==========
// app.post("/register", async (req, res) => {
//   try {
//     const { name, phone, password } = req.body;

//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return res.status(400).json({
//         status: "error",
//         message: "User already exists. Please login.",
//       });
//     }

//     // Save user with plain password (for testing only)
//     const newUser = await User.create({ name, phone, password });

//     res.status(201).json({
//       status: "success",
//       message: "User registered successfully!",
//       user: { name: newUser.name, phone: newUser.phone },
//     });
//   } catch (error) {
//     console.error("Error in /register:", error);
//     res
//       .status(500)
//       .json({ status: "error", message: "Internal server error." });
//   }
// });

// // ========== LOGIN ==========
// app.post("/login", async (req, res) => {
//   try {
//     const { phone, password } = req.body;

//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.json({ status: "error", message: "User not found." });
//     }

//     if (user.password !== password) {
//       return res.json({ status: "error", message: "Invalid credentials." });
//     }

//     res.json({
//       status: "success",
//       message: "Login successful.",
//       user: { name: user.name, phone: user.phone },
//     });
//   } catch (error) {
//     console.error("Error in /login:", error);
//     res
//       .status(500)
//       .json({ status: "error", message: "Internal server error." });
//   }
// });

// //PAYMENT GATEWAY INTEGRATION
// // app.post("/payment", async (req, res) => {
// //   try {
// //     const instaServer = "https://test.instamojo.com/api/1.1/payment-requests";
// //     const payload = {
// //       amount: 2000,
// //       buyer_name: "Maitree Marathi",
// //       purpose: "Donation",
// //       email: "example@example.com",
// //       phone: "9999999999",
// //     };
// //     const auth = {
// //       "X-Api-key": "4a092aec9492f738b0bb290de9e93a48",
// //       "X-Auth-Token": "3e74728dbd978ef3f356d52a1d8aab26",
// //     };
// //     const { data } = await axios.post(instaServer, payload, auth);
// //     res.status(200).json({ status: "success", data: data });
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ status: "error", message: "Internal server error." });
// //   }
// // });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post("/payment", async (req, res) => {
//   try {
//     const buyer = req.body
//     console.log(req.body);
//     const instaServer = "https://www.instamojo.com/api/1.1/payment-requests/";

//     const payload = {
//       amount: buyer.amount,
//       purpose: buyer.purpose,
//       buyer_name: buyer.buyer_name,
//       email: buyer.email,
//       phone: buyer.phone,
//       redirect_url: "http://localhost:5173/payment-success",
//     };

//     const headers = {
//       "X-Api-Key": "b6520084968e6d4efcdba40f813b4699",
//       "X-Auth-Token": "fc235b0f39a0f80d752147d62997ab08",
//       "Content-Type": "application/json",
//     };

//     const response = await axios.post(instaServer, payload, { headers });

//     res.status(200).json({
//       status: "success",
//       data: response.data,
//     });
//   } catch (error) {
//     console.error("Instamojo Error:", error.response?.data || error.message);

//     res.status(500).json({
//       status: "error",
//       message: "Payment request failed.",
//       error: error.response?.data,
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =======================
//  CONNECT MONGODB
// =======================
mongoose
  .connect("mongodb://localhost:27017/maitreemarathi")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =======================
//  TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// =======================
//  REGISTER USER
// =======================
app.post("/register", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists. Please login.",
      });
    }

    const newUser = await User.create({ name, phone, password });

    res.status(201).json({
      status: "success",
      message: "User registered successfully!",
      user: { name: newUser.name, phone: newUser.phone },
    });
  } catch (error) {
    console.error("Error in /register:", error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
});

// =======================
//  LOGIN USER
// =======================
app.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.json({ status: "error", message: "User not found." });
    }

    if (user.password !== password) {
      return res.json({ status: "error", message: "Invalid credentials." });
    }

    res.json({
      status: "success",
      message: "Login successful.",
      user: { name: user.name, phone: user.phone },
    });
  } catch (error) {
    console.error("Error in /login:", error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
});

// =======================
//  INSTAMOJO PAYMENT
// =======================
app.post("/payment", async (req, res) => {
  try {
    const buyer = req.body;
    console.log("📩 Payment Request Received:", buyer);

    const instaServer = "https://www.instamojo.com/api/1.1/payment-requests/";

    const payload = {
      amount: buyer.amount,
      purpose: buyer.purpose,
      buyer_name: buyer.buyer_name,
      email: buyer.email,
      phone: buyer.phone,
      redirect_url: "http://localhost:5173/payment-success",
    };

    const headers = {
      "X-Api-Key": "b6520084968e6d4efcdba40f813b4699",
      "X-Auth-Token": "fc235b0f39a0f80d752147d62997ab08",
      "Content-Type": "application/json",
    };

    const response = await axios.post(instaServer, payload, { headers });

    res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    console.error("❌ Instamojo Error:", error.response?.data || error.message);

    res.status(500).json({
      status: "error",
      message: "Payment request failed.",
      error: error.response?.data,
    });
  }
});

// =======================
//  START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
