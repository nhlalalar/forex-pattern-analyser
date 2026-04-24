"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Upload, ChartCandlestick, Sparkles, RotateCcw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { Button } from "@/components/ui/Button";
import { UploadZone } from "@/components/analyse/UploadZone";
import { PairSelector } from "@/components/analyse/PairSelector";
import { AnalysisResults } from "@/components/analyse/AnalysisResults";
import { AnalysisResult, AnalysisMode, ForexPair } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "upload" | "pair";

function AnalysePage() {
  const searchParams = useSearchParams();
  const defaultTab: Tab = searchParams.get("mode") === "pair" ? "pair" : "upload";

  const [tab, setTab] = useState<Tab>(defaultTab);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState<ForexPair | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const canAnalyse =
    (tab === "upload" && selectedFile !== null) ||
    (tab === "pair" && selectedPair !== null);

  const handleAnalyse = async () => {
    setLoading(true);
    setResult(null);
    try {
      const body: Record<string, string> = { mode: tab };
      if (tab === "pair" && selectedPair) body.pair = selectedPair;
      if (tab === "upload" && previewUrl) body.imageUrl = previewUrl;

      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedPair(null);
  };

  return (
    <div className="flex flex-col min-h-full bg-grid">
      <Header
        title="Analyse"
        subtitle="Upload a chart or select a currency pair for educational pattern analysis"
      />

      <div className="flex-1 px-4 lg:px-6 py-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left panel */}
          <div className="lg:col-span-2 space-y-4">
            <DisclaimerBanner />

            {/* Mode tabs */}
            <div className="rounded-xl border border-[#1e2535] bg-[#131720] p-1 flex gap-1">
              <button
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
                  tab === "upload"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#1a2030]"
                )}
                onClick={() => { setTab("upload"); setResult(null); }}
              >
                <Upload className="w-4 h-4" /> Upload Chart
              </button>
              <button
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
                  tab === "pair"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#1a2030]"
                )}
                onClick={() => { setTab("pair"); setResult(null); }}
              >
                <ChartCandlestick className="w-4 h-4" /> Select Pair
              </button>
            </div>

            {/* Input area */}
            <div className="rounded-xl border border-[#1e2535] bg-[#131720] p-4 space-y-4">
              {tab === "upload" ? (
                <UploadZone
                  onFileSelected={(f, url) => { setSelectedFile(f); setPreviewUrl(url); setResult(null); }}
                  selectedFile={selectedFile}
                  previewUrl={previewUrl}
                  onClear={() => { setSelectedFile(null); setPreviewUrl(null); setResult(null); }}
                />
              ) : (
                <PairSelector
                  selected={selectedPair}
                  onSelect={(p) => { setSelectedPair(p); setResult(null); }}
                />
              )}
            </div>

            {/* CTA */}
            <div className="flex gap-2">
              <Button
                onClick={handleAnalyse}
                disabled={!canAnalyse}
                loading={loading}
                icon={<Sparkles className="w-4 h-4" />}
                className="flex-1"
                size="lg"
              >
                {loading ? "Analysing…" : "Run Pattern Analysis"}
              </Button>
              {result && (
                <Button variant="secondary" onClick={handleReset} size="lg" icon={<RotateCcw className="w-4 h-4" />}>
                  Reset
                </Button>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span className="text-sm font-semibold text-blue-400">Scanning chart structure…</span>
                </div>
                <div className="space-y-2">
                  {["Identifying trend direction", "Detecting pattern candidates", "Mapping support and resistance", "Building educational summary"].map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" style={{ animationDelay: `${i * 0.2}s` }} />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How it works */}
            {!result && !loading && (
              <div className="rounded-xl border border-[#1e2535] bg-[#131720] p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">How it works</p>
                <ol className="space-y-2.5">
                  {[
                    { step: "1", label: tab === "upload" ? "Upload your forex chart screenshot" : "Select a currency pair from the grid" },
                    { step: "2", label: "Click 'Run Pattern Analysis'" },
                    { step: "3", label: "Review the structured educational output" },
                    { step: "4", label: "Use the Pattern Library to learn more" },
                  ].map(({ step, label }) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs flex items-center justify-center flex-shrink-0 font-bold">
                        {step}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed">{label}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Right panel — results */}
          <div className="lg:col-span-3">
            {result ? (
              <AnalysisResults result={result} />
            ) : (
              <div className="rounded-xl border border-dashed border-[#1e2535] flex flex-col items-center justify-center py-20 px-8 text-center gap-4 h-full min-h-[400px]">
                <div className="w-16 h-16 rounded-2xl bg-[#1a2030] border border-[#1e2535] flex items-center justify-center">
                  <ChartCandlestick className="w-7 h-7 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-400">No analysis yet</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
                    {tab === "upload"
                      ? "Upload a forex chart screenshot and click 'Run Pattern Analysis' to see the educational breakdown."
                      : "Select a currency pair from the grid and click 'Run Pattern Analysis' to begin."}
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

export default function AnalysePageWrapper() {
  return (
    <Suspense>
      <AnalysePage />
    </Suspense>
  );
}
