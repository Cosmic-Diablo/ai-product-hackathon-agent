"use client";

import React from "react";
import { X, Mail, Lock, FileText, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { AgentTriageResponse, ReturnRequest } from "@/lib/types";

interface ActionVerificationModalProps {
  modalType: "email" | "quarantine" | "vendor" | null;
  onClose: () => void;
  response: AgentTriageResponse | null;
  returnRequest: ReturnRequest;
  judgeEmail: string;
}

export const ActionVerificationModal: React.FC<ActionVerificationModalProps> = ({
  modalType,
  onClose,
  response,
  returnRequest,
  judgeEmail,
}) => {
  if (!modalType || !response) return null;

  const recipient = judgeEmail && judgeEmail.includes("@") ? judgeEmail : returnRequest.customerEmail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0b101c] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.08] bg-[#0d1424]">
          <div className="flex items-center gap-3">
            {modalType === "email" && <Mail className="w-5 h-5 text-cyan-400" />}
            {modalType === "quarantine" && <Lock className="w-5 h-5 text-amber-400" />}
            {modalType === "vendor" && <FileText className="w-5 h-5 text-purple-400" />}
            <div>
              <h3 className="text-base font-bold text-white">
                {modalType === "email" && "Live Resend Resolution Email Payload"}
                {modalType === "quarantine" && "Catalog Inventory Quarantine Lock"}
                {modalType === "vendor" && "Structured Vendor Dispute Claim"}
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Tool Execution Telemetry • Order #{response.orderId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* EMAIL VIEW */}
          {modalType === "email" && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#070b14] border border-white/[0.06] space-y-1.5 font-mono">
                <div className="text-gray-400">
                  <strong className="text-gray-200">Recipient:</strong> {recipient}
                </div>
                <div className="text-gray-400">
                  <strong className="text-gray-200">Subject:</strong> {response.policyDecision.resolutionTitle}
                </div>
                <div className="text-gray-400">
                  <strong className="text-gray-200">API Provider:</strong> Resend REST API (HTTP 200 OK)
                </div>
              </div>

              {/* Rendered Email Card */}
              <div className="p-5 rounded-xl bg-gradient-to-b from-[#101828] to-[#0b101c] border border-cyan-500/30 text-gray-200 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="font-extrabold text-sm text-cyan-400">ReturnOps AI</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">
                    DELIVERED VIA RESEND
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">
                  {response.policyDecision.resolutionTitle}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {response.policyDecision.resolutionDescription}
                </p>
                {response.policyDecision.voucherCode && (
                  <div className="p-3 rounded-lg bg-[#070c18] border border-dashed border-cyan-500/40 text-center font-mono">
                    <div className="text-[10px] text-gray-400">RESOLUTION VOUCHER</div>
                    <div className="text-base font-extrabold text-emerald-400 tracking-wider">
                      {response.policyDecision.voucherCode}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QUARANTINE VIEW */}
          {modalType === "quarantine" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 space-y-1">
                <div className="font-bold text-sm">Catalog Self-Healing Triggered</div>
                <p className="text-[11px] text-amber-300/80">
                  Autonomous circuit-breaker engaged to prevent customer churn from known defective batches.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070b14] border border-white/[0.06] font-mono space-y-2">
                <div className="text-gray-300">
                  <span className="text-gray-500">Batch ID:</span> {response.batchTelemetry.batchId}
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-500">Product SKU:</span> {response.batchTelemetry.sku}
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-500">Quarantined Stock:</span>{" "}
                  <span className="text-rose-400 font-bold">{response.batchTelemetry.quarantinedUnitsCount} Units</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-500">Defect Velocity:</span>{" "}
                  <span className="text-amber-400 font-bold">{(response.batchTelemetry.currentDefectRate * 100).toFixed(1)}%</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-500">Primary Defect:</span> {response.batchTelemetry.topDefectCluster}
                </div>
              </div>
            </div>
          )}

          {/* VENDOR CLAIM VIEW */}
          {modalType === "vendor" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-purple-200 space-y-1">
                <div className="font-bold text-sm">Supplier Quality Dispute Notice</div>
                <p className="text-[11px] text-purple-300/80">
                  Evidence-backed claim prepared for supplier reimbursement based on verified defect telemetry.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070b14] border border-white/[0.06] font-mono space-y-2">
                <div className="text-gray-300">
                  <span className="text-gray-500">Target Supplier:</span> {returnRequest.vendorName} ({returnRequest.vendorId})
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-500">Claim Amount:</span>{" "}
                  <span className="text-emerald-400 font-bold">₹{(returnRequest.itemPriceInr * 15).toLocaleString()}</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-500">Root Cause Category:</span> {response.visionTriage.defectCategory}
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-500">Confidence Score:</span> {(response.visionTriage.confidenceScore * 100).toFixed(0)}%
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-500">Evidence Count:</span> {response.batchTelemetry.totalReturnsReported} Customer Claims
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#0d1424] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
