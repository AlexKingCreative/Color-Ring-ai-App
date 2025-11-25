
import React, { useEffect } from 'react';
import { ColorRingLogo } from '../Logo';
import { ArrowLeft } from 'lucide-react';

interface Props {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
  onBack: () => void;
}

export const LegalLayout: React.FC<Props> = ({ title, lastUpdated, children, onBack }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-20">
         <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
                <div className="bg-brand-900 p-1.5 rounded-lg text-white"><ColorRingLogo size={18} /></div>
                <span className="font-serif font-bold text-lg text-brand-900">ColorRing.ai</span>
            </div>
            <button onClick={onBack} className="text-sm font-medium text-gray-500 hover:text-brand-900 flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Home
            </button>
         </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
           <h1 className="text-4xl font-serif font-bold text-brand-900 mb-2">{title}</h1>
           <p className="text-gray-500 mb-12">Last Updated: {lastUpdated}</p>
           
           <div className="prose prose-brand max-w-none space-y-8 text-gray-700 leading-relaxed">
              {children}
           </div>
        </div>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Hair Pro 360 LLC. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};
