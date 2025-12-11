// // import React from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   BookOpen,
// //   MessageSquare,
// //   Lightbulb,
// //   Users,
// //   Phone,
// //   Languages,
// // } from "lucide-react";
// // import Footer from "../components/Footer";

// // export default function LandingPage() {
// //   return (
// //     <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
// //       {/* Hero Section */}
// //       <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-br from-purple-600 to-purple-500 text-white">
// //         <div className="flex items-center gap-3 mb-3">
// //           <span className="bg-white/20 p-2 rounded-full">
// //             <BookOpen className="w-6 h-6" />
// //           </span>
// //           <h1 className="text-4xl font-bold tracking-wide">Maitree Marathi</h1>
// //         </div>
// //         <h3 className="text-2xl font-semibold mb-2">नमस्कार! 🙏</h3>
// //         <p className="text-lg max-w-xl mb-6">
// //           आज मराठी शिकण्यास सुरुवात करूया! <br />
// //           <span className="text-white/80">(आज मराठी सीखना शुरू करें)</span>
// //         </p>
// //         <div className="space-x-4">
// //           <Link
// //             to="/login"
// //             className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition"
// //           >
// //             Login
// //           </Link>
// //           <Link
// //             to="/register"
// //             className="bg-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-800 transition"
// //           >
// //             Register
// //           </Link>
// //         </div>
// //       </section>

// //       {/* Quick Call Section */}
// //       <section className="container mx-auto px-6 mt-10">
// //         <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Call</h4>
// //         <div className="grid grid-cols-2 gap-4">
// //           <button
// //             onClick={() => {
// //               alert("Calling our helpline...");
// //               window.location.href = "tel:+918987562984";
// //             }}
// //             className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium py-4 rounded-xl shadow hover:opacity-90 transition"
// //           >
// //             <Phone className="inline-block mr-2 w-5 h-5" />
// //             हेल्पलाइन
// //           </button>
// //           <button
// //             onClick={() => window.open("https://wa.me/918987562984", "_blank")}
// //             className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium py-4 rounded-xl shadow hover:opacity-90 transition"
// //           >
// //             <MessageSquare className="inline-block mr-2 w-5 h-5" />
// //             चैट सहायता
// //           </button>
// //         </div>
// //       </section>

// //       {/* Main Features */}
// //       <section className="container mx-auto px-6 mt-12 flex-grow">
// //         <h4 className="text-lg font-semibold text-gray-800 mb-4">
// //           मुख्य विकल्प
// //         </h4>
// //         <div className="grid sm:grid-cols-2 gap-5">
// //           {/* Learn Marathi */}
// //           <FeatureCard
// //             color="from-purple-600 to-purple-700"
// //             icon={<BookOpen className="w-6 h-6" />}
// //             title="मराठी सीखें"
// //             desc="पाठ, व्याकरण और शब्दावली सीखें"
// //             link="/learn"
// //           />

// //           {/* Translate */}
// //           <FeatureCard
// //             color="from-blue-500 to-cyan-500"
// //             icon={<Languages className="w-6 h-6" />}
// //             title="Translate"
// //             desc="हिंदी से मराठी या किसी भी भाषा में अनुवाद"
// //             link="/translate"
// //           />

// //           {/* AI Learning */}
// //           <FeatureCard
// //             color="from-green-500 to-emerald-500"
// //             icon={<Lightbulb className="w-6 h-6" />}
// //             title="AI से सीखें"
// //             desc="AI के साथ संवादात्मक अभ्यास"
// //             link="/learn-marathi"
// //           />

// //           {/* Refer & Earn */}
// //           <FeatureCard
// //             color="from-purple-500 to-purple-600"
// //             icon={<Users className="w-6 h-6" />}
// //             title="Refer & Earn"
// //             desc="दोस्तों को आमंत्रित करें और इनाम पाएं"
// //             link="/refer"
// //           />
// //         </div>
// //       </section>
// //       <Footer />
// //     </div>
// //   );
// // }

// // function FeatureCard({ color, icon, title, desc, link }) {
// //   return (
// //     <Link
// //       to={link}
// //       className={`flex items-center justify-between p-5 rounded-2xl text-white shadow-md hover:shadow-lg transition bg-gradient-to-r ${color}`}
// //     >
// //       <div className="flex items-center gap-4">
// //         <div className="bg-white/20 p-3 rounded-xl">{icon}</div>
// //         <div>
// //           <h4 className="font-semibold text-lg">{title}</h4>
// //           <p className="text-sm text-white/90">{desc}</p>
// //         </div>
// //       </div>
// //       <span className="text-white/70 text-2xl font-bold">›</span>
// //     </Link>
// //   );
// // }

// import React, { useState } from "react";
// import {
//   BookOpen,
//   Languages,
//   MessageSquare,
//   Zap,
//   Star,
//   Sparkles,
//   Users,
//   Menu,
//   X,
//   ArrowRight,
// } from "lucide-react";
// import Footer from "../components/Footer";

// export default function LandingPage() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       {/* NAVBAR */}
//       <header className="sticky top-0 bg-white/70 backdrop-blur-lg z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-gradient-to-br from-orange-500 to-green-600 p-2 rounded-xl text-white shadow">
//               <BookOpen className="w-7 h-7" />
//             </div>
//             <h2 className="text-2xl font-bold">Maitree Marathi</h2>
//           </div>

//           <button
//             onClick={() => setOpen(!open)}
//             className="md:hidden text-gray-700"
//           >
//             {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>

//           <div className="hidden md:flex gap-6 items-center font-medium">
//             <span className="hover:text-orange-600 cursor-pointer">होम</span>
//             <span className="hover:text-orange-600 cursor-pointer">कोर्स</span>
//             <span className="hover:text-orange-600 cursor-pointer">
//               AI लर्निंग
//             </span>
//             <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-lg transition">
//               लॉगिन
//             </button>
//           </div>
//         </div>

//         {open && (
//           <div className="md:hidden px-6 pb-4 space-y-3 text-lg font-medium">
//             <span className="block">होम</span>
//             <span className="block">कोर्स</span>
//             <span className="block">AI लर्निंग</span>
//             <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg shadow">
//               लॉगिन
//             </button>
//           </div>
//         )}
//       </header>

//       {/* HERO SECTION */}
//       <section className="max-w-7xl mx-auto px-6 pt-28 pb-32 text-center relative">

//         <div className="absolute inset-0 bg-gradient-to-b from-orange-50/60 to-green-50/40 -z-10"></div>

//         <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-semibold text-sm shadow-sm">
//           <Sparkles className="w-4 h-4" /> भारत का सबसे आसान और तेज़ मराठी सीखने का प्लेटफ़ॉर्म
//         </span>

//         <h1 className="text-6xl md:text-7xl font-extrabold mt-8 leading-tight text-gray-900">
//           मराठी भाषा{" "}
//           <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
//             आसानी से सीखें
//           </span>
//         </h1>

//         <p className="mt-6 text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
//           AI-संचालित लेसन, बातचीत आधारित अभ्यास, स्पष्ट उच्चारण, और वास्तविक जीवन के 
//           उदाहरण—सब कुछ एक ही प्लेटफ़ॉर्म पर।
//         </p>

//         <button className="mt-10 bg-gradient-to-r from-orange-500 to-green-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto">
//           अभी शुरुआत करें <ArrowRight className="w-6 h-6" />
//         </button>

//         <div className="mt-20 flex justify-center flex-wrap gap-16">

//           <div className="flex flex-col items-center">
//             <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center shadow-md">
//               <BookOpen className="w-10 h-10 text-orange-600" />
//             </div>
//             <p className="mt-4 text-lg font-medium text-gray-700">पाठ आधारित सीखना</p>
//           </div>

//           <div className="flex flex-col items-center">
//             <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center shadow-md">
//               <Zap className="w-10 h-10 text-green-600" />
//             </div>
//             <p className="mt-4 text-lg font-medium text-gray-700">तेज़ प्रभावी तरीका</p>
//           </div>

//           <div className="flex flex-col items-center">
//             <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center shadow-md">
//               <Star className="w-10 h-10 text-blue-600" />
//             </div>
//             <p className="mt-4 text-lg font-medium text-gray-700">AI मार्गदर्शन</p>
//           </div>
//         </div>

//         <svg
//           className="absolute bottom-0 left-0 w-full"
//           viewBox="0 0 1440 100"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill="#FFFFFF"
//             d="M0,0 C300,120 1140,0 1440,120 L1440,00 L0,0 Z"
//           ></path>
//         </svg>

//       </section>

//       {/* WHY CHOOSE US */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <h2 className="text-4xl font-bold text-center mb-14">
//           हमें क्यों चुनें?
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

//           <FeatureCard
//             icon={<Sparkles className="w-8 h-8 text-orange-600" />}
//             bg="bg-orange-50"
//             title="आधुनिक पाठ्यक्रम"
//             desc="व्याकरण, शब्दावली, उच्चारण और वाक्य निर्माण को आसान तरीके से सीखें।"
//           />

//           <FeatureCard
//             icon={<Zap className="w-8 h-8 text-green-600" />}
//             bg="bg-green-50"
//             title="तेज़ सीखने की तकनीक"
//             desc="तेजी से, प्रभावी तरीके से और मज़ेदार तरीके से सीखें।"
//           />

//           <FeatureCard
//             icon={<Star className="w-8 h-8 text-blue-600" />}
//             bg="bg-blue-50"
//             title="AI व्यक्तिगत प्रशिक्षक"
//             desc="आपके स्तर के अनुसार AI गाइडेंस और फीडबैक प्राप्त करें।"
//           />
//         </div>
//       </section>

//       {/* ADVANCED FEATURES */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

//           <AdvCard
//             icon={<Languages className="w-9 h-9 text-purple-600" />}
//             title="स्मार्ट ट्रांसलेटर"
//             desc="हिंदी ↔ मराठी तुरंत और सटीक अनुवाद करें।"
//           />

//           <AdvCard
//             icon={<Users className="w-9 h-9 text-teal-600" />}
//             title="शुरुआती से विशेषज्ञ तक"
//             desc="एक ही जगह पर सभी स्तरों के लिए सामग्री उपलब्ध।"
//           />

//           <AdvCard
//             icon={<MessageSquare className="w-9 h-9 text-pink-600" />}
//             title="संवाद आधारित अभ्यास"
//             desc="AI के साथ वास्तविक बातचीत जैसा अभ्यास करें।"
//           />
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="mt-20 bg-gradient-to-r from-orange-600 to-green-600 py-16 text-white text-center px-6">
//         <h2 className="text-4xl font-extrabold mb-4">
//           क्या आप मराठी सीखने के लिए तैयार हैं?
//         </h2>
//         <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
//           हज़ारों छात्र पहले ही हमारी मदद से मराठी सीख रहे हैं — आप भी आज शुरू करें!
//         </p>

//         <button className="bg-white text-orange-700 px-10 py-4 rounded-xl shadow-lg text-lg font-bold hover:bg-gray-100 transition flex items-center gap-2 mx-auto">
//           सीखना शुरू करें <ArrowRight className="w-5 h-5" />
//         </button>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// /* FEATURE CARD */
// function FeatureCard({ icon, bg, title, desc }) {
//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-8 border hover:shadow-xl transition">
//       <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mb-6`}>
//         {icon}
//       </div>
//       <h3 className="text-2xl font-bold mb-3">{title}</h3>
//       <p className="text-gray-600">{desc}</p>
//     </div>
//   );
// }

// /* ADVANCED CARD */
// function AdvCard({ icon, title, desc }) {
//   return (
//     <div className="bg-white border rounded-2xl p-8 shadow hover:shadow-lg transition text-center">
//       <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
//         {icon}
//       </div>
//       <h3 className="text-xl font-semibold mb-3">{title}</h3>
//       <p className="text-gray-600">{desc}</p>
//     </div>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Languages,
  MessageSquare,
  Zap,
  Star,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-28 pb-20 sm:pb-32 text-center relative">

        {/* Soft Purple Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 to-purple-100/40 -z-10"></div>

        {/* Tag */}
        <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-sm shadow-sm">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> भारत का सबसे आसान मराठी सीखने का प्लेटफ़ॉर्म
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mt-6 sm:mt-8 leading-tight text-gray-900">
          मराठी भाषा{" "}
          <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            आसानी से सीखें
          </span>
        </h1>

        {/* Sub Text */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
          AI-संचालित लेसन, बातचीत आधारित अभ्यास, स्पष्ट उच्चारण, और वास्तविक जीवन के उदाहरण — 
          हर स्तर के लिए आसान और असरदार मराठी सीखने का तरीका।
        </p>

        {/* CTA Button */}
        <button className="mt-8 sm:mt-10 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 sm:gap-3 mx-auto">
          अभी शुरुआत करें <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 3 Feature Icons */}
        <div className="mt-12 sm:mt-20 flex justify-center flex-wrap gap-6 sm:gap-12 md:gap-16">

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-purple-100 flex items-center justify-center shadow-md">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
            </div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-700">तेज़ प्रभावी तरीका</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-purple-100 flex items-center justify-center shadow-md">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
            </div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-700">AI मार्गदर्शन</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-purple-100 flex items-center justify-center shadow-md">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
            </div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-700">Skills के साथ साथ कमाई</p>
          </div>

        </div>

        {/* Wave Divider */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M0,0 C300,120 1140,0 1440,120 L1440,00 L0,0 Z"
          ></path>
        </svg>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-14 text-purple-700">
          हमें क्यों चुनें?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">

          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-purple-600" />}
            bg="bg-purple-50"
            title="आधुनिक पाठ्यक्रम"
            desc="व्याकरण, शब्दावली, उच्चारण और वाक्य निर्माण को आसान तरीके से सीखें।"
          />

          <FeatureCard
            icon={<Zap className="w-8 h-8 text-purple-600" />}
            bg="bg-purple-50"
            title="तेज़ सीखने की तकनीक"
            desc="तेजी से, प्रभावी तरीके से और मज़ेदार तरीके से सीखें।"
          />

          <FeatureCard
            icon={<Star className="w-8 h-8 text-purple-600" />}
            bg="bg-purple-50"
            title="AI व्यक्तिगत प्रशिक्षक"
            desc="आपके स्तर के अनुसार AI गाइडेंस और फीडबैक प्राप्त करें।"
          />
        </div>
      </section>

      {/* ADVANCED FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">

          <AdvCard
            icon={<Languages className="w-9 h-9 text-purple-600" />}
            title="स्मार्ट ट्रांसलेटर"
            desc="हिंदी ↔ मराठी तुरंत और सटीक अनुवाद करें।"
          />

          <AdvCard
            icon={<Users className="w-9 h-9 text-purple-600" />}
            title="शुरुआती से विशेषज्ञ तक"
            desc="एक ही जगह पर सभी स्तरों के लिए सामग्री उपलब्ध।"
          />

          <AdvCard
            icon={<MessageSquare className="w-9 h-9 text-purple-600" />}
            title="संवाद आधारित अभ्यास"
            desc="AI के साथ वास्तविक बातचीत जैसा अभ्यास करें।"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 sm:mt-20 bg-gradient-to-r from-purple-700 to-purple-600 py-12 sm:py-16 text-white text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
          क्या आप मराठी सीखने के लिए तैयार हैं?
        </h2>
        <p className="text-base sm:text-lg opacity-90 max-w-xl mx-auto mb-6 sm:mb-8">
          हज़ारों छात्र पहले ही हमारी मदद से मराठी सीख रहे हैं — आप भी आज से शुरुआत कर सकते हैं!
        </p>

        <button className="bg-white text-purple-700 px-8 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg text-base sm:text-lg font-bold hover:bg-purple-50 transition flex items-center gap-2 mx-auto">
          <Link to="/register" >सीखना शुरू करें </Link> <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </section>

      <Footer />
    </div>
    </>
  );
}

/* FEATURE CARD */
function FeatureCard({ icon, bg, title, desc }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 border hover:shadow-xl transition">
      <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

/* ADVANCED CARD */
function AdvCard({ icon, title, desc }) {
  return (
    <div className="bg-white border rounded-2xl p-8 shadow hover:shadow-lg transition text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-purple-50 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
