import { AnalysisResult, MarketBias, ConfidenceLevel, AnalysisMode } from "./types";
import { generateId } from "./utils";

interface MockScenario {
  marketBias: MarketBias;
  confidenceLevel: ConfidenceLevel;
  trendDirection: string;
  detectedStructures: string[];
  supportZones: { zone: string; reason: string }[];
  resistanceZones: { zone: string; reason: string }[];
  patternCandidates: { pattern: string; status: string; explanation: string; category: "Reversal" | "Continuation" | "Bilateral" }[];
  liquidityZones: { area: string; reason: string }[];
  invalidationAreas: { area: string; reason: string }[];
  riskRewardObservation: string;
  plainEnglishSummary: string;
}

const BULLISH_SCENARIO: MockScenario = {
  marketBias: "Bullish",
  confidenceLevel: "Medium",
  trendDirection: "Price appears to be forming a series of higher highs and higher lows, suggesting a short-term bullish structure.",
  detectedStructures: [
    "Higher highs and higher lows sequence",
    "Possible support zone at most recent swing low",
    "Possible resistance zone near previous swing high",
    "Break of structure to the upside observed",
    "Possible bullish consolidation phase",
  ],
  supportZones: [
    { zone: "Most recent swing low area", reason: "Price previously reacted from this level, forming a higher low — a potential demand area." },
    { zone: "Previous consolidation base", reason: "Price consolidated here before the last upward move, suggesting residual interest from buyers." },
  ],
  resistanceZones: [
    { zone: "Previous swing high area", reason: "Price previously rejected from this level — sellers may still be present here." },
    { zone: "Possible supply area above current price", reason: "Unmitigated area where price previously dropped sharply — could attract selling pressure." },
  ],
  patternCandidates: [
    {
      pattern: "Bull Flag",
      status: "Candidate, not confirmed",
      explanation: "Price appears to be consolidating in a slight downward channel after a strong upward move. A break above the upper boundary of this consolidation would be needed to validate the structure.",
      category: "Continuation",
    },
    {
      pattern: "Ascending Triangle",
      status: "Candidate, not confirmed",
      explanation: "The chart may be showing higher lows approaching a relatively flat resistance zone. This is a candidate structure only — context and confirmation are required.",
      category: "Continuation",
    },
  ],
  liquidityZones: [
    { area: "Above the previous swing high", reason: "Stop orders from short-sellers may be resting above this level, potentially attracting price." },
    { area: "Below the recent higher low", reason: "Stop orders from buyers may rest here — a liquidity pool that could be targeted before any continuation." },
  ],
  invalidationAreas: [
    { area: "Below the most recent higher low", reason: "A break and close below this area may weaken the bullish structure and shift bias to neutral." },
    { area: "A new lower high forming below the previous swing high", reason: "This would suggest sellers are becoming more aggressive, potentially invalidating the short-term bullish read." },
  ],
  riskRewardObservation: "The current structure may offer an educational observation point only. Price is approaching a previous resistance area — the risk-to-reward context is unclear without a confirmed pattern and a defined structure to reference.",
  plainEnglishSummary: "The chart appears to show short-term bullish pressure, with price forming higher highs and higher lows. However, price is now approaching a zone where sellers previously reacted. The educational takeaway here is that a patient approach — waiting for confirmation rather than anticipating continuation — would be the more thorough analytical interpretation. Nothing in this analysis constitutes a trade suggestion.",
};

const BEARISH_SCENARIO: MockScenario = {
  marketBias: "Bearish",
  confidenceLevel: "Medium",
  trendDirection: "Price appears to be forming a series of lower highs and lower lows, suggesting a short-term bearish structure.",
  detectedStructures: [
    "Lower highs and lower lows sequence",
    "Possible resistance zone at most recent swing high",
    "Break of structure to the downside observed",
    "Possible bearish consolidation / bear flag candidate",
    "Declining momentum structure",
  ],
  supportZones: [
    { zone: "Previous swing low area", reason: "Price previously bounced from this level, though a breakdown could accelerate if this area gives way." },
    { zone: "Possible demand zone below current price", reason: "A historically significant level where buyers previously stepped in — worth monitoring as a reference point." },
  ],
  resistanceZones: [
    { zone: "Most recent swing high area (lower high)", reason: "Price previously failed here, creating a lower high — a possible area where selling pressure re-emerged." },
    { zone: "Previous consolidation ceiling", reason: "Sellers have appeared at this zone in the past — educational reference only." },
  ],
  patternCandidates: [
    {
      pattern: "Bear Flag",
      status: "Candidate, not confirmed",
      explanation: "Price appears to be consolidating with a slight upward drift after a strong downward move. A breakdown below the lower boundary of this consolidation would be needed to validate the structure.",
      category: "Continuation",
    },
    {
      pattern: "Descending Triangle",
      status: "Candidate, not confirmed",
      explanation: "The chart may be showing lower highs approaching a relatively flat support zone. If this support fails, it would validate the pattern — but it has not yet done so.",
      category: "Continuation",
    },
  ],
  liquidityZones: [
    { area: "Below the previous swing low", reason: "Stop orders from buyers may rest below this level — a potential area of interest for price." },
    { area: "Above the recent lower high", reason: "Stop orders from short sellers may be clustered here — a liquidity grab above could occur before downside continuation." },
  ],
  invalidationAreas: [
    { area: "Above the most recent lower high", reason: "A break and close above this area may weaken the bearish structure and shift bias to neutral." },
    { area: "A new higher low forming above the previous swing low", reason: "This would suggest buyers are becoming more resilient, potentially invalidating the bearish read." },
  ],
  riskRewardObservation: "The current bearish structure is a candidate observation. Price is approaching a potential support area — the educational observation is that further downside is not guaranteed and a structural bounce is always possible.",
  plainEnglishSummary: "The chart appears to be in a short-term bearish structure with lower highs and lower lows in sequence. However, price is now approaching an area where buyers previously reacted. The educational takeaway is that structure alone does not confirm continuation — price behaviour at key reference zones should always be observed carefully, and no outcome should be assumed.",
};

const NEUTRAL_SCENARIO: MockScenario = {
  marketBias: "Neutral",
  confidenceLevel: "Low",
  trendDirection: "Price appears to be consolidating within a defined range, with no clear directional bias established.",
  detectedStructures: [
    "Horizontal consolidation range",
    "Possible support floor and resistance ceiling",
    "Price oscillating between two reference zones",
    "No clear break of structure in either direction",
    "Possible symmetrical triangle candidate forming",
  ],
  supportZones: [
    { zone: "Lower boundary of the consolidation range", reason: "Price has bounced from this area multiple times — a reference floor within the current structure." },
  ],
  resistanceZones: [
    { zone: "Upper boundary of the consolidation range", reason: "Price has rejected from this area multiple times — a reference ceiling within the current structure." },
  ],
  patternCandidates: [
    {
      pattern: "Symmetrical Triangle",
      status: "Candidate, not confirmed",
      explanation: "Price may be forming lower highs and higher lows, creating converging pressure. A breakout in either direction would be needed to determine potential direction — neither is assumed.",
      category: "Bilateral",
    },
    {
      pattern: "Broadening Formation",
      status: "Candidate, not confirmed",
      explanation: "Alternatively, the price action could be interpreted as a broadening formation, with higher highs and lower lows — suggesting increasing indecision and volatility.",
      category: "Bilateral",
    },
  ],
  liquidityZones: [
    { area: "Above the range high", reason: "Stop orders from range sellers may rest above — a breakout could sweep this liquidity." },
    { area: "Below the range low", reason: "Stop orders from range buyers may rest below — a breakdown could sweep this liquidity." },
  ],
  invalidationAreas: [
    { area: "Any decisive break outside the current range", reason: "A break with a close outside either boundary would shift the bias and require re-evaluation of the current neutral read." },
  ],
  riskRewardObservation: "In a consolidation phase, the educational observation is that the market has not decided direction. Patterns within consolidation often lead to false breakouts — patience in observing direction is the more thorough analytical stance.",
  plainEnglishSummary: "The chart is currently showing no clear directional bias — price appears to be consolidating within a range. Both bull and bear interpretations exist, but neither is confirmed. The educational takeaway is that the market is in a decision phase, and making directional assumptions without a structural break would be premature from an analytical standpoint.",
};

const SCENARIOS = [BULLISH_SCENARIO, BEARISH_SCENARIO, NEUTRAL_SCENARIO];

export function generateMockAnalysis(
  mode: AnalysisMode,
  pair?: string,
  _imageUrl?: string
): AnalysisResult {
  // Rotate scenarios deterministically based on current minute for variety
  const idx = Math.floor(Date.now() / 60000) % SCENARIOS.length;
  const scenario = SCENARIOS[idx];

  return {
    id: generateId(),
    disclaimer: "This is not financial advice. This is pattern analysis for educational purposes.",
    ...scenario,
    timestamp: new Date().toISOString(),
    mode,
    pair: pair ?? undefined,
    imageUrl: _imageUrl ?? undefined,
  };
}

export const MOCK_HISTORY: AnalysisResult[] = [
  {
    id: "hist001",
    disclaimer: "This is not financial advice. This is pattern analysis for educational purposes.",
    ...BULLISH_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    mode: "pair",
    pair: "EUR/USD",
  },
  {
    id: "hist002",
    disclaimer: "This is not financial advice. This is pattern analysis for educational purposes.",
    ...BEARISH_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    mode: "upload",
    imageUrl: undefined,
  },
  {
    id: "hist003",
    disclaimer: "This is not financial advice. This is pattern analysis for educational purposes.",
    ...NEUTRAL_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    mode: "pair",
    pair: "GBP/USD",
  },
  {
    id: "hist004",
    disclaimer: "This is not financial advice. This is pattern analysis for educational purposes.",
    ...BULLISH_SCENARIO,
    marketBias: "Bullish",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    mode: "pair",
    pair: "XAU/USD",
  },
  {
    id: "hist005",
    disclaimer: "This is not financial advice. This is pattern analysis for educational purposes.",
    ...BEARISH_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    mode: "upload",
    imageUrl: undefined,
  },
];
