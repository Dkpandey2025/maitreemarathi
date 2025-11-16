import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //  axios.post('http://localhost:5000/register',{name,phone,password}).then((res)=>{
  //   console.log(res.data);
  //  }).catch((err)=>{
  //   console.log(err);
  //  })
  //   // if (users.find((u) => u.phone === phone)) {
  //   //   alert("User already exists!");
  //   //   return;
  //   // }

  //   const newUser = {
  //     name,
  //     phone,
  //     password,
  //     userId: "U" + Date.now(),
  //     plan: "",
  //     progress: {},
  //   };

  //   // users.push(newUser);
  //   // localStorage.setItem("registeredUsers", JSON.stringify(users));
  //   // localStorage.setItem("loggedInUser", JSON.stringify(newUser));

  //   alert("Registered successfully!");
  //   navigate("/home");
  // };
const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/register", {
      name,
      phone,
      password,
    });

    console.log(res.data);

    if (res.data.status === "success") {
      alert("Registered successfully!");
      navigate("/home");
    } else if (res.data.status === "error" && res.data.message) {
      alert(res.data.message);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);

    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert("Server error. Please try again later.");
    }
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Create Account
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
