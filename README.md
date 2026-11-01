# OpsAgent-Engine: Autonomous Customer Support & Observability Workflow

An enterprise-grade **Agentic Customer Operations Workflow Engine** built with **React (Frontend)** and **Node.js/TypeScript (Backend)**. This platform simulates a live corporate environment where an autonomous AI agent handles unstructured user requests, applies strict business validation rules, independently executes multi-step backend operations (Database lookups, Stripe gateway refunds, and CRM ticketing), and exposes its raw internal thought trace logs via an observability dashboard.

## 🚀 Core Capabilities & Technical Highlights
* **Autonomous Multi-Step Workflows:** Moves beyond basic static chatbots by running a continuous "Sense-Think-Act" loop to chain database, payment, and ticketing actions in a single session.
* **Deterministic Business Guardrails:** Enforces operational policies natively within the loop—safely evaluating variables and blocking actions if transaction criteria (e.g., Delivery Status or Date Thresholds) are violated.
* **Granular Execution Trace (Observability):** Transparently logs every individual internal thought process loop and payload argument object directly to the administration console interface, eliminating "black-box" AI risks.
* **Production Stack Architecture:** Designed utilizing a decoupled Node/Express backend paired with React, leveraging type-safe data schemas and explicit modules.

---

## 📁 System Architecture & Folder Layout
```text
📁 enterprise-ai-agent/
├── 📁 backend/                       # Node.js TypeScript Service Layer
│   ├── index.ts                      # Local Mock Agent Engine & Tool Actuators
│   └── package.json                  # Watch Loop Execution Script Registry
└── 📁 frontend/                      # React TypeScript Ops Dashboard
    └── src/
        └── App.tsx                   # Observability Trace Control UI
```

---

## 🛠️ Step-by-Step Installation & Run Guide

### 1. Run the Backend System Engine
Open your terminal and navigate to the backend service layout:
```bash
cd backend
npm install
npm start
```
*The service engine will immediately spin up a live watcher and persistently listen for operational traffic on **`http://localhost:5000`**.*

### 2. Run the Frontend Monitoring Console
Open a new, separate terminal tab, move to the client directory, and ignite the development server:
```bash
cd ../frontend
npm install
npm start
```
*Your browser will automatically deploy and surface the live visual dashboard canvas at **`http://localhost:3000`**.*

---

## 🧪 Simulation Testing Scenarios

Once the dashboard finishes initializing, test how the mock agent behaves across separate production validation guardrails:

### Scenario A: The Happy Path Sequence (Order 1024)
* **Testing Input:** `"Please check order 1024. It arrived broken and I want to process a full refund."`
* **Agent Flow Behavior:** The agent autonomously executes `fetchOrderDetails`, verifies status matches `Delivered`, triggers financial payment reversal via `processStripeRefund`, logs a trackable instance inside `logTicketInCRM`, and echoes back full confirmation data.

### Scenario B: Operational Exception Safety Check (Order 1025)
* **Testing Input:** `"Can I get a refund for order 1025?"`
* **Agent Flow Behavior:** The agent reads the database, detects the shipment status equals `Shipped`, triggers a strict corporate policy constraint, and cleanly halts downstream financial logic to explain that items must be fully delivered before returns are authorized.

---

## 💡 Key Business Benefits (Interview Takeaways)
1. **Support Overhead Reduction:** Removes manual corporate labor completely for high-frequency, predictable return pipelines, reducing a 24-hour response window down to 2 seconds.
2. **Total Enterprise Auditability:** Maximizes compliance and tracking reliability by giving systems administrators step-by-step insight into exactly *why* an autonomous decision was made.
