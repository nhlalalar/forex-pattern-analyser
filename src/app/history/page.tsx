"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Upload,
  ChartCandlestick,
  Clock,
  Search,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { AnalysisResults } from "@/components/analyse/AnalysisResults";
import { MOCK_HISTORY } from "@/lib/mockAnalysis";
import { AnalysisResult } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";
import { cn } from "@/lib/utils";

function BiasIcon({ bias }: { bias: string }) {
  if (bias === "Bullish") return <TrendingUp className="w-4 h-4 text-emerald-400" />;
  if (bias === "Bearish") return <TrendingDown className="w-4 h-4 text-red-400" />;
  return <Minus className="w-4 h-4 text-slate-400" />;
}

export default function HistoryPage() {
  const [selected, setSelected] = useState<AnalysisResult | null>(null);
  const [search, setSearch] = useState("");

  const filtered = MOCK_HISTORY.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.marketBias.toLowerCase().includes(q) ||
      (item.pair?.toLowerCase().includes(q) ?? false) ||
      item.patternCandidates.some((p) => p.pattern.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col min-h-full bg-grid">
      <Header
        title="Analysis History"
        subtitle="Review previous educational chart analyses"
      />

      <div className="flex-1 px-4 lg:px-6 py-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* History list */}
          <div className="lg:col-span-2 space-y-4">
            <DisclaimerBanner />

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="text"
                placeholder="Search history…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#1e2535] bg-[#131720] text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            {/* Items */}
            <Card className="p-0 overflow-hidden">
              {filtered.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-500">No history found.</p>
                </div>
              ) : (
                <div className="divide-y divide-[#1e2535]">
                  {filtered.map((item) => (
                    <button
                      key={item.id}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#1a2030] transition-colors",
                        selected?.id === item.id && "bg-blue-600/10 border-l-2 border-blue-500"
                      )}
                      onClick={() => setSelected(item)}
                    >
                      <div
                        className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center border flex-shrink-0",
                          item.marketBias === "Bullish"
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : item.marketBias === "Bearish"
                            ? "bg-red-500/10 border-red-500/30"
                            : "bg-slate-500/10 border-slate-500/30"
                        )}
                      >
                        <BiasIcon bias={item.marketBias} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-slate-200">
                            {item.mode === "pair" ? item.pair : "Chart Upload"}
                          </span>
                          <Badge
                            variant={
                              item.marketBias === "Bullish"
                                ? "bullish"
                                : item.marketBias === "Bearish"
                                ? "bearish"
                                : "neutral"
                            }
                            className="text-[10px]"
                          >
                            {item.marketBias}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {item.mode === "pair" ? (
                            <ChartCandlestick className="w-3 h-3 text-slate-600" />
                          ) : (
                            <Upload className="w-3 h-3 text-slate-600" />
                          )}
                          <span className="text-xs text-slate-600 truncate">
                            {item.patternCandidates[0]?.pattern ?? "Pattern analysis"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-700" />
                          <span className="text-[10px] text-slate-700">
                            {formatTimestamp(item.timestamp)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-700 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            <p className="text-xs text-slate-600 text-center">
              Showing mock history data — {filtered.length} of {MOCK_HISTORY.length} analyses
            </p>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3">
            {selected ? (
              <AnalysisResults result={selected} />
            ) : (
              <div className="rounded-xl border border-dashed border-[#1e2535] flex flex-col items-center justify-center py-20 px-8 text-center gap-4 h-full min-h-[400px]">
                <div className="w-16 h-16 rounded-2xl bg-[#1a2030] border border-[#1e2535] flex items-center justify-center">
                  <Clock className="w-7 h-7 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-400">Select an analysis to review</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
                    Click any item on the left to view the full educational pattern analysis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
