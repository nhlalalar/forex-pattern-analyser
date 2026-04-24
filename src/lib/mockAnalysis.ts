import { AnalysisResult, MarketBias, ConfidenceLevel, AnalysisMode, TradeLevels } from "./types";
import { generateId } from "./utils";

interface MockScenario {
  marketBias: MarketBias;
  confidenceLevel: ConfidenceLevel;
  trendDirection: string;
  detectedStructures: string[];
  supportZones: { zone: string; reason: string; priceLevel?: string }[];
  resistanceZones: { zone: string; reason: string; priceLevel?: string }[];
  patternCandidates: { pattern: string; status: string; explanation: string; category: "Reversal" | "Continuation" | "Bilateral" }[];
  liquidityZones: { area: string; reason: string }[];
  invalidationAreas: { area: string; reason: string }[];
  riskRewardObservation: string;
  plainEnglishSummary: string;
  tradeSetup: TradeLevels;
}

const BUY_SETUP: TradeLevels = {
  direction: "BUY",
  biasStrength: "Moderate",
  entryZone: "Current price area / pullback to support",
  entryNote: "Based on the chart structure visible in the screenshot. Look for a bullish confirmation candle at the identified support zone before entering.",
  stopLoss: "Below the most recent swing low visible on the chart",
  stopLossNote: "Place stop loss a few pips below the swing low to avoid premature stops from wicks. Adjust based on the candle size visible on your chart.",
  takeProfitOne: "Previous swing high / nearest resistance on chart",
  takeProfitOneNote: "First target — close 50% of position here to lock in gains.",
  takeProfitTwo: "Next key resistance zone above TP1",
  takeProfitTwoNote: "Second target — trail stop to break-even after TP1 is hit.",
  takeProfitThree: "Higher timeframe resistance / measured move target",
  takeProfitThreeNote: "Extended target — only if momentum is strong after TP2.",
  riskReward: "Minimum 1:2 R:R based on visible structure",
  pipDistance: "SL distance based on chart swing — verify on your platform",
  sessionAdvice: "Best taken during London (08:00–17:00 UTC) or New York (13:00–22:00 UTC) session for maximum liquidity and follow-through.",
};

const SELL_SETUP: TradeLevels = {
  direction: "SELL",
  biasStrength: "Moderate",
  entryZone: "Current price area / rally to resistance",
  entryNote: "Based on the chart structure visible in the screenshot. Look for a bearish confirmation candle at the identified resistance zone before entering.",
  stopLoss: "Above the most recent swing high visible on the chart",
  stopLossNote: "Place stop loss a few pips above the swing high. Adjust based on the candle size and volatility visible on your chart.",
  takeProfitOne: "Previous swing low / nearest support on chart",
  takeProfitOneNote: "First target — close 50% of position here to secure gains.",
  takeProfitTwo: "Next key support zone below TP1",
  takeProfitTwoNote: "Second target — trail stop to break-even after TP1 is hit.",
  takeProfitThree: "Higher timeframe support / measured move target",
  takeProfitThreeNote: "Extended target — only if selling pressure remains strong after TP2.",
  riskReward: "Minimum 1:2 R:R based on visible structure",
  pipDistance: "SL distance based on chart swing — verify on your platform",
  sessionAdvice: "Best taken during London (08:00–17:00 UTC) open or overlap with New York (13:00–17:00 UTC) for strongest momentum.",
};

const WAIT_SETUP: TradeLevels = {
  direction: "WAIT",
  biasStrength: "Weak",
  entryZone: "No clear entry zone identified",
  entryNote: "The chart appears to be consolidating or in a period of indecision. Wait for a clear break of structure before looking for an entry.",
  stopLoss: "To be determined after a directional break",
  stopLossNote: "Do not place a stop loss until direction is clearer. A premature entry in a ranging market increases the chance of being stopped out.",
  takeProfitOne: "To be determined after breakout direction is confirmed",
  takeProfitOneNote: "Wait for price to break above resistance or below support with conviction before targeting levels.",
  takeProfitTwo: "Extended target based on post-breakout structure",
  takeProfitTwoNote: "Only relevant after a confirmed break of the range.",
  riskReward: "Not applicable — wait for setup to develop",
  pipDistance: "Range size will define risk once direction breaks",
  sessionAdvice: "Monitor during London open (08:00 UTC) or New York open (13:00 UTC) — these sessions most commonly trigger breakouts from consolidation.",
};

const BULLISH_SCENARIO: MockScenario = {
  marketBias: "Bullish",
  confidenceLevel: "Medium",
  trendDirection: "Price is forming higher highs and higher lows — a short-term bullish structure is visible on the chart.",
  detectedStructures: [
    "Higher highs and higher lows sequence confirmed",
    "Break of structure to the upside",
    "Bullish consolidation phase / possible flag",
    "Support zone holding at recent swing low",
    "Possible demand zone below current price",
  ],
  supportZones: [
    { zone: "Most recent swing low", reason: "Price previously bounced from this area, forming a higher low. Strong area of demand.", priceLevel: "Visible on chart — mark the wick low of the last bounce candle" },
    { zone: "Previous consolidation base", reason: "Price built a base here before the last impulse move up — residual buyer interest expected.", priceLevel: "Visible on chart — horizontal area where price ranged before the move" },
  ],
  resistanceZones: [
    { zone: "Previous swing high", reason: "Sellers reacted here previously. Expect reduced momentum approaching this level.", priceLevel: "Visible on chart — mark the most recent significant high" },
    { zone: "Possible supply zone above", reason: "An unmitigated area where price dropped sharply — could attract selling pressure.", priceLevel: "Visible on chart — area where price gapped or fell sharply" },
  ],
  patternCandidates: [
    { pattern: "Bull Flag", status: "Candidate", explanation: "Price made a strong upward move then consolidated in a slight downward channel. A break above the upper channel line would validate this.", category: "Continuation" },
    { pattern: "Ascending Triangle", status: "Candidate", explanation: "Higher lows approaching a flat resistance suggest buyers are becoming more aggressive each time. Not confirmed until the resistance breaks.", category: "Continuation" },
  ],
  liquidityZones: [
    { area: "Above the most recent swing high", reason: "Stop orders from short sellers may be clustered here. Price could spike to collect this liquidity before continuing." },
    { area: "Below the recent higher low", reason: "Buy-side stops resting below. A dip to grab this liquidity before the next push up is possible." },
  ],
  invalidationAreas: [
    { area: "A close below the most recent higher low", reason: "This would break the bullish market structure and shift bias to neutral or bearish." },
    { area: "A new lower high forming below the previous swing high", reason: "Signals sellers are absorbing each rally — bullish structure weakening." },
  ],
  riskRewardObservation: "Based on the visible chart structure, price appears to offer a potential 1:2 to 1:3 risk-to-reward from the current support zone to the swing high target — using the swing low as the stop reference.",
  plainEnglishSummary: "The chart shows buyers in control with a clear sequence of higher highs and higher lows. Price has pulled back to a potential demand zone. The structure supports a buy opportunity from this area, targeting the previous swing high. If price closes below the recent higher low, the bullish case is weakened.",
  tradeSetup: BUY_SETUP,
};

const BEARISH_SCENARIO: MockScenario = {
  marketBias: "Bearish",
  confidenceLevel: "Medium",
  trendDirection: "Price is forming lower highs and lower lows — a short-term bearish structure is visible on the chart.",
  detectedStructures: [
    "Lower highs and lower lows sequence confirmed",
    "Break of structure to the downside",
    "Bearish consolidation / possible bear flag",
    "Resistance zone capping rallies at recent swing high",
    "Possible supply zone above current price",
  ],
  supportZones: [
    { zone: "Previous swing low", reason: "Last significant low. If this breaks, the next support level becomes the target.", priceLevel: "Visible on chart — mark the most recent significant low" },
    { zone: "Possible demand zone below", reason: "An area where price previously found buyers. May slow momentum temporarily.", priceLevel: "Visible on chart — area where price bounced previously" },
  ],
  resistanceZones: [
    { zone: "Most recent swing high (lower high)", reason: "Price failed to make a new high here — sellers stepped in. This is the key level defining the bearish structure.", priceLevel: "Visible on chart — the most recent lower high candle" },
    { zone: "Previous consolidation ceiling", reason: "Sellers defended this area in the past. Any rally toward this zone may attract fresh selling.", priceLevel: "Visible on chart — horizontal area where price was capped" },
  ],
  patternCandidates: [
    { pattern: "Bear Flag", status: "Candidate", explanation: "After a strong downward move, price is consolidating with a slight upward drift. A break below the lower boundary of this channel would validate the pattern.", category: "Continuation" },
    { pattern: "Descending Triangle", status: "Candidate", explanation: "Lower highs approaching a flat support level — sellers are pressing harder each time. A break of flat support would confirm.", category: "Continuation" },
  ],
  liquidityZones: [
    { area: "Below the most recent swing low", reason: "Buy-stop orders from existing longs may be below this level. Price could dip to collect this liquidity." },
    { area: "Above the recent lower high", reason: "Stop orders from short sellers clustered here. A liquidity grab above before continuing lower is possible." },
  ],
  invalidationAreas: [
    { area: "A close above the most recent lower high", reason: "Would invalidate the bearish structure — signals buyers are gaining control." },
    { area: "A new higher low forming above the previous swing low", reason: "Suggests buying pressure is building. Sellers losing grip on structure." },
  ],
  riskRewardObservation: "Based on visible chart structure, price may offer a 1:2 to 1:3 risk-to-reward from the current resistance zone to the swing low target — using the swing high as the stop reference.",
  plainEnglishSummary: "The chart shows sellers in control with a clear sequence of lower highs and lower lows. Price has rallied back toward a resistance/supply zone. The structure supports a sell opportunity from this area, targeting the previous swing low. If price closes above the recent lower high, the bearish case is invalidated.",
  tradeSetup: SELL_SETUP,
};

const NEUTRAL_SCENARIO: MockScenario = {
  marketBias: "Neutral",
  confidenceLevel: "Low",
  trendDirection: "Price is ranging — no clear directional bias. The market is in consolidation between a defined support floor and resistance ceiling.",
  detectedStructures: [
    "Horizontal consolidation range",
    "No break of structure in either direction",
    "Price oscillating between defined support and resistance",
    "Possible symmetrical triangle forming",
    "Decreasing volume / momentum contraction",
  ],
  supportZones: [
    { zone: "Range floor / lower boundary", reason: "Price has bounced from this area multiple times. A break below would signal a bearish breakout.", priceLevel: "Visible on chart — the lower horizontal boundary of the range" },
  ],
  resistanceZones: [
    { zone: "Range ceiling / upper boundary", reason: "Price has rejected from this area multiple times. A break above would signal a bullish breakout.", priceLevel: "Visible on chart — the upper horizontal boundary of the range" },
  ],
  patternCandidates: [
    { pattern: "Symmetrical Triangle", status: "Candidate", explanation: "Lower highs and higher lows converging — a breakout is coming but direction is unknown. Watch for which boundary breaks first.", category: "Bilateral" },
    { pattern: "Rectangle / Consolidation", status: "Candidate", explanation: "Price bouncing between two flat levels. Breakout direction will determine the next move.", category: "Bilateral" },
  ],
  liquidityZones: [
    { area: "Above the range high", reason: "Stop orders from range sellers resting here. A breakout above could sweep this liquidity and continue." },
    { area: "Below the range low", reason: "Stop orders from range buyers resting here. A breakdown could sweep liquidity and continue down." },
  ],
  invalidationAreas: [
    { area: "A decisive break and close above the range high", reason: "Shifts bias to bullish — look for a buy setup." },
    { area: "A decisive break and close below the range low", reason: "Shifts bias to bearish — look for a sell setup." },
  ],
  riskRewardObservation: "In a ranging market, the risk-to-reward from the middle of the range is poor. The better opportunity is at the extremes of the range or on a confirmed breakout.",
  plainEnglishSummary: "The chart shows no clear directional bias. Price is consolidating between defined support and resistance levels. The best approach is to wait for a confirmed break of either boundary before acting. Trading inside a range without confirmation significantly reduces the probability of a clean move.",
  tradeSetup: WAIT_SETUP,
};

const SCENARIOS = [BULLISH_SCENARIO, BEARISH_SCENARIO, NEUTRAL_SCENARIO];

export function generateMockAnalysis(
  mode: AnalysisMode,
  pair?: string,
  imageUrl?: string
): AnalysisResult {
  const idx = Math.floor(Date.now() / 60000) % SCENARIOS.length;
  const scenario = SCENARIOS[idx];

  return {
    id: generateId(),
    disclaimer: "This analysis is based on chart structure visible in your screenshot. Price levels are structural observations — not live market prices. Always verify levels on your own platform before making any decision.",
    ...scenario,
    timestamp: new Date().toISOString(),
    mode,
    pair: pair ?? undefined,
    imageUrl: imageUrl ?? undefined,
  };
}

export const MOCK_HISTORY: AnalysisResult[] = [
  {
    id: "hist001",
    disclaimer: "Based on chart screenshot analysis.",
    ...BULLISH_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    mode: "pair",
    pair: "EUR/USD",
  },
  {
    id: "hist002",
    disclaimer: "Based on chart screenshot analysis.",
    ...BEARISH_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    mode: "upload",
  },
  {
    id: "hist003",
    disclaimer: "Based on chart screenshot analysis.",
    ...NEUTRAL_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    mode: "pair",
    pair: "GBP/USD",
  },
  {
    id: "hist004",
    disclaimer: "Based on chart screenshot analysis.",
    ...BULLISH_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    mode: "pair",
    pair: "USD/JPY",
  },
  {
    id: "hist005",
    disclaimer: "Based on chart screenshot analysis.",
    ...BEARISH_SCENARIO,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    mode: "upload",
  },
];
