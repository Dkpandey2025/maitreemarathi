// // src/pages/LessonDetailPage.jsx
// import React from "react";
// import { useParams, Link } from "react-router-dom";

// export default function LessonDetailPage() {
//   const { id } = useParams();

//   return (
//     <div className="min-h-screen bg-orange-50 p-6">
//       <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">
//         <h2 className="text-2xl font-bold text-orange-600 mb-4">
//           Lesson {id} Details
//         </h2>
//         <p className="text-gray-700 mb-6">
//           This lesson will help you learn key Marathi words and phrases. Practice speaking them aloud to improve your fluency.
//         </p>

//         <div className="flex justify-end">
//           <Link
//             to="/home"
//             className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl"
//           >
//             Back to Lessons
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/LessonDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function LessonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-orange-50 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-200"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-orange-600">Lesson {id}</h1>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">
            Full Lesson Content Coming Soon
          </h2>
          <p className="text-gray-700 leading-7">
            This page will show the full Marathi lesson content retrieved from
            backend or static data. Lesson ID:{" "}
            <span className="font-bold text-orange-600">{id}</span>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
