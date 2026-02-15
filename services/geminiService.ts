
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationResult } from "../types";

/**
 * Generates high-converting Shopify product copy using Gemini.
 * Uses gemini-3-pro-preview for complex marketing reasoning.
 */
export const generateProductCopy = async (
  productUrl: string,
  language: string,
  tone: string
): Promise<GenerationResult> => {
  // Initialize the GoogleGenAI client directly with the process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a Senior Shopify Conversion Copywriter, SEO Strategist, and Direct Response Marketer.
    Your goal is to transform the provided Shopify product context (from URL or description) into a high-converting sales asset.
    
    Adhere to this copy framework:
    1. Hook Headline: Grab attention immediately.
    2. Emotional Benefit Intro: Connect with the customer's pain or desire.
    3. Feature -> Benefit Bullets: Translate specs into value.
    4. Objection Handling: Address common doubts.
    5. Urgency CTA: Drive immediate action.

    Writing Style: Clear, persuasive, specific, benefit-driven, and punchy. No generic AI fluff.
  `;

  const prompt = `
    Analyze and generate optimized copy for the following Shopify Product URL: ${productUrl}
    Target Language: ${language}
    Tone of Voice: ${tone}

    Please return the result strictly as a JSON object matching the defined schema.
  `;

  try {
    const response = await ai.models.generateContent({
      // Complex reasoning task requires the Pro model.
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            description: { type: Type.STRING },
            bullet_points: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            seo_title: { type: Type.STRING },
            meta_description: { type: Type.STRING },
            cta_line: { type: Type.STRING }
          },
          required: ["headline", "description", "bullet_points", "seo_title", "meta_description", "cta_line"]
        }
      }
    });

    // Extract text directly from the property (not a method).
    const resultText = response.text;
    if (!resultText) {
      throw new Error("The AI model returned an empty response.");
    }
    
    return JSON.parse(resultText.trim()) as GenerationResult;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
