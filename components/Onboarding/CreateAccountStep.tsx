
import React, { useState } from 'react';
import { StepIndicator } from './UI/StepIndicator';
import { Save, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '../../services/authService';
import { dbService } from '../../services/dbService';
import { isSupabaseConfigured } from '../../services/supabase';

interface Props {
  email: string;
  companyName: string;
  steps: any[];
  onBack: () => void;
  onSuccess: (email: string) => void;
}

export const CreateAccountStep: React.FC<Props> = ({ email, companyName, steps, onBack, onSuccess }) => {
  const [authEmail, setAuthEmail] = useState(email);
  const [authPassword, setAuthPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // 1. Check Configuration First
    if (!isSupabaseConfigured()) {
        setError("System configuration missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
        setIsLoading(false);
        return;
    }

    try {
        const { data, error } = await authService.signUp(authEmail, authPassword);
        
        if (error) throw error;
        if (data.user) {
            // Create Profile
            await dbService.createProfile(data.user.id, authEmail, companyName);
            onSuccess(authEmail);
        }
    } catch (err: any) {
        console.error("Signup Error:", err);
        // Handle common Supabase errors with user-friendly messages
        if (err.message === 'Failed to fetch') {
            setError("Connection failed. Please check your internet connection or database configuration.");
        } else {
            setError(err.message || "An unexpected error occurred.");
        }
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-6">
       <StepIndicator steps={steps} bgClass="bg-brand-50" />
       <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 border border-brand-100 animate-in zoom-in-95 duration-300 relative">
             <button onClick={onBack} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
                <ArrowRight className="rotate-180" size={20} />
             </button>
             <div className="text-center mb-8 mt-2">
               <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4"><Save size={32} /></div>
               <h2 className="font-serif text-2xl font-bold text-gray-900">Save Your Progress</h2>
               <p className="text-gray-500 mt-2 text-sm leading-relaxed">You're about to map your inventory. Create a free account so your work is saved automatically.</p>
             </div>

             {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

             <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="email" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-brand-500" placeholder="you@brand.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="password" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-brand-500" placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-brand-900 text-white py-4 rounded-xl font-bold hover:bg-brand-800 flex justify-center items-center gap-2 transition-all">
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account & Start Matching'}
                  {!isLoading && <ArrowRight size={20} />}
                </button>
             </form>
             
             <div className="mt-6 text-center text-xs text-gray-400">
                By creating an account, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
             </div>
          </div>
       </div>
    </div>
  );
};
