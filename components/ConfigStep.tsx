
import React, { useState } from 'react';
import { ColorRingLogo } from './Logo';
import { saveSupabaseConfig } from '../services/supabase';
import { Save, Database, Key } from 'lucide-react';

export const ConfigStep: React.FC = () => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && key) {
      saveSupabaseConfig(url, key);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="bg-brand-900 p-3 rounded-xl text-white inline-block mb-4"><ColorRingLogo size={32} /></div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">App Configuration</h2>
          <p className="mt-2 text-gray-500 text-sm">
            Please configure your Supabase backend connection to continue.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Supabase Project URL</label>
            <div className="relative">
              <Database className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="url" 
                required 
                value={url} 
                onChange={e => setUrl(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm font-mono" 
                placeholder="https://your-project.supabase.co"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Supabase Anon Key</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                required 
                value={key} 
                onChange={e => setKey(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm font-mono" 
                placeholder="eyJhbGciOiJIUzI1NiIsIn..."
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800 leading-relaxed">
            <strong>Note:</strong> These keys are saved to your browser's Local Storage for this session. In a production build, these should be set as Environment Variables.
          </div>

          <button type="submit" className="w-full flex justify-center py-4 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-brand-900 hover:bg-brand-800 transition-colors flex items-center gap-2">
            <Save size={18} /> Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
};
