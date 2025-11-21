// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";

// export default function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">

//       {/* Sidebar */}
//       <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

//       {/* Main Dashboard Content */}
//       <main className="flex-grow p-6 sm:ml-64">
//         {/* Mobile sidebar toggle button */}
//         <button
//           className="sm:hidden mb-4 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-md"
//           onClick={() => setSidebarOpen(true)}
//         >
//           ☰ Menu
//         </button>

//         {children}
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 overflow-x-hidden">
      {/* Sidebar for Desktop */}
      <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {/* Main Content - Add margin on desktop to account for sidebar */}
      <main className="flex-1 flex flex-col overflow-hidden sm:ml-64">
        <div className="flex-1 overflow-y-auto w-full pb-20 sm:pb-0">
          <div className="w-full flex flex-col items-center justify-start py-4 sm:py-6 px-3 sm:px-6">
            {/* Mobile Menu Button */}
            <button
              className="sm:hidden mb-4 bg-purple-600 text-white px-3 py-2 rounded-lg shadow-md self-start"
              onClick={() => setSidebarOpen(true)}
            >
              ☰ Menu
            </button>

            <div className="w-full max-w-5xl mx-auto">
              {children}
            </div>
          </div>
        </div>

        {/* Footer only on desktop */}
        {/* <div className="hidden sm:block">
          <Footer />
        </div> */}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
