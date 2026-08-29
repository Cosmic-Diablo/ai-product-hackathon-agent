# GEMINI.md — ReturnOps AI (Product Space × Code Benders Hackathon)

## 👤 Builder Profile & Domain Edge
- **Builder**: Prince Sharma ([@Cosmic-Diablo](https://github.com/Cosmic-Diablo))
- **Domain Edge**: Founder of **QuickXKart** ([github.com/Cosmic-Diablo/quickxkart](https://github.com/Cosmic-Diablo/quickxkart)), an active e-commerce venture, and studying Cybersecurity & AI at **IIT Patna**.
- **Role**: Lead Senior Full-Stack Engineer & AI Architect pairing with the founder to ship the winning hackathon product.

---

## 🎯 Chosen Problem Statement: Option 2 (E-Commerce Return & Quality Intelligence)
**ReturnOps Agent (ReturnGuard AI)** is an autonomous multi-step AI agent that solves the $800B e-commerce return crisis:
1. **Multimodal Defect & Fraud Triage**: Ingests raw return complaints + customer photos to classify genuine manufacturing defects, sizing errors, transit damage, or wardrobing fraud.
2. **Catalog Anomaly Correlation**: Cross-references order histories across SKUs and suppliers to detect systemic defective batches before thousands more units are sold.
3. **Autonomous Tool Execution & Remediation**:
   - 📧 **Live Customer Dispatch**: Sends real personalized resolution emails (exchange vouchers, instant store credits, sizing guides) via **Resend API**.
   - 🛑 **Catalog Self-Healing**: Automatically sets temporary inventory quarantine on defective batches.
   - 📑 **Vendor Penalty & Quality Claim**: Generates structured supplier dispute reports with evidence.

---

## 🏆 Scoring Rubric & Rules (Official Notion Guidelines)
- **AI Integration (25%)**: Multi-step, tool-calling autonomous agent loop (Observe $\rightarrow$ Reason $\rightarrow$ Tool Call $\rightarrow$ Validate $\rightarrow$ Act). Must NOT be a simple LLM wrapper.
- **LinkedIn Content & Engagement (25% + up to +10 Bonus Points)**: Daily build-in-public posts with screenshots/GIFs, technical choices, and engagement questions. Mandatory tag: `@Product Space` ([linkedin.com/company/theproductspace](https://in.linkedin.com/company/theproductspace)).
  - 🥇 Highest Engagement: **+10 Bonus Points**
  - 🥈 2nd & 3rd Highest: **+9 Bonus Points**
  - 🏅 4th to 7th Highest: **+8 Bonus Points**
- **Prototype Quality & UX (20%)**: Fully working, responsive, dark-mode glassmorphic UI with live interactive return simulator (allowing judges to receive live emails to their own inbox).
- **Problem Understanding (15%)**: Real-world e-commerce & fraud domain depth.
- **Innovation & Creativity (15%)**: Proactive catalog self-healing vs passive chatbots.
- **Hard Submission Deadline**: **August 30, 2026, 11:59 PM IST** (3-minute demo video + live URL + GitHub repo).

---

## 🔐 Credentials & Environment
All sensitive credentials are securely stored in `.env` (gitignored and local only):
- **GitHub PAT**: Stored in `.env` (`GITHUB_PAT`)
- **Resend API Keys**: Stored in `.env` (`RESEND_API_KEY`, `RESEND_FULL_ACCESS`)
- **Cloudflare**: Stored in `.env` (`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`)
- **Coolify & Hostinger**: Stored in `.env`
- **Company Context**: QUICKXKART, CEO Rohit Kumar, Co-founder Vineet Negi

---

## 🛠️ Architecture & Tech Stack
- **Frontend**: Next.js 15 (App Router), React, TailwindCSS, Lucide Icons, Framer Motion animations.
- **Agent Core**: Python FastAPI / TypeScript Next.js API with Gemini 3.7 Flash + Pydantic structured schemas.
- **Live Tool Integrations**: Resend API (email delivery), Webhook dispatcher (catalog quarantine), Analytics simulator.
- **Observability**: Real-time streaming agent scratchpad, thought log, and action inspectability.
- **Testing**: Playwright automated browser verification.

---

## 📋 Session Continuation Checklist
When starting a new session:
1. Load `GEMINI.md`, `PROJECT_CONTEXT.md`, and `.agents/skills/`.
2. Verify all installed tools (`git`, `node`, `npm`, `pnpm`, `python`, `gh`, `playwright`).
3. Scaffold/run the full-stack Next.js project with the interactive ReturnOps dashboard.
4. Verify live Resend email tool execution.
5. Provide Day 1 / Day 2 LinkedIn post drafts ready to publish.
6. Deploy live to Vercel/Cloudflare Pages.
