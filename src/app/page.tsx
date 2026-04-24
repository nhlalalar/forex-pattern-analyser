import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Upload,
  ChartCandlestick,
  BookOpen,
  ArrowRight,
  Activity,
  Zap,
  Shield,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { MOCK_HISTORY } from "@/lib/mockAnalysis";
import { formatTimestamp } from "@/lib/utils";

const STATS = [
  { label: "Patterns Tracked", value: "18+", icon: ChartCandlestick, color: "text-blue-400" },
  { label: "Pattern Categories", value: "3", icon: Activity, color: "text-purple-400" },
  { label: "Analysis Mode", value: "AI", icon: Zap, color: "text-amber-400" },
  { label: "Safety First", value: "100%", icon: Shield, color: "text-emerald-400" },
];

const FEATURES = [
  {
    icon: Upload,
    title: "Upload Chart Screenshot",
    description:
      "Upload a forex chart image and receive an educational structural analysis — bias, zones, pattern candidates, and risk areas.",
    href: "/analyse",
    cta: "Upload Chart",
    color: "blue",
  },
  {
    icon: ChartCandlestick,
    title: "Select Currency Pair",
    description:
      "Choose from common forex pairs like EUR/USD, GBP/USD, XAU/USD and receive educational context on possible structural observations.",
    href: "/analyse?mode=pair",
    cta: "Select Pair",
    color: "purple",
  },
  {
    icon: BookOpen,
    title: "Pattern Library",
    description:
      "Explore an educational library of forex chart patterns — reversal, continuation, and bilateral — with plain-English explanations.",
    href: "/patterns",
    cta: "Explore Patterns",
    color: "emerald",
  },
];

function BiasIcon({ bias }: { bias: string }) {
  if (bias === "Bullish") return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
  if (bias === "Bearish") return <TrendingDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-slate-400" />;
}

export default function DashboardPage() {
  const recent = MOCK_HISTORY.slice(0, 3);

  return (
    <div className="flex flex-col min-h-full bg-grid">
      <Header title="Dashboard" subtitle="AI-powered forex pattern education" />

      <div className="flex-1 px-4 lg:px-6 py-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* Disclaimer */}
        <DisclaimerBanner />

        {/* Hero */}
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#131720] to-purple-600/5 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                  AI Pattern Analysis
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                Understand forex chart structures through education
              </h2>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed max-w-xl">
                Upload a chart screenshot or select a currency pair to receive
                plain-English pattern analysis — including market bias, support and
                resistance zones, pattern candidates, and risk areas. Always
                educational, never a signal.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <Link
                  href="/analyse"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Start Analysis
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/patterns"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e2535] hover:bg-[#263040] text-slate-200 text-sm font-semibold border border-[#2a3550] transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Pattern Library
                </Link>
              </div>
            </div>

            {/* SVG chart illustration */}
            <div className="hidden lg:block w-64 h-40 rounded-xl border border-[#1e2535] bg-[#0d1117] relative overflow-hidden flex-shrink-0">
              <svg viewBox="0 0 256 160" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120].map((y) => (
                  <line key={y} x1="0" y1={y} x2="256" y2={y} stroke="#1e2535" strokeWidth="1" />
                ))}
                {[64, 128, 192].map((x) => (
                  <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="#1e2535" strokeWidth="1" />
                ))}
                <polygon
                  points="0,130 30,110 55,120 80,90 105,95 130,70 155,80 180,55 210,65 240,45 256,50 256,160 0,160"
                  fill="url(#chartGrad)"
                />
                <polyline
                  points="0,130 30,110 55,120 80,90 105,95 130,70 155,80 180,55 210,65 240,45 256,50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                <line x1="80" y1="90" x2="210" y2="90" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                <line x1="130" y1="55" x2="256" y2="55" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
              </svg>
              <div className="absolute top-2 left-2">
                <span className="text-[10px] text-emerald-400 font-semibold">EUR/USD</span>
              </div>
              <div className="absolute bottom-2 right-2">
                <Badge variant="bullish" className="text-[10px]">
                  Bullish
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="text-center py-4">
              <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </Card>
          ))}
        </div>

        {/* Feature cards */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Get Started
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, title, description, href, cta, color }) => (
              <Link key={href} href={href} className="block group">
                <Card hover className="h-full flex flex-col gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      color === "blue"
                        ? "bg-blue-600/20 border border-blue-500/30"
                        : color === "purple"
                        ? "bg-purple-600/20 border border-purple-500/30"
                        : "bg-emerald-600/20 border border-emerald-500/30"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        color === "blue"
                          ? "text-blue-400"
                          : color === "purple"
                          ? "text-purple-400"
                          : "text-emerald-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:gap-2 transition-all">
                    {cta} <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent analyses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Recent Analyses
            </h2>
            <Link
              href="/history"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <Card>
            <div className="divide-y divide-[#1e2535]">
              {recent.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1a2030] border border-[#1e2535] flex-shrink-0">
                    <BiasIcon bias={item.marketBias} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-slate-200">
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
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {item.patternCandidates[0]?.pattern ?? "Pattern analysis"}
                    </p>
                  </div>
                  <span className="text-xs text-slate-600 flex-shrink-0">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
