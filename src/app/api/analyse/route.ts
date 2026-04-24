import { NextRequest, NextResponse } from "next/server";
import { generateMockAnalysis } from "@/lib/mockAnalysis";
import { AnalysisMode, ForexPair } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mode: AnalysisMode = body.mode === "pair" ? "pair" : "upload";
    const pair: ForexPair | undefined = body.pair;
    const imageUrl: string | undefined = body.imageUrl;

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const result = generateMockAnalysis(mode, pair, imageUrl);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
