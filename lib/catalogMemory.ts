import { BatchRiskTelemetry, OperationalImpactMetrics, DefectCategory } from "./types";
import { INITIAL_BATCH_TELEMETRY, INITIAL_OPERATIONAL_METRICS } from "./mockData";

// Global in-memory state for the active server runtime session
let batchTelemetryState: Record<string, BatchRiskTelemetry> = JSON.parse(
  JSON.stringify(INITIAL_BATCH_TELEMETRY)
);

let metricsState: OperationalImpactMetrics = JSON.parse(
  JSON.stringify(INITIAL_OPERATIONAL_METRICS)
);

let returnHistory: Array<{
  returnId: string;
  sku: string;
  batchId: string;
  defectCategory: DefectCategory;
  timestamp: string;
}> = [];

/**
 * Record a return in the Intelligence Memory and compute dynamic anomaly escalation
 */
export function recordReturnInMemory(
  batchId: string,
  sku: string,
  defectCategory: DefectCategory,
  returnId: string,
  itemPriceInr: number,
  avoidedCostInr: number
): {
  telemetry: BatchRiskTelemetry;
  isNewlyQuarantined: boolean;
  anomalyDetected: boolean;
  alertMessage?: string;
} {
  let batch = batchTelemetryState[batchId];

  // If batch not found, initialize telemetry for it
  if (!batch) {
    batch = {
      batchId,
      sku,
      productName: sku,
      vendorId: "VEND-GENERIC",
      vendorName: "Partner Supplier",
      totalUnitsSold: 200,
      totalReturnsReported: 0,
      historicalDefectRate: 0.02,
      currentDefectRate: 0.02,
      riskLevel: "LOW",
      isQuarantined: false,
      quarantinedUnitsCount: 0,
      topDefectCluster: defectCategory,
      clusterDefectPercentage: 10,
      gmvAtRiskInr: itemPriceInr * 50,
    };
    batchTelemetryState[batchId] = batch;
  }

  // Record history
  returnHistory.push({
    returnId,
    sku,
    batchId,
    defectCategory,
    timestamp: new Date().toISOString(),
  });

  // Increment return counters
  batch.totalReturnsReported += 1;
  batch.currentDefectRate = Number(
    (batch.totalReturnsReported / batch.totalUnitsSold).toFixed(3)
  );

  // Update cluster percentage
  const clusterReturns = returnHistory.filter(
    (r) => r.batchId === batchId && r.defectCategory === defectCategory
  ).length;
  batch.clusterDefectPercentage = Math.min(
    95,
    Math.round(40 + clusterReturns * 12)
  );

  // Update metrics
  metricsState.totalReturnsAnalyzed += 1;
  metricsState.logisticsCostAvoidedInr += avoidedCostInr;

  let isNewlyQuarantined = false;
  let anomalyDetected = false;
  let alertMessage = undefined;

  // Escalation rule: If defect rate > 12% or defect cluster reaches critical threshold
  if (batch.currentDefectRate >= 0.12 || batch.totalReturnsReported >= 8) {
    batch.riskLevel = "CRITICAL";
    anomalyDetected = true;

    if (!batch.isQuarantined) {
      batch.isQuarantined = true;
      batch.quarantinedUnitsCount = Math.max(35, batch.totalUnitsSold - batch.totalReturnsReported - 180);
      metricsState.defectiveBatchesQuarantined += 1;
      metricsState.unitsQuarantinedCount += batch.quarantinedUnitsCount;
      metricsState.estimatedFutureLossPreventedInr += batch.quarantinedUnitsCount * itemPriceInr;
      isNewlyQuarantined = true;
      alertMessage = `🚨 CRITICAL DEFECT ANOMALY: Defect rate surged to ${(batch.currentDefectRate * 100).toFixed(1)}% on ${batch.productName} (${batchId}). Autonomous quarantine executed on ${batch.quarantinedUnitsCount} catalog units!`;
    }
  } else if (batch.currentDefectRate >= 0.06 || batch.totalReturnsReported >= 4) {
    batch.riskLevel = "ELEVATING";
  }

  return {
    telemetry: { ...batch },
    isNewlyQuarantined,
    anomalyDetected,
    alertMessage,
  };
}

export function getBatchTelemetry(batchId: string): BatchRiskTelemetry | undefined {
  return batchTelemetryState[batchId];
}

export function getAllBatchesTelemetry(): Record<string, BatchRiskTelemetry> {
  return { ...batchTelemetryState };
}

export function getOperationalMetrics(): OperationalImpactMetrics {
  return { ...metricsState };
}

export function toggleBatchQuarantine(batchId: string, status: boolean): BatchRiskTelemetry | null {
  const batch = batchTelemetryState[batchId];
  if (!batch) return null;
  batch.isQuarantined = status;
  if (!status) {
    batch.quarantinedUnitsCount = 0;
    batch.riskLevel = "LOW";
  } else {
    batch.quarantinedUnitsCount = 85;
    batch.riskLevel = "CRITICAL";
  }
  return { ...batch };
}

export function resetIntelligenceMemory(): void {
  batchTelemetryState = JSON.parse(JSON.stringify(INITIAL_BATCH_TELEMETRY));
  metricsState = JSON.parse(JSON.stringify(INITIAL_OPERATIONAL_METRICS));
  returnHistory = [];
}
