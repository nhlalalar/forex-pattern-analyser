import { PatternInfo } from "./types";

export const PATTERN_LIBRARY: PatternInfo[] = [
  // ─── Reversal Patterns ────────────────────────────────────────────────────
  {
    name: "Head and Shoulders",
    category: "Reversal",
    bias: "Bearish",
    description:
      "A three-peak structure where the middle peak (head) is highest, flanked by two lower peaks (shoulders). Signals a possible trend reversal from bullish to bearish.",
    characteristics: [
      "Left shoulder forms on declining volume",
      "Head forms on the highest volume",
      "Right shoulder forms with lower volume",
      "Neckline connects the two troughs",
    ],
    whatToWatch:
      "Watch for a break and close below the neckline as a possible confirmation signal. Volume decline on the right shoulder can add weight to the pattern.",
    commonMistakes:
      "Treating every three-peak structure as a H&S. Pattern is only a candidate until the neckline is breached with conviction.",
  },
  {
    name: "Inverse Head and Shoulders",
    category: "Reversal",
    bias: "Bullish",
    description:
      "The mirror image of Head and Shoulders, forming at the bottom of a downtrend. Signals a possible reversal from bearish to bullish.",
    characteristics: [
      "Three troughs with the middle being the deepest",
      "Volume typically increases on the right shoulder rally",
      "Neckline acts as possible resistance",
    ],
    whatToWatch:
      "A break above the neckline on elevated volume may suggest the pattern is playing out. Price retesting the neckline as support is a common follow-through.",
    commonMistakes:
      "Entering before neckline breakout. The pattern is only a candidate until confirmed.",
  },
  {
    name: "Double Top",
    category: "Reversal",
    bias: "Bearish",
    description:
      "Price tests the same resistance area twice and fails both times, potentially signalling exhaustion of the uptrend.",
    characteristics: [
      "Two peaks at approximately the same price level",
      "A trough (neckline) between the two peaks",
      "Volume often lower on the second peak",
    ],
    whatToWatch:
      "Break below the neckline (the trough between peaks) may validate the pattern. Depth of the pattern can hint at possible measured-move targets.",
    commonMistakes:
      "Assuming two highs automatically mean a double top. Context and trend direction matter greatly.",
  },
  {
    name: "Double Bottom",
    category: "Reversal",
    bias: "Bullish",
    description:
      "Price tests the same support area twice and holds both times, potentially signalling exhaustion of the downtrend.",
    characteristics: [
      "Two troughs at approximately the same price level",
      "A peak (neckline) between the two troughs",
      "Second trough may be slightly higher",
    ],
    whatToWatch:
      "Break above the neckline may validate the pattern. Look for increasing volume on the second bounce.",
    commonMistakes:
      "Entering at the second trough before confirmation. Price can always make a new low.",
  },
  {
    name: "Triple Top",
    category: "Reversal",
    bias: "Bearish",
    description:
      "Three failed attempts to break above the same resistance, suggesting supply consistently overcomes demand at that level.",
    characteristics: [
      "Three peaks at similar price levels",
      "Declining volume with each successive peak",
      "Support level connects the troughs",
    ],
    whatToWatch:
      "Break of the support/neckline on high volume. Consolidation before breakdown can be a warning sign.",
    commonMistakes:
      "Misidentifying a ranging market as a triple top. Range context matters.",
  },
  {
    name: "Triple Bottom",
    category: "Reversal",
    bias: "Bullish",
    description:
      "Three failed attempts to break below the same support, suggesting demand consistently overcomes supply.",
    characteristics: [
      "Three troughs at similar price levels",
      "Volume may increase on the third bounce",
      "Resistance level connects the peaks",
    ],
    whatToWatch:
      "Break above the resistance/neckline. Third bounce with a bullish candlestick formation may add weight.",
    commonMistakes:
      "Thinking three bounces guarantee a reversal. Each failed rally could precede a further breakdown.",
  },
  {
    name: "Rising Wedge (Reversal)",
    category: "Reversal",
    bias: "Bearish",
    description:
      "Price makes higher highs and higher lows but within converging trendlines that slope upward. In an uptrend, this may signal weakening bullish momentum.",
    characteristics: [
      "Both upper and lower trendlines slope upward",
      "Trendlines converge",
      "Volume often decreases as the wedge forms",
    ],
    whatToWatch:
      "Break below the lower trendline. The more price compresses, the more potential energy may be released.",
    commonMistakes:
      "Confusing a rising wedge with a genuine bullish channel. The key is converging (not parallel) lines.",
  },
  {
    name: "Falling Wedge (Reversal)",
    category: "Reversal",
    bias: "Bullish",
    description:
      "Price makes lower highs and lower lows within converging trendlines that slope downward. In a downtrend, this may signal weakening bearish momentum.",
    characteristics: [
      "Both upper and lower trendlines slope downward",
      "Trendlines converge",
      "Volume typically decreases during formation",
    ],
    whatToWatch:
      "Break above the upper trendline. A retest of the broken trendline as support may follow.",
    commonMistakes:
      "Treating every declining channel as a falling wedge. Convergence is essential.",
  },
  {
    name: "Quasimodo / Over-Under",
    category: "Reversal",
    bias: "Depends",
    description:
      "An advanced structure where price forms a final high (or low), reverses, then fails to make a new low (or high), followed by a push to a new high (or low) that quickly reverses. Used to identify potential institutional zones.",
    characteristics: [
      "Involves a left shoulder, head, and right shoulder-like structure",
      "The 'over-under' refers to price overshooting then pulling back",
      "Often used alongside supply and demand concepts",
    ],
    whatToWatch:
      "The level where price reversed after the overshoot. That area becomes the zone of interest for educational observation.",
    commonMistakes:
      "Extremely subjective pattern. Requires careful study before applying in any analytical context.",
  },
  // ─── Continuation Patterns ───────────────────────────────────────────────
  {
    name: "Bull Flag",
    category: "Continuation",
    bias: "Bullish",
    description:
      "A sharp upward move (flagpole) followed by a brief consolidation that slopes slightly downward. Suggests the prior upward momentum may continue.",
    characteristics: [
      "Strong upward flagpole on high volume",
      "Consolidation on declining volume",
      "Consolidation has parallel or slightly converging trendlines",
    ],
    whatToWatch:
      "Break above the upper boundary of the consolidation may suggest continuation. The height of the flagpole is sometimes used as a reference for possible targets (educational only).",
    commonMistakes:
      "Identifying a flag in a weak trend or without a clear flagpole. Context is everything.",
  },
  {
    name: "Bear Flag",
    category: "Continuation",
    bias: "Bearish",
    description:
      "A sharp downward move (flagpole) followed by a brief consolidation that slopes slightly upward. Suggests the prior downward momentum may continue.",
    characteristics: [
      "Strong downward flagpole on high volume",
      "Consolidation on declining volume, sloping upward",
      "Parallel or slightly converging trendlines",
    ],
    whatToWatch:
      "Break below the lower boundary of the consolidation may suggest continuation.",
    commonMistakes:
      "Confusing a genuine reversal with a bear flag consolidation. Trend context is critical.",
  },
  {
    name: "Bull Pennant",
    category: "Continuation",
    bias: "Bullish",
    description:
      "Similar to a bull flag but the consolidation forms a symmetrical triangle (converging trendlines) rather than a rectangular channel.",
    characteristics: [
      "Strong upward flagpole",
      "Converging consolidation forming a small symmetrical triangle",
      "Volume decreases during consolidation",
    ],
    whatToWatch:
      "Breakout above the upper trendline of the pennant. Volume expansion on breakout adds weight.",
    commonMistakes:
      "Treating all small triangles after a move as pennants. The flagpole strength matters.",
  },
  {
    name: "Bear Pennant",
    category: "Continuation",
    bias: "Bearish",
    description:
      "Similar to a bear flag but the consolidation forms a symmetrical triangle after a strong downward move.",
    characteristics: [
      "Strong downward flagpole",
      "Converging consolidation",
      "Volume decreases during consolidation",
    ],
    whatToWatch:
      "Breakdown below the lower trendline of the pennant.",
    commonMistakes:
      "Entering before the breakdown is confirmed. False breakouts are common in pennants.",
  },
  {
    name: "Ascending Triangle",
    category: "Continuation",
    bias: "Bullish",
    description:
      "Price makes higher lows while testing a flat resistance level repeatedly. Suggests buyers are becoming more aggressive each time.",
    characteristics: [
      "Flat upper trendline (resistance)",
      "Rising lower trendline (higher lows)",
      "Volume typically decreases during formation, expands on breakout",
    ],
    whatToWatch:
      "Break above the flat resistance. The more times price tests resistance, the more significant the breakout may be.",
    commonMistakes:
      "Assuming a breakout will always occur upward. Ascending triangles can break down too.",
  },
  {
    name: "Descending Triangle",
    category: "Continuation",
    bias: "Bearish",
    description:
      "Price makes lower highs while testing a flat support level repeatedly. Suggests sellers are becoming more aggressive each time.",
    characteristics: [
      "Flat lower trendline (support)",
      "Declining upper trendline (lower highs)",
      "Volume typically decreases during formation",
    ],
    whatToWatch:
      "Break below the flat support. Multiple tests of the same support can weaken it over time.",
    commonMistakes:
      "Assuming price must break down. Descending triangles occasionally break upward.",
  },
  {
    name: "Cup and Handle",
    category: "Continuation",
    bias: "Bullish",
    description:
      "A rounded bottom (cup) followed by a short consolidation with a slight downward drift (handle). Suggests gradual accumulation before a possible breakout.",
    characteristics: [
      "Smooth, rounded cup shape over weeks or months",
      "Handle forms with slight downward drift",
      "Volume decreases in handle, may expand on breakout",
    ],
    whatToWatch:
      "Break above the handle's upper resistance on strong volume.",
    commonMistakes:
      "Treating a V-shaped bottom as a cup. Genuine cups are rounded, not sharp.",
  },
  // ─── Bilateral / Neutral Patterns ────────────────────────────────────────
  {
    name: "Symmetrical Triangle",
    category: "Bilateral",
    bias: "Neutral",
    description:
      "Price makes lower highs and higher lows, converging into a point. Neither bulls nor bears are clearly in control, so a breakout in either direction is possible.",
    characteristics: [
      "Converging upper and lower trendlines",
      "Lower highs and higher lows",
      "Volume contracts as the triangle tightens",
    ],
    whatToWatch:
      "The direction of the breakout from the triangle. The prior trend may give a bias hint, but is not guaranteed to continue.",
    commonMistakes:
      "Predicting which way price will break before it does. Both directions are valid until the break occurs.",
  },
  {
    name: "Broadening Formation / Megaphone",
    category: "Bilateral",
    bias: "Neutral",
    description:
      "The opposite of a triangle — price makes higher highs and lower lows, with diverging trendlines. Signals increasing volatility and indecision.",
    characteristics: [
      "Diverging upper and lower trendlines",
      "Higher highs and lower lows over time",
      "Often accompanied by erratic volume",
    ],
    whatToWatch:
      "Trendline touches can act as short-term reaction zones. Overall direction is unclear until a definitive breakout occurs.",
    commonMistakes:
      "Trading every trendline touch. The pattern is inherently unpredictable.",
  },
  {
    name: "Diamond Top / Bottom",
    category: "Bilateral",
    bias: "Depends",
    description:
      "A rare pattern combining a broadening formation and a symmetrical triangle. Often forms at market tops or bottoms and signals potential reversal.",
    characteristics: [
      "First half: broadening pattern",
      "Second half: symmetrical triangle",
      "Overall shape resembles a diamond",
    ],
    whatToWatch:
      "Break of the symmetrical triangle portion with conviction. This can occur in either direction.",
    commonMistakes:
      "Diamond patterns are rare and easy to imagine in noisy price action. Extra care is needed before assigning significance.",
  },
];
