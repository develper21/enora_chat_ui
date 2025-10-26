'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PlusCircle, User, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-14 flex items-center px-6 border-b border-slate-800 glass-panel sticky top-0 z-10">
      <div className="flex-1 text-sm text-muted">CobraGPT — Cyber Security Assistant</div>
      
      <div className="flex items-center gap-4">
        <Link 
          href="/chat/new" 
          className="px-3 py-1.5 rounded bg-primary hover:bg-primary/90 text-black text-sm font-medium transition-colors inline-flex items-center gap-1.5"
        >
          <PlusCircle size={16} />
          New chat
        </Link>

        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 px-3 rounded-full bg-slate-700 flex items-center gap-2 hover:bg-slate-600 transition-colors"
          >
            <User size={18} />
            <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-panel rounded-lg shadow-xl border border-slate-700">
              <Link 
                href="/profile" 
                className="block px-4 py-2 text-sm hover:bg-slate-700"
              >
                Profile
              </Link>
              <Link 
                href="/settings" 
                className="block px-4 py-2 text-sm hover:bg-slate-700"
              >
                Settings
              </Link>
              <hr className="my-2 border-slate-700" />
              <button 
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}