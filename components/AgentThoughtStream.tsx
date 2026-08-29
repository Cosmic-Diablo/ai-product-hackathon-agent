"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Eye, 
  Calculator, 
  Activity, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Terminal,
  Lock,
  Mail,
  FileText
} from "lucide-react";
import { AgentTriageResponse, AgentReasoningStep } from "@/lib/types";

interface AgentThoughtStreamProps {
  response: AgentTriageResponse | null;
  isProcessing: boolean;
  onOpenModal: (type: "email" | "quarantine" | "vendor") => void;
}

export const AgentThoughtStream: React.FC<AgentThoughtStreamProps> = ({
  response,
  isProcessing,
  onOpenModal,
}) => {
  const [selectedStep, setSelectedStep] = useState<AgentReasoningStep | null>(null);

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/[0.08] relative overflow-hidden space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/40 font-mono">
            02
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                Live Agent Thought Stream & Tool Execution
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>STREAM ACTIVE</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Observability log: Gemini Multimodal Vision + Deterministic Policy + Tool Dispatch
            </p>
          </div>
        </div>

        {response && (
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-[#0c1424] px-3 py-1.5 rounded-lg border border-cyan-500/30">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Execution Time: {response.executionTimeMs}ms</span>
          </div>
        )}
      </div>

      {/* When Idle and No Response Yet */}
      {!response && !isProcessing && (
        <div className="py-12 px-4 text-center rounded-xl bg-[#090e1a]/60 border border-white/[0.04] space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="text-sm font-semibold text-white">
            Agent Engine Ready for Next Return
          </h4>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Select any preset return case in Scene 1 above and click <strong>"Run Autonomous ReturnOps Agent"</strong> to stream real-time perception, deterministic math, and live API tools.
          </p>
        </div>
      )}

      {/* Loading Skeleton Terminal */}
      {isProcessing && (
        <div className="p-4 rounded-xl bg-[#080d18] border border-cyan-500/30 font-mono text-xs space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold">[AGENT INITIALIZED]</span>
            <span className="text-gray-400">Ingesting raw complaint & photo telemetry...</span>
          </div>
          <div className="pl-4 border-l-2 border-cyan-500/40 space-y-2 text-gray-400">
            <div className="animate-pulse">▶ [STEP 1/4] Extracting multimodal visual tokens with Google Gemini...</div>
            <div className="animate-pulse text-cyan-300">▶ [STEP 2/4] Executing deterministic unit-economics policy matrix...</div>
            <div className="animate-pulse text-amber-300">▶ [STEP 3/4] Cross-referencing catalog return defect memory...</div>
            <div className="animate-pulse text-emerald-300">▶ [STEP 4/4] Dispatching live customer resolution via Resend API...</div>
          </div>
        </div>
      )}

      {/* Rendered Live Stream when response is ready */}
      {response && (
        <div className="space-y-4">
          {/* Action Resolution Banner */}
          <div className={`p-4 rounded-xl border transition-all ${
            response.policyDecision.actionType === "KEEP_PRODUCT_INSTANT_CREDIT"
              ? "bg-gradient-to-r from-emerald-950/70 via-[#0a1622] to-cyan-950/70 border-emerald-500/50"
              : response.policyDecision.actionType === "ONE_CLICK_SIZING_EXCHANGE"
              ? "bg-gradient-to-r from-cyan-950/70 via-[#0a1622] to-blue-950/70 border-cyan-500/50"
              : response.policyDecision.actionType === "EXPRESS_REPLACEMENT_WITH_RETURN"
              ? "bg-gradient-to-r from-amber-950/70 via-[#0a1622] to-rose-950/70 border-amber-500/50"
              : "bg-gradient-to-r from-purple-950/70 via-[#0a1622] to-gray-900/70 border-purple-500/50"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                    AUTONOMOUS RESOLUTION EXECUTED
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white">
                  {response.policyDecision.resolutionTitle}
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  {response.policyDecision.resolutionDescription}
                </p>
              </div>

              {response.policyDecision.voucherCode && (
                <div className="p-3 rounded-lg bg-[#070b14]/90 border border-white/[0.1] text-center shrink-0">
                  <div className="text-[10px] text-gray-400 uppercase font-mono">Dispatched Voucher</div>
                  <div className="text-sm font-extrabold text-cyan-400 font-mono tracking-wider">
                    {response.policyDecision.voucherCode}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reasoning Steps Accordion & Terminal Log */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Agent Scratchpad & Verification Steps
            </h4>

            <div className="space-y-2">
              {response.reasoningSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className="p-3 rounded-xl bg-[#090e1a]/80 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {step.stage === "OBSERVE" && <Eye className="w-4 h-4 text-blue-400" />}
                      {step.stage === "VISION_TRIAGE" && <Cpu className="w-4 h-4 text-cyan-400" />}
                      {step.stage === "POLICY_ENGINE" && <Calculator className="w-4 h-4 text-emerald-400" />}
                      {step.stage === "ANOMALY_RADAR" && <ShieldAlert className="w-4 h-4 text-amber-400" />}
                      {step.stage === "TOOL_DISPATCH" && <Send className="w-4 h-4 text-purple-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span className="font-mono text-cyan-400">[{step.stage}]</span>
                          <span>{step.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">Step {idx + 1}</span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Executed Bar */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono mb-2">
              Live Tools Executed (Click to Inspect Real Payloads)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Email Tool Badge */}
              <button
                onClick={() => onOpenModal("email")}
                className="p-3 rounded-xl bg-[#0b1322] hover:bg-[#101b30] border border-cyan-500/30 hover:border-cyan-400 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Resend Email Dispatch</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  View formatted resolution email template
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">STATUS: EXECUTED (200 OK)</div>
              </button>

              {/* Catalog Quarantine Badge */}
              <button
                onClick={() => onOpenModal("quarantine")}
                className="p-3 rounded-xl bg-[#0b1322] hover:bg-[#101b30] border border-amber-500/30 hover:border-amber-400 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Catalog Self-Healing</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  Inspect inventory batch quarantine state
                </div>
                <div className="text-[10px] font-mono text-cyan-400 mt-1">
                  {response.batchTelemetry.isQuarantined ? "BATCH LOCKED 🚨" : "TELEMETRY MONITORED ✓"}
                </div>
              </button>

              {/* Vendor Dispute Notice Badge */}
              <button
                onClick={() => onOpenModal("vendor")}
                className="p-3 rounded-xl bg-[#0b1322] hover:bg-[#101b30] border border-purple-500/30 hover:border-purple-400 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    <span>Vendor Quality Claim</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  View supplier chargeback evidence report
                </div>
                <div className="text-[10px] font-mono text-purple-400 mt-1">STATUS: GENERATED</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
