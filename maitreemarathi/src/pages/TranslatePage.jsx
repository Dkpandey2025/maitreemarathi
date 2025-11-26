import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { Mic, MicOff } from "lucide-react";

export default function TranslatePage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("auto"); // Auto-detect source language
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Map language codes to speech recognition language codes
  const getSpeechLangCode = (langCode) => {
    const langMap = {
      'auto': 'hi-IN', // Default to Hindi for auto
      'en': 'en-IN',
      'hi': 'hi-IN',
      'gu': 'gu-IN',
      'ta': 'ta-IN',
      'kn': 'kn-IN',
      'te': 'te-IN',
      'bn': 'bn-IN',
    };
    return langMap[langCode] || 'hi-IN';
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        alert('Error with speech recognition. Please try again.');
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Update speech recognition language when source language changes
  useEffect(() => {
    if (recognition) {
      recognition.lang = getSpeechLangCode(sourceLanguage);
    }
  }, [sourceLanguage, recognition]);

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    try {
      // ✅ Using Google Translate unofficial endpoint - Always translate TO Marathi
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=mr&dt=t&q=${encodeURIComponent(
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

  const sourceLanguages = [
    { code: "auto", name: "Auto-Detect", flag: "🌐", speechLang: "hi-IN" },
    { code: "en", name: "English", flag: "🇬🇧", speechLang: "en-IN" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", speechLang: "hi-IN" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳", speechLang: "gu-IN" },
    { code: "ta", name: "Tamil", flag: "🇮🇳", speechLang: "ta-IN" },
    { code: "kn", name: "Kannada", flag: "🇮🇳", speechLang: "kn-IN" },
    { code: "te", name: "Telugu", flag: "🇮🇳", speechLang: "te-IN" },
    { code: "bn", name: "Bengali", flag: "🇮🇳", speechLang: "bn-IN" },
  ];

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-6 text-center">
            🗣️ Translate to Marathi
          </h1>

          <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6">
            {/* Source Language Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Translate from:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sourceLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setSourceLanguage(lang.code)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      sourceLanguage === lang.code
                        ? "border-purple-600 bg-purple-50 text-purple-700 font-semibold"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <span className="text-xl mr-1">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Language Display */}
            <div className="mb-4 p-3 bg-purple-50 border-2 border-purple-200 rounded-lg">
              <label className="block text-gray-700 font-semibold mb-1">
                Translate to:
              </label>
              <div className="flex items-center gap-2 text-purple-700 font-semibold">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-lg">Marathi (मराठी)</span>
              </div>
            </div>

            {/* Input Area with Voice Button */}
            <div className="relative">
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Type or speak something in any language..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute bottom-3 right-3 p-3 rounded-full transition-all ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white shadow-lg`}
                aria-label={isListening ? "Stop recording" : "Start voice input"}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            </div>

            {isListening && (
              <p className="text-sm text-red-600 mt-2 text-center animate-pulse">
                🎤 Listening in {sourceLanguages.find(l => l.code === sourceLanguage)?.name}... Speak now
              </p>
            )}

            <button
              onClick={handleTranslate}
              disabled={loading}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all disabled:bg-gray-400"
            >
              {loading ? "Translating..." : "Translate"}
            </button>

            {translatedText && (
              <div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-xl text-gray-800">
                <h2 className="font-semibold text-purple-700 mb-2">
                  Marathi Translation (मराठी अनुवाद):
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
