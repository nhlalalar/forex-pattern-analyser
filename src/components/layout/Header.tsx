"use client";

import { Activity, Wifi } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-[#1e2535] bg-[#0d0f14]/80 backdrop-blur-sm sticky top-0 z-40">
      <div>
        {/* Mobile logo */}
        <div className="flex items-center gap-2 lg:hidden mb-0.5">
          <Activity className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Forex Analyser</span>
        </div>
        <h1 className="text-lg font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 text-emerald-400">
        <Wifi className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">Live</span>
      </div>
    </header>
  );
}
