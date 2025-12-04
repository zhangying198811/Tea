export interface TeaAnalysisResult {
  name: string;
  type: string;
  origin: string;
  quality_estimate: string;
  sensory_profile: string; // "Bean aroma", "Orchid fragrance"
  brewing_guide: {
    temp: string;
    time: string;
    ratio: string;
  };
  culture_story: string;
  food_pairing: string;
}

export interface TCMAnalysisResult {
  constitution: string; // e.g., "Damp-Heat", "Qi Deficiency"
  tongue_features: {
    color: string;
    coating: string;
    shape: string;
  };
  explanation: string;
  recommended_teas: string[];
  avoid_teas: string[];
  lifestyle_tip: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppRoute {
  HOME = 'home',
  SCAN_TEA = 'scan_tea',
  HEALTH_ANALYSIS = 'health_analysis',
  KNOWLEDGE_CHAT = 'knowledge_chat',
}
