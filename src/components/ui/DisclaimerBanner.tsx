"use client";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function DisclaimerBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-400",
        className
      )}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <p>
        <span className="font-semibold">Educational Use Only —</span>{" "}
        This tool performs pattern analysis for educational purposes only. It is{" "}
        <span className="font-semibold">not financial advice</span>, not a trade
        signal service, and does not predict market outcomes. Do not make trading
        decisions based on this analysis.
      </p>
    </div>
  );
}
