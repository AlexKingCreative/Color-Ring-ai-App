
import React, { useEffect, useState } from 'react';
import { Clock, Sparkles } from 'lucide-react';

export const LandingHowItWorks: React.FC = () => {
  const [chatAnimIndex, setChatAnimIndex] = useState(0);

  // Animation Loop
  useEffect(() => {
     const interval = setInterval(() => {
        setChatAnimIndex(prev => (prev + 1) % 3); 
     }, 3000);
     return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 text-xs font-bold uppercase tracking-wider mb-4"><Clock size={14} /> 10 Minute Setup</div>
             <h2 className="font-serif text-4xl font-bold text-brand-900 mb-6">A Simple Plan to Win More Customers.</h2>
             <p className="text-gray-500 mb-12 text-lg leading-relaxed">
               Confusion is the enemy of conversion. When customers aren't sure about the color, they don't buy. Here is how we fix that in three steps:
             </p>
             <div className="space-y-10 relative pl-4">
                <div className="absolute left-[2rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-200 via-brand-200 to-transparent -z-10"></div>
                {[
                    {
                        num: 1, 
                        title: "Map Your Inventory", 
                        desc: "Spend a few minutes linking your unique shades to the industry standards (like Bellami #18 or #60) that your customers already know."
                    },
                    {
                        num: 2, 
                        title: "Copy & Paste the Code", 
                        desc: "Drop our lightweight script into your store. It integrates seamlessly with Shopify, WooCommerce, and custom sites in seconds."
                    },
                    {
                        num: 3, 
                        title: "Capture Sales on Autopilot", 
                        desc: "Your AI Color Specialist starts working instantly, removing the #1 barrier to buying hair online by guiding visitors to the perfect match 24/7."
                    }
                ].map((s, i) => (
                    <div key={s.num} className="flex gap-6 group cursor-default animate-fade-in-up opacity-0" style={{ animationDelay: `${0.2 + (i * 0.2)}s` }}>
                       <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-100 to-white border-2 border-brand-200 text-brand-700 flex items-center justify-center font-bold text-2xl shadow-md relative z-10">{s.num}</div>
                       <div className="group-hover:translate-x-2 transition-transform duration-300 py-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h4>
                          <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                       </div>
                    </div>
                ))}
             </div>
          </div>
          
          <div className="bg-brand-50 rounded-3xl p-8 lg:p-12 border border-brand-100 relative overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
             <div className="relative z-10 flex flex-col items-center gap-4 h-[300px] justify-center">
                <div className={`w-full max-w-xs mr-auto bg-white p-4 rounded-xl rounded-bl-none shadow-sm border border-gray-200 transition-all duration-500 ${chatAnimIndex >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                   <div className="flex items-center gap-2 mb-1"><div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">U</div><span className="text-xs font-bold text-gray-400 uppercase">Stylist</span></div>
                   <p className="text-sm text-gray-600">"Do you have a match for Bellami #18?"</p>
                </div>
                {chatAnimIndex >= 1 && (
                    <div className="flex items-center gap-2 text-brand-400 text-xs font-medium animate-pulse"><Sparkles size={12} /> AI analyzing color codes...</div>
                )}
                <div className={`w-full max-w-xs ml-auto bg-brand-900 p-4 rounded-xl rounded-br-none shadow-xl border border-brand-800 transition-all duration-500 ${chatAnimIndex === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                   <div className="flex items-center gap-2 mb-1 justify-end"><span className="text-xs font-bold text-brand-200 uppercase">ColorRing AI</span><div className="w-6 h-6 bg-brand-700 rounded-full flex items-center justify-center text-brand-200 text-xs font-bold">AI</div></div>
                   <p className="text-sm text-white">"Yes! Our <span className="font-bold underline decoration-brand-400">Honey Blonde</span> is a perfect match."</p>
                </div>
             </div>
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-50"></div>
          </div>
       </div>
    </section>
  );
};
