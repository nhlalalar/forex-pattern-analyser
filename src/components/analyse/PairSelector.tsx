"use client";

import { TrendingUp } from "lucide-react";
import { INSTRUMENTS, INSTRUMENTS_BY_CATEGORY, InstrumentCategory } from "@/lib/instruments";
import { ForexPair } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<InstrumentCategory, string> = {
  Forex: "Forex Pairs",
  Commodity: "Commodities",
  Crypto: "Crypto",
  Index: "Indices",
};

const CATEGORY_COLORS: Record<InstrumentCategory, string> = {
  Forex: "text-blue-400 border-blue-500/20 bg-blue-500/5",
  Commodity: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  Crypto: "text-orange-400 border-orange-500/20 bg-orange-500/5",
  Index: "text-purple-400 border-purple-500/20 bg-purple-500/5",
};

const SELECTED_COLORS: Record<InstrumentCategory, string> = {
  Forex: "border-blue-500/50 bg-blue-600/15 text-blue-300",
  Commodity: "border-amber-500/50 bg-amber-600/15 text-amber-300",
  Crypto: "border-orange-500/50 bg-orange-600/15 text-orange-300",
  Index: "border-purple-500/50 bg-purple-600/15 text-purple-300",
};

const VOLATILITY_COLORS = {
  Low: "text-emerald-400",
  Medium: "text-amber-400",
  High: "text-red-400",
  Extreme: "text-red-500",
};

interface PairSelectorProps {
  selected: ForexPair | null;
  onSelect: (pair: ForexPair) => void;
}

export function PairSelector({ selected, onSelect }: PairSelectorProps) {
  const categories: InstrumentCategory[] = ["Forex", "Commodity", "Crypto", "Index"];

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500 flex items-center gap-1.5">
        <TrendingUp className="w-3.5 h-3.5" />
        Select an instrument for educational pattern analysis
      </p>

      {categories.map((cat) => {
        const instruments = INSTRUMENTS_BY_CATEGORY[cat];
        return (
          <div key={cat}>
            <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider mb-2", CATEGORY_COLORS[cat])}>
              {CATEGORY_LABELS[cat]}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {instruments.map((instrument) => {
                const isSelected = selected === instrument.symbol;
                return (
                  <button
                    key={instrument.symbol}
                    onClick={() => onSelect(instrument.symbol as ForexPair)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all",
                      isSelected
                        ? SELECTED_COLORS[cat]
                        : "border-[#1e2535] bg-[#1a2030] hover:border-[#2a3550] hover:bg-[#1e2535] text-slate-300"
                    )}
                  >
                    <span className="text-base leading-none flex-shrink-0">{instrument.flag1}</span>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-bold truncate", isSelected ? "" : "text-slate-200")}>
                        {instrument.symbol}
                      </p>
                      <p className={cn("text-[10px]", VOLATILITY_COLORS[instrument.volatility])}>
                        {instrument.volatility}
                      </p>
                    </div>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {selected && (() => {
        const instrument = INSTRUMENTS.find(i => i.symbol === selected);
        if (!instrument) return null;
        return (
          <div className={cn("flex items-center gap-3 mt-1 p-3 rounded-lg border", CATEGORY_COLORS[instrument.category])}>
            <span className="text-2xl">{instrument.flag1}</span>
            <div>
              <p className={cn("text-sm font-bold", CATEGORY_COLORS[instrument.category].split(" ")[0])}>
                {selected} selected
              </p>
              <p className="text-xs text-slate-500">{instrument.description}</p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
