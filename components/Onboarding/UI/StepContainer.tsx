import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface StepContainerProps {
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  showNext?: boolean;
  nextDisabled?: boolean;
  index: number;
  isCurrent: boolean;
}

export const StepContainer: React.FC<StepContainerProps> = ({ 
  children, 
  onNext, 
  onBack,
  showNext = true, 
  nextDisabled = false,
  index,
  isCurrent
}) => {
  if (!isCurrent) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto min-h-[60vh] px-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-0 left-0 md:-ml-12 p-2 text-gray-400 hover:text-brand-900 transition-colors rounded-full hover:bg-brand-50"
          aria-label="Go Back"
        >
          <ArrowLeft size={24} />
        </button>
      )}

      <div className="w-full space-y-8 mt-8 md:mt-0">
        {children}
      </div>
      
      {showNext && onNext && (
        <div className="mt-12 flex justify-end w-full">
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className={`
              group flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300
              ${nextDisabled 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-brand-900 text-white hover:bg-brand-800 hover:pr-10 shadow-lg hover:shadow-xl'
              }
            `}
          >
            <span>OK</span>
            <Check size={20} className={`${nextDisabled ? 'opacity-50' : 'opacity-100'}`} />
          </button>
        </div>
      )}
    </div>
  );
};