import {
  ShieldAlert,
  XCircle,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";

const DO_NOT_LIST = [
  "Buy now or sell now",
  "This trade will win",
  "Guaranteed setup or guaranteed profit",
  "Enter here — with a specific price",
  "Use this stop loss — with a specific price",
  "Take profit here — with a specific price",
  "This is a confirmed signal",
  "The market will go up or down",
  "Predict market direction with certainty",
];

const DO_LIST = [
  "Identify possible chart structures and patterns",
  "Describe market bias as bullish, bearish, or neutral based on visible structure",
  "Highlight possible support and resistance zones",
  "Note when patterns are candidates only — not confirmed",
  "Explain what could invalidate a structural reading",
  "Provide plain-English summaries of price action context",
  "Encourage users to study patterns and seek proper education",
];

const FAQ = [
  {
    q: "Is this app a trade signal service?",
    a: "No. This app is strictly an educational tool for learning about forex chart structures. It does not provide trade signals, buy or sell recommendations, or any form of financial advice.",
  },
  {
    q: "Can I use this analysis to make trading decisions?",
    a: "No. The analysis provided is for educational purposes only. Any trading or investment decision must be made through your own research, risk management, and if appropriate, advice from a licensed financial professional.",
  },
  {
    q: "Does the AI predict where price will go?",
    a: "No. The AI analyses visible chart structures and patterns from an educational standpoint only. No prediction of future price movement is made or implied.",
  },
  {
    q: "Are the patterns guaranteed to play out?",
    a: "No. Chart patterns are historical observations that sometimes precede certain price behaviours — but they are never guaranteed. Markets are dynamic, subject to news, liquidity, and many unpredictable factors.",
  },
  {
    q: "What should I do before trading?",
    a: "Conduct your own thorough research, understand risk management, practise on a demo account, and consider consulting a licensed financial advisor before committing real capital to any trading activity.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-full bg-grid">
      <Header
        title="Disclaimer & Responsible Use"
        subtitle="Important information about how to use this tool responsibly"
      />

      <div className="flex-1 px-4 lg:px-6 py-6 max-w-3xl mx-auto w-full space-y-6">
        {/* Main disclaimer */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-amber-400 mb-2">
                Not Financial Advice
              </h2>
              <p className="text-sm text-amber-300/80 leading-relaxed">
                AI Forex Pattern Analyser is an educational tool only. All analysis, pattern descriptions, market bias observations, and structural commentary provided by this application are for{" "}
                <strong>educational and learning purposes only</strong>. Nothing in this application constitutes financial advice, investment advice, trading signals, or a recommendation to buy or sell any financial instrument.
              </p>
            </div>
          </div>
        </div>

        {/* What this app does NOT do */}
        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <XCircle className="w-5 h-5 text-red-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              What This App Does NOT Do
            </h2>
          </div>
          <ul className="space-y-2.5">
            {DO_NOT_LIST.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                <XCircle className="w-4 h-4 text-red-400/70 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* What this app DOES do */}
        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              What This App DOES Do
            </h2>
          </div>
          <ul className="space-y-2.5">
            {DO_LIST.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-400/70 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* Educational use statement */}
        <Card>
          <div className="flex items-center gap-2.5 mb-3">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Educational Use Statement
            </h2>
          </div>
          <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
            <p>
              This application is designed for traders and students who want to learn how to read forex charts, understand common technical patterns, and develop their analytical thinking — not to automate trading decisions.
            </p>
            <p>
              Pattern analysis is a skill that takes significant time, practice, and real-market experience to develop. One tool, one pattern, or one analysis result is never sufficient on its own.
            </p>
            <p>
              Users are encouraged to combine any educational observation from this tool with independent research, proper risk management education, and consultation with qualified professionals.
            </p>
          </div>
        </Card>

        {/* Risk warning */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-400 mb-2">Risk Warning</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trading forex and other financial instruments carries a high level of risk. The majority of retail traders lose money. Past performance of any chart pattern or analytical method is not indicative of future results. Never trade with money you cannot afford to lose. This application accepts no liability for any trading losses or decisions made based on its educational content.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">FAQ</h2>
          </div>
          <div className="space-y-5">
            {FAQ.map((item, i) => (
              <div key={i} className="pb-5 border-b border-[#1e2535] last:border-0 last:pb-0">
                <p className="text-sm font-semibold text-slate-200 mb-1.5">{item.q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-center text-xs text-slate-700 pb-4">
          AI Forex Pattern Analyser — Educational Pattern Analysis Tool — Not Financial Advice
        </p>
      </div>
    </div>
  );
}
