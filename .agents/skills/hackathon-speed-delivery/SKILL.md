---
name: hackathon-speed-delivery
description: >-
  Rapid prototyping and production deployment guidelines for 48-hour hackathons:
  Next.js 15 / React full-stack architecture, dark-mode glassmorphism UI tokens,
  Vercel/Cloudflare deployment, and Playwright verification.
---

# Hackathon Speed Delivery & UI/UX Standards

## 1. UI & Design System Rules (Rubric: 20% Prototype Quality)
- **Aesthetic**: Premium Dark Mode with subtle glassmorphism (slate/zinc dark backgrounds, glowing neon status accents: cyan for active thought, emerald for verified action, amber for anomaly, rose for defect).
- **Typography**: Clean sans-serif (Inter / Outfit) with crisp tabular numbers for metrics.
- **Interactive Simulator**:
  - Live "Return Simulation Console" where judges can pick preset test cases (e.g., "Defective Batch Leather Jacket", "Sizing Error Running Shoes", "Abusive Return Fraud") or type custom complaints.
  - Live "Agent Execution Trace": An animated step-by-step visual stream showing:
    1. 🧠 Thinking / Plan
    2. 🔍 Multimodal Inspection
    3. ⚡ Tool Execution (Resend Email Dispatch, Inventory Quarantine)
    4. ✅ Remediation Result & Metrics.
- **Judge WOW Factor**: Allow judges to enter their own email in the simulator and receive the live agent-generated resolution email immediately on their phone!

## 2. Fast Build & Auto-Deploy Workflow
- **Framework**: Next.js (App Router) or Vite React with TailwindCSS.
- **Production Deployment**: Push to `main` branch connected to Vercel/Cloudflare Pages for instant live URL.
- **Verification**: Run Playwright UI tests before and after major UI shifts.
