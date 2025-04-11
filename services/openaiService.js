import axios from "axios"
import { OPENAI_API_KEY } from "@env"

// Constants
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

/**
 * Get the OpenAI API key from .env
 * @returns {string|null} The API key or null if not found
 */
export const getApiKey = () => {
  // Return the API key from .env
  if (OPENAI_API_KEY && OPENAI_API_KEY !== "your_openai_api_key_here") {
    return OPENAI_API_KEY
  }
  console.log(OPENAI_API_KEY) 
  console.error("OpenAI API key not found in environment variables")
  return null
}

/**
 * Check if the app has a valid API key in .env
 * @returns {boolean} Whether a valid API key exists
 */
export const hasValidApiKey = () => {
  const apiKey = getApiKey()
  return !!apiKey
}

/**
 * Send a request to the OpenAI API
 * @param {string} userMessage - The user's message
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @returns {Promise<Object>} The response from the API
 */
export const sendOpenAIRequest = async (userMessage, conversationHistory = []) => {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error("OpenAI API key not configured. Please contact the app administrator.")
  }

  // Format the conversation history for the OpenAI API
  const messages = [
    {
      role: "system",
      content:
        "Luna would be a warm, knowledgeable AI companion built to empower you in all aspects of your personal health. She’d offer empathetic, real-time guidance—whether it’s monitoring stress levels, suggesting self-care ideas, or celebrating daily progress. Friendly and proactive, Luna would check in with helpful reminders (like water intake or cycle updates), serve as a discreet confidant you can turn to with questions, and adapt her insights to match your unique lifestyle. Ultimately, she’d become a thoughtful “ally on your wrist,” encouraging healthier habits and providing motivation when it’s needed most.",
    },
    ...conversationHistory.map((msg) => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: userMessage },
  ]

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4",
        messages,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message)
    throw new Error(
      error.response?.data?.error?.message || "Failed to get a response from OpenAI. Please try again later.",
    )
  }
}

