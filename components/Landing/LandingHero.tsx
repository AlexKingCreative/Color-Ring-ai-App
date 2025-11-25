
import React from 'react';
import { ArrowRight, MessageSquare, Zap, ShoppingBag, Store, Globe, Layout } from 'lucide-react';
import { ColorRingLogo } from '../Logo';

interface LandingHeroProps {
  onStart: () => void;
  onShowDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart, onShowDemo }) => {
  return (
    <section className="w-full relative pt-8 md:pt-24 pb-16 md:pb-36 overflow-hidden bg-brand-50">
      
      {/* Soft Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-100/80 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-200/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* LEFT COLUMN: Copy */}
        <div className="space-y-10 text-center lg:text-left animate-fade-in-up">
           
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-brand-600 text-xs font-bold uppercase tracking-widest mb-2 border border-brand-200 shadow-sm">
              For Hair Extension Brand Owners
           </div>
           
           <h1 className="font-serif text-5xl md:text-7xl font-medium text-brand-900 leading-[1.1] tracking-tight">
             <span className="block">Automate Color Matching.</span>
             <span className="text-brand-600 italic block display:block">Sell More Hair.</span>
           </h1>
           
           <p className="text-xl text-brand-800/70 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
             Stop losing customers who are confused about their shade. Instantly match competitor colors to <b>your</b> inventory without mailing expensive physical rings.
           </p>
           
           <div className="flex flex-col space-y-6">
             <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
               <button onClick={onStart} className="bg-brand-900 text-white px-10 py-4 rounded-full text-lg font-medium transition-all hover:bg-brand-800 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-3 shadow-xl shadow-brand-900/10 uppercase tracking-wide">
                  BOOK FREE DEMO <ArrowRight size={18} />
               </button>
               <button onClick={onShowDemo} className="px-10 py-4 rounded-full text-lg font-medium text-brand-900 bg-white border border-brand-200 hover:border-brand-300 hover:bg-brand-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <MessageSquare size={18} /> See It Work
               </button>
             </div>
             <p className="text-sm text-brand-400 font-medium flex items-center justify-center lg:justify-start gap-2">
               <Zap size={14} className="text-brand-600 fill-brand-600"/> 
               7-Day Free Trial • No Credit Card Required
             </p>
           </div>
           
           <div className="pt-8 flex flex-wrap gap-8 justify-center lg:justify-start items-center opacity-50 mix-blend-multiply animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2"><ShoppingBag size={18} /><span className="text-xs font-bold tracking-wide">SHOPIFY</span></div>
              <div className="flex items-center gap-2"><Store size={18} /><span className="text-xs font-bold tracking-wide">WOOCOMMERCE</span></div>
              <div className="flex items-center gap-2"><Globe size={18} /><span className="text-xs font-bold tracking-wide">WIX</span></div>
              <div className="flex items-center gap-2"><Layout size={18} /><span className="text-xs font-bold tracking-wide">SQUARESPACE</span></div>
           </div>
        </div>

        {/* RIGHT COLUMN: Visual */}
        <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
           
           {/* The Card (Soft Luxury Design) */}
           <div className="relative bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_-12px_rgba(67,48,43,0.1)] border border-white p-10 max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-700 cursor-pointer group" onClick={onShowDemo}>
              
              {/* Chat Header Simulation */}
              <div className="flex items-center gap-5 mb-8 border-b border-brand-200/50 pb-6">
                <div className="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                    <ColorRingLogo size={28} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-brand-900">Color Specialist</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                     </span>
                     <span className="text-xs text-brand-500 font-bold uppercase tracking-widest">Online Now</span>
                  </div>
                </div>
              </div>

              {/* Conversation */}
              <div className="space-y-6 mb-10">
                {/* User Message */}
                <div className="bg-white border border-brand-100 rounded-3xl rounded-tl-none p-6 text-base text-brand-800 shadow-sm">
                  <p>Do you have a match for <b>Bellami #18</b>? I want to match my extensions.</p>
                </div>

                {/* AI Response - Warm Terracotta */}
                <div className="bg-brand-600 text-white rounded-3xl rounded-br-none p-6 text-base shadow-xl shadow-brand-600/20 relative overflow-hidden">
                  <div className="relative z-10 font-light">
                    Yes! Based on verified mapping, our <span className="font-medium text-white border-b border-white/40 pb-0.5">Honey Blonde</span> is an exact match for Bellami #18.
                  </div>
                  {/* Soft Shine Effect */}
                  <div className="absolute -right-6 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </div>

              {/* CTA Button inside Card */}
              <div className="flex items-center justify-center">
                 <div className="w-full bg-brand-50 text-brand-900 py-4 rounded-full text-sm font-bold tracking-wide shadow-sm border border-brand-100 group-hover:bg-white group-hover:border-brand-200 transition-colors text-center">
                    Start Matching
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
