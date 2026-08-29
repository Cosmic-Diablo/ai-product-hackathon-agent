import { NextRequest, NextResponse } from "next/server";
import { getAllBatchesTelemetry, getOperationalMetrics, resetIntelligenceMemory } from "@/lib/catalogMemory";

export async function GET() {
  const batches = getAllBatchesTelemetry();
  const metrics = getOperationalMetrics();
  return NextResponse.json({ batches, metrics });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.action === "reset") {
      resetIntelligenceMemory();
      return NextResponse.json({
        success: true,
        message: "Return Intelligence Memory successfully reset to baseline.",
        batches: getAllBatchesTelemetry(),
        metrics: getOperationalMetrics(),
      });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
