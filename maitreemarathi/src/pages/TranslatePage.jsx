import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardLayout from "../layout/DashboardLayout";

export default function TranslatePage() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    try {
      // ✅ Using Google Translate unofficial endpoint
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=mr&dt=t&q=${encodeURIComponent(
          inputText
        )}`
      );
      const data = await res.json();
      setTranslatedText(data[0][0][0]);
    } catch (err) {
      setTranslatedText("⚠️ Error translating text. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
    <DashboardLayout>
   
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-50 p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          🗣️ Hindi / English → Marathi Translator
        </h1>

        <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6">
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Type something in Hindi or English..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition-all"
          >
            {loading ? "Translating..." : "Translate"}
          </button>

          {translatedText && (
            <div className="mt-6 bg-orange-50 border border-orange-200 p-4 rounded-xl text-gray-800">
              <h2 className="font-semibold text-orange-700 mb-2">
                Marathi Translation:
              </h2>
              <p className="text-lg">{translatedText}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
    </>
  );
}
