import React from 'react';
import { StepContainer } from './UI/StepContainer';
import { TypeformInput } from './UI/TypeformInput';

interface Props {
  value: number;
  onChange: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const InventoryCountStep: React.FC<Props> = ({ value, onChange, onNext, onBack }) => (
  <StepContainer index={2} isCurrent onNext={onNext} onBack={onBack} nextDisabled={value <= 0}>
    <TypeformInput 
       label="How many colors are in your ring?"
       subLabel="Roughly how many shades do you sell?"
       type="number"
       placeholder="e.g. 20"
       value={value || ''}
       onChange={(e) => onChange(parseInt(e.target.value) || 0)}
       onKeyDown={(e) => {
         if (e.key === 'Enter' && value > 0) {
           onNext();
         }
       }}
       autoFocus
     />
  </StepContainer>
);