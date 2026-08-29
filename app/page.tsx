"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/Navbar";
import { FluidBackground } from "@/components/FluidBackground";
import { StorefrontView } from "@/components/StorefrontView";
import { ShopperPortal } from "@/components/ShopperPortal";
import { AgentThoughtStream } from "@/components/AgentThoughtStream";
import { ReturnIntelligenceMemory } from "@/components/ReturnIntelligenceMemory";
import { ROIDashboard } from "@/components/ROIDashboard";
import { ActionVerificationModal } from "@/components/ActionVerificationModal";
import { PRESET_SCENARIOS, PresetScenario, INITIAL_BATCH_TELEMETRY, INITIAL_OPERATIONAL_METRICS } from "@/lib/mockData";
import { ReturnRequest, AgentTriageResponse, BatchRiskTelemetry, OperationalImpactMetrics } from "@/lib/types";
import { ArrowLeft, Sparkles, Columns, ShoppingBag } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"storefront" | "split" | "memory" | "analytics">("split");
  const [selectedScenario, setSelectedScenario] = useState<PresetScenario>(PRESET_SCENARIOS[0]);
  const [returnRequest, setReturnRequest] = useState<ReturnRequest>({ ...PRESET_SCENARIOS[0].request });
  const [judgeEmail, setJudgeEmail] = useState<string>("");
  const [customImageBase64, setCustomImageBase64] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [agentResponse, setAgentResponse] = useState<AgentTriageResponse | null>(null);

  const [batches, setBatches] = useState<Record<string, BatchRiskTelemetry>>(INITIAL_BATCH_TELEMETRY);
  const [metrics, setMetrics] = useState<OperationalImpactMetrics>(INITIAL_OPERATIONAL_METRICS);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const [modalType, setModalType] = useState<"email" | "quarantine" | "vendor" | null>(null);

  useEffect(() => {
    fetchMemoryState();
  }, []);

  const fetchMemoryState = async () => {
    try {
      const res = await fetch("/api/catalog/memory");
      if (res.ok) {
        const data = await res.json();
        if (data.batches) setBatches(data.batches);
        if (data.metrics) setMetrics(data.metrics);
      }
    } catch (err) {
      console.warn("Failed to fetch memory state:", err);
    }
  };

  const handleRunAgent = async (overrideBase64?: string) => {
    setIsProcessing(true);
    setAgentResponse(null);

    const imageToSend = overrideBase64 || customImageBase64 || undefined;

    try {
      const res = await fetch("/api/agent/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          returnRequest,
          judgeEmail,
          imageBase64: imageToSend,
        }),
      });

      if (res.ok) {
        const data: AgentTriageResponse = await res.json();
        setAgentResponse(data);

        setBatches((prev) => ({
          ...prev,
          [data.batchTelemetry.batchId]: data.batchTelemetry,
        }));

        setMetrics((prev) => ({
          ...prev,
          totalReturnsAnalyzed: prev.totalReturnsAnalyzed + 1,
          logisticsCostAvoidedInr: prev.logisticsCostAvoidedInr + data.policyDecision.avoidedLogisticsCostInr,
          unitsQuarantinedCount: prev.unitsQuarantinedCount + (data.batchTelemetry.isQuarantined ? data.batchTelemetry.quarantinedUnitsCount : 0),
        }));

        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#06b6d4", "#3b82f6", "#10b981"],
        });
      }
    } catch (err) {
      console.error("Failed to run agent triage:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectOrderFromStorefront = (scenario: PresetScenario) => {
    setSelectedScenario(scenario);
    setReturnRequest({ ...scenario.request });
    setCustomImageBase64("");
    setActiveTab("split");
  };

  const handleResetMemory = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/catalog/memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      if (res.ok) {
        const data = await res.json();
        setBatches(data.batches);
        setMetrics(data.metrics);
        setAgentResponse(null);
      }
    } catch (err) {
      console.error("Failed to reset memory:", err);
    } finally {
      setIsResetting(false);
    }
  };

  const handleToggleQuarantine = async (batchId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/catalog/quarantine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, status: !currentStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setBatches((prev) => ({
          ...prev,
          [batchId]: data.batch,
        }));
      }
    } catch (err) {
      console.error("Failed to toggle quarantine:", err);
    }
  };

  return (
    <div className="relative min-h-screen pb-16">
      <FluidBackground />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        metrics={metrics}
        onResetMemory={handleResetMemory}
        isResetting={isResetting}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        {/* Top Flagship Pitch Hook */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Product Space × Code Benders Hackathon Flagship</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Autonomous E-Commerce Return & Quality Intelligence
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-medium">
            <em>"ReturnOps doesn't just process returns. It learns from them and prevents the next one."</em>
          </p>
        </div>

        {/* TAB 1: DUMMY STOREFRONT (Customer POV) */}
        {activeTab === "storefront" && (
          <div className="space-y-6">
            <StorefrontView
              onSelectOrderToReturn={handleSelectOrderFromStorefront}
              activeScenarioId={selectedScenario.id}
            />
          </div>
        )}

        {/* TAB 2: LIVE SPLIT DEMO (Presentation Mode) */}
        {activeTab === "split" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#0c1628] to-[#09101f] border border-cyan-500/30 text-xs">
              <div className="flex items-center gap-2 text-cyan-300">
                <Columns className="w-4 h-4 text-cyan-400" />
                <span><strong>Presentation Mode:</strong> Customer Experience on Left • Agent Brain & Tool Execution on Right</span>
              </div>
              <button
                onClick={() => setActiveTab("storefront")}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors font-medium text-[11px]"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>View Full Storefront</span>
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* LEFT COLUMN: Customer POV / Shopper Portal */}
              <div className="xl:col-span-6">
                <ShopperPortal
                  selectedScenario={selectedScenario}
                  onSelectScenario={setSelectedScenario}
                  returnRequest={returnRequest}
                  setReturnRequest={setReturnRequest}
                  judgeEmail={judgeEmail}
                  setJudgeEmail={setJudgeEmail}
                  onRunAgent={handleRunAgent}
                  isProcessing={isProcessing}
                  onQuickRunScenario={(scenario) => {
                    setSelectedScenario(scenario);
                    setReturnRequest({ ...scenario.request });
                    setTimeout(() => handleRunAgent(), 100);
                  }}
                  customImageBase64={customImageBase64}
                  setCustomImageBase64={setCustomImageBase64}
                />
              </div>

              {/* RIGHT COLUMN: Merchant AI Brain & Tool Execution */}
              <div className="xl:col-span-6">
                <AgentThoughtStream
                  response={agentResponse}
                  isProcessing={isProcessing}
                  onOpenModal={(type) => setModalType(type)}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RETURN INTELLIGENCE MEMORY */}
        {activeTab === "memory" && (
          <ReturnIntelligenceMemory
            batches={batches}
            onToggleQuarantine={handleToggleQuarantine}
            onSimulateDefectCluster={(batchId) => {
              const scenario = PRESET_SCENARIOS[0];
              setSelectedScenario(scenario);
              setReturnRequest({ ...scenario.request });
              setActiveTab("split");
              setTimeout(() => handleRunAgent(), 150);
            }}
            isProcessing={isProcessing}
          />
        )}

        {/* TAB 4: ROI COMMAND CENTER */}
        {activeTab === "analytics" && (
          <ROIDashboard
            metrics={metrics}
            batches={batches}
          />
        )}
      </main>

      <ActionVerificationModal
        modalType={modalType}
        onClose={() => setModalType(null)}
        response={agentResponse}
        returnRequest={returnRequest}
        judgeEmail={judgeEmail}
      />
    </div>
  );
}
