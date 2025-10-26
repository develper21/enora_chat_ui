'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-panel rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-2xl">
            {user.name[0].toUpperCase()}
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
            <p className="text-muted mb-4">{user.email}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Role:</span>
                <span className="text-sm text-muted capitalize">{user.role}</span>
              </div>
              
              {user.subscription && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Plan:</span>
                    <span className="text-sm text-muted capitalize">{user.subscription.plan}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <span className={`text-sm capitalize ${
                      user.subscription.status === 'active' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {user.subscription.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Expires:</span>
                    <span className="text-sm text-muted">
                      {new Date(user.subscription.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => router.push('/settings')}
          className="w-full p-4 bg-slate-800 rounded-lg text-left hover:bg-slate-700 transition-colors"
        >
          <div className="font-medium mb-1">Settings</div>
          <div className="text-sm text-muted">Manage your preferences and customization</div>
        </button>

        <button 
          onClick={() => router.push('/subscription')}
          className="w-full p-4 bg-slate-800 rounded-lg text-left hover:bg-slate-700 transition-colors"
        >
          <div className="font-medium mb-1">Subscription</div>
          <div className="text-sm text-muted">Manage your plan and billing</div>
        </button>

        <button
          onClick={handleLogout}
          className="w-full p-4 bg-red-500/10 text-red-500 rounded-lg text-left hover:bg-red-500/20 transition-colors"
        >
          <div className="font-medium mb-1">Sign out</div>
          <div className="text-sm opacity-80">Log out of your account</div>
        </button>
      </div>
    </div>
  );
}