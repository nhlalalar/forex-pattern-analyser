"use client";

import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Target,
  ShieldX,
  Layers,
  Droplets,
  BarChart2,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { AnalysisResult } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, biasToBadgeVariant, confidenceToBadgeVariant, categoryToBadgeVariant } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

function BiasIcon({ bias }: { bias: string }) {
  if (bias === "Bullish") return <TrendingUp className="w-5 h-5 text-emerald-400" />;
  if (bias === "Bearish") return <TrendingDown className="w-5 h-5 text-red-400" />;
  return <Minus className="w-5 h-5 text-slate-400" />;
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
      <button
        className="w-full flex items-center justify-between group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2.5">
          <Icon className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-slate-200 uppercase tracking-wide">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-600" />
        )}
      </button>
      {open && <div className="mt-4 space-y-2.5">{children}</div>}
    </Card>
  );
}

function ZoneItem({ label, reason, color }: { label: string; reason: string; color: "green" | "red" | "amber" | "blue" | "purple" }) {
  const colors = {
    green: "border-emerald-500/30 bg-emerald-500/5",
    red: "border-red-500/30 bg-red-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
  };
  const dotColors = {
    green: "bg-emerald-400",
    red: "bg-red-400",
    amber: "bg-amber-400",
    blue: "bg-blue-400",
    purple: "bg-purple-400",
  };
  return (
    <div className={cn("rounded-lg border p-3", colors[color])}>
      <div className="flex items-start gap-2">
        <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", dotColors[color])} />
        <div>
          <p className="text-sm font-medium text-slate-200">{label}</p>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{reason}</p>
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
        <p className="text-xs text-amber-400 leading-relaxed">
          <span className="font-semibold">Disclaimer: </span>
          {result.disclaimer}
        </p>
      </div>

      {/* Hero summary card */}
      <div className="rounded-xl border border-[#1e2535] bg-gradient-to-br from-[#131720] to-[#0d1117] p-5">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center border",
                result.marketBias === "Bullish"
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : result.marketBias === "Bearish"
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-slate-500/10 border-slate-500/30"
              )}
            >
              <BiasIcon bias={result.marketBias} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Market Bias</p>
              <p className="text-xl font-bold text-white">{result.marketBias}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            <Badge variant={biasToBadgeVariant(result.marketBias)} pulse>
              {result.marketBias}
            </Badge>
            <Badge variant={confidenceToBadgeVariant(result.confidenceLevel)}>
              {result.confidenceLevel} Confidence
            </Badge>
            {result.pair && (
              <Badge variant="default">{result.pair}</Badge>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#1e2535]">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Trend Direction</p>
          <p className="text-sm text-slate-300 leading-relaxed">{result.trendDirection}</p>
        </div>
      </div>

      {/* Plain English Summary */}
      <Section title="Plain-English Summary" icon={FileText}>
        <p className="text-sm text-slate-300 leading-relaxed">{result.plainEnglishSummary}</p>
      </Section>

      {/* Detected Structures */}
      <Section title="Detected Structures" icon={Layers}>
        <ul className="space-y-2">
          {result.detectedStructures.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* Pattern Candidates */}
      <Section title="Pattern Candidates" icon={BarChart2}>
        <div className="space-y-3">
          {result.patternCandidates.map((p, i) => (
            <div key={i} className="rounded-lg border border-[#1e2535] bg-[#1a2030] p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-slate-200">{p.pattern}</span>
                <Badge variant={categoryToBadgeVariant(p.category)} className="text-[10px]">
                  {p.category}
                </Badge>
                <Badge variant="candidate" className="text-[10px]">
                  {p.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{p.explanation}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Support and Resistance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Section title="Support Zones" icon={TrendingUp} defaultOpen={true}>
          {result.supportZones.map((z, i) => (
            <ZoneItem key={i} label={z.zone} reason={z.reason} color="green" />
          ))}
        </Section>
        <Section title="Resistance Zones" icon={TrendingDown} defaultOpen={true}>
          {result.resistanceZones.map((z, i) => (
            <ZoneItem key={i} label={z.zone} reason={z.reason} color="red" />
          ))}
        </Section>
      </div>

      {/* Liquidity Zones */}
      <Section title="Possible Liquidity Zones" icon={Droplets} defaultOpen={false}>
        <div className="space-y-2">
          {result.liquidityZones.map((z, i) => (
            <ZoneItem key={i} label={z.area} reason={z.reason} color="blue" />
          ))}
        </div>
        <p className="text-xs text-slate-600 italic mt-2">
          Liquidity zones are educational observations only — not entry or exit signals.
        </p>
      </Section>

      {/* Invalidation Areas */}
      <Section title="Possible Invalidation Areas" icon={ShieldX} defaultOpen={false}>
        <div className="space-y-2">
          {result.invalidationAreas.map((z, i) => (
            <ZoneItem key={i} label={z.area} reason={z.reason} color="amber" />
          ))}
        </div>
      </Section>

      {/* Risk / Reward Observation */}
      <Section title="Risk–Reward Observation" icon={Target} defaultOpen={false}>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <p className="text-sm text-slate-300 leading-relaxed">{result.riskRewardObservation}</p>
        </div>
        <p className="text-xs text-slate-600 italic mt-2">
          This is not a specific trade setup or instruction. It is a general educational observation only.
        </p>
      </Section>
    </div>
  );
}
