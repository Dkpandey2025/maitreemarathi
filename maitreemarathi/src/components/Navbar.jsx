// import React from "react";
// import { Link } from "react-router-dom";
// import { Menu } from "lucide-react";

// export default function Navbar({ toggleSidebar }) {
//   return (
//     <nav className="flex items-center justify-between bg-purple-600 text-white px-4 py-3 shadow-md">
//       <div className="flex items-center gap-3">
//         <button onClick={toggleSidebar} className="sm:hidden">
//           <Menu className="w-6 h-6" />
//         </button>
//         <Link to="/" className="font-bold text-xl">
//           Maitree Marathi
//         </Link>
//       </div>
//          <Link
//         to="/home"
//         className="bg-white text-purple-600 px-3 py-1 rounded-lg font-semibold hover:bg-purple-50 transition-all"
//       >
//         Dashboard
//       </Link>
//       <Link
//         to="/profile"
//         className="bg-white text-purple-600 px-3 py-1 rounded-lg font-semibold hover:bg-purple-50 transition-all"
//       >
//         Profile
//       </Link>

//     </nav>
//   );
// // }
// import React from "react";
// import { Link } from "react-router-dom";
// import { Menu } from "lucide-react";

// export default function Navbar({ toggleSidebar }) {
//   return (
//     <nav className="flex items-center justify-between bg-purple-600 text-white px-4 py-3 shadow-md sticky top-0 z-50">
//       {/* Left Section - Sidebar Toggle + Logo */}
//       <div className="flex items-center gap-3">
//         <button onClick={toggleSidebar} className="sm:hidden">
//           <Menu className="w-6 h-6" />
//         </button>

//         <Link to="/" className="font-bold text-xl tracking-wide">
//           Maitree Marathi
//         </Link>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4 text-sm font-semibold">
//         <Link to="/" className="hover:text-purple-200 transition">
//           Home
//         </Link>

//         <Link
//           to="/login"
//           className="bg-white text-purple-600 px-4 py-1.5 rounded-lg shadow hover:bg-purple-50 transition"
//         >
//           Login
//         </Link>

//         <Link
//           to="/register"
//           className="bg-purple-800 px-4 py-1.5 rounded-lg shadow hover:bg-purple-900 transition"
//         >
//           Register
//         </Link>
//       </div>
//     </nav>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="flex items-center justify-between bg-purple-600 text-white px-5 sm:px-6 py-3 sm:py-3.5 shadow-lg sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* <button onClick={toggleSidebar} className="sm:hidden">
          <Menu className="w-7 h-7" />
        </button> */}

        <Link to="/" className="font-bold text-lg sm:text-2xl tracking-wide">
          Maitree Marathi
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5 text-sm sm:text-lg font-semibold">
        <div className="hidden sm:block">
          <Link to="/" className="hover:text-purple-200 transition">
            Home
          </Link>
        </div>

        <Link
          to="/login"
          className="bg-white text-purple-600 px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg shadow-md hover:bg-purple-50 transition font-semibold"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-purple-800 px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg shadow-md hover:bg-purple-900 transition font-semibold"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
