
import React, { useState } from 'react';
import { ColorRingLogo } from './Logo';
import { ChatWidget } from './ChatWidget';
import { ShoppingBag, Store, Globe, Layout, ArrowRight } from 'lucide-react';
import { InstallerProfile } from '../types';

import { LandingHero } from './Landing/LandingHero';
import { LandingFeatures } from './Landing/LandingFeatures';
import { LandingHowItWorks } from './Landing/LandingHowItWorks';
import { LandingTestimonials } from './Landing/LandingTestimonials';
import { LandingROI } from './Landing/LandingROI';

interface LandingPageProps {
  onSignIn: () => void;
  onStart: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenPricing?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onSignIn, 
  onStart,
  onOpenPrivacy = () => {},
  onOpenTerms = () => {},
  onOpenPricing = () => {}
}) => {
  const [showDemo, setShowDemo] = useState(false);

  const BOOKING_URL = "https://links.hairpro360.com/widget/bookings/color-ring-ai-demo-session";

  const handleBookDemo = () => {
    window.open(BOOKING_URL, '_blank');
  };

  const DEMO_PROFILE: InstallerProfile = {
    companyName: "Boutique Locks",
    colorCount: 10,
    selectedReferenceBrandId: 'bellami',
    matches: [],
    billingStatus: 'ACTIVE'
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col font-sans text-brand-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-brand-900 p-2 rounded-xl text-white shadow-lg">
            <ColorRingLogo size={24} />
          </div>
          <span className="font-serif font-bold text-2xl text-brand-900 tracking-tight">ColorRing.ai</span>
        </div>
        <div className="flex items-center gap-8">
            <button onClick={onOpenPricing} className="hidden md:block text-brand-900 font-medium hover:text-brand-600 transition-colors">Pricing</button>
            <button onClick={onSignIn} className="hidden md:block text-brand-900 font-medium hover:text-brand-600 transition-colors">
            Sign In
            </button>
            <button onClick={handleBookDemo} className="bg-brand-900 text-white px-6 py-3 rounded-full font-medium hover:bg-brand-800 transition-all shadow-md hover:shadow-lg uppercase tracking-wide text-sm">
              Book Free Demo
            </button>
        </div>
      </nav>

      <div className="flex-1">
        <LandingHero onStart={handleBookDemo} onShowDemo={() => setShowDemo(true)} />
        
        {/* ROI Section */}
        <LandingROI />

        <LandingFeatures />
        <LandingTestimonials />
        <LandingHowItWorks />
        
        {/* Integration Footer */}
        <section className="border-t border-brand-100 py-24 bg-white">
            <div className="max-w-7xl mx-auto text-center px-6">
              <p className="text-xs text-brand-400 uppercase tracking-[0.2em] mb-12 font-bold">Seamless Integration</p>
              <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex flex-col items-center gap-3 group"><ShoppingBag size={40} className="group-hover:text-green-600 transition-colors" /><span className="text-xs font-bold">Shopify</span></div>
                  <div className="flex flex-col items-center gap-3 group"><Store size={40} className="group-hover:text-purple-600 transition-colors" /><span className="text-xs font-bold">WooCommerce</span></div>
                  <div className="flex flex-col items-center gap-3 group"><Globe size={40} className="group-hover:text-blue-600 transition-colors" /><span className="text-xs font-bold">Wix</span></div>
                  <div className="flex flex-col items-center gap-3 group"><Layout size={40} className="group-hover:text-gray-900 transition-colors" /><span className="text-xs font-bold">Squarespace</span></div>
              </div>
            </div>
        </section>
      </div>
      
      {/* Footer - Espresso */}
      <footer className="bg-brand-900 text-brand-50 py-20 border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
             <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-xl text-white"><ColorRingLogo size={20} /></div>
                  <span className="font-serif font-bold text-2xl text-white">ColorRing.ai</span>
                </div>
                <p className="text-brand-200/80 text-sm leading-relaxed max-w-xs font-light">
                  The intelligent color matching platform for boutique hair extension brands.
                </p>
             </div>
             
             <div>
                <h4 className="font-bold text-white mb-6 font-serif text-lg">Product</h4>
                <ul className="space-y-4 text-sm text-brand-200/80">
                   <li><button onClick={handleBookDemo} className="hover:text-white transition-colors">Book Demo</button></li>
                   <li><button onClick={onSignIn} className="hover:text-white transition-colors">Sign In</button></li>
                   <li><button onClick={onOpenPricing} className="hover:text-white transition-colors">Pricing</button></li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold text-white mb-6 font-serif text-lg">Legal</h4>
                <ul className="space-y-4 text-sm text-brand-200/80">
                   <li><button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Privacy Policy</button></li>
                   <li><button onClick={onOpenTerms} className="hover:text-white transition-colors">Terms of Service</button></li>
                </ul>
             </div>
          </div>
          
          <div className="border-t border-brand-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-500 font-medium">
             <p>&copy; {new Date().getFullYear()} Hair Pro 360 LLC. Registered in North Carolina.</p>
             <p className="flex items-center gap-1">Powered by <span className="text-brand-300 font-bold">ColorRing.ai</span></p>
          </div>
        </div>
      </footer>

      {showDemo && <ChatWidget profile={DEMO_PROFILE} defaultOpen={true} />}
    </div>
  );
};
