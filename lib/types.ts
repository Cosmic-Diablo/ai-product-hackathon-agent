// TypeScript definitions for ReturnOps AI (ReturnGuard)

export type DefectCategory = 
  | "OUTSOLE_SEPARATION"
  | "HARDWARE_ZIPPER_FAILURE"
  | "SEAM_TEAR_OR_STITCH_BURST"
  | "FABRIC_DISCOLORATION"
  | "SIZING_MISMATCH"
  | "TRANSIT_CRUSH_DAMAGE"
  | "WARDROBING_SUSPECTED"
  | "BUYER_REMORSE"
  | "INCORRECT_ITEM_SENT";

export type DefectSeverity = "CRITICAL" | "MODERATE" | "LOW" | "NONE";

export type ResolutionActionType = 
  | "KEEP_PRODUCT_INSTANT_CREDIT"
  | "ONE_CLICK_SIZING_EXCHANGE"
  | "EXPRESS_REPLACEMENT_WITH_RETURN"
  | "HOLD_FOR_FRAUD_AUDIT"
  | "STANDARD_RETURN_APPROVAL";

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  productName: string;
  productSku: string;
  productCategory: string;
  batchId: string;
  vendorId: string;
  vendorName: string;
  itemPriceInr: number;
  productMarginInr: number;
  reverseShippingCostInr: number;
  customerClaimReason: string;
  customerFreeText: string;
  imageUrl?: string;
  createdAt: string;
}

export interface VisionTriageResult {
  defectDetected: boolean;
  defectCategory: DefectCategory;
  defectDescription: string;
  confidenceScore: number; // 0.0 to 1.0
  fraudRiskScore: number;   // 0.0 to 1.0
  visualEvidenceHighlights: string[];
  severity: DefectSeverity;
}

export interface PolicyDecision {
  actionType: ResolutionActionType;
  resolutionTitle: string;
  resolutionDescription: string;
  creditAmountInr?: number;
  replacementSku?: string;
  voucherCode?: string;
  appliedRule: string;
  avoidedLogisticsCostInr: number;
  economicRationale: string;
}

export interface BatchRiskTelemetry {
  batchId: string;
  sku: string;
  productName: string;
  vendorId: string;
  vendorName: string;
  totalUnitsSold: number;
  totalReturnsReported: number;
  historicalDefectRate: number; // e.g. 0.032 (3.2%)
  currentDefectRate: number;    // dynamically updated
  riskLevel: "LOW" | "ELEVATING" | "CRITICAL";
  isQuarantined: boolean;
  quarantinedUnitsCount: number;
  topDefectCluster: string;
  clusterDefectPercentage: number;
  gmvAtRiskInr: number;
}

export interface AgentReasoningStep {
  id: string;
  timestamp: string;
  stage: "OBSERVE" | "VISION_TRIAGE" | "POLICY_ENGINE" | "ANOMALY_RADAR" | "TOOL_DISPATCH" | "COMPLETE";
  title: string;
  detail: string;
  status: "pending" | "running" | "completed" | "warning" | "error";
  metadata?: Record<string, any>;
}

export interface AgentTriageResponse {
  returnId: string;
  orderId: string;
  visionTriage: VisionTriageResult;
  policyDecision: PolicyDecision;
  batchTelemetry: BatchRiskTelemetry;
  reasoningSteps: AgentReasoningStep[];
  toolsExecuted: {
    toolName: string;
    status: "EXECUTED" | "QUEUED" | "FAILED";
    details: string;
    payload: any;
    timestamp: string;
  }[];
  executionTimeMs: number;
}

export interface OperationalImpactMetrics {
  totalReturnsAnalyzed: number;
  logisticsCostAvoidedInr: number;
  unnecessaryRefundsAvoidedInr: number;
  defectiveBatchesQuarantined: number;
  unitsQuarantinedCount: number;
  estimatedFutureLossPreventedInr: number;
  avgTriageTimeSeconds: number;
}
