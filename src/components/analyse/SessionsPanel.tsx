"use client";

import { useEffect, useState } from "react";
import { Clock, Zap } from "lucide-react";
import { TRADING_SESSIONS, TradingSession } from "@/lib/types";
import { cn } from "@/lib/utils";

function getUTCHour(): number {
  return new Date().getUTCHours();
}

function isSessionActive(session: TradingSession, utcHour: number): boolean {
  if (session.openUTC < session.closeUTC) {
    return utcHour >= session.openUTC && utcHour < session.closeUTC;
  }
  // Wraps midnight (Sydney)
  return utcHour >= session.openUTC || utcHour < session.closeUTC;
}

function formatUTC(h: number): string {
  return `${String(h).padStart(2, "0")}:00 UTC`;
}

const SESSION_COLORS: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    dot: "bg-purple-400",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
};

export function SessionsPanel() {
  const [utcHour, setUtcHour] = useState<number>(getUTCHour());
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setUtcHour(now.getUTCHours());
      setUtcTime(
        `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")} UTC`
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const activeSessions = TRADING_SESSIONS.filter((s) => isSessionActive(s, utcHour));
  const isOverlap =
    activeSessions.some((s) => s.name === "London") &&
    activeSessions.some((s) => s.name === "New York");

  return (
    <div className="rounded-xl border border-[#1e2535] bg-[#131720] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2535]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Trading Sessions
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isOverlap && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[10px] font-bold text-amber-400 animate-pulse">
              <Zap className="w-3 h-3" /> OVERLAP — HIGH VOLATILITY
            </span>
          )}
          <span className="text-xs font-mono text-slate-500">{utcTime}</span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {TRADING_SESSIONS.map((session) => {
          const active = isSessionActive(session, utcHour);
          const colors = SESSION_COLORS[session.color];

          return (
            <div
              key={session.name}
              className={cn(
                "rounded-lg border p-3 transition-all",
                active ? `${colors.border} ${colors.bg}` : "border-[#1e2535] bg-[#1a2030]"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                    active ? `${colors.dot} shadow-lg` : "bg-slate-700"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm font-bold",
                          active ? colors.text : "text-slate-500"
                        )}
                      >
                        {session.name}
                      </span>
                      {active && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-bold border",
                            colors.border,
                            colors.bg,
                            colors.text
                          )}
                        >
                          OPEN
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-600">
                      {formatUTC(session.openUTC)} — {formatUTC(session.closeUTC)}
                    </span>
                  </div>

                  <p className={cn("text-xs leading-relaxed", active ? "text-slate-400" : "text-slate-600")}>
                    {session.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {session.bestPairs.map((pair) => (
                      <span
                        key={pair}
                        className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-semibold border",
                          active
                            ? `${colors.border} ${colors.bg} ${colors.text}`
                            : "border-[#1e2535] bg-[#131720] text-slate-600"
                        )}
                      >
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* London/NY Overlap note */}
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 mt-1">
          <p className="text-xs font-bold text-amber-400 mb-1">London / New York Overlap</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-mono text-amber-300">13:00 – 17:00 UTC</span> — The highest volatility window of the trading day. All major pairs are fully liquid. Best time for breakout and momentum trades.
          </p>
        </div>
      </div>
    </div>
  );
}
