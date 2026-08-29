"use client";

import React, { useState } from "react";
import { 
  Package, 
  Sparkles, 
  Upload, 
  Mail, 
  Tag, 
  DollarSign, 
  Truck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Info
} from "lucide-react";
import { ReturnRequest } from "@/lib/types";
import { PRESET_SCENARIOS, PresetScenario } from "@/lib/mockData";

interface ShopperPortalProps {
  selectedScenario: PresetScenario;
  onSelectScenario: (scenario: PresetScenario) => void;
  returnRequest: ReturnRequest;
  setReturnRequest: React.Dispatch<React.SetStateAction<ReturnRequest>>;
  judgeEmail: string;
  setJudgeEmail: (email: string) => void;
  onRunAgent: () => void;
  isProcessing: boolean;
  onQuickRunScenario: (scenario: PresetScenario) => void;
}

export const ShopperPortal: React.FC<ShopperPortalProps> = ({
  selectedScenario,
  onSelectScenario,
  returnRequest,
  setReturnRequest,
  judgeEmail,
  setJudgeEmail,
  onRunAgent,
  isProcessing,
  onQuickRunScenario,
}) => {
  const [activeImage, setActiveImage] = useState<string>(
    returnRequest.imageUrl || selectedScenario.sampleImage
  );

  const handleScenarioChange = (scenario: PresetScenario) => {
    onSelectScenario(scenario);
    setReturnRequest({ ...scenario.request });
    setActiveImage(scenario.sampleImage);
  };

  return (
    <div className="space-y-6">
      {/* Scenario Selector Ribbon */}
      <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Interactive Return Scenarios (1-Click Test Cases)
            </h3>
          </div>
          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Click any scenario to load simulated complaint & photo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {PRESET_SCENARIOS.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => handleScenarioChange(scenario)}
                disabled={isProcessing}
                className={`text-left p-2.5 rounded-xl transition-all relative overflow-hidden border ${
                  isSelected
                    ? "bg-gradient-to-b from-cyan-950/80 to-[#0f172a] border-cyan-500/70 shadow-md shadow-cyan-500/10"
                    : "bg-[#0c1220]/60 hover:bg-[#111a2e]/80 border-white/[0.05] hover:border-white/[0.15]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      scenario.badgeColor === "rose"
                        ? "bg-rose-950/80 text-rose-300 border border-rose-800/50"
                        : scenario.badgeColor === "amber"
                        ? "bg-amber-950/80 text-amber-300 border border-amber-800/50"
                        : scenario.badgeColor === "cyan"
                        ? "bg-cyan-950/80 text-cyan-300 border border-cyan-800/50"
                        : scenario.badgeColor === "emerald"
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/50"
                        : "bg-purple-950/80 text-purple-300 border border-purple-800/50"
                    }`}
                  >
                    {scenario.badge}
                  </span>
                </div>
                <div className="font-semibold text-xs text-white truncate">
                  {scenario.title.split("—")[0]}
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  {scenario.title.split("—")[1] || scenario.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Return Filing Interface (Scene 1 Customer View) */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/[0.08] relative overflow-hidden">
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/40 font-mono">
              01
            </span>
            <div>
              <h2 className="text-base font-bold text-white">
                Customer Return Request Portal
              </h2>
              <p className="text-xs text-gray-400">
                Simulate a shopper lodging a claim with visual evidence & unit economics
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs">
            <Package className="w-3.5 h-3.5" />
            <span>Order #{returnRequest.orderId}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Product & Complaint Data */}
          <div className="lg:col-span-7 space-y-4">
            {/* Product Meta Card */}
            <div className="p-3.5 rounded-xl bg-[#090e1a]/80 border border-white/[0.06] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {returnRequest.productName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-gray-400 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                      SKU: {returnRequest.productSku}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                      Batch: {returnRequest.batchId}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                      Vendor: {returnRequest.vendorName}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-cyan-400">
                    ₹{returnRequest.itemPriceInr.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase">Item Price</div>
                </div>
              </div>

              {/* Reverse Unit Economics Ticker */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.04] text-[11px]">
                <div className="p-2 rounded-lg bg-gray-900/60 border border-white/[0.04]">
                  <div className="text-gray-400 text-[10px]">Product Margin</div>
                  <div className="font-mono font-semibold text-emerald-400">
                    ₹{returnRequest.productMarginInr}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-gray-900/60 border border-white/[0.04]">
                  <div className="text-gray-400 text-[10px]">Reverse Logistics</div>
                  <div className="font-mono font-semibold text-rose-400">
                    ₹{returnRequest.reverseShippingCostInr}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-gray-900/60 border border-white/[0.04]">
                  <div className="text-gray-400 text-[10px]">Reverse Arbitrage</div>
                  <div className={`font-mono font-semibold ${
                    returnRequest.reverseShippingCostInr > returnRequest.productMarginInr
                      ? "text-amber-400"
                      : "text-blue-400"
                  }`}>
                    {returnRequest.reverseShippingCostInr > returnRequest.productMarginInr
                      ? "Negative Margin ⚠️"
                      : "Positive Margin ✓"}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Complaint Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Customer Claim Reason
                </label>
                <input
                  type="text"
                  value={returnRequest.customerClaimReason}
                  onChange={(e) =>
                    setReturnRequest({
                      ...returnRequest,
                      customerClaimReason: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0f1d] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Customer Detailed Description
                </label>
                <textarea
                  rows={2}
                  value={returnRequest.customerFreeText}
                  onChange={(e) =>
                    setReturnRequest({
                      ...returnRequest,
                      customerFreeText: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0f1d] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Live Judge Email Delivery Input (WOW Factor) */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/40">
              <div className="flex items-center gap-2 mb-1.5">
                <Mail className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-bold text-white">
                  Send Live Resolution Email to Your Real Phone / Inbox
                </span>
              </div>
              <p className="text-[11px] text-cyan-200/80 mb-2">
                Enter your real email address. The agent will dispatch a live resolution voucher via the Resend API within 2 seconds.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="judge@hackathon.com (or your personal email)"
                  value={judgeEmail}
                  onChange={(e) => setJudgeEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#070b16] border border-cyan-500/40 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Visual Evidence & Photo Triage */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-300">
                  Uploaded Defect Photo Evidence
                </label>
                <span className="text-[10px] text-cyan-400 font-mono">
                  MULTIMODAL VISION READY
                </span>
              </div>

              {/* Photo Preview Container */}
              <div className="relative h-44 rounded-xl overflow-hidden border border-white/[0.1] bg-[#090e1a] group">
                <img
                  src={activeImage}
                  alt="Defect Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/[0.1]">
                  <span className="font-mono truncate">{selectedScenario.title.split("—")[0]}</span>
                  <span className="text-cyan-400 font-bold">100% RAW TELEMETRY</span>
                </div>
              </div>
            </div>

            {/* Big Action Trigger Button */}
            <div className="pt-2">
              <button
                onClick={onRunAgent}
                disabled={isProcessing}
                className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
                  isProcessing
                    ? "bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700"
                    : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/50 hover:scale-[1.01]"
                }`}
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    <span>Agent Reasoning & Tool Executing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
                    <span>⚡ Run Autonomous ReturnOps Agent</span>
                    <ArrowRight className="w-4 h-4 text-cyan-200" />
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-2">
                Executes Vision Triage $\rightarrow$ Deterministic Policy $\rightarrow$ Return Memory $\rightarrow$ Live Resend Email
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
