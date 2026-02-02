
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateSmartDescription = async (productTitle: string, category: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional B2B wholesale product description for a product titled "${productTitle}" in the "${category}" category. Focus on selling points for retailers, such as quality, margins, and market appeal. Keep it under 100 words.`,
    });
    return response.text || "Could not generate description at this time.";
  } catch (error) {
    console.error("AI Description Error:", error);
    return "Standard professional product description for wholesale distribution.";
  }
};

export const getWholesaleInsights = async (query: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a B2B Wholesale Business Consultant for the platform "WholeX". Answer the following user query professionally: "${query}". Focus on supply chain, bulk ordering benefits, and business growth.`,
    });
    return response.text || "I'm here to help with your wholesale business queries.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Our AI consultant is currently offline. Please contact human support.";
  }
};
