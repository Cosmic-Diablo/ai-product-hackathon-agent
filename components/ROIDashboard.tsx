"use client";

import React from "react";
import { 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  AlertOctagon, 
  CheckCircle, 
  Truck, 
  PackageX,
  FileCheck,
  Building2
} from "lucide-react";
import { OperationalImpactMetrics, BatchRiskTelemetry } from "@/lib/types";

interface ROIDashboardProps {
  metrics: OperationalImpactMetrics;
  batches: Record<string, BatchRiskTelemetry>;
}

export const ROIDashboard: React.FC<ROIDashboardProps> = ({
  metrics,
  batches,
}) => {
  const batchList = Object.values(batches);

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            <strong>Simulated Operational Impact:</strong> Quantified financial savings, reverse logistics overhead avoided, and catalog self-healing metrics based on live return telemetry.
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 hidden sm:inline">
          LIVE TELEMETRY
        </span>
      </div>

      {/* 4 Big ROI Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Logistics Avoided */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-[#090e1a] relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-bold font-mono uppercase">Logistics Avoided</span>
            <Truck className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            ₹{metrics.logisticsCostAvoidedInr.toLocaleString()}
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Saved by intelligent <em>"Keep It"</em> policy on low-margin products where shipping fee exceeded margin.
          </p>
        </div>

        {/* Card 2: Units Quarantined */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-[#090e1a] relative overflow-hidden">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-bold font-mono uppercase">Units Quarantined</span>
            <PackageX className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {metrics.unitsQuarantinedCount} Units
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Across {metrics.defectiveBatchesQuarantined} identified defective vendor batches locked from fulfillment.
          </p>
        </div>

        {/* Card 3: Future Loss Prevented */}
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 to-[#090e1a] relative overflow-hidden">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-xs font-bold font-mono uppercase">Future Loss Prevented</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            ₹{metrics.estimatedFutureLossPreventedInr.toLocaleString()}
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Estimated GMV protected from secondary returns, logistics fees, and customer churn.
          </p>
        </div>

        {/* Card 4: Triage Speed */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/30 to-[#090e1a] relative overflow-hidden">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-xs font-bold font-mono uppercase">Triage Speed</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {metrics.avgTriageTimeSeconds}s
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Average autonomous decision & live email dispatch time (vs 5–7 days manual ticketing).
          </p>
        </div>
      </div>

      {/* Supplier Quality & Vendor Accountability Matrix */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Vendor Quality Accountability & Chargeback Radar</span>
            </h3>
            <p className="text-xs text-gray-400">
              Cross-supplier defect ranking with automated evidence-backed penalty generation
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
            AUTO-DISPUTE READY
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-gray-400 font-mono">
                <th className="pb-3 font-semibold">Vendor Name</th>
                <th className="pb-3 font-semibold">Active SKU Batch</th>
                <th className="pb-3 font-semibold">Defect Rate</th>
                <th className="pb-3 font-semibold">Primary Failure</th>
                <th className="pb-3 font-semibold">Catalog Status</th>
                <th className="pb-3 font-semibold text-right">Potential Claim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-gray-300">
              {batchList.map((batch) => (
                <tr key={batch.batchId} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-semibold text-white">
                    {batch.vendorName}
                  </td>
                  <td className="py-3 font-mono text-gray-400">
                    {batch.batchId}
                  </td>
                  <td className="py-3 font-mono">
                    <span className={batch.currentDefectRate >= 0.12 ? "text-rose-400 font-bold" : "text-gray-300"}>
                      {(batch.currentDefectRate * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 text-cyan-300">
                    {batch.topDefectCluster}
                  </td>
                  <td className="py-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      batch.isQuarantined 
                        ? "bg-rose-950 text-rose-300 border border-rose-800" 
                        : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    }`}>
                      {batch.isQuarantined ? "LOCKED" : "ACTIVE"}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-bold text-right text-emerald-400">
                    ₹{(batch.gmvAtRiskInr * 0.45).toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
