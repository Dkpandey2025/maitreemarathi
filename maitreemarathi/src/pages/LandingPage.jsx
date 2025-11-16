import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  MessageSquare,
  Lightbulb,
  Users,
  Phone,
  Languages,
} from "lucide-react";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-br from-orange-500 to-yellow-400 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-white/20 p-2 rounded-full">
            <BookOpen className="w-6 h-6" />
          </span>
          <h1 className="text-4xl font-bold tracking-wide">Maitree Marathi</h1>
        </div>
        <h3 className="text-2xl font-semibold mb-2">नमस्कार! 🙏</h3>
        <p className="text-lg max-w-xl mb-6">
          आज मराठी शिकण्यास सुरुवात करूया! <br />
          <span className="text-white/80">(आज मराठी सीखना शुरू करें)</span>
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-orange-700 font-semibold px-6 py-3 rounded-xl hover:bg-orange-800 transition"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Quick Call Section */}
      <section className="container mx-auto px-6 mt-10">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Call</h4>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              alert("Calling our helpline...");
              window.location.href = "tel:+918987562984";
            }}
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-medium py-4 rounded-xl shadow hover:opacity-90 transition"
          >
            <Phone className="inline-block mr-2 w-5 h-5" />
            हेल्पलाइन
          </button>
          <button
            onClick={() => window.open("https://wa.me/918987562984", "_blank")}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium py-4 rounded-xl shadow hover:opacity-90 transition"
          >
            <MessageSquare className="inline-block mr-2 w-5 h-5" />
            चैट सहायता
          </button>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-6 mt-12 flex-grow">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          मुख्य विकल्प
        </h4>
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Learn Marathi */}
          <FeatureCard
            color="from-purple-500 to-indigo-500"
            icon={<BookOpen className="w-6 h-6" />}
            title="मराठी सीखें"
            desc="पाठ, व्याकरण और शब्दावली सीखें"
            link="/learn"
          />

          {/* Translate */}
          <FeatureCard
            color="from-blue-500 to-cyan-500"
            icon={<Languages className="w-6 h-6" />}
            title="Translate"
            desc="हिंदी से मराठी या किसी भी भाषा में अनुवाद"
            link="/translate"
          />

          {/* AI Learning */}
          <FeatureCard
            color="from-green-500 to-emerald-500"
            icon={<Lightbulb className="w-6 h-6" />}
            title="AI से सीखें"
            desc="AI के साथ संवादात्मक अभ्यास"
            link="/learn-marathi"
          />

          {/* Refer & Earn */}
          <FeatureCard
            color="from-orange-500 to-red-500"
            icon={<Users className="w-6 h-6" />}
            title="Refer & Earn"
            desc="दोस्तों को आमंत्रित करें और इनाम पाएं"
            link="/refer"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}

function FeatureCard({ color, icon, title, desc, link }) {
  return (
    <Link
      to={link}
      className={`flex items-center justify-between p-5 rounded-2xl text-white shadow-md hover:shadow-lg transition bg-gradient-to-r ${color}`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-xl">{icon}</div>
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-sm text-white/90">{desc}</p>
        </div>
      </div>
      <span className="text-white/70 text-2xl font-bold">›</span>
    </Link>
  );
}
