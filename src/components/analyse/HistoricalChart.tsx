"use client";

import { useMemo } from "react";
import { OHLCBar } from "@/lib/types";

interface HistoricalChartProps {
  bars: OHLCBar[];
  trend: "Bullish" | "Bearish" | "Neutral";
  currentPrice: number;
  height?: number;
}

export function HistoricalChart({ bars, trend, currentPrice, height = 120 }: HistoricalChartProps) {
  const W = 600;
  const H = height;
  const PAD = { top: 8, right: 4, bottom: 20, left: 4 };

  const chartData = useMemo(() => {
    if (bars.length < 2) return null;

    // Downsample to max 200 points for performance
    const step = Math.max(1, Math.floor(bars.length / 200));
    const sampled = bars.filter((_, i) => i % step === 0);

    const closes = sampled.map((b) => b.close);
    const minPrice = Math.min(...closes);
    const maxPrice = Math.max(...closes);
    const range = maxPrice - minPrice || 1;

    const toX = (i: number) => PAD.left + (i / (sampled.length - 1)) * (W - PAD.left - PAD.right);
    const toY = (price: number) => PAD.top + (1 - (price - minPrice) / range) * (H - PAD.top - PAD.bottom);

    const points = sampled.map((b, i) => `${toX(i)},${toY(b.close)}`).join(" ");
    const areaPoints = [
      `${PAD.left},${H - PAD.bottom}`,
      ...sampled.map((b, i) => `${toX(i)},${toY(b.close)}`),
      `${W - PAD.right},${H - PAD.bottom}`,
    ].join(" ");

    // Current price line
    const currentY = toY(currentPrice);

    // Year labels
    const yearLabels: { x: number; year: number }[] = [];
    let lastYear = -1;
    sampled.forEach((b, i) => {
      const yr = new Date(b.timestamp * 1000).getFullYear();
      if (yr !== lastYear) {
        yearLabels.push({ x: toX(i), year: yr });
        lastYear = yr;
      }
    });

    // ATH and ATL markers
    const athIdx = closes.indexOf(Math.max(...closes));
    const atlIdx = closes.indexOf(Math.min(...closes));

    return { points, areaPoints, currentY, yearLabels, athIdx, atlIdx, sampled, toX, toY, minPrice, maxPrice };
  }, [bars, currentPrice, H]);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-20 text-xs text-slate-600">
        No chart data available
      </div>
    );
  }

  const strokeColor =
    trend === "Bullish" ? "#10b981" : trend === "Bearish" ? "#ef4444" : "#3b82f6";
  const gradientId = `chartGrad_${trend}`;

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <polygon points={chartData.areaPoints} fill={`url(#${gradientId})`} />

        {/* Price line */}
        <polyline
          points={chartData.points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Current price line */}
        <line
          x1={PAD.left}
          y1={chartData.currentY}
          x2={W - PAD.right}
          y2={chartData.currentY}
          stroke={strokeColor}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.5"
        />

        {/* ATH dot */}
        <circle
          cx={chartData.toX(chartData.athIdx)}
          cy={chartData.toY(chartData.sampled[chartData.athIdx]?.close ?? 0)}
          r="3"
          fill="#10b981"
          opacity="0.8"
        />

        {/* ATL dot */}
        <circle
          cx={chartData.toX(chartData.atlIdx)}
          cy={chartData.toY(chartData.sampled[chartData.atlIdx]?.close ?? 0)}
          r="3"
          fill="#ef4444"
          opacity="0.8"
        />

        {/* Year labels */}
        {chartData.yearLabels.map(({ x, year }) => (
          <text
            key={year}
            x={x}
            y={H - 4}
            fill="#374151"
            fontSize="9"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {year}
          </text>
        ))}
      </svg>
    </div>
  );
}
