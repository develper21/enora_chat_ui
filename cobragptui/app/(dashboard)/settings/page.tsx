'use client';

import { useState, useEffect } from 'react';

interface Settings {
  theme: 'system' | 'dark' | 'light';
  notifications: boolean;
  soundEnabled: boolean;
  incognitoDefault: boolean;
  language: string;
  apiKey?: string;
}

const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  notifications: true,
  soundEnabled: true,
  incognitoDefault: false,
  language: 'en',
};

function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem('settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('settings', JSON.stringify(updated));
  };

  return { settings, updateSettings };
}

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <section className="bg-panel rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value as Settings['theme'] })}
                className="w-full p-2 rounded bg-slate-800 border border-slate-700"
              >
                <option value="system">System</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="w-full p-2 rounded bg-slate-800 border border-slate-700"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-panel rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Enable notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => updateSettings({ notifications: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 bg-slate-800"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Sound effects</span>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 bg-slate-800"
              />
            </label>
          </div>
        </section>

        {/* Privacy */}
        <section className="bg-panel rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Privacy</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="block text-sm font-medium">Default to incognito mode</span>
                <span className="block text-xs text-muted">Start all new chats in incognito mode</span>
              </div>
              <input
                type="checkbox"
                checked={settings.incognitoDefault}
                onChange={(e) => updateSettings({ incognitoDefault: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 bg-slate-800"
              />
            </label>
          </div>
        </section>

        {/* API Integration */}
        <section className="bg-panel rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">API Integration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input
                type="password"
                value={settings.apiKey || ''}
                onChange={(e) => updateSettings({ apiKey: e.target.value })}
                placeholder="Enter your API key"
                className="w-full p-2 rounded bg-slate-800 border border-slate-700"
              />
              <p className="mt-1 text-xs text-muted">Required for API access and integrations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}