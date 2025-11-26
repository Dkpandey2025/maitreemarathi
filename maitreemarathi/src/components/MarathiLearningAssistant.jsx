import React, { useState } from "react";
import Groq from "groq-sdk";

export default function MarathiLearningAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize Groq
  const client = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const prompt = `
      You are a Marathi learning assistant.
      Help the user understand Marathi words, grammar, and conversation practice.
      Always provide examples in Marathi with English explanations.
      Keep responses friendly and educational.

      User: ${input}
      `;

      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1024,
      });

      const aiText = response.choices[0]?.message?.content || "No response";

      const aiMessage = { sender: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error connecting to AI. Please try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        🇮🇳 Learn Marathi with AI (Groq - Llama 3.3)
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 max-h-[60vh] space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl text-sm whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-purple-600 text-white self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 italic">Thinking in Marathi...</div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something about Marathi..."
            className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
