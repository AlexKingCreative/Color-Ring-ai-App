import React from 'react';
import { StepIndicator } from './UI/StepIndicator';
import { CheckCircle, Check, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  steps: any[];
  matchCount: number;
  onBack: () => void;
  onActivate: () => void;
}

export const PricingStep: React.FC<Props> = ({ steps, matchCount, onBack, onActivate }) => (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6">
       <StepIndicator steps={steps} />
       <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block p-4 bg-green-100 text-green-700 rounded-full mb-6"><CheckCircle size={48} /></div>
          <h2 className="text-4xl font-serif font-bold text-brand-900 mb-4">Setup Complete!</h2>
          <p className="text-xl text-gray-500">You have matched {matchCount} colors. Your AI assistant is ready.</p>
       </div>
       <div className="max-w-md w-full">
          <div className="border-2 border-brand-600 rounded-2xl p-8 shadow-2xl flex flex-col relative overflow-hidden bg-white">
             <div className="absolute top-0 left-0 right-0 bg-brand-600 text-white text-center text-xs font-bold uppercase py-1 tracking-wider">Professional Plan</div>
             <h3 className="font-bold text-2xl text-gray-900 mb-2 mt-4 text-center">AI Color Ring</h3>
             <div className="flex items-baseline justify-center gap-1 mb-6"><span className="text-5xl font-bold text-brand-900">$297</span><span className="text-gray-500">/mo</span></div>
             <ul className="space-y-4 mb-8 flex-1 border-t border-gray-100 pt-6">
                <li className="flex items-center gap-3 text-gray-700"><Check size={18} className="text-green-500" /> Unlimited Color Matches</li>
                <li className="flex items-center gap-3 text-gray-700"><Check size={18} className="text-green-500" /> Universal Brand Translation</li>
                <li className="flex items-center gap-3 text-gray-700"><Check size={18} className="text-green-500" /> 24/7 AI Chat Assistant</li>
                <li className="flex items-center gap-3 text-gray-700"><Check size={18} className="text-green-500" /> 7-Day Free Trial</li>
             </ul>
             <button onClick={onActivate} className="w-full py-4 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                Activate & Start Trial <ArrowRight size={18} />
             </button>
             <p className="text-center text-xs text-gray-400 mt-4">Secure payment via Stripe</p>
          </div>
       </div>
       <button onClick={onBack} className="mt-12 text-gray-400 hover:text-gray-600 flex items-center gap-2"><ArrowLeft size={16} /> Back to matching</button>
    </div>
);