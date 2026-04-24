"use client";

import {
  TrendingUp,
  TrendingDown,
  Pause,
  Target,
  ShieldX,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import { TradeLevels } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SignalCardProps {
  setup: TradeLevels;
  pair?: string;
}

function TPRow({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: string;
  note: string;
  color: string;
}) {
  return (
    <div className={cn("rounded-lg border p-3", color)}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">{label}</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-200">{value}</p>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{note}</p>
    </div>
  );
}

export function SignalCard({ setup, pair }: SignalCardProps) {
  const isBuy = setup.direction === "BUY";
  const isSell = setup.direction === "SELL";
  const isWait = setup.direction === "WAIT";

  return (
    <div className="space-y-3">
      {/* Direction Banner */}
      <div
        className={cn(
          "rounded-2xl border p-5 text-center relative overflow-hidden",
          isBuy && "border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent",
          isSell && "border-red-500/40 bg-gradient-to-br from-red-500/15 via-red-500/5 to-transparent",
          isWait && "border-slate-500/30 bg-gradient-to-br from-slate-500/10 via-slate-500/5 to-transparent"
        )}
      >
        {/* Glow circle */}
        <div
          className={cn(
            "absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-20",
            isBuy && "bg-emerald-500",
            isSell && "bg-red-500",
            isWait && "bg-slate-500"
          )}
        />

        <div className="relative flex flex-col items-center gap-2">
          <div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center border",
              isBuy && "bg-emerald-500/20 border-emerald-500/40",
              isSell && "bg-red-500/20 border-red-500/40",
              isWait && "bg-slate-500/20 border-slate-500/40"
            )}
          >
            {isBuy && <TrendingUp className="w-8 h-8 text-emerald-400" />}
            {isSell && <TrendingDown className="w-8 h-8 text-red-400" />}
            {isWait && <Pause className="w-8 h-8 text-slate-400" />}
          </div>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Signal</p>
            <p
              className={cn(
                "text-4xl font-black tracking-tight",
                isBuy && "text-emerald-400",
                isSell && "text-red-400",
                isWait && "text-slate-400"
              )}
            >
              {setup.direction}
            </p>
            {pair && <p className="text-sm font-bold text-slate-300 mt-1">{pair}</p>}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold border",
                setup.biasStrength === "Strong"
                  ? isBuy ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-red-500/20 border-red-500/40 text-red-300"
                  : setup.biasStrength === "Moderate"
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-slate-500/20 border-slate-500/40 text-slate-400"
              )}
            >
              {setup.biasStrength} Bias
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold border bg-blue-500/10 border-blue-500/30 text-blue-300">
              {setup.riskReward}
            </span>
          </div>
        </div>
      </div>

      {/* Entry Zone */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          {isBuy ? (
            <ArrowUpRight className="w-4 h-4 text-blue-400" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-blue-400" />
          )}
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Entry Zone</span>
        </div>
        <p className="text-sm font-semibold text-slate-200">{setup.entryZone}</p>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{setup.entryNote}</p>
      </div>

      {/* Stop Loss */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <ShieldX className="w-4 h-4 text-red-400" />
          <span className="text-xs font-bold text-red-400 uppercase tracking-wide">Stop Loss</span>
        </div>
        <p className="text-sm font-semibold text-slate-200">{setup.stopLoss}</p>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{setup.stopLossNote}</p>
      </div>

      {/* Take Profits */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" /> Take Profit Targets
        </p>
        <TPRow
          label="TP 1"
          value={setup.takeProfitOne}
          note={setup.takeProfitOneNote}
          color="border-emerald-500/20 bg-emerald-500/5"
        />
        <TPRow
          label="TP 2"
          value={setup.takeProfitTwo}
          note={setup.takeProfitTwoNote}
          color="border-emerald-500/15 bg-emerald-500/3"
        />
        {setup.takeProfitThree && (
          <TPRow
            label="TP 3"
            value={setup.takeProfitThree}
            note={setup.takeProfitThreeNote ?? ""}
            color="border-emerald-500/10 bg-emerald-500/3"
          />
        )}
      </div>

      {/* Session advice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-300 leading-relaxed">{setup.sessionAdvice}</p>
      </div>

      {/* Pip distance */}
      <div className="rounded-lg border border-[#1e2535] bg-[#1a2030] p-3">
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="text-slate-400 font-semibold">Risk distance: </span>
          {setup.pipDistance}
        </p>
      </div>
    </div>
  );
}
