
import React from 'react';
import { ColorRingLogo } from '../Logo';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { ChatWidget } from '../ChatWidget';
import { InstallerProfile } from '../../types';

interface Props {
  onBack: () => void;
}

export const BookingConfirmed: React.FC<Props> = ({ onBack }) => {
  // Mock profile for the inline demo to work
  const DEMO_PROFILE: InstallerProfile = {
    companyName: "Boutique Locks",
    colorCount: 10,
    selectedReferenceBrandId: 'bellami',
    // Add dummy matches so the AI has something to talk about in the demo
    matches: [
      { referenceBrandId: 'bellami', referenceColorId: 'b-18', userColorName: 'Honey Blonde', matchType: 'EXACT' },
      { referenceBrandId: 'bellami', referenceColorId: 'b-60', userColorName: 'Platinum Ice', matchType: 'EXACT' },
      { referenceBrandId: 'bellami', referenceColorId: 'b-1', userColorName: 'Midnight Black', matchType: 'EXACT' }
    ],
    billingStatus: 'ACTIVE'
  };

  return (
    <div className="min-h-screen bg-brand-50 font-sans text-brand-900 flex flex-col">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-brand-100 sticky top-0 z-20">
         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
                <div className="bg-brand-900 p-2 rounded-xl text-white transition-transform group-hover:scale-105"><ColorRingLogo size={20} /></div>
                <span className="font-serif font-bold text-xl text-brand-900">ColorRing.ai</span>
            </div>
         </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Success Message */}
            <div className="order-1 lg:order-1 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
                   <CheckCircle size={16} /> Booking Confirmed
                </div>
                
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-900 mb-6">
                   We'll see you soon.
                </h1>
                
                <p className="text-xl text-brand-800/70 leading-relaxed mb-10">
                   Thank you for scheduling your demo. A calendar invitation has been sent to your email address. Please check your spam folder if you don't see it shortly.
                </p>

                <div className="bg-white border border-brand-100 p-6 rounded-2xl shadow-sm flex items-start gap-4 max-w-md">
                   <div className="bg-brand-50 p-3 rounded-xl text-brand-600">
                      <Calendar size={24} />
                   </div>
                   <div>
                      <h3 className="font-bold text-brand-900 mb-1">Add to Calendar</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                         Please ensure you add the time to your calendar so you don't miss our strategy session.
                      </p>
                   </div>
                </div>
            </div>

            {/* Right Column: Inline Demo */}
            <div className="order-2 lg:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
               <div className="relative">
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-200 rounded-full blur-3xl opacity-50"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-500 rounded-full blur-3xl opacity-30"></div>

                  <div className="bg-white rounded-[2.5rem] shadow-2xl border border-brand-100 overflow-hidden relative z-10">
                     <div className="bg-brand-900 text-white p-6 text-center">
                        <h3 className="font-serif text-2xl font-bold mb-2">Try It Right Now</h3>
                        <p className="text-brand-200 text-sm">
                           Pretend you are a customer. Ask the AI: <br/>
                           <span className="font-mono bg-white/10 px-2 py-1 rounded text-white inline-block mt-2">"Do you have a match for Bellami #18?"</span>
                        </p>
                     </div>
                     
                     <div className="h-[500px] bg-gray-50">
                        {/* Inline Widget Demo */}
                        <ChatWidget 
                           profile={DEMO_PROFILE} 
                           defaultOpen={true} 
                           variant="inline" 
                        />
                     </div>
                  </div>
               </div>
            </div>

        </div>
      </main>

      <footer className="py-8 text-center text-brand-300 text-sm">
         &copy; {new Date().getFullYear()} Hair Pro 360 LLC.
      </footer>
    </div>
  );
};
