// import React, { useEffect, useState } from "react";

// export default function ReferPage() {
//   const [referralCode, setReferralCode] = useState("");
//   const [referralLink, setReferralLink] = useState("");

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user && user.referralCode) {
//       setReferralCode(user.referralCode);

//       // Create shareable link
//       const link = `${window.location.origin}/register?ref=${user.referralCode}`;
//       setReferralLink(link);
//     }
//   }, []);

//   const copyCode = () => {
//     navigator.clipboard.writeText(referralLink);
//     alert("Referral link copied!");
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold text-orange-600 mb-4">Refer & Earn</h1>

//       <div className="bg-white shadow-md rounded-xl p-5 border">
//         <p className="text-lg font-semibold text-gray-700 mb-2">
//           Your Referral Code:
//         </p>

//         <div className="flex items-center justify-between bg-orange-100 p-3 rounded-lg">
//           <span className="font-bold text-orange-700">{referralCode}</span>

//           <button
//             onClick={() => navigator.clipboard.writeText(referralCode)}
//             className="bg-orange-600 text-white px-3 py-1 rounded-lg"
//           >
//             Copy
//           </button>
//         </div>

//         <p className="text-lg font-semibold text-gray-700 mt-4">
//           Share Referral Link:
//         </p>

//         <div className="flex items-center justify-between bg-orange-100 p-3 rounded-lg mt-2">
//           <span className="text-gray-800 truncate">{referralLink}</span>

//           <button
//             onClick={copyCode}
//             className="bg-orange-600 text-white px-3 py-1 rounded-lg"
//           >
//             Copy Link
//           </button>
//         </div>

//         <button
//           onClick={() =>
//             window.open(
//               `https://wa.me/?text=Join%20Maitree%20Marathi!%20Use%20my%20referral%20link:%20${referralLink}`
//             )
//           }
//           className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
//         >
//           Share on WhatsApp
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../layout/DashboardLayout";

// export default function ReferPage() {
//   const [referralCode, setReferralCode] = useState("");
//   const [referralLink, setReferralLink] = useState("");

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser")); // FIXED

//     console.log("Loaded user from localStorage:", user);

//     if (user && user.referralCode) {
//       setReferralCode(user.referralCode);

//       const link = `${window.location.origin}/register?ref=${user.referralCode}`;
//       setReferralLink(link);
//     }
//   }, []);

//   const copyCode = () => {
//     navigator.clipboard.writeText(referralLink);
//     alert("Referral link copied!");
//   };

//   return (
//     <DashboardLayout>
//       <div className="p-6 max-w-lg mx-auto">
//         <h1 className="text-2xl font-bold text-orange-600 mb-4">
//           Refer & Earn
//         </h1>

//         <div className="bg-white shadow-md rounded-xl p-5 border">
//           <p className="text-lg font-semibold text-gray-700 mb-2">
//             Your Referral Code:
//           </p>

//           <div className="flex items-center justify-between bg-orange-100 p-3 rounded-lg">
//             <span className="font-bold text-orange-700">{referralCode}</span>

//             <button
//               onClick={() => navigator.clipboard.writeText(referralCode)}
//               className="bg-orange-600 text-white px-3 py-1 rounded-lg"
//             >
//               Copy
//             </button>
//           </div>

//           <p className="text-lg font-semibold text-gray-700 mt-4">
//             Share Referral Link:
//           </p>

//           <div className="flex items-center justify-between bg-orange-100 p-3 rounded-lg mt-2">
//             <span className="text-gray-800 truncate">{referralLink}</span>

//             <button
//               onClick={copyCode}
//               className="bg-orange-600 text-white px-3 py-1 rounded-lg"
//             >
//               Copy Link
//             </button>
//           </div>

//           <button
//             onClick={() =>
//               window.open(
//                 `https://wa.me/?text=Join%20Maitree%20Marathi!%20Use%20my%20referral%20link:%20${referralLink}`
//               )
//             }
//             className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
//           >
//             Share on WhatsApp
//           </button>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }


import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function ReferPage() {
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user && user.referralCode) {
      setReferralCode(user.referralCode);

      const link = `${window.location.origin}/register?ref=${user.referralCode}`;
      setReferralLink(link);
    }
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">
          Refer & Earn
        </h1>

        {/* Referral Code Card */}
        <div className="bg-white shadow-md rounded-xl p-5 border">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Your Referral Code:
          </p>

          <div className="flex items-center justify-between bg-orange-100 p-3 rounded-lg">
            <span className="font-bold text-orange-700">{referralCode}</span>

            <button
              onClick={() => navigator.clipboard.writeText(referralCode)}
              className="bg-orange-600 text-white px-3 py-1 rounded-lg"
            >
              Copy
            </button>
          </div>

          <p className="text-lg font-semibold text-gray-700 mt-4">
            Share Referral Link:
          </p>

          <div className="flex items-center justify-between bg-orange-100 p-3 rounded-lg mt-2">
            <span className="text-gray-800 truncate">{referralLink}</span>

            <button
              onClick={copyCode}
              className="bg-orange-600 text-white px-3 py-1 rounded-lg"
            >
              Copy Link
            </button>
          </div>

          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=Join%20Maitree%20Marathi!%20Use%20my%20referral%20link:%20${referralLink}`
              )
            }
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
          >
            Share on WhatsApp
          </button>
        </div>

        {/* कैसे काम करता है section */}
        <div className="bg-white shadow-md rounded-xl p-5 border border-orange-300 mt-6">
          <h2 className="text-xl font-bold text-orange-600 mb-3">
            कैसे काम करता है?
          </h2>

          <ol className="list-decimal pl-6 text-gray-800 space-y-2 leading-relaxed">
            <li>अपना रेफ़रल कोड शेयर करें</li>
            <li>दोस्त आपके कोड से रजिस्टर करें</li>
            <li>वे पेमेंट करने पर आपको ₹101 मिलेंगे</li>
            <li>पैसा तुरंत आपके वॉलेट में आ जाएगा</li>
          </ol>
        </div>
      </div>
    </DashboardLayout>
  );
}
