export type InstrumentCategory = "Forex" | "Commodity" | "Crypto" | "Index";

export interface Instrument {
  symbol: string;           // App-facing label e.g. "EUR/USD"
  yahooSymbol: string;      // Yahoo Finance ticker
  category: InstrumentCategory;
  flag1: string;
  flag2?: string;
  description: string;
  pipSize: number;          // 0.0001 for most forex, 0.01 for JPY, etc.
  avgDailyRange: string;
  volatility: "Low" | "Medium" | "High" | "Extreme";
  bestSessions: string[];
  character: string;
  spreadNote: string;
  historicalHighNote: string;
  historicalLowNote: string;
}

export const INSTRUMENTS: Instrument[] = [
  // ─── Forex ───────────────────────────────────────────────────────────────
  {
    symbol: "EUR/USD", yahooSymbol: "EURUSD=X", category: "Forex",
    flag1: "🇪🇺", flag2: "🇺🇸",
    description: "Most traded currency pair globally.",
    pipSize: 0.0001, avgDailyRange: "80 pips", volatility: "Medium",
    bestSessions: ["London", "New York"],
    character: "Trends well during London/NY. Highly sensitive to ECB and Fed decisions. Deep liquidity at all hours.",
    spreadNote: "Tightest spreads of any pair.",
    historicalHighNote: "Peaked near 1.2300 in early 2018 and again 2021.",
    historicalLowNote: "Hit parity (1.0000) in 2022 for first time in 20 years.",
  },
  {
    symbol: "USD/JPY", yahooSymbol: "USDJPY=X", category: "Forex",
    flag1: "🇺🇸", flag2: "🇯🇵",
    description: "Safe-haven and yield-driven pair.",
    pipSize: 0.01, avgDailyRange: "75 pips", volatility: "Medium",
    bestSessions: ["Tokyo", "New York"],
    character: "Driven by US Treasury yields and BOJ policy. Trends strongly when yield differentials are wide. Sharp reversals on BOJ intervention.",
    spreadNote: "Very tight spreads. Active across all sessions.",
    historicalHighNote: "Reached 151.94 in October 2022 — 32-year high.",
    historicalLowNote: "Fell to 101 area in 2020 COVID crash and 2016.",
  },
  {
    symbol: "GBP/USD", yahooSymbol: "GBPUSD=X", category: "Forex",
    flag1: "🇬🇧", flag2: "🇺🇸",
    description: "High-volatility major pair.",
    pipSize: 0.0001, avgDailyRange: "100 pips", volatility: "High",
    bestSessions: ["London", "New York"],
    character: "Cable reacts strongly to UK data, BOE decisions, and political events. Can produce large erratic moves. Favoured by UK and European traders.",
    spreadNote: "Moderate spreads. Wider in off-hours.",
    historicalHighNote: "Traded near 1.4300 in 2018 and 2021.",
    historicalLowNote: "Mini-crash to 1.0350 in September 2022 (Truss budget).",
  },
  {
    symbol: "AUD/USD", yahooSymbol: "AUDUSD=X", category: "Forex",
    flag1: "🇦🇺", flag2: "🇺🇸",
    description: "Commodity-linked risk-on pair.",
    pipSize: 0.0001, avgDailyRange: "65 pips", volatility: "Medium",
    bestSessions: ["Sydney", "London"],
    character: "Correlated with iron ore, gold, and risk appetite. Rises in risk-on environments. RBA policy and Chinese economic data are major drivers.",
    spreadNote: "Good spreads during Sydney and London.",
    historicalHighNote: "Reached 0.8000+ in early 2018 and rebounded there in 2021.",
    historicalLowNote: "Collapsed to 0.5500 in March 2020 COVID crash.",
  },
  {
    symbol: "USD/CAD", yahooSymbol: "USDCAD=X", category: "Forex",
    flag1: "🇺🇸", flag2: "🇨🇦",
    description: "Oil-correlated pair.",
    pipSize: 0.0001, avgDailyRange: "70 pips", volatility: "Medium",
    bestSessions: ["New York"],
    character: "Inversely correlated with oil prices. CAD weakens when oil falls. BOC decisions and Canadian jobs data cause sharp moves.",
    spreadNote: "Moderate spreads. Most liquid in NY hours.",
    historicalHighNote: "Peaked above 1.4600 during 2020 oil crash.",
    historicalLowNote: "Traded as low as 1.2000 when oil surged in 2021–2022.",
  },
  {
    symbol: "USD/CHF", yahooSymbol: "USDCHF=X", category: "Forex",
    flag1: "🇺🇸", flag2: "🇨🇭",
    description: "Safe-haven pair.",
    pipSize: 0.0001, avgDailyRange: "65 pips", volatility: "Low",
    bestSessions: ["London", "New York"],
    character: "CHF is a safe-haven — it strengthens during global uncertainty. Inversely correlated with EUR/USD. SNB occasionally intervenes to weaken CHF.",
    spreadNote: "Moderate spreads. Can gap on SNB announcements.",
    historicalHighNote: "Traded near 1.0100 in 2022.",
    historicalLowNote: "Briefly hit 0.8500 during 2015 SNB peg removal. Post-2017 lows near 0.9000.",
  },
  {
    symbol: "GBP/JPY", yahooSymbol: "GBPJPY=X", category: "Forex",
    flag1: "🇬🇧", flag2: "🇯🇵",
    description: "The most volatile major pair.",
    pipSize: 0.01, avgDailyRange: "130 pips", volatility: "High",
    bestSessions: ["London", "Tokyo"],
    character: "Known as 'the beast'. Massive daily swings driven by both BOE and BOJ forces. Requires wider stops. Trends powerfully but also reverses sharply.",
    spreadNote: "Wider spreads than majors. Factor into all risk calculations.",
    historicalHighNote: "Hit 200+ level in 2023–2024.",
    historicalLowNote: "Fell to 123 area in 2020 COVID crash.",
  },
  {
    symbol: "EUR/JPY", yahooSymbol: "EURJPY=X", category: "Forex",
    flag1: "🇪🇺", flag2: "🇯🇵",
    description: "Risk sentiment barometer.",
    pipSize: 0.01, avgDailyRange: "90 pips", volatility: "Medium",
    bestSessions: ["Tokyo", "London"],
    character: "Rises in risk-on environments. Influenced by both ECB and BOJ. Active across Tokyo and London sessions. Tends to trend in one direction for extended periods.",
    spreadNote: "Moderate spreads. Good liquidity in Tokyo and London.",
    historicalHighNote: "Reached 170+ in 2023–2024.",
    historicalLowNote: "Traded near 114 during 2020 COVID low.",
  },

  // ─── Commodities ─────────────────────────────────────────────────────────
  {
    symbol: "XAU/USD", yahooSymbol: "GC=F", category: "Commodity",
    flag1: "🥇",
    description: "Gold — the ultimate safe-haven asset.",
    pipSize: 0.1, avgDailyRange: "$25–$40", volatility: "Medium",
    bestSessions: ["London", "New York"],
    character: "Gold is driven by real interest rates, USD strength, inflation expectations, and geopolitical risk. Inverse correlation with the US Dollar. Institutional favourite for portfolio hedging.",
    spreadNote: "Moderate spreads. Most active during London and NY overlap.",
    historicalHighNote: "All-time high of $2,790 reached in October 2024.",
    historicalLowNote: "Traded near $1,175 in late 2018 before beginning a major bull run.",
  },
  {
    symbol: "WTI/USD", yahooSymbol: "CL=F", category: "Commodity",
    flag1: "🛢️",
    description: "WTI Crude Oil — global energy benchmark.",
    pipSize: 0.01, avgDailyRange: "$1.50–$3.00", volatility: "High",
    bestSessions: ["London", "New York"],
    character: "Driven by OPEC+ decisions, US inventory data (weekly), global demand, and geopolitical events. Negative correlation with USD in most environments. Highly sensitive to news.",
    spreadNote: "Wider spreads than forex. Gaps common on OPEC news.",
    historicalHighNote: "Spiked above $130 in March 2022 on Russia-Ukraine war.",
    historicalLowNote: "Went negative in April 2020 during COVID — storage crisis. Recovered sharply to $85+ by 2021.",
  },

  // ─── Crypto ──────────────────────────────────────────────────────────────
  {
    symbol: "BTC/USD", yahooSymbol: "BTC-USD", category: "Crypto",
    flag1: "₿",
    description: "Bitcoin — the leading cryptocurrency.",
    pipSize: 1, avgDailyRange: "$1,000–$3,000", volatility: "Extreme",
    bestSessions: ["New York", "London"],
    character: "24/7 market. Extreme volatility with multi-thousand dollar daily swings. Highly correlated with risk appetite. Driven by macro sentiment, regulatory news, ETF flows, and halving cycles. Not suitable for tight risk management.",
    spreadNote: "Wide spreads especially on altcoin correlations. Highly volatile.",
    historicalHighNote: "All-time high near $108,000 in January 2025.",
    historicalLowNote: "Fell to ~$3,500 in December 2018. COVID crash took it to $4,000 in March 2020.",
  },

  // ─── Indices ─────────────────────────────────────────────────────────────
  {
    symbol: "NASDAQ", yahooSymbol: "NQ=F", category: "Index",
    flag1: "📈",
    description: "NASDAQ 100 Futures — US tech index.",
    pipSize: 0.25, avgDailyRange: "150–300 points", volatility: "High",
    bestSessions: ["New York"],
    character: "Dominated by mega-cap tech stocks (Apple, Microsoft, NVIDIA, Meta, Amazon, Google). Highly sensitive to Fed rate decisions, earnings results, and tech sector sentiment. Trades 6:30 AM – 5:00 PM ET with extended futures hours.",
    spreadNote: "Moderate spreads on CFDs. Gaps at market open common.",
    historicalHighNote: "Reached record highs above 22,000 in 2024.",
    historicalLowNote: "Crashed to ~6,800 in March 2020 COVID lows.",
  },
];

export const INSTRUMENT_BY_SYMBOL: Record<string, Instrument> = Object.fromEntries(
  INSTRUMENTS.map((i) => [i.symbol, i])
);

export const INSTRUMENTS_BY_CATEGORY: Record<InstrumentCategory, Instrument[]> = {
  Forex: INSTRUMENTS.filter((i) => i.category === "Forex"),
  Commodity: INSTRUMENTS.filter((i) => i.category === "Commodity"),
  Crypto: INSTRUMENTS.filter((i) => i.category === "Crypto"),
  Index: INSTRUMENTS.filter((i) => i.category === "Index"),
};

export function getYahooSymbol(appSymbol: string): string {
  return INSTRUMENT_BY_SYMBOL[appSymbol]?.yahooSymbol ?? appSymbol;
}
