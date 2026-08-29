"use client";

import React, { useState } from "react";
import { 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  TrendingUp, 
  Building2, 
  ArrowUpRight,
  Info,
  Sparkles
} from "lucide-react";
import { BatchRiskTelemetry } from "@/lib/types";

interface ReturnIntelligenceMemoryProps {
  batches: Record<string, BatchRiskTelemetry>;
  onToggleQuarantine: (batchId: string, currentStatus: boolean) => void;
  onSimulateDefectCluster: (batchId: string) => void;
  isProcessing: boolean;
}

export const ReturnIntelligenceMemory: React.FC<ReturnIntelligenceMemoryProps> = ({
  batches,
  onToggleQuarantine,
  onSimulateDefectCluster,
  isProcessing,
}) => {
  const batchList = Object.values(batches);

  return (
    <div className="space-y-6">
      {/* Top Banner Explaining the Memory Architecture */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#0a1426] via-[#0d1c38] to-[#0a1426]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                SELF-LEARNING CATALOG RADAR
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              Return Intelligence Memory & Anomaly Clustering
            </h2>
            <p className="text-xs text-gray-300 max-w-2xl">
              As returns stream in, ReturnOps correlates defect patterns across SKUs and vendor batches in real-time. When defect velocity crosses 12%, it autonomously triggers <strong>Catalog Self-Healing (Inventory Quarantine)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-[#080d18] border border-white/[0.08] text-center">
              <div className="text-[10px] text-gray-400 uppercase font-mono">Monitored Batches</div>
              <div className="text-base font-extrabold text-white">{batchList.length} Batches</div>
            </div>
            <div className="p-3 rounded-xl bg-[#080d18] border border-amber-500/30 text-center">
              <div className="text-[10px] text-amber-400 uppercase font-mono">Active Quarantines</div>
              <div className="text-base font-extrabold text-amber-400">
                {batchList.filter(b => b.isQuarantined).length} Locked
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {batchList.map((batch) => {
          const defectPercent = (batch.currentDefectRate * 100).toFixed(1);
          const isCritical = batch.riskLevel === "CRITICAL";
          const isElevated = batch.riskLevel === "ELEVATING";

          return (
            <div
              key={batch.batchId}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                batch.isQuarantined
                  ? "bg-gradient-to-b from-rose-950/40 via-[#0d1527] to-[#090e1a] border-rose-500/60 shadow-lg shadow-rose-500/10"
                  : isElevated
                  ? "bg-gradient-to-b from-amber-950/30 via-[#0d1527] to-[#090e1a] border-amber-500/50"
                  : "bg-[#0a101f]/70 border-white/[0.08] hover:border-white/[0.15]"
              }`}
            >
              <div className="space-y-3">
                {/* Batch Header & Status Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                      {batch.batchId}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1 leading-snug">
                      {batch.productName}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shrink-0 ${
                      batch.isQuarantined
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/50 animate-pulse"
                        : isElevated
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    }`}
                  >
                    {batch.isQuarantined
                      ? "🚨 QUARANTINED"
                      : isElevated
                      ? "⚠️ ELEVATING"
                      : "✓ HEALTHY"}
                  </span>
                </div>

                {/* Supplier Info */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Building2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>{batch.vendorName} ({batch.vendorId})</span>
                </div>

                {/* Defect Velocity Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Defect Rate:</span>
                    <span
                      className={`font-bold ${
                        isCritical ? "text-rose-400" : isElevated ? "text-amber-400" : "text-emerald-400"
                      }`}
                    >
                      {defectPercent}% ({batch.totalReturnsReported} / {batch.totalUnitsSold} units)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical
                          ? "bg-gradient-to-r from-amber-500 to-rose-500"
                          : isElevated
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      }`}
                      style={{ width: `${Math.min(100, Number(defectPercent) * 3)}%` }}
                    />
                  </div>
                </div>

                {/* Top Defect Cluster Tag */}
                <div className="p-2.5 rounded-xl bg-[#060a14]/80 border border-white/[0.04] space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Top Defect Cluster:</span>
                    <span className="font-semibold text-cyan-300 font-mono">
                      {batch.clusterDefectPercentage}% Cluster
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-white truncate">
                    {batch.topDefectCluster}
                  </div>
                </div>
              </div>

              {/* Action Controls & Quarantine Toggle */}
              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <div className="text-[11px] text-gray-400 font-mono">
                  GMV at Risk: <span className="text-white font-bold">₹{batch.gmvAtRiskInr.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => onToggleQuarantine(batch.batchId, batch.isQuarantined)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    batch.isQuarantined
                      ? "bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-200"
                      : "bg-gray-800 hover:bg-gray-700 border border-white/[0.1] text-gray-300"
                  }`}
                >
                  {batch.isQuarantined ? (
                    <>
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                      <span>{batch.quarantinedUnitsCount} Units Locked</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Lock Inventory</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
