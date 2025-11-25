
import React, { useState } from 'react';
import { StepContainer } from './UI/StepContainer';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useReferenceBrands } from '../../hooks/useReferenceBrands';

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ReferenceBrandStep: React.FC<Props> = ({ selectedId, onSelect, onNext, onBack }) => {
  const { brands, isLoading } = useReferenceBrands();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedBrandName = brands.find(b => b.id === selectedId)?.name;

  return (
    <StepContainer index={3} isCurrent onNext={onNext} onBack={onBack} nextDisabled={!selectedId}>
       <div className="space-y-6">
         <div>
           <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-2">Which brand's color ring will be your reference?</h2>
           <p className="text-xl text-gray-500">Select the physical color ring you will use to compare.</p>
         </div>
         
         <div className="relative">
           <div className="relative">
               <input 
                 type="text"
                 placeholder={isLoading ? "Loading brands..." : "Search brands..."}
                 disabled={isLoading}
                 className="w-full border-b-2 border-brand-200 text-2xl py-3 px-2 focus:border-brand-600 outline-none bg-transparent disabled:opacity-50"
                 value={selectedId ? selectedBrandName : searchTerm}
                 onChange={(e) => {
                    setSearchTerm(e.target.value);
                    onSelect(''); // Clear selection on type
                    setShowDropdown(true);
                 }}
                 onFocus={() => setShowDropdown(true)}
                 // Delay hiding to allow click
                 onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
               />
               {isLoading ? (
                  <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
               ) : (
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
               )}
           </div>

           {showDropdown && !isLoading && (
             <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-xl border border-gray-100 mt-2 max-h-60 overflow-y-auto z-50">
                {filteredBrands.map(brand => (
                   <button
                     key={brand.id}
                     onClick={() => {
                        onSelect(brand.id);
                        setSearchTerm(brand.name);
                        setShowDropdown(false);
                     }}
                     className="w-full text-left px-6 py-4 hover:bg-brand-50 flex justify-between items-center"
                   >
                     <span className="font-medium text-lg">{brand.name}</span>
                     <span className="text-sm text-gray-400">{brand.colors.length} colors</span>
                   </button>
                ))}
                {filteredBrands.length === 0 && (
                    <div className="px-6 py-4 text-gray-400 text-sm italic">No brands found. Contact support to add yours.</div>
                )}
             </div>
           )}
         </div>
       </div>
    </StepContainer>
  );
};
