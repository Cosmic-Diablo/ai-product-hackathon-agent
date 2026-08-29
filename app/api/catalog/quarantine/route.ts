import { NextRequest, NextResponse } from "next/server";
import { toggleBatchQuarantine } from "@/lib/catalogMemory";

export async function POST(req: NextRequest) {
  try {
    const { batchId, status } = await req.json();
    if (!batchId || typeof status !== "boolean") {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }
    const updated = toggleBatchQuarantine(batchId, status);
    if (!updated) {
      return NextResponse.json({ error: "Batch not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, batch: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
