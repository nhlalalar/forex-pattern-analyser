"use client";

import { ChevronDown, TrendingUp } from "lucide-react";
import { FOREX_PAIRS, ForexPair } from "@/lib/types";
import { cn } from "@/lib/utils";

const PAIR_METADATA: Record<string, { base: string; quote: string; flag1: string; flag2: string }> = {
  "EUR/USD": { base: "EUR", quote: "USD", flag1: "🇪🇺", flag2: "🇺🇸" },
  "GBP/USD": { base: "GBP", quote: "USD", flag1: "🇬🇧", flag2: "🇺🇸" },
  "USD/JPY": { base: "USD", quote: "JPY", flag1: "🇺🇸", flag2: "🇯🇵" },
  "XAU/USD": { base: "XAU", quote: "USD", flag1: "🥇", flag2: "🇺🇸" },
  "AUD/USD": { base: "AUD", quote: "USD", flag1: "🇦🇺", flag2: "🇺🇸" },
  "USD/CAD": { base: "USD", quote: "CAD", flag1: "🇺🇸", flag2: "🇨🇦" },
  "NZD/USD": { base: "NZD", quote: "USD", flag1: "🇳🇿", flag2: "🇺🇸" },
  "EUR/JPY": { base: "EUR", quote: "JPY", flag1: "🇪🇺", flag2: "🇯🇵" },
  "GBP/JPY": { base: "GBP", quote: "JPY", flag1: "🇬🇧", flag2: "🇯🇵" },
  "USD/CHF": { base: "USD", quote: "CHF", flag1: "🇺🇸", flag2: "🇨🇭" },
  "EUR/GBP": { base: "EUR", quote: "GBP", flag1: "🇪🇺", flag2: "🇬🇧" },
  "AUD/JPY": { base: "AUD", quote: "JPY", flag1: "🇦🇺", flag2: "🇯🇵" },
};

interface PairSelectorProps {
  selected: ForexPair | null;
  onSelect: (pair: ForexPair) => void;
}

export function PairSelector({ selected, onSelect }: PairSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 flex items-center gap-1.5">
        <TrendingUp className="w-3.5 h-3.5" />
        Select a currency pair for educational pattern analysis
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {FOREX_PAIRS.map((pair) => {
          const meta = PAIR_METADATA[pair];
          const isSelected = selected === pair;
          return (
            <button
              key={pair}
              onClick={() => onSelect(pair)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all",
                isSelected
                  ? "border-blue-500/50 bg-blue-600/15 text-blue-300"
                  : "border-[#1e2535] bg-[#1a2030] hover:border-[#2a3550] hover:bg-[#1e2535] text-slate-300"
              )}
            >
              <span className="text-base leading-none">{meta?.flag1}</span>
              <div className="flex-1 min-w-0">
                <p className={cn("text-xs font-bold", isSelected ? "text-blue-300" : "text-slate-200")}>
                  {pair}
                </p>
                {meta && (
                  <p className="text-[10px] text-slate-500 truncate">
                    {meta.base} / {meta.quote}
                  </p>
                )}
              </div>
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="flex items-center gap-2 mt-2 p-3 rounded-lg bg-blue-600/10 border border-blue-500/20">
          <span className="text-lg">{PAIR_METADATA[selected]?.flag1}</span>
          <span className="text-lg">{PAIR_METADATA[selected]?.flag2}</span>
          <div>
            <p className="text-sm font-bold text-blue-300">{selected} selected</p>
            <p className="text-xs text-slate-500">Ready for educational analysis</p>
          </div>
        </div>
      )}
    </div>
  );
}
