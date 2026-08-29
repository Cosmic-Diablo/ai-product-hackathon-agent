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
  MessageSquare,
  FileText,
  Camera
} from "lucide-react";
import { ReturnRequest } from "@/lib/types";
import { PRESET_SCENARIOS, PresetScenario } from "@/lib/mockData";
import { CustomImageUpload } from "./CustomImageUpload";
import { AICustomerChat } from "./AICustomerChat";

interface ShopperPortalProps {
  selectedScenario: PresetScenario;
  onSelectScenario: (scenario: PresetScenario) => void;
  returnRequest: ReturnRequest;
  setReturnRequest: React.Dispatch<React.SetStateAction<ReturnRequest>>;
  judgeEmail: string;
  setJudgeEmail: (email: string) => void;
  onRunAgent: (customBase64?: string) => void;
  isProcessing: boolean;
  onQuickRunScenario: (scenario: PresetScenario) => void;
  customImageBase64?: string;
  setCustomImageBase64: (base64: string) => void;
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
  customImageBase64,
  setCustomImageBase64,
}) => {
  const [activeImage, setActiveImage] = useState<string>(
    customImageBase64 || returnRequest.imageUrl || selectedScenario.sampleImage
  );
  const [portalMode, setPortalMode] = useState<"form" | "chat">("form");

  const handleScenarioChange = (scenario: PresetScenario) => {
    onSelectScenario(scenario);
    setReturnRequest({ ...scenario.request });
    setActiveImage(scenario.sampleImage);
    setCustomImageBase64("");
  };

  const handleImageUploaded = (base64: string, preview: string) => {
    setCustomImageBase64(base64);
    setActiveImage(preview);
    setReturnRequest((prev) => ({
      ...prev,
      imageUrl: preview,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Scenario Quick Selector */}
      <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Preset Test Cases (Click to Load Order & Defect Data)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPortalMode("form")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                portalMode === "form"
                  ? "bg-cyan-500 text-white"
                  : "text-gray-400 hover:text-white bg-white/[0.04]"
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Smart Form</span>
            </button>
            <button
              onClick={() => setPortalMode("chat")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                portalMode === "chat"
                  ? "bg-cyan-500 text-white"
                  : "text-gray-400 hover:text-white bg-white/[0.04]"
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>💬 Chat with Nova AI</span>
            </button>
          </div>
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

      {/* Main Return Interface */}
      {portalMode === "chat" ? (
        <AICustomerChat
          currentOrder={returnRequest}
          onExecuteReturn={(reason, details) => {
            setReturnRequest((prev) => ({
              ...prev,
              customerClaimReason: reason,
              customerFreeText: details,
            }));
            onRunAgent(customImageBase64);
          }}
          uploadedImageBase64={customImageBase64}
        />
      ) : (
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/[0.08] relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/40 font-mono">
                01
              </span>
              <div>
                <h2 className="text-base font-bold text-white">
                  Customer Return Request & Photo Evidence
                </h2>
                <p className="text-xs text-gray-400">
                  Upload ANY custom photo or edit complaint details to test the multimodal agent
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs">
              <Package className="w-3.5 h-3.5" />
              <span>Order #{returnRequest.orderId}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Product & Text Complaint */}
            <div className="lg:col-span-7 space-y-4">
              {/* Product Info Card */}
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
                    <div className="text-[10px] text-gray-500 uppercase">Price</div>
                  </div>
                </div>

                {/* Economics Bar */}
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

              {/* Text Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Customer Claim Reason (Type or edit)
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
                    Customer Free-Text Description
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

              {/* Judge Live Email Input */}
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
                <input
                  type="email"
                  placeholder="your.email@gmail.com (or judge email)"
                  value={judgeEmail}
                  onChange={(e) => setJudgeEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#070b16] border border-cyan-500/40 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            {/* Right Column: Custom Image Upload & Run Agent Trigger */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <CustomImageUpload
                currentImage={activeImage}
                onImageChange={handleImageUploaded}
                presetSampleImage={selectedScenario.sampleImage}
              />

              <div className="pt-2">
                <button
                  onClick={() => onRunAgent(customImageBase64)}
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
                      <span>Gemini Analyzing & Executing Tools...</span>
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
                  Perception $\rightarrow$ Deterministic Policy $\rightarrow$ Memory Radar $\rightarrow$ Live Resend Email
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
