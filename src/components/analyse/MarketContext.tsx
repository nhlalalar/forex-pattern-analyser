"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart2,
  RefreshCw,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { HistoricalDataResult } from "@/lib/types";
import { INSTRUMENT_BY_SYMBOL } from "@/lib/instruments";
import { HistoricalChart } from "./HistoricalChart";
import { cn } from "@/lib/utils";

interface MarketContextProps {
  symbol: string;
}

function TrendBadge({ trend }: { trend: "Bullish" | "Bearish" | "Neutral" }) {
  if (trend === "Bullish") return (
    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
      <TrendingUp className="w-3 h-3" /> Bullish
    </span>
  );
  if (trend === "Bearish") return (
    <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">
      <TrendingDown className="w-3 h-3" /> Bearish
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-500/10 border border-slate-500/30 px-2 py-0.5 rounded-full">
      <Minus className="w-3 h-3" /> Neutral
    </span>
  );
}

function fmt(price: number, symbol: string): string {
  if (price > 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price > 10)   return price.toFixed(2);
  return price.toFixed(4);
}

export function MarketContext({ symbol }: MarketContextProps) {
  const [data, setData] = useState<HistoricalDataResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const instrument = INSTRUMENT_BY_SYMBOL[symbol];

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`/api/historical?symbol=${encodeURIComponent(symbol)}`)
      .then((r) => r.json())
      .then((d: HistoricalDataResult) => {
        if (d.error && d.bars.length === 0) {
          setError(d.error);
        } else {
          setData(d);
        }
      })
      .catch(() => setError("Failed to load historical data."))
      .finally(() => setLoading(false));
  }, [symbol]);

  return (
    <div className="rounded-xl border border-[#1e2535] bg-[#131720] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2535]">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {symbol} — Historical Context (2017–Present)
          </span>
        </div>
        {loading && <RefreshCw className="w-3.5 h-3.5 text-slate-600 animate-spin" />}
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-4 space-y-3">
          <div className="h-20 rounded-lg bg-[#1a2030] animate-pulse" />
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3].map(i => <div key={i} className="h-12 rounded-lg bg-[#1a2030] animate-pulse" />)}
          </div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="p-4 flex items-start gap-2 text-sm text-amber-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Historical data unavailable</p>
            <p className="text-xs text-slate-500 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Data */}
      {data && !loading && (
        <div className="p-3 space-y-3">
          {/* Chart */}
          <div className="rounded-lg border border-[#1e2535] bg-[#0d1117] overflow-hidden px-2 pt-2 pb-0">
            <p className="text-[10px] text-slate-600 px-1 mb-1 font-mono">Weekly closes 2017–present</p>
            <HistoricalChart
              bars={data.bars}
              trend={data.trend1Y}
              currentPrice={data.latestClose}
              height={100}
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="rounded-lg border border-[#1e2535] bg-[#1a2030] p-2.5">
              <p className="text-[10px] text-slate-600 uppercase tracking-wide">Current</p>
              <p className="text-sm font-bold font-mono text-slate-200">{fmt(data.latestClose, symbol)}</p>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
              <p className="text-[10px] text-emerald-600 uppercase tracking-wide">ATH (2017+)</p>
              <p className="text-sm font-bold font-mono text-emerald-400">{fmt(data.allTimeHigh, symbol)}</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-2.5">
              <p className="text-[10px] text-red-600 uppercase tracking-wide">ATL (2017+)</p>
              <p className="text-sm font-bold font-mono text-red-400">{fmt(data.allTimeLow, symbol)}</p>
            </div>
            <div className={cn("rounded-lg border p-2.5",
              data.changeFromFirst >= 0
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-red-500/20 bg-red-500/5"
            )}>
              <p className="text-[10px] text-slate-600 uppercase tracking-wide">Since 2017</p>
              <p className={cn("text-sm font-bold flex items-center gap-0.5",
                data.changeFromFirst >= 0 ? "text-emerald-400" : "text-red-400"
              )}>
                {data.changeFromFirst >= 0
                  ? <ArrowUpRight className="w-3.5 h-3.5" />
                  : <ArrowDownRight className="w-3.5 h-3.5" />}
                {Math.abs(data.changeFromFirst).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Trend row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600 uppercase tracking-wide">1-Year Trend:</span>
              <TrendBadge trend={data.trend1Y} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600 uppercase tracking-wide">3-Year Trend:</span>
              <TrendBadge trend={data.trend3Y} />
            </div>
          </div>

          {/* Key computed levels */}
          {data.keyLevels.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Computed Historical Levels
              </p>
              <div className="space-y-1">
                {data.keyLevels.slice(0, 8).map((level, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg border border-[#1e2535] bg-[#1a2030]">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full",
                        level.type === "ATH" ? "bg-emerald-400" :
                        level.type === "ATL" ? "bg-red-400" :
                        level.type === "Support" ? "bg-emerald-400/60" :
                        level.type === "Resistance" ? "bg-red-400/60" :
                        "bg-blue-400/60"
                      )} />
                      <span className="text-xs text-slate-400">{level.label}</span>
                      <span className={cn("text-[10px] font-semibold",
                        level.type === "ATH" || level.type === "Support" ? "text-emerald-500" :
                        level.type === "ATL" || level.type === "Resistance" ? "text-red-500" :
                        "text-blue-500"
                      )}>{level.type}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-200">{fmt(level.price, symbol)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instrument character */}
          {instrument && (
            <div className="rounded-lg border border-[#1e2535] bg-[#1a2030] p-3">
              <p className="text-xs font-bold text-slate-400 mb-1">{symbol} Character</p>
              <p className="text-xs text-slate-500 leading-relaxed">{instrument.character}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <div>
                  <p className="text-[10px] text-slate-600">Avg Daily Range</p>
                  <p className="text-xs font-semibold text-slate-300">{instrument.avgDailyRange}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-600">Volatility</p>
                  <p className={cn("text-xs font-semibold",
                    instrument.volatility === "Low" ? "text-emerald-400" :
                    instrument.volatility === "Medium" ? "text-amber-400" :
                    instrument.volatility === "High" ? "text-red-400" : "text-red-500"
                  )}>{instrument.volatility}</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-700 mt-2 italic">{instrument.historicalHighNote}</p>
              <p className="text-[10px] text-slate-700 italic">{instrument.historicalLowNote}</p>
            </div>
          )}

          <p className="text-[10px] text-slate-700 italic">
            Data via Yahoo Finance. Refreshes every hour. Historical levels are reference zones only — always verify live prices on your platform.
          </p>
        </div>
      )}
    </div>
  );
}
