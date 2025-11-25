
import { GoogleGenAI, Chat } from "@google/genai";
import { InstallerProfile } from "../types";
import { generateMatchingSystemInstruction, generateColorParserPrompt, colorParserSchema } from "../utils/promptUtils";

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string,
  profile: InstallerProfile
): Promise<string> => {
  try {
    // Initialize GenAI with process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = generateMatchingSystemInstruction(profile);

    // Create chat session
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm sorry, I couldn't generate a response.";

  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "I'm having trouble connecting to the color database right now. Please try again in a moment.";
  }
};

export const parseColorInput = async (inputText: string): Promise<{ name: string; referenceColorName?: string } | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: generateColorParserPrompt(inputText),
      config: {
        responseMimeType: "application/json",
        responseSchema: colorParserSchema,
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing color input:", error);
    return null;
  }
};
