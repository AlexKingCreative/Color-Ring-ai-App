import React from 'react';
import { StepContainer } from './UI/StepContainer';
import { TypeformInput } from './UI/TypeformInput';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BrandNameStep: React.FC<Props> = ({ value, onChange, onNext, onBack }) => (
  <StepContainer index={1} isCurrent onNext={onNext} onBack={onBack} nextDisabled={!value}>
    <TypeformInput 
      label="What is your brand name?" 
      subLabel="We'll use this to customize your assistant."
      placeholder="e.g. Luxy Hair"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && value) {
          onNext();
        }
      }}
      autoFocus
    />
  </StepContainer>
);