
import React from 'react';
import { CircleDollarSign, ArrowLeftRight, ShieldCheck } from 'lucide-react';

export const LandingFeatures: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-white px-6">
       <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-24 max-w-3xl mx-auto animate-fade-in-up">
             <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-900 mb-6">Turn Big Box Customers into Your Boutique Brand Customers</h2>
             <p className="text-brand-800/60 text-lg leading-relaxed font-light">Your customers already know the big brand colors. The AI Color Ring bridges the gap, allowing them to ask for <i>any</i> major brand color and get matched instantly to <b>your</b> inventory.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Feature 1 */}
             <div className="bg-brand-50/50 rounded-[2.5rem] p-10 hover:bg-brand-50 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-500 border border-transparent hover:border-brand-100 group animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-900 mb-8 shadow-sm border border-brand-100 group-hover:scale-105 transition-transform duration-500">
                    <CircleDollarSign size={28} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-serif font-medium text-brand-900 mb-4">Zero Manufacturing Costs</h3>
                <p className="text-brand-800/60 leading-relaxed font-light">Drastically reduce the cost and time it takes for a stylist to start ordering. No manufacturing, inventory, or shipping of expensive physical rings required.</p>
             </div>

             {/* Feature 2 */}
             <div className="bg-brand-50/50 rounded-[2.5rem] p-10 hover:bg-brand-50 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-500 border border-transparent hover:border-brand-100 group animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-brand-200/50 rounded-2xl flex items-center justify-center text-brand-800 mb-8 border border-brand-200 group-hover:scale-105 transition-transform duration-500">
                    <ArrowLeftRight size={28} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-serif font-medium text-brand-900 mb-4">Universal Translation</h3>
                <p className="text-brand-800/60 leading-relaxed font-light">"I wear Bellami #18." Your AI assistant knows exactly what that means and shows them your matching shade instantly, removing the guesswork.</p>
             </div>

             {/* Feature 3 */}
             <div className="bg-brand-50/50 rounded-[2.5rem] p-10 hover:bg-brand-50 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-500 border border-transparent hover:border-brand-100 group animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-900 mb-8 shadow-sm border border-brand-100 group-hover:scale-105 transition-transform duration-500">
                    <ShieldCheck size={28} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-serif font-medium text-brand-900 mb-4">Verified Precision</h3>
                <p className="text-brand-800/60 leading-relaxed font-light">No robots guessing here. You verify every single match during setup. It's your professional expertise, scaled up to answer every customer instantly.</p>
             </div>
          </div>
       </div>
    </section>
  );
};
