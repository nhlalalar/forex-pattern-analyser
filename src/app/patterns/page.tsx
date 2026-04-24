"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Badge, categoryToBadgeVariant, biasToBadgeVariant } from "@/components/ui/Badge";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { PATTERN_LIBRARY } from "@/lib/patterns";
import { PatternInfo } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | "Reversal" | "Continuation" | "Bilateral";

function PatternCard({ pattern }: { pattern: PatternInfo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card hover className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3 className="text-sm font-bold text-white">{pattern.name}</h3>
            <Badge variant={categoryToBadgeVariant(pattern.category)} className="text-[10px]">
              {pattern.category}
            </Badge>
            {pattern.bias !== "Depends" && (
              <Badge variant={biasToBadgeVariant(pattern.bias)} className="text-[10px]">
                {pattern.bias}
              </Badge>
            )}
            {pattern.bias === "Depends" && (
              <Badge variant="neutral" className="text-[10px]">Context-Dependent</Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{pattern.description}</p>
        </div>
        <button className="flex-shrink-0 text-slate-600 hover:text-slate-400 transition-colors mt-0.5">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-[#1e2535] space-y-4" onClick={(e) => e.stopPropagation()}>
          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</p>
            <p className="text-sm text-slate-300 leading-relaxed">{pattern.description}</p>
          </div>

          {/* Characteristics */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Characteristics</p>
            </div>
            <ul className="space-y-1.5">
              {pattern.characteristics.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* What to watch */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">What to Watch (Educational)</p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{pattern.whatToWatch}</p>
          </div>

          {/* Common mistakes */}
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Common Mistakes</p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{pattern.commonMistakes}</p>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-600 italic">
            <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            This educational description does not constitute financial advice or a trade recommendation.
          </div>
        </div>
      )}
    </Card>
  );
}

export default function PatternsPage() {
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");

  const categories: CategoryFilter[] = ["All", "Reversal", "Continuation", "Bilateral"];

  const filtered = PATTERN_LIBRARY.filter((p) => {
    const matchesCategory = filter === "All" || p.category === filter;
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const counts = {
    All: PATTERN_LIBRARY.length,
    Reversal: PATTERN_LIBRARY.filter((p) => p.category === "Reversal").length,
    Continuation: PATTERN_LIBRARY.filter((p) => p.category === "Continuation").length,
    Bilateral: PATTERN_LIBRARY.filter((p) => p.category === "Bilateral").length,
  };

  return (
    <div className="flex flex-col min-h-full bg-grid">
      <Header
        title="Pattern Library"
        subtitle="Educational reference for common forex chart structures"
      />

      <div className="flex-1 px-4 lg:px-6 py-6 max-w-4xl mx-auto w-full space-y-6">
        <DisclaimerBanner />

        {/* Intro */}
        <div className="rounded-xl border border-[#1e2535] bg-[#131720] p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white mb-1">Educational Pattern Reference</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                This library documents common chart patterns used in technical analysis education. Each pattern includes a description, key characteristics, and what to observe — all for learning purposes only. No pattern guarantees a specific market outcome. Context, confirmation, and risk awareness are always essential.
              </p>
            </div>
          </div>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search patterns…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#1e2535] bg-[#131720] text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-[#1a2030] transition-colors"
          />
          <div className="flex gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
                  filter === cat
                    ? "bg-blue-600 text-white"
                    : "bg-[#131720] border border-[#1e2535] text-slate-400 hover:text-slate-200 hover:bg-[#1a2030]"
                )}
              >
                {cat}
                <span className={cn("ml-1.5 px-1.5 py-0.5 rounded-full text-[10px]",
                  filter === cat ? "bg-blue-500/50 text-blue-100" : "bg-[#1e2535] text-slate-500"
                )}>
                  {counts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pattern cards */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((pattern) => (
              <PatternCard key={pattern.name} pattern={pattern} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-sm text-slate-500">No patterns match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
