"use client";

import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  ShieldX,
  Layers,
  Droplets,
  FileText,
  ChevronDown,
  ChevronUp,
  BarChart2,
} from "lucide-react";
import { useState } from "react";
import { AnalysisResult } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge, biasToBadgeVariant, confidenceToBadgeVariant, categoryToBadgeVariant } from "@/components/ui/Badge";

import { SignalCard } from "./SignalCard";
import { SessionsPanel } from "./SessionsPanel";
import { HistoricalLevels } from "./HistoricalLevels";
import { cn } from "@/lib/utils";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card>
      <button className="w-full flex items-center justify-between" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2.5">
          <Icon className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
      </button>
      {open && <div className="mt-4 space-y-2.5">{children}</div>}
    </Card>
  );
}

function ZoneItem({ label, reason, priceLevel, color }: { label: string; reason: string; priceLevel?: string; color: "green" | "red" | "amber" | "blue" }) {
  const colors = {
    green: "border-emerald-500/25 bg-emerald-500/5",
    red: "border-red-500/25 bg-red-500/5",
    amber: "border-amber-500/25 bg-amber-500/5",
    blue: "border-blue-500/25 bg-blue-500/5",
  };
  const dots = { green: "bg-emerald-400", red: "bg-red-400", amber: "bg-amber-400", blue: "bg-blue-400" };

  return (
    <div className={cn("rounded-lg border p-3", colors[color])}>
      <div className="flex items-start gap-2">
        <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", dots[color])} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-200">{label}</p>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{reason}</p>
          {priceLevel && (
            <p className="text-[10px] text-slate-600 mt-1 italic border-t border-[#1e2535] pt-1">{priceLevel}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <div className="space-y-4 fade-in-up">
      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-400 leading-relaxed">{result.disclaimer}</p>
      </div>

      {/* Bias summary row */}
      <div className="rounded-xl border border-[#1e2535] bg-[#131720] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0",
              result.marketBias === "Bullish" ? "bg-emerald-500/10 border-emerald-500/30" :
              result.marketBias === "Bearish" ? "bg-red-500/10 border-red-500/30" :
              "bg-slate-500/10 border-slate-500/30"
            )}
          >
            {result.marketBias === "Bullish" && <TrendingUp className="w-5 h-5 text-emerald-400" />}
            {result.marketBias === "Bearish" && <TrendingDown className="w-5 h-5 text-red-400" />}
            {result.marketBias === "Neutral" && <Minus className="w-5 h-5 text-slate-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Chart Bias</p>
            <p className="text-base font-bold text-white">{result.marketBias}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={biasToBadgeVariant(result.marketBias)} pulse>{result.marketBias}</Badge>
            <Badge variant={confidenceToBadgeVariant(result.confidenceLevel)}>{result.confidenceLevel} Confidence</Badge>
            {result.pair && <Badge variant="default">{result.pair}</Badge>}
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mt-3 pt-3 border-t border-[#1e2535]">
          {result.trendDirection}
        </p>
      </div>

      {/* Signal Card — primary output */}
      <SignalCard setup={result.tradeSetup} pair={result.pair} />

      {/* Sessions */}
      <SessionsPanel />

      {/* Historical Levels — only if a pair is known */}
      {result.pair && <HistoricalLevels pair={result.pair} />}

      {/* Plain English Summary */}
      <Section title="Chart Summary" icon={FileText}>
        <p className="text-sm text-slate-300 leading-relaxed">{result.plainEnglishSummary}</p>
      </Section>

      {/* Detected Structures */}
      <Section title="Detected Structures" icon={Layers} defaultOpen={false}>
        <ul className="space-y-2">
          {result.detectedStructures.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
              <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* Pattern Candidates */}
      <Section title="Pattern Candidates" icon={BarChart2} defaultOpen={false}>
        <div className="space-y-3">
          {result.patternCandidates.map((p, i) => (
            <div key={i} className="rounded-lg border border-[#1e2535] bg-[#1a2030] p-3">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-slate-200">{p.pattern}</span>
                <Badge variant={categoryToBadgeVariant(p.category)} className="text-[10px]">{p.category}</Badge>
                <Badge variant="candidate" className="text-[10px]">{p.status}</Badge>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{p.explanation}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Support / Resistance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Section title="Support Zones" icon={TrendingUp} defaultOpen={false}>
          {result.supportZones.map((z, i) => (
            <ZoneItem key={i} label={z.zone} reason={z.reason} priceLevel={z.priceLevel} color="green" />
          ))}
        </Section>
        <Section title="Resistance Zones" icon={TrendingDown} defaultOpen={false}>
          {result.resistanceZones.map((z, i) => (
            <ZoneItem key={i} label={z.zone} reason={z.reason} priceLevel={z.priceLevel} color="red" />
          ))}
        </Section>
      </div>

      {/* Liquidity Zones */}
      <Section title="Liquidity Zones" icon={Droplets} defaultOpen={false}>
        {result.liquidityZones.map((z, i) => (
          <ZoneItem key={i} label={z.area} reason={z.reason} color="blue" />
        ))}
      </Section>

      {/* Invalidation */}
      <Section title="Invalidation Areas" icon={ShieldX} defaultOpen={false}>
        {result.invalidationAreas.map((z, i) => (
          <ZoneItem key={i} label={z.area} reason={z.reason} color="amber" />
        ))}
      </Section>
    </div>
  );
}
