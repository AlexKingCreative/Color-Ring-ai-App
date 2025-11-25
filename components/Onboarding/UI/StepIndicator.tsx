import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: { label: string; isActive: boolean; isCompleted: boolean }[];
  bgClass?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, bgClass = "bg-white" }) => (
  <div className="w-full max-w-4xl mx-auto px-6 py-8">
    <div className="flex items-center justify-between relative">
      {/* Line behind */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10" />

      {steps.map((step, idx) => (
        <div key={idx} className={`flex flex-col items-center gap-2 ${bgClass} px-2`}>
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300
              ${step.isActive ? 'border-brand-600 bg-brand-600 text-white scale-110' :
                step.isCompleted ? 'border-brand-600 bg-white text-brand-600' : `border-gray-300 ${bgClass} text-gray-400`}
            `}
          >
            {step.isCompleted ? <Check size={14} /> : idx + 1}
          </div>
          <span className={`text-xs font-medium uppercase tracking-wider hidden md:block ${step.isActive ? 'text-brand-900' : 'text-gray-400'}`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);