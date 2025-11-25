
import React, { useState, useEffect } from 'react';
import { ColorRingLogo } from '../Logo';
import { authService } from '../../services/authService';
import { isSupabaseConfigured } from '../../services/supabase';
import { Loader2, AlertTriangle } from 'lucide-react';

interface Props {
  onBack: () => void;
  onSuccess: (email: string) => void;
}

export const AuthForm: React.FC<Props> = ({ onBack, onSuccess }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    setIsConfigured(isSupabaseConfigured());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigured) return;
    
    setLoading(true);
    setError(null);
    try {
        const { error: authError } = authMode === 'signup' 
            ? await authService.signUp(email, password)
            : await authService.signIn(email, password);
        
        if (authError) throw authError;
        onSuccess(email);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="bg-brand-900 p-3 rounded-xl text-white inline-block mb-4"><ColorRingLogo size={32} /></div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">{authMode === 'signup' ? 'Create Account' : 'Welcome Back'}</h2>
        </div>

        {!isConfigured && (
           <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex gap-3 items-start">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-amber-800">
                 <p className="font-bold">System Configuration Missing</p>
                 <p>The database connection has not been set up. Please check your build environment variables (VITE_SUPABASE_URL).</p>
              </div>
           </div>
        )}

        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded text-center border border-red-100">{error}</div>}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input 
              type="email" 
              required 
              disabled={!isConfigured}
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="block w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100 disabled:text-gray-400" 
              placeholder="Email address" 
            />
            <input 
              type="password" 
              required 
              disabled={!isConfigured}
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="block w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100 disabled:text-gray-400" 
              placeholder="Password" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !isConfigured} 
            className="w-full flex justify-center py-4 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-brand-900 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : (authMode === 'signup' ? 'Start Free Trial' : 'Sign In')}
          </button>
        </form>
        <div className="text-center">
           <button 
             onClick={() => setAuthMode(m => m === 'signup' ? 'signin' : 'signup')} 
             disabled={!isConfigured}
             className="text-sm text-brand-600 hover:underline disabled:text-gray-400"
           >
             {authMode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
           </button>
        </div>
        <button onClick={onBack} className="w-full text-center text-gray-400 text-sm hover:text-gray-600">Back to previous step</button>
      </div>
    </div>
  );
};
