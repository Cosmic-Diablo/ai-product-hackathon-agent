import { ReturnRequest, VisionTriageResult, PolicyDecision, ResolutionActionType } from "./types";

/**
 * Deterministic Policy Engine for ReturnOps AI
 * 
 * Separates financial arithmetic, warranty rules, margin comparisons,
 * and fraud thresholds from unstructured LLM hallucinations.
 */
export function evaluatePolicy(
  request: ReturnRequest,
  visionResult: VisionTriageResult
): PolicyDecision {
  const {
    itemPriceInr,
    productMarginInr,
    reverseShippingCostInr,
    productSku,
  } = request;

  const {
    defectDetected,
    defectCategory,
    confidenceScore,
    fraudRiskScore,
  } = visionResult;

  // RULE 1: High Fraud Risk (> 0.70)
  if (fraudRiskScore >= 0.70) {
    return {
      actionType: "HOLD_FOR_FRAUD_AUDIT",
      resolutionTitle: "Return Held for Physical Verification",
      resolutionDescription: "Telemetry indicates visual inconsistency (signs of wear or missing tags on item claimed as new). Routing to security team for 24h manual review.",
      appliedRule: "RULE_FRAUD_ELEVATED (FraudScore >= 0.70)",
      avoidedLogisticsCostInr: 0,
      economicRationale: `Avoided immediate automated refund of ₹${itemPriceInr} on high-risk transaction.`,
    };
  }

  // RULE 2: Sizing Mismatch with available stock -> 1-Click Sizing Exchange
  if (defectCategory === "SIZING_MISMATCH") {
    const nextSize = productSku.includes("-M") ? "L" : productSku.includes("-L") ? "XL" : "M";
    return {
      actionType: "ONE_CLICK_SIZING_EXCHANGE",
      resolutionTitle: "Instant 1-Click Sizing Exchange Approved",
      resolutionDescription: `Customer flagged size tightness. Automated 1-click exchange voucher generated for size ${nextSize} with doorstep reverse pickup.`,
      appliedRule: "RULE_SIZING_OPTIMIZATION (Preserves Gross Revenue)",
      replacementSku: `${productSku.split("-")[0]}-${productSku.split("-")[1] || "ITEM"}-${nextSize}`,
      voucherCode: `EXCHANGE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      avoidedLogisticsCostInr: Math.round(reverseShippingCostInr * 0.4), // bundled exchange saves pickup overhead
      economicRationale: `Retains 100% GMV (₹${itemPriceInr}) as exchange rather than bleeding revenue to refund.`,
    };
  }

  // RULE 3: Verified Genuine Defect (Confidence >= 0.80)
  if (defectDetected && confidenceScore >= 0.80) {
    // Sub-rule 3A: Negative Unit Economics (Reverse Shipping > Margin)
    // If shipping the broken unit back costs more than the item profit margin, KEEP IT!
    if (reverseShippingCostInr >= productMarginInr || itemPriceInr <= 400) {
      return {
        actionType: "KEEP_PRODUCT_INSTANT_CREDIT",
        resolutionTitle: "Keep Product + Instant 100% Store Credit",
        resolutionDescription: `Genuine defect verified. Because reverse shipping cost (₹${reverseShippingCostInr}) exceeds unit margin (₹${productMarginInr}), customer keeps/recycles the item with immediate full credit.`,
        appliedRule: "RULE_NEGATIVE_LOGISTICS_ARBITRAGE (ReverseShipping >= UnitMargin)",
        creditAmountInr: itemPriceInr,
        voucherCode: `CREDIT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        avoidedLogisticsCostInr: reverseShippingCostInr,
        economicRationale: `Saved ₹${reverseShippingCostInr} in wasteful 2-way reverse courier fees. Customer delight score +95%.`,
      };
    }

    // Sub-rule 3B: High-Value Defect (Margin > Reverse Shipping) -> Express Replacement
    return {
      actionType: "EXPRESS_REPLACEMENT_WITH_RETURN",
      resolutionTitle: "Priority Express Replacement + ₹300 Courtesy Credit",
      resolutionDescription: `Verified hardware/manufacturing failure on high-tier item. Express replacement dispatched immediately with prepaid return box.`,
      appliedRule: "RULE_PREMIUM_DEFECT_REPLACEMENT (Confidence >= 0.80 & Margin > ReverseShipping)",
      voucherCode: `REPLACE-VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      creditAmountInr: 300,
      avoidedLogisticsCostInr: 0,
      economicRationale: `Protects high-value customer lifetime value (₹${itemPriceInr}) with fast turnaround.`,
    };
  }

  // RULE 4: Low-Margin Standard Return
  if (reverseShippingCostInr >= productMarginInr) {
    return {
      actionType: "KEEP_PRODUCT_INSTANT_CREDIT",
      resolutionTitle: "Zero-Return Instant Store Credit",
      resolutionDescription: `Low margin item policy applied. Instant credit granted without requiring physical return shipment.`,
      appliedRule: "RULE_LOW_MARGIN_THRESHOLD (ItemMargin < ReverseShipping)",
      creditAmountInr: itemPriceInr,
      voucherCode: `CREDIT-SAVER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      avoidedLogisticsCostInr: reverseShippingCostInr,
      economicRationale: `Eliminated ₹${reverseShippingCostInr} reverse courier liability.`,
    };
  }

  // RULE 5: Standard Return Approval
  return {
    actionType: "STANDARD_RETURN_APPROVAL",
    resolutionTitle: "Standard Return Authorized with Doorstep Inspection",
    resolutionDescription: "Standard 7-day return approved with automated reverse pickup scheduled.",
    appliedRule: "RULE_STANDARD_RETURN_DEFAULT",
    voucherCode: `RET-AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    avoidedLogisticsCostInr: 0,
    economicRationale: `Standard warranty policy for item valued at ₹${itemPriceInr}.`,
  };
}
