
import React from 'react';
import { Star, Quote } from 'lucide-react';

export const LandingTestimonials: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white border-b border-brand-100">
      <div className="max-w-5xl mx-auto px-6 relative animate-fade-in-up">
        
        {/* Decorators */}
        <div className="absolute top-0 left-10 text-brand-100 opacity-50">
          <Quote size={120} className="transform -scale-x-100" />
        </div>

        <div className="relative bg-brand-50/50 rounded-3xl p-8 md:p-12 border border-brand-100 shadow-sm flex flex-col md:flex-row gap-10 items-center">
           
           {/* Image */}
           <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-xl overflow-hidden relative">
                <img 
                  src="https://storage.googleapis.com/msgsndr/kJ8BTR51Pg39yV0lLiTK/media/69212056eb0382711712b638.png"
                  alt="Mary James" 
                  className="w-full h-full object-cover"
                />
              </div>
           </div>

           {/* Content */}
           <div className="flex-1 text-center md:text-left space-y-6">
              <div className="flex justify-center md:justify-start gap-1 text-brand-500">
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
              </div>
              
              <blockquote className="font-serif text-2xl md:text-3xl text-brand-900 leading-snug italic">
                "ColorRing.ai makes getting new stylists ordering from my brand so much easier. I no longer have the expensive overhead of manufacturing and shipping bulk color rings just to get a new wholesale account started."
              </blockquote>

              <div>
                <div className="font-bold text-gray-900 text-lg">Mary James</div>
                <div className="text-brand-600 font-medium text-sm">Owner, TheJamesEdit.com</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
