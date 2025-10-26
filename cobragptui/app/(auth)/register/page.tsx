'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      router.push('/chat');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-muted">Join CobraGPT for cyber security assistance</p>
        </div>

        <div className="bg-panel p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-muted">Must be at least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-primary text-black rounded font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}