'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, History, CheckSquare, Plug2, Zap, Eye, Trash2, Settings, Shield } from 'lucide-react';

type NavLinkItem = { href: string; label: string; icon: React.ComponentType<any> };
type DividerItem = { divider: true };
const navigationItems: (NavLinkItem | DividerItem)[] = [
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/history', label: 'History', icon: History },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/connectors', label: 'Connectors', icon: Plug2 },
  { href: '/api', label: 'API', icon: Zap },
  { divider: true },
  { href: '/incognito', label: 'Incognito Mode', icon: Eye },
  { href: '/recycle', label: 'Recycle Bin', icon: Trash2 },
  { href: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
  <aside className="w-72 h-screen shrink-0 border-r border-slate-800 glass-panel fixed left-0 top-0">
      <div className="p-4 h-14 border-b border-slate-800">
        <Link href="/" className="flex items-center space-x-2">
          <Shield size={24} className="text-white" />
          <div>
            <div className="text-lg font-semibold text-white">CobraGPT</div>
            <div className="text-xs text-muted">Cyber Security Assistant</div>
          </div>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {navigationItems.map((item, i) => {
          if ((item as DividerItem).divider) {
            return <hr key={`divider-${i}`} className="my-4 border-slate-800" />;
          }

          const nav = item as NavLinkItem;
          const href = nav.href;
          const Icon = nav.icon;
          const active = pathname?.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                active ? 'bg-slate-700/50 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span>{nav.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 rounded-lg bg-slate-800/50">
          <div className="text-sm font-medium mb-1">Need help?</div>
          <p className="text-xs text-muted">
            Check out our documentation or contact support for assistance.
          </p>
        </div>
      </div>
    </aside>
  );
}