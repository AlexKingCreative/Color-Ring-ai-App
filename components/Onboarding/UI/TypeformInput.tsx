import React, { useEffect, useRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  subLabel?: string;
}

export const TypeformInput: React.FC<InputProps> = ({ label, subLabel, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="space-y-4">
      <label className="block space-y-2">
        <span className="flex items-center gap-3 text-2xl md:text-3xl font-serif font-semibold text-brand-900">
          <span className="text-brand-400 text-xl">➔</span>
          {label}
        </span>
        {subLabel && <span className="block text-gray-500 text-lg ml-8">{subLabel}</span>}
      </label>
      <input
        ref={inputRef}
        className="w-full bg-transparent border-b-2 border-brand-200 text-3xl md:text-4xl py-4 px-2 focus:outline-none focus:border-brand-600 text-brand-900 placeholder-brand-200 transition-colors font-light"
        {...props}
      />
    </div>
  );
};