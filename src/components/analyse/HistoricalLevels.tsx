"use client";

import { BarChart2, TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import { PAIR_PROFILES } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HistoricalLevelsProps {
  pair: string;
}

const SIGNIFICANCE_COLORS = {
  High: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  Medium: "border-slate-500/30 bg-slate-500/5 text-slate-400",
  Low: "border-slate-600/20 bg-transparent text-slate-600",
};

const TYPE_ICONS = {
  Support: TrendingUp,
  Resistance: TrendingDown,
  "Key Level": Minus,
  Psychological: Activity,
};

const TYPE_COLORS = {
  Support: "text-emerald-400",
  Resistance: "text-red-400",
  "Key Level": "text-blue-400",
  Psychological: "text-purple-400",
};

const VOLATILITY_COLORS = {
  High: "text-red-400 bg-red-500/10 border-red-500/30",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
};

export function HistoricalLevels({ pair }: HistoricalLevelsProps) {
  const profile = PAIR_PROFILES[pair];
  if (!profile) return null;

  return (
    <div className="rounded-xl border border-[#1e2535] bg-[#131720] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2535]">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {pair} — Historical Levels
          </span>
        </div>
        <span className={cn("px-2 py-0.5 rounded border text-[10px] font-bold", VOLATILITY_COLORS[profile.volatility])}>
          {profile.volatility} Volatility
        </span>
      </div>

      <div className="p-3 space-y-3">
        {/* Pair character */}
        <div className="rounded-lg border border-[#1e2535] bg-[#1a2030] p-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Pair Profile</p>
          <p className="text-xs text-slate-400 leading-relaxed">{profile.character}</p>
          <div className="flex items-center gap-4 mt-2.5">
            <div>
              <p className="text-[10px] text-slate-600 uppercase tracking-wide">Avg Daily Range</p>
              <p className="text-sm font-bold text-slate-200">{profile.avgDailyRangePips} pips</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-600 uppercase tracking-wide">Best Sessions</p>
              <div className="flex gap-1 mt-0.5">
                {profile.bestSessions.map((s) => (
                  <span key={s} className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-600 mt-2 italic">{profile.spreadNote}</p>
        </div>

        {/* Key levels */}
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            Historical Key Levels
          </p>
          <div className="space-y-1.5">
            {profile.historicalLevels.map((level, i) => {
              const Icon = TYPE_ICONS[level.type];
              const typeColor = TYPE_COLORS[level.type];
              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-2.5",
                    SIGNIFICANCE_COLORS[level.significance]
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", typeColor)} />
                    <div>
                      <p className="text-xs font-semibold text-slate-300">{level.label}</p>
                      <p className={cn("text-[10px]", typeColor)}>{level.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-mono text-slate-200">{level.price}</p>
                    <p className={cn(
                      "text-[10px] font-semibold",
                      level.significance === "High" ? "text-blue-400" : "text-slate-600"
                    )}>
                      {level.significance}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[10px] text-slate-700 italic px-1">
          Historical levels are reference zones only. Always verify against current live prices on your platform.
        </p>
      </div>
    </div>
  );
}
