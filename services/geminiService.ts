
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, AnalysisResult, Challenge } from "../types";

// Always use named parameter for apiKey and use the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSubmission = async (
  platform: Platform,
  caption: string,
  image?: string // Base64
): Promise<AnalysisResult> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analyze this ${platform} post for a professional studio marketing challenge.
  Caption: "${caption}"
  Respond in JSON format with scores out of 100 and brief professional feedback.
  Focus on: Visual quality (if image provided), Copywriting (hook, CTA), Strategy (hashtags, platform fit), and predicted Engagement.`;

  // Standardize multimodal request format as per coding guidelines.
  const response = await ai.models.generateContent({
    model,
    contents: image 
      ? { 
          parts: [
            { text: prompt }, 
            { inlineData: { data: image.split(',')[1], mimeType: 'image/jpeg' } }
          ] 
        } 
      : prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER },
          potentialStatus: { type: Type.STRING },
          breakdown: {
            type: Type.OBJECT,
            properties: {
              visuals: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } }, required: ["score", "feedback"] },
              copywriting: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } }, required: ["score", "feedback"] },
              strategy: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } }, required: ["score", "feedback"] },
              engagement: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } }, required: ["score", "feedback"] },
            },
            required: ["visuals", "copywriting", "strategy", "engagement"]
          }
        },
        required: ["overallScore", "potentialStatus", "breakdown"]
      }
    }
  });

  // Directly access text property from GenerateContentResponse.
  return JSON.parse(response.text || "{}");
};

export const generateChallenge = async (specialty: string): Promise<Challenge> => {
  const model = "gemini-3-flash-preview";
  const prompt = `Generate a creative social media marketing challenge for a ${specialty} artist. 
  Pick a platform (Instagram, TikTok, or GBP). 
  Respond with JSON containing title, description, platform, requirements (list), and category.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          platform: { type: Type.STRING },
          requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
          category: { type: Type.STRING }
        },
        required: ["title", "description", "platform", "requirements", "category"]
      }
    }
  });

  // Directly access text property from GenerateContentResponse.
  const raw = JSON.parse(response.text || "{}");
  return {
    ...raw,
    id: Math.random().toString(36).substr(2, 9),
    imageUrl: `https://picsum.photos/seed/${Math.random()}/800/600`
  };
};
