"use client";

import React from "react";
import { 
  ShieldCheck, 
  Cpu, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  BarChart3, 
  Zap,
  Activity
} from "lucide-react";
import { OperationalImpactMetrics } from "@/lib/types";

interface NavbarProps {
  activeTab: "simulator" | "memory" | "analytics";
  setActiveTab: (tab: "simulator" | "memory" | "analytics") => void;
  metrics: OperationalImpactMetrics;
  onResetMemory: () => void;
  isResetting: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  metrics,
  onResetMemory,
  isResetting,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070a13]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 border border-cyan-400/30">
              <ShieldCheck className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-[#070a13]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Return<span className="text-cyan-400">Ops</span> <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono">AGENT AI</span>
                </span>
              </div>
              <p className="hidden sm:block text-xs text-gray-400 font-medium">
                Autonomous E-Commerce Return & Quality Intelligence
              </p>
            </div>
          </div>

          {/* Center Navigation Switcher */}
          <div className="hidden md:flex items-center p-1 rounded-xl bg-[#0e1626] border border-white/[0.06] shadow-inner">
            <button
              onClick={() => setActiveTab("simulator")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "simulator"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>1. Live Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab("memory")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "memory"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Return Intelligence Memory</span>
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>3. ROI Command Center</span>
            </button>
          </div>

          {/* Right Status Badges & Controls */}
          <div className="flex items-center gap-3">
            {/* Live Mode Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>AUTONOMOUS: ACTIVE</span>
            </div>

            {/* Reset Memory Button */}
            <button
              onClick={onResetMemory}
              disabled={isResetting}
              title="Reset intelligence memory state to demo baseline"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-white/[0.08] text-gray-300 hover:text-white text-xs font-medium transition-all"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? "animate-spin text-cyan-400" : ""}`} />
              <span className="hidden sm:inline">Reset Memory</span>
            </button>
          </div>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex md:hidden items-center justify-between pb-3 pt-1 border-t border-white/[0.04] gap-1">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-center ${
              activeTab === "simulator" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-gray-400"
            }`}
          >
            Live Simulator
          </button>
          <button
            onClick={() => setActiveTab("memory")}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-center ${
              activeTab === "memory" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-gray-400"
            }`}
          >
            Catalog Memory
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-center ${
              activeTab === "analytics" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-gray-400"
            }`}
          >
            ROI Command
          </button>
        </div>
      </div>
    </header>
  );
};
