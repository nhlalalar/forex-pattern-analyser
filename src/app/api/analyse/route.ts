import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { generateMockAnalysis } from "@/lib/mockAnalysis";
import { AnalysisMode, ForexPair, AnalysisResult, TradeLevels } from "@/lib/types";
import { INSTRUMENT_BY_SYMBOL, Instrument } from "@/lib/instruments";
import { generateId } from "@/lib/utils";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expert forex and financial markets technical analyst with 20+ years of experience. You analyse chart screenshots and return structured JSON analysis.

Your analysis must include:
- Trend direction and market bias
- Support and resistance zones with approximate price levels when visible on the chart
- Pattern candidates (Bull Flag, Head & Shoulders, Double Top/Bottom, Triangles, etc.)
- A clear BUY, SELL, or WAIT signal with entry zone, stop loss, and three take profit targets
- Liquidity zones and invalidation areas
- A plain-English summary

Rules:
- Be specific about price levels when they are clearly visible on the chart
- If price levels are not clearly readable, describe the structural zone (e.g. "near the recent swing low")
- Always include a stop loss and at least two take profit targets
- The signal direction must match the market bias`;

function buildChartPrompt(pair?: string, instrument?: Instrument): string {
  const pairContext = pair
    ? `\n\nThis chart is for ${pair}.${instrument ? ` ${instrument.character}` : ""}`
    : "";

  return `Analyse this forex/financial chart screenshot carefully.${pairContext}

Return ONLY a valid JSON object — no markdown, no explanation, no code block. Use exactly this structure:

{
  "marketBias": "Bullish",
  "trendDirection": "description of current trend",
  "confidenceLevel": "Medium",
  "detectedStructures": ["structure1", "structure2"],
  "supportZones": [
    { "zone": "zone description", "reason": "why this is support", "priceLevel": "price if visible" }
  ],
  "resistanceZones": [
    { "zone": "zone description", "reason": "why this is resistance", "priceLevel": "price if visible" }
  ],
  "patternCandidates": [
    { "pattern": "pattern name", "status": "Candidate", "explanation": "explanation", "category": "Continuation" }
  ],
  "liquidityZones": [
    { "area": "area description", "reason": "why liquidity exists here" }
  ],
  "invalidationAreas": [
    { "area": "area description", "reason": "why this invalidates the setup" }
  ],
  "tradeSetup": {
    "direction": "BUY",
    "biasStrength": "Moderate",
    "entryZone": "specific entry zone with price if visible",
    "entryNote": "what to look for before entering",
    "stopLoss": "stop loss with price if visible",
    "stopLossNote": "reasoning for stop placement",
    "takeProfitOne": "TP1 with price if visible",
    "takeProfitOneNote": "close 50% here",
    "takeProfitTwo": "TP2 with price if visible",
    "takeProfitTwoNote": "trail stop to breakeven after TP1",
    "takeProfitThree": "TP3 extended target",
    "takeProfitThreeNote": "only if momentum is strong",
    "riskReward": "1:2.5 R:R",
    "pipDistance": "SL distance in pips if readable from chart",
    "sessionAdvice": "best session for this trade"
  },
  "riskRewardObservation": "overall R:R observation",
  "plainEnglishSummary": "clear 3-4 sentence summary of the chart and trade idea"
}`;
}

function buildPairPrompt(pair: string, instrument?: Instrument): string {
  const sessions = instrument?.bestSessions?.join(", ") ?? "London, New York";
  const char = instrument?.character ?? pair;

  return `Provide a general technical context analysis for ${pair}. Pair profile: ${char}. Best sessions: ${sessions}.

Return ONLY valid JSON using the same structure as a chart analysis. Since no live chart is provided, base analysis on typical structural behaviour and historical context of ${pair}. Set direction to WAIT and note that a chart upload is needed for specific levels.

{
  "marketBias": "Neutral",
  "trendDirection": "Context-based analysis — upload a ${pair} chart for specific trend read",
  "confidenceLevel": "Low",
  "detectedStructures": ["No chart provided — analysis based on pair profile only"],
  "supportZones": [{ "zone": "Historical support area", "reason": "Based on ${pair} historical behaviour", "priceLevel": "Upload chart for specific levels" }],
  "resistanceZones": [{ "zone": "Historical resistance area", "reason": "Based on ${pair} historical behaviour", "priceLevel": "Upload chart for specific levels" }],
  "patternCandidates": [{ "pattern": "To be determined from chart", "status": "Candidate", "explanation": "Upload a ${pair} screenshot for pattern detection", "category": "Bilateral" }],
  "liquidityZones": [{ "area": "Above recent swing highs", "reason": "Common liquidity area for ${pair}" }],
  "invalidationAreas": [{ "area": "To be determined from live chart", "reason": "Upload chart for specific invalidation levels" }],
  "tradeSetup": {
    "direction": "WAIT",
    "biasStrength": "Weak",
    "entryZone": "Upload a ${pair} chart screenshot for a specific entry level",
    "entryNote": "No chart was provided. Upload a screenshot for Claude to read specific price levels.",
    "stopLoss": "To be determined from live chart",
    "stopLossNote": "Upload a ${pair} chart for stop loss placement",
    "takeProfitOne": "Previous swing high or low area",
    "takeProfitOneNote": "Verify on your live chart",
    "takeProfitTwo": "Extended structural target",
    "takeProfitTwoNote": "Verify on your live chart",
    "takeProfitThree": "Higher timeframe target",
    "takeProfitThreeNote": "Only valid with live chart analysis",
    "riskReward": "Upload chart for R:R calculation",
    "pipDistance": "Requires live chart",
    "sessionAdvice": "${sessions} session is best for ${pair}"
  },
  "riskRewardObservation": "Upload a ${pair} chart screenshot for precise R:R analysis based on real price levels.",
  "plainEnglishSummary": "${char} Upload a ${pair} chart screenshot to get a full AI-powered analysis with specific entry, stop loss, and take profit levels."
}`;
}

export async function POST(req: NextRequest) {
  let body: Record<string, string> = {};

  try {
    body = await req.json();
    const mode: AnalysisMode = body.mode === "pair" ? "pair" : "upload";
    const pair = body.pair as ForexPair | undefined;
    const imageBase64 = body.imageBase64;
    const imageMediaType = body.imageMediaType;
    const instrument: Instrument | undefined = pair ? INSTRUMENT_BY_SYMBOL[pair] : undefined;

    let claudeResponse: string | null = null;

    if (mode === "upload" && imageBase64 && imageMediaType) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;
      type ValidMediaType = typeof validTypes[number];
      const mediaType: ValidMediaType = validTypes.includes(imageMediaType as ValidMediaType)
        ? (imageMediaType as ValidMediaType)
        : "image/jpeg";

      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: imageBase64 },
              },
              { type: "text", text: buildChartPrompt(pair, instrument) },
            ],
          },
        ],
      });

      claudeResponse = message.content[0].type === "text" ? message.content[0].text : null;

    } else if (mode === "pair" && pair) {
      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildPairPrompt(pair, instrument) }],
      });

      claudeResponse = message.content[0].type === "text" ? message.content[0].text : null;
    }

    if (claudeResponse) {
      const cleaned = claudeResponse
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      const result: AnalysisResult = {
        id: generateId(),
        disclaimer:
          "This is AI-generated analysis from your chart. Verify all levels on your live platform before making any decision. This is not financial advice.",
        marketBias: parsed.marketBias ?? "Neutral",
        trendDirection: parsed.trendDirection ?? "",
        confidenceLevel: parsed.confidenceLevel ?? "Medium",
        detectedStructures: parsed.detectedStructures ?? [],
        supportZones: parsed.supportZones ?? [],
        resistanceZones: parsed.resistanceZones ?? [],
        patternCandidates: parsed.patternCandidates ?? [],
        liquidityZones: parsed.liquidityZones ?? [],
        invalidationAreas: parsed.invalidationAreas ?? [],
        tradeSetup: (parsed.tradeSetup as TradeLevels) ?? generateMockAnalysis(mode, pair).tradeSetup,
        riskRewardObservation: parsed.riskRewardObservation ?? "",
        plainEnglishSummary: parsed.plainEnglishSummary ?? "",
        timestamp: new Date().toISOString(),
        mode,
        pair: pair ?? undefined,
      };

      return NextResponse.json(result);
    }

    return NextResponse.json(generateMockAnalysis(mode, pair));

  } catch (err) {
    console.error("Analyse error:", err);
    return NextResponse.json(generateMockAnalysis((body.mode as AnalysisMode) ?? "upload", body.pair as ForexPair));
  }
}
