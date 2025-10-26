'use client';

import { useState, createElement } from 'react';
import { Search, Wrench, Siren, Cog } from 'lucide-react';

interface SecurityTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: 'audit' | 'incident' | 'maintenance' | 'implementation';
}

const MOCK_TASKS: SecurityTask[] = [
  {
    id: '1',
    title: 'Firewall Rule Review',
    description: 'Review and update firewall rules based on recent security audit findings.',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-11-01',
    category: 'audit'
  },
  {
    id: '2',
    title: 'Security Patch Deployment',
    description: 'Deploy critical security patches to all production servers.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-10-28',
    category: 'maintenance'
  },
  {
    id: '3',
    title: 'IDS Implementation',
    description: 'Set up and configure Intrusion Detection System on network edge.',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-11-15',
    category: 'implementation'
  }
];

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-500',
  medium: 'bg-yellow-500/10 text-yellow-500',
  high: 'bg-red-500/10 text-red-500'
};

const categoryIcons: Record<SecurityTask['category'], React.ComponentType<any>> = {
  audit: Search,
  incident: Siren,
  maintenance: Wrench,
  implementation: Cog
};

export default function TasksPage() {
  const [filter, setFilter] = useState<SecurityTask['status'] | 'all'>('pending');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Security Tasks</h1>
        <button className="px-4 py-2 bg-primary text-black rounded font-medium hover:bg-primary/90 transition-colors">
          New Task
        </button>
      </div>

      <div className="bg-panel rounded-lg p-4 mb-6">
        <div className="flex gap-2">
          {(['pending', 'in-progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-slate-700 text-white'
                  : 'text-muted hover:bg-slate-800'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_TASKS.filter(task => filter === 'all' || task.status === filter).map((task) => (
          <div
            key={task.id}
            className="bg-panel rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                {createElement(categoryIcons[task.category], {
                  size: 24,
                  className: 'shrink-0 text-muted',
                  'aria-label': task.category
                })}
                <div>
                  <h3 className="font-medium mb-1">{task.title}</h3>
                  <p className="text-sm text-muted">{task.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mt-4 text-sm">
              <span className="text-muted">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <select
                value={task.status}
                onChange={() => {}} // Add status update handler
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button className="text-primary hover:underline ml-auto">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}