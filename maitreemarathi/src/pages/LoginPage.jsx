// import { Phone } from "lucide-react";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// // export default function LoginPage() {
// //   const [phone, setPhone] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = (e) => {
// //     e.preventDefault();
// //     const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
// //     const user = users.find(u => u.phone === phone && u.password === password);

// //     if (user) {
// //       localStorage.setItem("loggedInUser", JSON.stringify(user));
// //       navigate("/home");
// //     } else {
// //       alert("Invalid phone or password");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-orange-50">
// //       <form
// //         onSubmit={handleLogin}
// //         className="bg-white p-8 rounded-2xl shadow-lg w-96"
// //       >
// //         <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
// //           Login to Maitree Marathi
// //         </h2>
// //         <input
// //           type="tel"
// //           placeholder="Mobile Number"
// //           value={phone}
// //           onChange={(e) => setPhone(e.target.value)}
// //           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
// //           required
// //         />
// //         <button
// //           type="submit"
// //           className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
// //         >
// //           Login
// //         </button>
// //         <p className="text-center text-sm mt-4">
// //           Don’t have an account?{" "}
// //           <Link to="/register" className="text-orange-600 font-semibold">
// //             Register
// //           </Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }
// function Login(){
//   const[Phone,setEmail]=useState("");
//   const[password,setPassword]=useState("");
//   const navigate=useNavigate();
//   const handleLogin=(e)=>{
//     e.preventDefault();
//     axios.post("http://localhost:5000/login",{
//       Phone,
//       password,
//     }).then((res)=>{
//       console.log("Login response:", res.data);
//       if(res.data.status==="success"){
//         navigate("/home");
//       }else{
//         alert("Invalid credentials");
//       }
//     }).catch((error)=>{
//       console.error("Login error:", error);
//       alert("An error occurred during login. Please try again.");
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-orange-50">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-lg w-96"
//       >
//         <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
//           Login to Maitree Marathi
//         </h2>
//         <input
//           type="Phone"
//           placeholder="Phone"
//           value={Phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
//         >
//           Login
//         </button>
//         <p className="text-center text-sm mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-orange-600 font-semibold">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/login", {
//         phone,
//         password,
//       });

//       console.log("Login response:", res.data);

//       if (res.data.status === "success") {
//         alert("Login successful!");
//         localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
//         navigate("/home");
//       } else {
//         alert(res.data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-orange-50">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-lg w-96"
//       >
//         <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
//           Login to Maitree Marathi
//         </h2>

//         <input
//           type="tel"
//           placeholder="Mobile Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
//         >
//           Login
//         </button>

//         <p className="text-center text-sm mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-orange-600 font-semibold">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/login", {
//         phone,
//         password,
//       });

//       console.log("Login response:", res.data);

//       if (res.data.status === "success") {
//         alert("Login successful!");

//         // 🧹 Remove old key (important)
//         localStorage.removeItem("loggedInUser");

//         // ✅ Save correct user data
//         localStorage.setItem("user", JSON.stringify(res.data.user));

//         navigate("/home");
//       } else {
//         alert(res.data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-orange-50">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-lg w-96"
//       >
//         <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
//           Login to Maitree Marathi
//         </h2>

//         <input
//           type="tel"
//           placeholder="Mobile Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
//         >
//           Login
//         </button>

//         <p className="text-center text-sm mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-orange-600 font-semibold">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/login", {
//         phone,
//         password,
//       });

//       console.log("Login API Response:", res.data);

//       // FIXED: Match your backend response
//       if (res.data.status === "success") {
//         alert("Login Successful!");

//         // Save user data
//         localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));

//         // Navigate to dashboard
//         navigate("/home", { replace: true });
//       } else {
//         alert(res.data.message || "Invalid credentials!");
//       }
//     } catch (err) {
//       console.log("Login error:", err);
//       alert("Something went wrong during login!");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-orange-50">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-lg w-96"
//       >
//         <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
//           Login to Maitree Marathi
//         </h2>

//         <input
//           type="tel"
//           placeholder="Mobile Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
//         >
//           Login
//         </button>

//         <p className="text-center text-sm mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-orange-600 font-semibold">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        phone,
        password,
      });

      console.log("Login API Response:", res.data);

      if (res.data.status === "success") {
        alert("Login Successful!");

        // Clear all old login data
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("token");
        localStorage.removeItem("referralCode");

        // Save fresh data from backend
        localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
        localStorage.setItem("userType", res.data.userType);

        // Save phone for API calls
        if (res.data.userType === "user") {
          localStorage.setItem("userPhone", res.data.user.phone);
        }

        console.log("Saved user:", JSON.stringify(res.data.user));

        // Redirect based on user type
        if (res.data.userType === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      } else {
        alert(res.data.message || "Invalid credentials!");
      }
    } catch (err) {
      console.log("Login error:", err);
      alert("Something went wrong during login!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Login to Maitree Marathi
        </h2>

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
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-600 font-semibold">
            Register
          </Link>
        </p>

        <p className="text-center text-sm mt-2">
          <Link to="/admin-login" className="text-gray-600 hover:text-gray-800">
            Admin Login →
          </Link>
        </p>
      </form>
    </div>
  );
}
