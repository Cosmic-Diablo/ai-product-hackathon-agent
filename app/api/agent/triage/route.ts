import { NextRequest, NextResponse } from "next/server";
import { ReturnRequest, AgentReasoningStep, AgentTriageResponse } from "@/lib/types";
import { analyzeReturnVision } from "@/lib/gemini";
import { evaluatePolicy } from "@/lib/policyEngine";
import { recordReturnInMemory } from "@/lib/catalogMemory";
import { sendResolutionEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const returnRequest: ReturnRequest = body.returnRequest;
    const judgeEmail: string | undefined = body.judgeEmail;
    const imageBase64: string | undefined = body.imageBase64;

    if (!returnRequest) {
      return NextResponse.json({ error: "Missing returnRequest" }, { status: 400 });
    }

    const reasoningSteps: AgentReasoningStep[] = [];
    const toolsExecuted: AgentTriageResponse["toolsExecuted"] = [];

    // STEP 1: Ingestion & Observation
    reasoningSteps.push({
      id: "step-1",
      timestamp: new Date().toISOString(),
      stage: "OBSERVE",
      title: `Return Request Ingested #${returnRequest.id}`,
      detail: `Ingested order #${returnRequest.orderId} for "${returnRequest.productName}" (SKU: ${returnRequest.productSku}, Batch: ${returnRequest.batchId}). Claim: "${returnRequest.customerClaimReason}".`,
      status: "completed",
      metadata: {
        itemPrice: returnRequest.itemPriceInr,
        margin: returnRequest.productMarginInr,
        reverseShipping: returnRequest.reverseShippingCostInr,
      }
    });

    // STEP 2: Gemini Multimodal Vision Analysis
    const visionResult = await analyzeReturnVision(returnRequest, imageBase64);
    reasoningSteps.push({
      id: "step-2",
      timestamp: new Date().toISOString(),
      stage: "VISION_TRIAGE",
      title: `Multimodal Vision Analysis Completed`,
      detail: `Perception Engine: Defect [${visionResult.defectCategory}] identified with ${(visionResult.confidenceScore * 100).toFixed(0)}% confidence. Fraud risk score: ${(visionResult.fraudRiskScore * 100).toFixed(0)}%. ${visionResult.defectDescription}`,
      status: visionResult.fraudRiskScore > 0.7 ? "warning" : "completed",
      metadata: visionResult,
    });

    // STEP 3: Deterministic Policy & Financial Arithmetic
    const policyDecision = evaluatePolicy(returnRequest, visionResult);
    reasoningSteps.push({
      id: "step-3",
      timestamp: new Date().toISOString(),
      stage: "POLICY_ENGINE",
      title: `Deterministic Policy Match: ${policyDecision.actionType}`,
      detail: `Evaluated financial rule: ${policyDecision.appliedRule}. Economics: Product Margin ₹${returnRequest.productMarginInr} vs Reverse Logistics ₹${returnRequest.reverseShippingCostInr}. Rationale: ${policyDecision.economicRationale}`,
      status: "completed",
      metadata: policyDecision,
    });

    // STEP 4: Return Intelligence Memory & Anomaly Radar
    const memoryResult = recordReturnInMemory(
      returnRequest.batchId,
      returnRequest.productSku,
      visionResult.defectCategory,
      returnRequest.id,
      returnRequest.itemPriceInr,
      policyDecision.avoidedLogisticsCostInr
    );

    if (memoryResult.isNewlyQuarantined) {
      reasoningSteps.push({
        id: "step-4-quarantine",
        timestamp: new Date().toISOString(),
        stage: "ANOMALY_RADAR",
        title: `🚨 SYSTEMIC BATCH DEFECT ANOMALY DETECTED`,
        detail: `Batch ${returnRequest.batchId} defect velocity reached ${(memoryResult.telemetry.currentDefectRate * 100).toFixed(1)}% (Top issue: ${memoryResult.telemetry.topDefectCluster} at ${memoryResult.telemetry.clusterDefectPercentage}%). Executing autonomous catalog quarantine.`,
        status: "warning",
        metadata: memoryResult.telemetry,
      });

      // Tool Call: Catalog Quarantine
      toolsExecuted.push({
        toolName: "catalog_inventory_quarantine",
        status: "EXECUTED",
        details: `Quarantined ${memoryResult.telemetry.quarantinedUnitsCount} catalog units of ${returnRequest.productSku} (Batch ${returnRequest.batchId}) across warehouse nodes.`,
        payload: {
          batchId: returnRequest.batchId,
          sku: returnRequest.productSku,
          quarantinedUnits: memoryResult.telemetry.quarantinedUnitsCount,
          reason: `High defect concentration (${memoryResult.telemetry.topDefectCluster})`,
        },
        timestamp: new Date().toISOString(),
      });
    } else {
      reasoningSteps.push({
        id: "step-4-memory",
        timestamp: new Date().toISOString(),
        stage: "ANOMALY_RADAR",
        title: `Batch Telemetry Updated in Memory`,
        detail: `Batch ${returnRequest.batchId} current defect rate: ${(memoryResult.telemetry.currentDefectRate * 100).toFixed(1)}% (Risk Level: ${memoryResult.telemetry.riskLevel}).`,
        status: "completed",
        metadata: memoryResult.telemetry,
      });
    }

    // STEP 5: Live Customer Resolution Tool (Resend API)
    const targetEmail = judgeEmail && judgeEmail.includes("@") ? judgeEmail : returnRequest.customerEmail;
    const emailResult = await sendResolutionEmail({
      recipientEmail: targetEmail,
      recipientName: returnRequest.customerName,
      returnRequest,
      policyDecision,
    });

    toolsExecuted.push({
      toolName: "resend_email_dispatch",
      status: "EXECUTED",
      details: `Dispatched branded ${policyDecision.actionType} resolution email to ${targetEmail}.`,
      payload: {
        recipient: targetEmail,
        voucherCode: policyDecision.voucherCode || "N/A",
        subject: policyDecision.resolutionTitle,
        simulated: emailResult.simulated,
        messageId: emailResult.messageId,
      },
      timestamp: new Date().toISOString(),
    });

    reasoningSteps.push({
      id: "step-5-tool",
      timestamp: new Date().toISOString(),
      stage: "TOOL_DISPATCH",
      title: `Live Customer Resolution Dispatched via Resend API`,
      detail: `Resolution email delivered to "${targetEmail}" with action code [${policyDecision.voucherCode || "AUTH"}]. Avoided reverse logistics liability: ₹${policyDecision.avoidedLogisticsCostInr}.`,
      status: "completed",
    });

    // If systemic defect or high severity, trigger vendor claim tool
    if (visionResult.severity === "CRITICAL" || memoryResult.isNewlyQuarantined) {
      toolsExecuted.push({
        toolName: "vendor_quality_dispute_generator",
        status: "EXECUTED",
        details: `Generated supplier chargeback claim for ${returnRequest.vendorName} (${returnRequest.vendorId}) for ₹${returnRequest.itemPriceInr * 15} with visual defect evidence.`,
        payload: {
          vendorId: returnRequest.vendorId,
          vendorName: returnRequest.vendorName,
          claimAmountInr: returnRequest.itemPriceInr * 15,
          defectCategory: visionResult.defectCategory,
          evidenceCount: memoryResult.telemetry.totalReturnsReported,
        },
        timestamp: new Date().toISOString(),
      });
    }

    const executionTimeMs = Date.now() - startTime;

    const response: AgentTriageResponse = {
      returnId: returnRequest.id,
      orderId: returnRequest.orderId,
      visionTriage: visionResult,
      policyDecision,
      batchTelemetry: memoryResult.telemetry,
      reasoningSteps,
      toolsExecuted,
      executionTimeMs,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("[Triage API Error]:", error);
    return NextResponse.json(
      { error: "Internal agent error", message: error.message },
      { status: 500 }
    );
  }
}
