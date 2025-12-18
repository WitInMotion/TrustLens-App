
import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentResult, ThreatLevel } from "../types";

const SYSTEM_INSTRUCTION = `
You are TrustLens, an AI-powered cybersecurity awareness assistant designed for small businesses.

Your Role:
Help small business owners assess potentially suspicious digital content (emails, messages, invoices, links) by identifying scam indicators in clear, non-technical language. 
You provide guidance and education, not guarantees.

Guidelines:
1. Look for common scam patterns: urgency, payment detail changes, impersonation, unusual sender, generic greetings, suspicious links, "too good to be true".
2. Be calm, professional, and practical. Avoid alarmist language.
3. If uncertain, recommend verification.
4. Output MUST be in JSON format matching the schema.

Important Guardrails:
- Do NOT claim absolute certainty.
- Do NOT state content is definitively malicious.
- Do NOT provide legal or financial advice.
- Always encourage verification through official channels.
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    threatLevel: {
      type: Type.STRING,
      description: "One of: Safe, Suspicious, High Risk",
    },
    reasoning: {
      type: Type.STRING,
      description: "Explanation of the reasoning in simple, plain language.",
    },
    redFlags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List specific indicators found in the content.",
    },
    nextSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-4 practical actions the business owner can take.",
    },
  },
  required: ["threatLevel", "reasoning", "redFlags", "nextSteps"],
};

export const analyzeContent = async (input: { text?: string; imageData?: string; mimeType?: string }): Promise<AssessmentResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const parts: any[] = [];
  if (input.text) {
    parts.push({ text: `Analyze this content: ${input.text}` });
  }
  if (input.imageData && input.mimeType) {
    parts.push({
      inlineData: {
        data: input.imageData,
        mimeType: input.mimeType,
      },
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
  });

  try {
    const result = JSON.parse(response.text);
    return result as AssessmentResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("The analysis could not be completed. Please try again.");
  }
};
