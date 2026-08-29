# 🚀 PROJECT_CONTEXT.md — ReturnOps AI (ReturnGuard)

## 📌 Project Overview
- **Project Name**: ReturnOps AI (ReturnGuard)
- **Tagline**: The Autonomous E-Commerce Return & Quality Intelligence Agent.
- **Hackathon**: Product Space × Code Benders 48-Hour AI Product Buildathon (Aug 29 – Aug 30, 2026).
- **Target Problem Statement**: **Option 2 — E-commerce Teams Struggled With Product Returns**.
- **Builder**: Prince Sharma ([@Cosmic-Diablo](https://github.com/Cosmic-Diablo)), Founder of QuickXKart & Cybersecurity/AI Engineer @ IIT Patna.
- **GitHub Repository**: [https://github.com/Cosmic-Diablo/ai-product-hackathon-agent](https://github.com/Cosmic-Diablo/ai-product-hackathon-agent)

---

## 📢 DAY 1 LINKEDIN POST (Ready to Copy & Publish)

> **Copy-paste this to LinkedIn right away to start collecting likes & comments early for the +10 bonus points!**

```markdown
Online brands lose over $800 BILLION every year to product returns. 📉

Worse? Most e-commerce return workflows are completely dumb, slow, and reactive:
- Customers wait 5-7 days just to get a basic exchange.
- Defective vendor batches slip through unnoticed until thousands of angry reviews pile up.
- Brands bleed return shipping costs on items whose shipping fee is higher than the product's profit margin.

That changes today. 🚀

I'm participating in the 48-Hour AI Product Buildathon by @Product Space and @Code Benders! Over the next 36 hours, I’m building ReturnOps AI (ReturnGuard) — an autonomous multi-step agent that transforms returns from a cost center into a competitive advantage.

Drawing directly from my experience building QuickXKart solo and studying AI at IIT Patna, here’s what this agent actually does autonomously:

1️⃣ Multimodal Visual Triage: Inspects customer complaint text AND uploaded product photos to identify real manufacturing defects vs transit damage vs sizing mismatches.
2️⃣ Cross-Catalog Anomaly Correlation: Detects systemic vendor/batch defects across thousands of orders in real-time.
3️⃣ Autonomous Tool Execution: 
   - Dispatches instant personalized resolution emails & sizing exchange vouchers via live email APIs.
   - Automatically quarantines defective inventory batches in the catalog to prevent selling broken stock.
   - Generates structured vendor dispute claims with photo evidence.

No fake chat wrappers. A real multi-step autonomous agent loop with live tool execution.

Building in public for the next 48 hours. Next update dropping tonight with a live demo screen recording! 🛠️

Drop a comment below: What's the most frustrating product return experience you’ve ever had as a customer or founder? 👇

#AIAgent #ProductManagement #Ecommerce #BuildInPublic #AIProductBuildathon #ProductSpace #AgenticAI #QuickXKart #IITPatna
```

---

## 🏗️ Technical Architecture & Data Schemas

### 1. Return Request Input Schema
```json
{
  "return_id": "RET-94021",
  "order_id": "ORD-77182",
  "customer_name": "Rohan Verma",
  "customer_email": "customer@example.com",
  "product_id": "PROD-JKT-09",
  "product_name": "Midnight Leather Bomber Jacket",
  "category": "Apparel",
  "sku": "JKT-BLK-L",
  "batch_id": "BATCH-2026-08A",
  "vendor_id": "VEND-NORTH-04",
  "item_price_inr": 2899,
  "return_shipping_cost_inr": 220,
  "customer_reason": "Broken zipper on first wear",
  "customer_comments": "The main metal zipper split in half when I zipped it up. Very poor stitching near the pocket too.",
  "image_url": "/sample_defect_zipper.jpg"
}
```

### 2. Autonomous Agent Output Schema
```json
{
  "triage_summary": {
    "root_cause": "DEFECTIVE_BATCH",
    "defect_category": "HARDWARE_ZIPPER_FAILURE",
    "confidence_score": 0.94,
    "fraud_risk_score": 0.05,
    "severity": "CRITICAL"
  },
  "anomaly_detection": {
    "is_systemic_batch_defect": true,
    "batch_return_rate": 0.38,
    "total_affected_orders_in_batch": 140,
    "estimated_gmv_at_risk_inr": 405860
  },
  "autonomous_actions_taken": [
    {
      "tool_name": "send_customer_resolution_email",
      "status": "EXECUTED",
      "payload": {
        "recipient": "customer@example.com",
        "action_type": "EXPRESS_REPLACEMENT_WITH_UPGRADE",
        "voucher_code": "PRIORITY-REPLACE-94021",
        "email_subject": "QuickXKart Priority Resolution: Free Express Replacement on Order #ORD-77182"
      }
    },
    {
      "tool_name": "quarantine_catalog_sku_batch",
      "status": "EXECUTED",
      "payload": {
        "sku": "JKT-BLK-L",
        "batch_id": "BATCH-2026-08A",
        "quarantined_units": 85,
        "reason": "High zipper failure rate (>35%)"
      }
    },
    {
      "tool_name": "generate_vendor_penalty_claim",
      "status": "EXECUTED",
      "payload": {
        "vendor_id": "VEND-NORTH-04",
        "total_claim_amount_inr": 95400,
        "evidence_count": 12
      }
    }
  ],
  "reasoning_trace": [
    "1. Analyzed complaint: Customer reported broken metal zipper on first wear.",
    "2. Checked image telemetry: Verified split zipper teeth and torn slider with no signs of customer abuse.",
    "3. Queried historical returns for BATCH-2026-08A: Found 12 similar zipper split claims in last 72 hours (38% defect rate).",
    "4. Decided optimal customer action: Instant express replacement with upgraded reinforced batch + INR 300 store apology credit.",
    "5. Triggered catalog self-healing: Placed quarantine hold on 85 remaining units in BATCH-2026-08A to prevent further customer dissatisfaction.",
    "6. Issued automated quality penalty claim to vendor VEND-NORTH-04."
  ]
}
```

---

## 🎨 UI Component Hierarchy & Features
1. **Header & Status Bar**: Live Agent status (`Autonomous Mode: ACTIVE`), Total Returns Triaged, Saved GMV counter, Defective Batches Quarantined.
2. **Interactive Return Simulation Console**:
   - Preset Scenarios button grid:
     - 🧥 *Scenario A: Defective Jacket Batch (High Severity)*
     - 👟 *Scenario B: Sizing Mismatch Sneakers (1-Click Exchange)*
     - 👗 *Scenario C: Low-Margin Item (Keep It & Get Instant Credit)*
     - 🕶️ *Scenario D: Abusive Return / Wardrobing Flag*
   - Live Custom Complaint Input + Photo selector + **"Send Live Email to My Inbox"** test input for judges.
3. **Live Agent Thought Stream (Scratchpad)**: Real-time animated terminal showing the multi-step reasoning and API payloads.
4. **Catalog & Vendor Risk Radar**: Interactive chart showing return rates per vendor and quarantined batches.
5. **Action Verification Center**: Inspectable emails sent, inventory holds active, and vendor dispute notices.

---

## 📹 3-Minute Demo Video Script Guide
- **0:00 - 0:20 (Problem)**: Returns cost $800B. Manual processing is slow, lets broken batches spread, and bleeds logistics margin.
- **0:20 - 1:40 (Live Product Demo)**: Pick a defective jacket scenario in the simulator $\rightarrow$ watch ReturnOps AI analyze the photo $\rightarrow$ cross-correlate 12 other defect reports $\rightarrow$ dispatch a real email via Resend (show inbox on phone) $\rightarrow$ quarantine the batch in catalog.
- **1:40 - 2:20 (The Agentic Loop)**: Explain why this is an autonomous agent (Multi-step reasoning, tool dispatching, catalog self-healing), not a simple prompt wrapper.
- **2:20 - 3:00 (Business Impact & Next Steps)**: Real-world savings for QuickXKart & e-commerce brands, automated vendor accountability, and submission closing.
