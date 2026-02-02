
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    // Attempt to get the API key from process.env, with a fallback
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
  } catch (e) {
    return '';
  }
};

const getAI = () => {
  const apiKey = getApiKey();
  return new GoogleGenAI({ apiKey });
};

export const generateSmartDescription = async (productTitle: string, category: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional B2B wholesale product description for a product titled "${productTitle}" in the "${category}" category. Focus on selling points for retailers, such as quality, margins, and market appeal. Keep it under 100 words.`,
    });
    return response.text || "Professional product description for wholesale distribution.";
  } catch (error) {
    console.error("AI Description Error:", error);
    return "High-quality wholesale product available for bulk purchase. Contact us for detailed specifications and volume pricing.";
  }
};

export const getWholesaleInsights = async (query: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a B2B Wholesale Business Consultant for the platform "WholeX". Answer the following user query professionally: "${query}". Focus on supply chain, bulk ordering benefits, and business growth.`,
    });
    return response.text || "I'm here to help with your wholesale business queries.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Our AI consultant is currently experiencing high traffic. Please try again later or contact our support team.";
  }
};
