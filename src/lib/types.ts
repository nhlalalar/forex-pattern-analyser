export type MarketBias = "Bullish" | "Bearish" | "Neutral";
export type ConfidenceLevel = "Low" | "Medium" | "High";
export type PatternStatus = "Candidate" | "Confirmed" | "Invalidated";
export type AnalysisMode = "upload" | "pair";

export interface SupportResistanceZone {
  zone: string;
  reason: string;
}

export interface PatternCandidate {
  pattern: string;
  status: PatternStatus | string;
  explanation: string;
  category: "Reversal" | "Continuation" | "Bilateral";
}

export interface LiquidityZone {
  area: string;
  reason: string;
}

export interface InvalidationArea {
  area: string;
  reason: string;
}

export interface AnalysisResult {
  id: string;
  disclaimer: string;
  marketBias: MarketBias;
  trendDirection: string;
  confidenceLevel: ConfidenceLevel;
  detectedStructures: string[];
  supportZones: SupportResistanceZone[];
  resistanceZones: SupportResistanceZone[];
  patternCandidates: PatternCandidate[];
  liquidityZones: LiquidityZone[];
  invalidationAreas: InvalidationArea[];
  riskRewardObservation: string;
  plainEnglishSummary: string;
  timestamp: string;
  mode: AnalysisMode;
  pair?: string;
  imageUrl?: string;
}

export interface PatternInfo {
  name: string;
  category: "Reversal" | "Continuation" | "Bilateral";
  description: string;
  characteristics: string[];
  whatToWatch: string;
  commonMistakes: string;
  bias: MarketBias | "Depends";
}

export const FOREX_PAIRS = [
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "XAU/USD",
  "AUD/USD",
  "USD/CAD",
  "NZD/USD",
  "EUR/JPY",
  "GBP/JPY",
  "USD/CHF",
  "EUR/GBP",
  "AUD/JPY",
] as const;

export type ForexPair = typeof FOREX_PAIRS[number];
