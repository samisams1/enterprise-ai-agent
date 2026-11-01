import React, { useState } from 'react';
import { Bot, Cpu, Wrench, ShieldCheck, CornerDownRight } from 'lucide-react';

interface AgentStep {
  type: string;
  text?: string;
  toolCalls?: any[];
}

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; steps: AgentStep[] } | null>(null);

  const triggerAgent = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:9000/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to interface with Agent Engine", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ marginBottom: '36px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '30px', fontWeight: 800, color: '#111827', margin: 0 }}>
          <Bot size={38} color="#2563eb" /> Enterprise Agent Operations Dashboard
        </h1>
        <p style={{ color: '#4b5563', marginTop: '8px', fontSize: '15px' }}>
          Production simulation mapping full runtime observability of autonomous agentic multi-step planning loops.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Left Side: Simulation Workspace Controls */}
        <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, marginBottom: '14px', fontSize: '18px', fontWeight: 600, color: '#374151' }}>Test Input Workspace</h3>
          <textarea
            style={{ width: '100%', height: '140px', padding: '14px', borderRadius: '10px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '15px', color: '#1f2937', resize: 'none', marginBottom: '18px', lineHeight: '1.5' }}
            placeholder="Ex: I bought an item under order 1024, but it arrived broken. Can you help me process a refund?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={triggerAgent}
            disabled={loading}
            style={{ width: '100%', backgroundColor: loading ? '#93c5fd' : '#2563eb', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'background-color 0.2s' }}
          >
            {loading ? 'Agent Orchestrating Pipelines...' : 'Execute Agent Deployment'}
          </button>
        </div>

        {/* Right Side: Runtime Observability Trace Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {result && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '24px', borderRadius: '14px' }}>
              <h3 style={{ marginTop: 0, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontSize: '16px', fontWeight: 700 }}>
                <ShieldCheck color="#16a34a" size={20} /> Client Resolution Output
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#14532d', margin: 0 }}>{result.text}</p>
            </div>
          )}

          {result?.steps && (
            <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#374151', fontSize: '18px', fontWeight: 600 }}>Observability Runtime Logs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {result.steps.map((step, idx) => (
                  <div key={idx} style={{ borderLeft: '2px solid #e5e7eb', paddingLeft: '20px', marginLeft: '8px' }}>
                    {step.text && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <Cpu size={18} color="#2563eb" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                          <strong style={{ color: '#1f2937' }}>Thought Process Loop {idx + 1}:</strong> {step.text}
                        </p>
                      </div>
                    )}
                    {step.toolCalls && step.toolCalls.map((tc, tcIdx) => (
                      <div key={tcIdx} style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5', padding: '12px 16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Wrench size={16} color="#ea580c" />
                          <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#c2410c', fontWeight: 700 }}>
                            Autonomous Action Called: {tc.toolName}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '24px' }}>
                          <CornerDownRight size={14} color="#9a3412" />
                          <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#9a3412' }}>
                            Payload Parameters: {JSON.stringify(tc.args)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
