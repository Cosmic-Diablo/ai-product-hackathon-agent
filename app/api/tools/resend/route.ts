import { NextRequest, NextResponse } from "next/server";
import { sendResolutionEmail } from "@/lib/resend";
import { PRESET_SCENARIOS } from "@/lib/mockData";
import { evaluatePolicy } from "@/lib/policyEngine";
import { analyzeReturnVision } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const scenario = PRESET_SCENARIOS[0];
    const vision = await analyzeReturnVision(scenario.request);
    const policy = evaluatePolicy(scenario.request, vision);

    const result = await sendResolutionEmail({
      recipientEmail: email,
      recipientName: "Hackathon Judge",
      returnRequest: scenario.request,
      policyDecision: policy,
    });

    return NextResponse.json({ success: true, result, policy });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
