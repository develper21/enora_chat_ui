'use client';

import { createElement } from 'react';
import {
  BarChart3,
  Search as SearchIcon,
  Shield,
  Laptop,
  Plug2
} from 'lucide-react';

interface Connector {
  id: string;
  name: string;
  description: string;
  type: 'siem' | 'scanner' | 'firewall' | 'edr' | 'other';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
}

const MOCK_CONNECTORS: Connector[] = [
  {
    id: '1',
    name: 'Splunk SIEM',
    description: 'Enterprise security information and event management system',
    type: 'siem',
    status: 'connected',
    lastSync: '2025-10-26T09:30:00Z'
  },
  {
    id: '2',
    name: 'Nessus Scanner',
    description: 'Vulnerability assessment and management scanner',
    type: 'scanner',
    status: 'disconnected'
  },
  {
    id: '3',
    name: 'Palo Alto Firewall',
    description: 'Next-generation firewall integration',
    type: 'firewall',
    status: 'error'
  },
  {
    id: '4',
    name: 'CrowdStrike EDR',
    description: 'Endpoint detection and response platform',
    type: 'edr',
    status: 'connected',
    lastSync: '2025-10-26T10:15:00Z'
  }
];

const statusStyles = {
  connected: 'bg-green-500/10 text-green-500',
  disconnected: 'bg-yellow-500/10 text-yellow-500',
  error: 'bg-red-500/10 text-red-500'
};

const typeIcons: Record<Connector['type'], React.ComponentType> = {
  siem: BarChart3,
  scanner: SearchIcon,
  firewall: Shield,
  edr: Laptop,
  other: Plug2
};

export default function ConnectorsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Security Connectors</h1>
          <p className="text-muted">Integrate with your security tools and systems</p>
        </div>
        <button className="px-4 py-2 bg-primary text-black rounded font-medium hover:bg-primary/90 transition-colors">
          Add Connector
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_CONNECTORS.map((connector) => (
          <div
            key={connector.id}
            className="bg-panel rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 shrink-0 text-muted" aria-label={connector.type} role="img">
                {createElement(typeIcons[connector.type], {})}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{connector.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${statusStyles[connector.status]}`}>
                    {connector.status}
                  </span>
                </div>
                <p className="text-sm text-muted mt-1">{connector.description}</p>
              </div>
            </div>

            <div className="border-t border-slate-700 mt-4 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {connector.lastSync 
                    ? `Last sync: ${new Date(connector.lastSync).toLocaleString()}`
                    : 'Never synced'}
                </span>
                <button className="text-primary hover:underline">
                  Configure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Documentation Section */}
      <div className="mt-8 bg-panel rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Integration Guide</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted">
            Connect your security tools to enable automated analysis, incident response,
            and threat intelligence sharing. Follow our documentation to set up
            integrations with SIEM systems, vulnerability scanners, firewalls, and EDR platforms.
          </p>
          <div className="mt-4 flex gap-4">
            <button className="px-4 py-2 bg-slate-800 rounded text-sm hover:bg-slate-700 transition-colors">
              View Documentation
            </button>
            <button className="px-4 py-2 bg-slate-800 rounded text-sm hover:bg-slate-700 transition-colors">
              API Reference
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}