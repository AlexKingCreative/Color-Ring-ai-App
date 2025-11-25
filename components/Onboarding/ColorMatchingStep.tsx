
import React, { useState } from 'react';
import { InstallerProfile, ColorMatch } from '../../types';
import { StepContainer } from './UI/StepContainer';
import { ArrowDown, Search, Check, ChevronDown, Loader2, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { useColorMatching } from '../../hooks/useColorMatching';
import { StepIndicator } from './UI/StepIndicator';

interface Props {
  profile: InstallerProfile;
  currentMatchIndex: number;
  steps: { label: string; isActive: boolean; isCompleted: boolean }[];
  onBack: () => void;
  onAddMatch: (newMatch: ColorMatch) => Promise<void>;
  onSkip: () => void;
}

export const ColorMatchingStep: React.FC<Props> = ({ 
  profile, 
  currentMatchIndex, 
  steps,
  onBack, 
  onAddMatch, 
  onSkip 
}) => {
  const {
    userColorName,
    setUserColorName,
    selectedRefColorId,
    setSelectedRefColorId,
    matchType,
    setMatchType,
    referenceColors,
    refBrand,
    usedReferenceColorIds,
    isSaving,
    canProceed,
    totalInventoryCount,
    handleNext
  } = useColorMatching(profile, currentMatchIndex, onAddMatch, onSkip);

  // Dropdown UI state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRefColors = referenceColors.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedRefColor = referenceColors.find(c => c.id === selectedRefColorId);

  return (
    <div className="min-h-screen bg-white flex flex-col">
       {/* 1. Header / Step Indicator */}
       <StepIndicator steps={steps} />

       <StepContainer 
         index={4} 
         isCurrent 
         onNext={handleNext} 
         onBack={onBack} 
         nextDisabled={!canProceed || isSaving}
         showNext={false} 
       >
        {/* Progress Header */}
        <div className="text-center space-y-2 mb-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-xs font-bold uppercase tracking-wider">
              Match {currentMatchIndex + 1} of {totalInventoryCount}
           </div>
           <h2 className="text-3xl font-serif font-bold text-brand-900">
             Match Your Colors
           </h2>
           <div className="w-full bg-gray-100 h-1.5 rounded-full max-w-xs mx-auto mt-4 overflow-hidden">
              <div 
                className="bg-brand-600 h-full transition-all duration-500" 
                style={{ width: `${((currentMatchIndex + 1) / totalInventoryCount) * 100}%` }}
              />
           </div>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          
          {/* Section 1: User Input */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100 focus-within:border-brand-300 transition-colors relative">
              <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-brand-500 uppercase tracking-wider">
                1. Your Brand Color
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Name</label>
                  <input 
                    type="text" 
                    className="w-full text-lg font-medium border-b border-gray-200 py-2 outline-none focus:border-brand-500 placeholder-gray-300"
                    placeholder="e.g. Midnight Black"
                    value={userColorName}
                    onChange={e => setUserColorName(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
          </div>

          {/* Visual Connector */}
          <div className="flex justify-center -my-2 relative z-10">
             <div className="bg-brand-50 p-2 rounded-full border border-brand-100 text-brand-400">
               <ArrowDown size={20} />
             </div>
          </div>

          {/* Section 2: Reference Dropdown */}
          <div className="bg-brand-900 p-6 rounded-2xl shadow-lg text-white relative">
              <div className="absolute -top-3 left-4 bg-brand-900 px-2 text-xs font-bold text-brand-300 uppercase tracking-wider">
                2. Matches {refBrand?.name} Color
              </div>
              
              <div className="relative pt-2">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between transition-all text-left"
                >
                   {selectedRefColor ? (
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: selectedRefColor.hex }}></div>
                        <span className="font-medium text-lg">{selectedRefColor.name} <span className="opacity-60 text-sm">({selectedRefColor.code})</span></span>
                     </div>
                   ) : (
                     <span className="text-brand-200">Select a color...</span>
                   )}
                   <ChevronDown size={20} className="text-brand-200" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-64 flex flex-col">
                     <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
                        <div className="relative">
                          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-gray-800 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                     </div>
                     <div className="overflow-y-auto flex-1">
                        {filteredRefColors.map(c => {
                          const isUsed = usedReferenceColorIds.has(c.id) && selectedRefColorId !== c.id;
                          return (
                            <button
                              key={c.id}
                              disabled={isUsed}
                              onClick={() => {
                                if (!isUsed) {
                                  setSelectedRefColorId(c.id);
                                  setIsDropdownOpen(false);
                                  setSearchTerm('');
                                }
                              }}
                              className={`
                                w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 text-left transition-colors
                                ${isUsed ? 'bg-gray-50 opacity-50 cursor-not-allowed' : 'hover:bg-brand-50 cursor-pointer'}
                              `}
                            >
                              <div className="w-8 h-8 rounded-full border border-gray-200 shadow-sm flex-shrink-0" style={{ backgroundColor: c.hex }}></div>
                              <div className="flex-1">
                                <div className={`font-medium ${isUsed ? 'text-gray-400' : 'text-gray-900'}`}>
                                  {c.name} {isUsed && <span className="(Used) ml-1 text-xs font-normal italic">Mapped</span>}
                                </div>
                                <div className="text-xs text-gray-500">Code: {c.code}</div>
                              </div>
                              {selectedRefColorId === c.id && <Check size={16} className="text-brand-600" />}
                            </button>
                          );
                        })}
                        {filteredRefColors.length === 0 && (
                          <div className="p-4 text-center text-gray-500 text-sm">No colors found.</div>
                        )}
                     </div>
                  </div>
                )}
              </div>
          </div>

          {/* Section 3: Match Type & Disclaimer */}
          {canProceed && (
            <div className="animate-in fade-in slide-in-from-top-2 space-y-4 pt-2">
               <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMatchType('EXACT')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      matchType === 'EXACT' 
                      ? 'border-green-500 bg-green-50 text-green-800' 
                      : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                    }`}
                  >
                     <CheckCircle2 size={24} />
                     <span className="font-bold text-sm">Exact Match</span>
                  </button>
                  <button
                    onClick={() => setMatchType('CLOSE')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      matchType === 'CLOSE' 
                      ? 'border-amber-400 bg-amber-50 text-amber-800' 
                      : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                    }`}
                  >
                     <HelpCircle size={24} />
                     <span className="font-bold text-sm">Close Match</span>
                  </button>
               </div>

               {matchType === 'CLOSE' && (
                 <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-left">
                    <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
                    <div className="space-y-1">
                       <h4 className="font-bold text-amber-800 text-sm">Proceed with Caution</h4>
                       <p className="text-xs text-amber-700 leading-relaxed">
                         Close matches must be <strong>visibly identical</strong> to the naked eye. Stylists rely on this for accurate blending. Only select this if the difference is barely imperceptible in standard lighting.
                       </p>
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-6">
            <button 
              onClick={handleNext}
              disabled={!canProceed || isSaving}
              className={`
                w-full font-bold py-4 rounded-xl shadow-md transition-all flex justify-center items-center gap-2
                ${matchType === 'CLOSE' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-brand-600 hover:bg-brand-700 text-white'}
                ${(!canProceed || isSaving) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isSaving ? <Loader2 className="animate-spin" /> : 'Save Match & Next'}
            </button>
          </div>

        </div>
      </StepContainer>
    </div>
  );
};
