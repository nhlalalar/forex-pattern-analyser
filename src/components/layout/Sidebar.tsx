"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  TrendingUp,
  BookOpen,
  History,
  ShieldAlert,
  ChartCandlestick,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Analyse Chart", href: "/analyse", icon: Upload },
  { label: "Pattern Library", href: "/patterns", icon: BookOpen },
  { label: "History", href: "/history", icon: History },
  { label: "Disclaimer", href: "/disclaimer", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-[#0d1117] border-r border-[#1e2535]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#1e2535]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30">
          <Activity className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white tracking-tight">Forex Analyser</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">AI Pattern Analysis</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#1a2030]"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div className="px-4 py-4 border-t border-[#1e2535]">
        <div className="rounded-lg bg-[#131720] border border-[#1e2535] p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <ChartCandlestick className="w-3.5 h-3.5 text-blue-400" />
            <p className="text-xs font-semibold text-slate-300">Educational Only</p>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            All analysis is for pattern education. Not financial advice.
          </p>
        </div>
      </div>
    </aside>
  );
}
