
import React from 'react';
import { RefreshCw, MessageCircle, Ghost } from 'lucide-react';

export const LandingROI: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-brand-900 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 bg-brand-500 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-200 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in-up">
           <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">The High Cost of "I Think This Matches..."</h2>
           <p className="text-brand-100 text-lg leading-relaxed">
             Every time a customer guesses their color and gets it wrong, your brand pays the price. 
             ColorRing.ai doesn't just save you money on physical rings—it stops the leaks in your business.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Pain Point 1 */}
           <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center mb-6">
                 <RefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">The Return Nightmare</h3>
              <p className="text-gray-400 leading-relaxed">
                 Processing returns destroys margins. Between shipping costs, restocking fees, and open-package spoilage, a single color mismatch wipes out the profit from three other sales.
              </p>
           </div>

           {/* Pain Point 2 */}
           <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-6">
                 <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">No More "Email To Color Match"</h3>
              <p className="text-gray-400 leading-relaxed">
                 "Can you match this selfie?" You and your team waste hours every day squinting at bad lighting in Instagram DMs. It's unscalable and keeps you from focusing on growth.
              </p>
           </div>

           {/* Pain Point 3 */}
           <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <div className="w-12 h-12 bg-brand-200/20 text-brand-200 rounded-xl flex items-center justify-center mb-6">
                 <Ghost size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">The Ghosted Carts</h3>
              <p className="text-gray-400 leading-relaxed">
                 Confusion kills conversion. If a customer isn't 100% sure about the color match, they don't buy. They leave your site and go back to Google to find a brand they know.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};
