import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

interface Order {
  id: string;
  item: string;
  price: number;
  status: string;
  purchaseDate: string;
}

const mockOrdersDB: Order[] = [
  { id: "1024", item: "Enterprise Wireless Headphones", price: 299, status: "Delivered", purchaseDate: "2026-10-15" },
  { id: "1025", item: "Mechanical Developer Keyboard", price: 150, status: "Shipped", purchaseDate: "2026-10-28" }
];

interface AgentRequest {
  prompt: string;
}

app.post('/api/agent', async (req: Request<{}, {}, AgentRequest>, res: Response): Promise<void> => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt data is required" });
    return;
  }

  console.log(`🤖 Local Mock Agent received prompt: "${prompt}"`);

  // Extract Order ID using regex (looks for any 4 digit number)
  const orderIdMatch = prompt.match(/\b\d{4}\b/);
  const detectedOrderId = orderIdMatch ? orderIdMatch[0] : null;

  // Initialize our structured observability trace steps array
  const traceSteps = [];

  // LOOP 1: Intent Analysis & Database Lookup simulation
  traceSteps.push({
    text: `Analyzing incoming customer request. Identified user intent as "refund_request". Scanning text payload for primary entity structural parameters... Found candidate order token: "${detectedOrderId || 'None'}". Invoking tool 'fetchOrderDetails'.`,
    toolCalls: [{ toolName: 'fetchOrderDetails', args: { orderId: detectedOrderId || 'unknown' } }]
  });

  if (!detectedOrderId) {
    res.json({
      text: "I was unable to process your request because I could not find a valid 4-digit Order ID in your message. Please provide your order number (e.g., 1024) so I can look up your details.",
      steps: traceSteps
    });
    return;
  }

  const order = mockOrdersDB.find(o => o.id === detectedOrderId);

  if (!order) {
    traceSteps.push({
      text: `Database execution completed. System alert: Order ID ${detectedOrderId} was not resolved in our central ledger registry. Aborting downstream automated steps.`,
      toolCalls: []
    });
    res.json({
      text: `I attempted to look up order #${detectedOrderId}, but it does not exist in our database records. Please double-check your receipt order number.`,
      steps: traceSteps
    });
    return;
  }

  // LOOP 2: Business Logic Validation Step
  if (order.status !== 'Delivered') {
    traceSteps.push({
      text: `Database record retrieved successfully for item: "${order.item}". Safety guardrail triggered: Order status is currently "${order.status}". Corporate return criteria requires status to equal "Delivered". Halting refund execution pipeline.`,
      toolCalls: []
    });
    res.json({
      text: `I found your order #${detectedOrderId} for the ${order.item}, but its status is currently "${order.status}". We can only process returns and refunds after the package has been fully delivered to your address.`,
      steps: traceSteps
    });
    return;
  }

  // LOOP 3: Payment Reversal Action simulation
  traceSteps.push({
    text: `Validation parameters checked: Order is "Delivered" and purchase date (${order.purchaseDate}) is within the permissible 30-day enterprise window. Autonomously executing core financial actuator tool 'processStripeRefund' for an amount of $${order.price}.`,
    toolCalls: [{ toolName: 'processStripeRefund', args: { orderId: detectedOrderId, amount: order.price } }]
  });

  // LOOP 4: CRM Audit Log Sync simulation
  const mockTxId = `ch_${Math.random().toString(36).substring(7)}`;
  traceSteps.push({
    text: `Stripe API response gateway code: 200 OK. Transaction successfully reversed under reference ID: ${mockTxId}. Now invoking internal auditor tool 'logTicketInCRM' to register this execution flow history.`,
    toolCalls: [{ toolName: 'logTicketInCRM', args: { orderId: detectedOrderId, resolution: `Refunded $${order.price} via local mock agent execution loop.` } }]
  });

  // Final Output Payload matching the exact interface data model
  res.json({
    text: `Success! I have automatically verified your order for the ${order.item}. Since it arrived damaged, I have processed a full refund of $${order.price} back to your original payment method via Stripe (ID: ${mockTxId}). Your support ticket has been formally logged and resolved in our system registry.`,
    steps: traceSteps
  });
});

const PORT = 9000;
app.listen(PORT, () => console.log(`🚀 Persistently listening on port ${PORT} (Using Local Free Agent Mock Brain)`));
