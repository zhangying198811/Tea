import { GoogleGenAI, Type } from "@google/genai";
import { TCMAnalysisResult, TeaAnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to clean and parse JSON from LLM response
const cleanAndParseJSON = (text: string) => {
  try {
    // 1. Remove Markdown code blocks if present (e.g. ```json ... ```)
    let cleanText = text.replace(/```json/g, '').replace(/```/g, '');
    
    // 2. Find the first '{' and the last '}' to isolate the object
    const start = cleanText.indexOf('{');
    const end = cleanText.lastIndexOf('}');

    if (start !== -1 && end !== -1 && end > start) {
      cleanText = cleanText.substring(start, end + 1);
    } else {
      throw new Error("Cannot find JSON object in response");
    }

    // 3. Parse
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("JSON Parsing failed. Raw text:", text);
    throw new Error("AI 数据解析异常，请重试");
  }
};

// Helper to convert file to Base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const identifyTea = async (imageBase64: string, mimeType: string): Promise<TeaAnalysisResult> => {
  const model = "gemini-2.5-flash";
  const validMimeType = mimeType || 'image/jpeg';
  
  const prompt = `
    你是一位国潮风的资深茶艺师。请分析这张茶叶图片。
    
    请返回 JSON 格式（Value为简体中文，字数精简，适合手机阅读）：
    {
      "name": "茶叶名称（6字内）",
      "type": "茶类（如：绿茶、红茶）",
      "origin": "产地（省份+地名）",
      "quality_estimate": "品质（如：特级）",
      "sensory_profile": "感官描述（30字内，描述香气滋味）",
      "brewing_guide": {
        "temp": "水温(数字)",
        "time": "时间",
        "ratio": "茶水比"
      },
      "culture_story": "一句话文化趣闻（40字内）",
      "food_pairing": "一款中式茶点"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: validMimeType, data: imageBase64 } },
          { text: prompt }
        ]
      }
    });

    if (response.text) {
      return cleanAndParseJSON(response.text) as TeaAnalysisResult;
    }
    throw new Error("AI 未返回有效数据");
  } catch (error) {
    console.error("Tea identification failed:", error);
    throw error;
  }
};

export const analyzeConstitution = async (imageBase64: string, mimeType: string, questionnaireSummary: string): Promise<TCMAnalysisResult> => {
  const model = "gemini-2.5-flash";
  const validMimeType = mimeType || 'image/jpeg';

  const prompt = `
    你是一位中医养生专家。根据舌象照片和问卷："${questionnaireSummary}"，进行体质辨识。
    注意：仅供娱乐参考，非医疗诊断。
    
    请返回 JSON 格式（Value为简体中文）：
    {
      "constitution": "体质名称（如：湿热质）",
      "tongue_features": {
        "color": "舌色",
        "coating": "舌苔",
        "shape": "舌形"
      },
      "explanation": "辨证分析（50字内，通俗易懂）",
      "recommended_teas": ["茶饮1", "茶饮2"],
      "avoid_teas": ["忌口茶类"],
      "lifestyle_tip": "一条养生建议（30字内）"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: validMimeType, data: imageBase64 } },
          { text: prompt }
        ]
      }
    });

    if (response.text) {
      return cleanAndParseJSON(response.text) as TCMAnalysisResult;
    }
    throw new Error("AI 未返回有效数据");
  } catch (error) {
    console.error("TCM analysis failed:", error);
    throw error;
  }
};

export const chatWithTeaMaster = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  const model = "gemini-2.5-flash";
  
  const chat = ai.chats.create({
    model: model,
    history: history,
    config: {
      systemInstruction: "你叫‘灵叶’，一位年轻、风趣的国潮茶艺师。回答简练（100字以内），风格雅致，多用比喻。不要使用Markdown，纯文本回复。",
    }
  });

  const result = await chat.sendMessage({ message });
  return result.text || "茶师正在静思...";
};