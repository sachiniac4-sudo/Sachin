import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSecurePassword = async (): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a single, highly secure password that is at least 16 characters long. It should include uppercase letters, lowercase letters, numbers, and special symbols. It should be random but pronounceable if possible to make it memorable. Return ONLY the password string, no markdown, no explanation.",
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating password:", error);
    return "Error-Generating-Password-123!";
  }
};

export const getSecurityAdvice = async (topic: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a cybersecurity expert. Provide a concise, 2-sentence tip about: "${topic}". Focus on best practices and risk mitigation.`,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Unable to retrieve security advice at this time.";
  }
};

export const explainHashing = async (): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Explain the concept of SHA-256 hashing to a non-technical user in under 50 words. Use an analogy.",
    });
    return response.text.trim();
  } catch (error) {
    return "Hashing transforms your data into a unique string of characters. It works like a digital fingerprint; you can't recreate the original fingerprint from the print alone.";
  }
};