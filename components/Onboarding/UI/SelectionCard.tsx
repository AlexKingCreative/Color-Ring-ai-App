import React from 'react';
import { Check } from 'lucide-react';

interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ selected, onClick, title, description }) => (
  <button
    onClick={onClick}
    className={`
      w-full text-left p-6 rounded-xl border-2 transition-all duration-200 flex items-center justify-between
      ${selected 
        ? 'border-brand-600 bg-brand-50 shadow-md' 
        : 'border-gray-100 bg-white hover:border-brand-300 hover:shadow-sm'
      }
    `}
  >
    <div>
      <h3 className={`text-xl font-semibold ${selected ? 'text-brand-900' : 'text-gray-700'}`}>{title}</h3>
      {description && <p className="text-gray-500 mt-1">{description}</p>}
    </div>
    <div className={`
      w-6 h-6 rounded-full border-2 flex items-center justify-center
      ${selected ? 'border-brand-600 bg-brand-600' : 'border-gray-300'}
    `}>
      {selected && <Check size={14} className="text-white" />}
    </div>
  </button>
);