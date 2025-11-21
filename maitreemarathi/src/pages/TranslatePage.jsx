import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { ArrowLeft } from "lucide-react";

export default function TranslatePage() {
  const navigate = useNavigate();
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
    <DashboardLayout>
      <div className="w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-purple-50 transition-all mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
        </button>

        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-6 text-center">
            🗣️ Hindi / English → Marathi Translator
          </h1>

          <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6">
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Type something in Hindi or English..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <button
              onClick={handleTranslate}
              disabled={loading}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition-all"
            >
              {loading ? "Translating..." : "Translate"}
            </button>

            {translatedText && (
              <div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-xl text-gray-800">
                <h2 className="font-semibold text-purple-700 mb-2">
                  Marathi Translation:
                </h2>
                <p className="text-lg">{translatedText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
