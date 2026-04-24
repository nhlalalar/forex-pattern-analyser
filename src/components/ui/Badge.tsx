"use client";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "bullish"
  | "bearish"
  | "neutral"
  | "candidate"
  | "confirmed"
  | "invalidated"
  | "high-risk"
  | "low"
  | "medium"
  | "high"
  | "reversal"
  | "continuation"
  | "bilateral"
  | "default";

const variants: Record<BadgeVariant, string> = {
  bullish: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  bearish: "bg-red-500/15 text-red-400 border border-red-500/30",
  neutral: "bg-slate-500/15 text-slate-400 border border-slate-500/30",
  candidate: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  confirmed: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  invalidated: "bg-red-500/15 text-red-400 border border-red-500/30",
  "high-risk": "bg-orange-500/15 text-orange-400 border border-orange-500/30",
  low: "bg-slate-500/15 text-slate-400 border border-slate-500/30",
  medium: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  high: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  reversal: "bg-red-500/15 text-red-400 border border-red-500/30",
  continuation: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  bilateral: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  default: "bg-slate-700/40 text-slate-300 border border-slate-600/30",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

export function Badge({ variant = "default", children, className, pulse }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide",
        variants[variant],
        pulse && "badge-pulse",
        className
      )}
    >
      {children}
    </span>
  );
}

export function biasToBadgeVariant(bias: string): BadgeVariant {
  const b = bias.toLowerCase();
  if (b === "bullish") return "bullish";
  if (b === "bearish") return "bearish";
  if (b === "neutral") return "neutral";
  return "default";
}

export function confidenceToBadgeVariant(level: string): BadgeVariant {
  const l = level.toLowerCase();
  if (l === "low") return "low";
  if (l === "medium") return "medium";
  if (l === "high") return "high";
  return "default";
}

export function categoryToBadgeVariant(cat: string): BadgeVariant {
  const c = cat.toLowerCase();
  if (c === "reversal") return "reversal";
  if (c === "continuation") return "continuation";
  if (c === "bilateral") return "bilateral";
  return "default";
}
