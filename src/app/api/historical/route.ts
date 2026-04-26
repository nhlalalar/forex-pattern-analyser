import { NextRequest, NextResponse } from "next/server";
import { OHLCBar, HistoricalDataResult, ComputedKeyLevel } from "@/lib/types";
import { getYahooSymbol } from "@/lib/instruments";

// In-memory cache: symbol → { data, fetchedAt }
const cache = new Map<string, { data: HistoricalDataResult; fetchedAt: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function roundPsych(price: number): number {
  if (price > 10000) return Math.round(price / 5000) * 5000;
  if (price > 1000)  return Math.round(price / 1000) * 1000;
  if (price > 100)   return Math.round(price / 10) * 10;
  if (price > 10)    return Math.round(price / 5) * 5;
  return Math.round(price * 10) / 10;
}

function trendDirection(older: number, newer: number): "Bullish" | "Bearish" | "Neutral" {
  const pct = ((newer - older) / older) * 100;
  if (pct > 5) return "Bullish";
  if (pct < -5) return "Bearish";
  return "Neutral";
}

function computeKeyLevels(bars: OHLCBar[], ath: number, atl: number): ComputedKeyLevel[] {
  const levels: ComputedKeyLevel[] = [];

  // ATH and ATL
  levels.push({ price: ath, label: `All-Time High (since 2017)`, type: "ATH", significance: "High" });
  levels.push({ price: atl, label: `All-Time Low (since 2017)`, type: "ATL", significance: "High" });

  // Pivot points from yearly highs/lows
  const yearMap = new Map<number, { high: number; low: number }>();
  bars.forEach((b) => {
    const yr = new Date(b.timestamp * 1000).getFullYear();
    const existing = yearMap.get(yr);
    if (!existing) {
      yearMap.set(yr, { high: b.high, low: b.low });
    } else {
      yearMap.set(yr, {
        high: Math.max(existing.high, b.high),
        low: Math.min(existing.low, b.low),
      });
    }
  });

  yearMap.forEach((v, yr) => {
    if (yr >= 2019) {
      levels.push({ price: v.high, label: `${yr} Annual High`, type: "Resistance", significance: yr >= 2022 ? "High" : "Medium" });
      levels.push({ price: v.low, label: `${yr} Annual Low`, type: "Support", significance: yr >= 2022 ? "High" : "Medium" });
    }
  });

  // Psychological round numbers near current price
  const last = bars[bars.length - 1]?.close ?? 0;
  const psychBase = roundPsych(last);
  [-2, -1, 0, 1, 2].forEach((offset) => {
    const p = roundPsych(psychBase + offset * (last > 1000 ? 1000 : last > 100 ? 10 : last > 10 ? 5 : 0.1));
    if (p > 0 && Math.abs(p - last) / last < 0.15) {
      levels.push({ price: p, label: `Psychological Level`, type: "Psychological", significance: "Medium" });
    }
  });

  // Deduplicate — keep levels at least 0.5% apart
  const sorted = levels.sort((a, b) => b.price - a.price);
  const deduped: ComputedKeyLevel[] = [];
  sorted.forEach((l) => {
    if (!deduped.some((d) => Math.abs(d.price - l.price) / l.price < 0.005)) {
      deduped.push(l);
    }
  });

  return deduped.slice(0, 12);
}

async function fetchYahooFinance(yahooSymbol: string): Promise<HistoricalDataResult> {
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?interval=1wk&range=9y&includePrePost=false`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.9",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Yahoo Finance returned ${res.status}`);
  }

  const json = await res.json();
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error("No data in Yahoo Finance response");

  const timestamps: number[] = result.timestamp ?? [];
  const quote = result.indicators?.quote?.[0];
  const opens: number[] = quote?.open ?? [];
  const highs: number[] = quote?.high ?? [];
  const lows: number[] = quote?.low ?? [];
  const closes: number[] = quote?.close ?? [];
  const volumes: number[] = quote?.volume ?? [];
  const currency: string = result.meta?.currency ?? "USD";

  const bars: OHLCBar[] = timestamps
    .map((ts, i) => ({
      timestamp: ts,
      open: opens[i],
      high: highs[i],
      low: lows[i],
      close: closes[i],
      volume: volumes[i],
    }))
    .filter((b) => b.close != null && !isNaN(b.close));

  if (bars.length === 0) throw new Error("Empty bars from Yahoo Finance");

  const allHighs = bars.map((b) => b.high).filter(Boolean);
  const allLows = bars.map((b) => b.low).filter(Boolean);
  const ath = Math.max(...allHighs);
  const atl = Math.min(...allLows);
  const firstClose = bars[0].close;
  const latestClose = bars[bars.length - 1].close;
  const changeFromFirst = ((latestClose - firstClose) / firstClose) * 100;

  // 1Y trend: compare last bar to bar ~52 weeks ago
  const bar1YAgo = bars[Math.max(0, bars.length - 52)].close;
  // 3Y trend: compare last bar to bar ~156 weeks ago
  const bar3YAgo = bars[Math.max(0, bars.length - 156)].close;

  const keyLevels = computeKeyLevels(bars, ath, atl);

  return {
    symbol: yahooSymbol,
    currency,
    bars,
    allTimeHigh: ath,
    allTimeLow: atl,
    firstClose,
    latestClose,
    changeFromFirst,
    trend1Y: trendDirection(bar1YAgo, latestClose),
    trend3Y: trendDirection(bar3YAgo, latestClose),
    keyLevels,
    fetchedAt: new Date().toISOString(),
  };
}

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ error: "symbol param required" }, { status: 400 });
  }

  const yahooSymbol = getYahooSymbol(symbol);

  // Check cache
  const cached = cache.get(yahooSymbol);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cached.data);
  }

  try {
    const data = await fetchYahooFinance(yahooSymbol);
    cache.set(yahooSymbol, { data, fetchedAt: Date.now() });
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        symbol: yahooSymbol,
        currency: "USD",
        error: `Failed to fetch historical data: ${message}`,
        bars: [],
        allTimeHigh: 0,
        allTimeLow: 0,
        firstClose: 0,
        latestClose: 0,
        changeFromFirst: 0,
        trend1Y: "Neutral",
        trend3Y: "Neutral",
        keyLevels: [],
        fetchedAt: new Date().toISOString(),
      } as HistoricalDataResult,
      { status: 200 }
    );
  }
}
