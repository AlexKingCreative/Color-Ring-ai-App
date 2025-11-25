import React, { useEffect } from 'react';
import { ColorRingLogo } from '../Logo';
import { ArrowLeft, Check, Sparkles, Zap, HelpCircle, AlertCircle, TrendingDown, ArrowRight } from 'lucide-react';

interface Props {
  onBack: () => void;
  onStart: () => void; // Currently passed from parent as handleBookDemo now
}

export const PublicPricing: React.FC<Props> = ({ onBack, onStart }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-50 font-sans text-brand-900">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-brand-100 sticky top-0 z-20">
         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
                <div className="bg-brand-900 p-2 rounded-xl text-white transition-transform group-hover:scale-105"><ColorRingLogo size={20} /></div>
                <span className="font-serif font-bold text-xl text-brand-900">ColorRing.ai</span>
            </div>
            <button onClick={onBack} className="text-sm font-medium text-brand-500 hover:text-brand-900 flex items-center gap-2 transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </button>
         </div>
      </nav>

      {/* Hero */}
      <div className="py-24 px-6 text-center bg-white border-b border-brand-100">
        <h1 className="font-serif text-5xl md:text-6xl font-medium text-brand-900 mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-brand-800/60 max-w-2xl mx-auto leading-relaxed font-light">
          No hidden fees. No setup costs. Just one simple subscription to automate your color matching.
        </p>
      </div>

      {/* Pricing Card Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
         <div className="relative max-w-md mx-auto">
             
             {/* Elegant Value Badge */}
             <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-max max-w-[90%]">
                <div className="bg-brand-900 text-white px-6 py-2 rounded-full shadow-xl shadow-brand-900/10 border border-brand-800 flex items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300">
                    <TrendingDown size={16} className="flex-shrink-0" strokeWidth={2} />
                    <span className="font-medium text-sm tracking-wide">Less than 1 physical ring!</span>
                </div>
             </div>

             <div className="bg-white rounded-[3rem] shadow-2xl shadow-brand-900/5 border border-brand-100 overflow-hidden relative hover:-translate-y-2 transition-transform duration-500 pt-10">
                 <div className="p-10 md:p-12">
                    <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest mb-8 justify-center bg-brand-50 py-2.5 px-5 rounded-full w-max mx-auto border border-brand-100">
                       <Sparkles size={12} /> Professional Plan
                    </div>
                    <div className="flex items-baseline gap-1 mb-4 justify-center">
                       <span className="text-6xl font-serif font-bold text-brand-900">$297</span>
                       <span className="text-brand-400 font-medium text-lg">/month</span>
                    </div>
                    <p className="text-brand-800/60 mb-10 text-center leading-relaxed font-light">Everything you need to grow your hair extension brand and reduce returns.</p>
                    
                    <button 
                      onClick={onStart}
                      className="w-full py-5 bg-brand-600 text-white font-bold uppercase tracking-wide text-sm rounded-full hover:bg-brand-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-12"
                    >
                      BOOK FREE DEMO <ArrowRight size={16} />
                    </button>

                    <div className="space-y-5">
                        {[
                            "Unlimited Color Matches",
                            "Universal Brand Database",
                            "24/7 AI Color Specialist Chatbot",
                            "Works with Shopify, Wix, WooCommerce",
                            "Custom Widget Branding",
                            "Priority Email Support"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="mt-0.5 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0 border border-brand-100">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                <span className="text-brand-800 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                 </div>
                 <div className="bg-brand-50/50 p-5 text-center text-xs text-brand-400 font-medium border-t border-brand-100 flex items-center justify-center gap-2 uppercase tracking-wider">
                    <Zap size={12} className="text-brand-500 fill-brand-500" /> Secure Checkout via Stripe
                 </div>
             </div>
         </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-brand-50 py-24 border-t border-brand-100">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-4xl font-bold text-brand-900 text-center mb-16">Frequently Asked Questions</h2>
            
            <div className="space-y-12">
               
               <div className="space-y-4">
                  <h3 className="font-bold text-brand-900 text-xl flex items-center gap-3">
                     <div className="bg-white p-2 rounded-full text-brand-500 shadow-sm"><HelpCircle size={20} /></div>
                     Is this for individual stylists or salons?
                  </h3>
                  <p className="text-brand-800/70 leading-relaxed pl-12 text-lg font-light">
                     No. ColorRing.ai is designed specifically for <strong>Hair Extension Brand Owners</strong> who sell their own line of hair extensions online.
                  </p>
               </div>

               <div className="space-y-4">
                  <h3 className="font-bold text-brand-900 text-xl flex items-center gap-3">
                     <div className="bg-white p-2 rounded-full text-brand-500 shadow-sm"><AlertCircle size={20} /></div>
                     What do I need to get started?
                  </h3>
                  <p className="text-brand-800/70 leading-relaxed pl-12 text-lg font-light">
                     To set up your account, you <strong>must own a physical color ring</strong> from at least one major brand (such as Bellami, Luxy, or similar). You will use this ring as a "Reference Key".
                  </p>
               </div>

               <div className="space-y-4">
                  <h3 className="font-bold text-brand-900 text-xl flex items-center gap-3">
                     <div className="bg-white p-2 rounded-full text-brand-500 shadow-sm"><HelpCircle size={20} /></div>
                     Do I need to send you my physical color ring?
                  </h3>
                  <p className="text-brand-800/70 leading-relaxed pl-12 text-lg font-light">
                     No! You map your inventory yourself using our simple onboarding wizard. You simply tell the system which industry-standard shades match your specific products.
                  </p>
               </div>

               <div className="space-y-4">
                  <h3 className="font-bold text-brand-900 text-xl flex items-center gap-3">
                     <div className="bg-white p-2 rounded-full text-brand-500 shadow-sm"><HelpCircle size={20} /></div>
                     Can I cancel anytime?
                  </h3>
                  <p className="text-brand-800/70 leading-relaxed pl-12 text-lg font-light">
                     Yes. There are no long-term contracts. You can cancel your subscription directly from your dashboard at any time.
                  </p>
               </div>
            </div>
         </div>
      </div>

      <footer className="bg-brand-900 text-white py-16">
         <div className="max-w-7xl mx-auto px-6 text-center">
             <h2 className="font-serif text-3xl font-bold mb-8">Ready to automate your sales?</h2>
             <button onClick={onStart} className="bg-white text-brand-900 px-12 py-4 rounded-full font-bold hover:bg-brand-100 transition-colors shadow-lg text-lg uppercase tracking-wide">
                Book Free Demo
             </button>
             <div className="mt-16 pt-8 border-t border-brand-800 text-sm text-brand-400 font-light">
                &copy; {new Date().getFullYear()} Hair Pro 360 LLC.
             </div>
         </div>
      </footer>
    </div>
  );
};