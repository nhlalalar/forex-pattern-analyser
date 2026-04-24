export type MarketBias = "Bullish" | "Bearish" | "Neutral";
export type ConfidenceLevel = "Low" | "Medium" | "High";
export type PatternStatus = "Candidate" | "Confirmed" | "Invalidated";
export type AnalysisMode = "upload" | "pair";
export type SignalDirection = "BUY" | "SELL" | "WAIT";
export type SessionName = "Sydney" | "Tokyo" | "London" | "New York";

export interface SupportResistanceZone {
  zone: string;
  reason: string;
  priceLevel?: string;
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

export interface TradeLevels {
  direction: SignalDirection;
  biasStrength: "Strong" | "Moderate" | "Weak";
  entryZone: string;
  entryNote: string;
  stopLoss: string;
  stopLossNote: string;
  takeProfitOne: string;
  takeProfitOneNote: string;
  takeProfitTwo: string;
  takeProfitTwoNote: string;
  takeProfitThree?: string;
  takeProfitThreeNote?: string;
  riskReward: string;
  pipDistance: string;
  sessionAdvice: string;
}

export interface TradingSession {
  name: SessionName;
  openUTC: number;
  closeUTC: number;
  bestPairs: string[];
  description: string;
  color: string;
}

export interface HistoricalLevel {
  price: string;
  label: string;
  type: "Support" | "Resistance" | "Key Level" | "Psychological";
  significance: "High" | "Medium" | "Low";
}

export interface PairProfile {
  pair: string;
  avgDailyRangePips: number;
  character: string;
  bestSessions: SessionName[];
  historicalLevels: HistoricalLevel[];
  volatility: "High" | "Medium" | "Low";
  spreadNote: string;
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
  tradeSetup: TradeLevels;
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
  "USD/JPY",
  "GBP/USD",
  "AUD/USD",
  "USD/CAD",
  "USD/CHF",
  "GBP/JPY",
  "EUR/JPY",
] as const;

export type ForexPair = typeof FOREX_PAIRS[number];

export const TRADING_SESSIONS: TradingSession[] = [
  {
    name: "Sydney",
    openUTC: 22,
    closeUTC: 7,
    bestPairs: ["AUD/USD", "USD/JPY", "EUR/JPY"],
    description: "Low volatility session. Thin liquidity. Avoid major entries unless continuation from NY.",
    color: "blue",
  },
  {
    name: "Tokyo",
    openUTC: 0,
    closeUTC: 9,
    bestPairs: ["USD/JPY", "EUR/JPY", "GBP/JPY", "AUD/USD"],
    description: "JPY pairs most active. Range-bound conditions common. Good for scalping JPY pairs.",
    color: "purple",
  },
  {
    name: "London",
    openUTC: 8,
    closeUTC: 17,
    bestPairs: ["EUR/USD", "GBP/USD", "USD/CHF", "EUR/JPY", "GBP/JPY"],
    description: "Highest volatility session. Most breakouts and trends form here. Best for trend trading.",
    color: "amber",
  },
  {
    name: "New York",
    openUTC: 13,
    closeUTC: 22,
    bestPairs: ["EUR/USD", "GBP/USD", "USD/CAD", "AUD/USD", "USD/CHF"],
    description: "Second most active session. Strong moves during US economic releases. London/NY overlap (13:00–17:00 UTC) is the most volatile window of the day.",
    color: "emerald",
  },
];

export const PAIR_PROFILES: Record<string, PairProfile> = {
  "EUR/USD": {
    pair: "EUR/USD",
    avgDailyRangePips: 80,
    character: "The most liquid pair in the world. Trends well during London and NY sessions. Highly sensitive to ECB and Fed policy decisions.",
    bestSessions: ["London", "New York"],
    volatility: "Medium",
    spreadNote: "Very tight spreads. Suitable for all styles.",
    historicalLevels: [
      { price: "1.1200", label: "Major Resistance", type: "Resistance", significance: "High" },
      { price: "1.1000", label: "Psychological Level", type: "Psychological", significance: "High" },
      { price: "1.0800", label: "Key Support Zone", type: "Support", significance: "High" },
      { price: "1.0600", label: "Multi-Year Support", type: "Support", significance: "High" },
      { price: "1.0500", label: "Psychological Level", type: "Psychological", significance: "Medium" },
    ],
  },
  "USD/JPY": {
    pair: "USD/JPY",
    avgDailyRangePips: 75,
    character: "Highly sensitive to US Treasury yields and risk sentiment. Tends to trend strongly. Favoured by institutional traders.",
    bestSessions: ["Tokyo", "New York"],
    volatility: "Medium",
    spreadNote: "Very tight spreads. Good liquidity at all sessions.",
    historicalLevels: [
      { price: "155.00", label: "Psychological Resistance", type: "Psychological", significance: "High" },
      { price: "152.00", label: "Key Resistance", type: "Resistance", significance: "High" },
      { price: "150.00", label: "Psychological Level", type: "Psychological", significance: "High" },
      { price: "148.00", label: "Key Support", type: "Support", significance: "Medium" },
      { price: "145.00", label: "Major Support Zone", type: "Support", significance: "High" },
    ],
  },
  "GBP/USD": {
    pair: "GBP/USD",
    avgDailyRangePips: 100,
    character: "High volatility pair. Reacts strongly to UK economic data and BOE decisions. Can produce large erratic moves.",
    bestSessions: ["London", "New York"],
    volatility: "High",
    spreadNote: "Moderate spreads. Wider during off-hours.",
    historicalLevels: [
      { price: "1.3200", label: "Key Resistance", type: "Resistance", significance: "High" },
      { price: "1.3000", label: "Psychological Level", type: "Psychological", significance: "High" },
      { price: "1.2800", label: "Key Support Zone", type: "Support", significance: "High" },
      { price: "1.2600", label: "Major Support", type: "Support", significance: "High" },
      { price: "1.2400", label: "Multi-Year Support", type: "Support", significance: "Medium" },
    ],
  },
  "AUD/USD": {
    pair: "AUD/USD",
    avgDailyRangePips: 65,
    character: "Commodity-linked currency. Correlates with iron ore and gold prices. Risk-on/risk-off pair — rises when markets are optimistic.",
    bestSessions: ["Sydney", "London"],
    volatility: "Medium",
    spreadNote: "Reasonable spreads. More active during Asian session.",
    historicalLevels: [
      { price: "0.6800", label: "Key Resistance", type: "Resistance", significance: "High" },
      { price: "0.6600", label: "Psychological Level", type: "Psychological", significance: "High" },
      { price: "0.6400", label: "Key Support", type: "Support", significance: "High" },
      { price: "0.6200", label: "Major Support", type: "Support", significance: "High" },
      { price: "0.6000", label: "Psychological Level", type: "Psychological", significance: "Medium" },
    ],
  },
  "USD/CAD": {
    pair: "USD/CAD",
    avgDailyRangePips: 70,
    character: "Inversely correlated with oil prices. Moves sharply on Canadian jobs data and BOC decisions. NY session is most active.",
    bestSessions: ["New York"],
    volatility: "Medium",
    spreadNote: "Moderate spreads. Most liquid during NY hours.",
    historicalLevels: [
      { price: "1.4000", label: "Psychological Resistance", type: "Psychological", significance: "High" },
      { price: "1.3800", label: "Key Resistance", type: "Resistance", significance: "High" },
      { price: "1.3600", label: "Key Support Zone", type: "Support", significance: "High" },
      { price: "1.3400", label: "Major Support", type: "Support", significance: "High" },
      { price: "1.3200", label: "Long-Term Support", type: "Support", significance: "Medium" },
    ],
  },
  "USD/CHF": {
    pair: "USD/CHF",
    avgDailyRangePips: 65,
    character: "Safe-haven pair. CHF strengthens during global uncertainty. Inversely correlated with EUR/USD. Active during London session.",
    bestSessions: ["London", "New York"],
    volatility: "Low",
    spreadNote: "Moderate spreads. Can widen sharply on SNB interventions.",
    historicalLevels: [
      { price: "0.9200", label: "Key Resistance", type: "Resistance", significance: "High" },
      { price: "0.9000", label: "Psychological Level", type: "Psychological", significance: "High" },
      { price: "0.8800", label: "Key Support", type: "Support", significance: "High" },
      { price: "0.8600", label: "Major Support", type: "Support", significance: "Medium" },
      { price: "0.8400", label: "Long-Term Support", type: "Support", significance: "Medium" },
    ],
  },
  "GBP/JPY": {
    pair: "GBP/JPY",
    avgDailyRangePips: 130,
    character: "The most volatile major pair. Large daily swings. Often called 'the beast'. Needs wider stops and careful risk management.",
    bestSessions: ["London", "Tokyo"],
    volatility: "High",
    spreadNote: "Wider spreads than majors. Factor into risk calculations.",
    historicalLevels: [
      { price: "200.00", label: "Psychological Resistance", type: "Psychological", significance: "High" },
      { price: "195.00", label: "Key Resistance", type: "Resistance", significance: "High" },
      { price: "190.00", label: "Key Support Zone", type: "Support", significance: "High" },
      { price: "185.00", label: "Major Support", type: "Support", significance: "High" },
      { price: "180.00", label: "Psychological Level", type: "Psychological", significance: "Medium" },
    ],
  },
  "EUR/JPY": {
    pair: "EUR/JPY",
    avgDailyRangePips: 90,
    character: "Risk sentiment barometer. Rises in risk-on environments. Influenced by both ECB and BOJ policy. Active across multiple sessions.",
    bestSessions: ["Tokyo", "London"],
    volatility: "Medium",
    spreadNote: "Moderate spreads. Good liquidity during Tokyo and London.",
    historicalLevels: [
      { price: "170.00", label: "Psychological Resistance", type: "Psychological", significance: "High" },
      { price: "165.00", label: "Key Resistance", type: "Resistance", significance: "High" },
      { price: "160.00", label: "Key Support Zone", type: "Support", significance: "High" },
      { price: "155.00", label: "Major Support", type: "Support", significance: "High" },
      { price: "150.00", label: "Psychological Level", type: "Psychological", significance: "Medium" },
    ],
  },
};
