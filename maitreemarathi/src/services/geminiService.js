import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Use gemini-pro-vision model (available on free tier)
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

// System prompt for Marathi learning
const MARATHI_SYSTEM_PROMPT = `You are an expert Marathi language teacher. Your role is to help users learn Marathi through interactive conversations.

Guidelines:
1. Always respond in a mix of Marathi and English for clarity
2. Provide pronunciation guides using Roman transliteration
3. Explain grammar and sentence structure
4. Correct mistakes gently and provide explanations
5. Ask follow-up questions to reinforce learning
6. Use examples and real-life scenarios
7. Be encouraging and supportive
8. Keep responses concise and easy to understand

When a user asks something:
- If it's a Marathi phrase, explain its meaning, usage, and pronunciation
- If it's a question in English, answer in Marathi with English translation
- If it's a conversation practice, continue the dialogue naturally
- Always provide the Roman transliteration for Marathi words`;

// Initialize chat session
export const startChatSession = () => {
  return model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are a Marathi language teacher. Help me learn Marathi." }],
      },
      {
        role: "model",
        parts: [
          {
            text: "नमस्कार! (Namaste!) I'm your Marathi learning assistant. I'm here to help you learn Marathi through interactive conversations. We can practice:\n\n1. **Vocabulary** - Learn new words and phrases\n2. **Grammar** - Understand sentence structure\n3. **Conversation** - Practice real-life dialogues\n4. **Pronunciation** - Get guidance on correct pronunciation\n\nWhat would you like to learn today? You can ask me anything about Marathi! 😊",
          },
        ],
      },
    ],
  });
};

// Send message to Gemini
export const sendMessage = async (chat, userMessage) => {
  try {
    if (!chat) {
      throw new Error("Chat session not initialized");
    }
    const result = await chat.sendMessage(userMessage);
    const text = result.response.text();
    if (!text) {
      throw new Error("Empty response from AI");
    }
    return text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw new Error(`Failed to get response from AI: ${error.message}`);
  }
};

// Generate practice exercises
export const generatePracticeExercise = async (topic, level) => {
  const prompt = `Generate a Marathi learning exercise for ${level} level students about "${topic}".

Format the response as:
1. **Exercise**: [The exercise/question]
2. **Hint**: [A helpful hint]
3. **Answer**: [The correct answer with explanation]
4. **Pronunciation**: [Roman transliteration]
5. **Usage**: [How to use this in real life]

Make it engaging and educational.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating exercise:", error);
    throw new Error("Failed to generate exercise");
  }
};

// Get vocabulary list
export const getVocabularyList = async (topic, count = 10) => {
  const prompt = `Generate ${count} Marathi vocabulary words related to "${topic}".

Format as JSON array:
[
  {
    "marathi": "word in Marathi",
    "english": "English translation",
    "roman": "Roman transliteration",
    "example": "Example sentence in Marathi",
    "exampleEnglish": "English translation of example"
  }
]

Return only the JSON array, no other text.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Could not parse vocabulary list");
  } catch (error) {
    console.error("Error getting vocabulary:", error);
    throw new Error("Failed to get vocabulary list");
  }
};

// Correct user's Marathi
export const correctMarathi = async (userText) => {
  const prompt = `The user wrote this in Marathi: "${userText}"

Please:
1. Check for grammar and spelling errors
2. Provide the corrected version
3. Explain any mistakes
4. Provide the Roman transliteration
5. Give an English translation

Format your response clearly with sections for each point.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error correcting Marathi:", error);
    throw new Error("Failed to correct text");
  }
};

export default {
  startChatSession,
  sendMessage,
  generatePracticeExercise,
  getVocabularyList,
  correctMarathi,
};
