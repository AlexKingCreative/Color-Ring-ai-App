import React from 'react';

export const ColorRingLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* The Ring */}
    <circle cx="12" cy="5" r="2.5" />
    
    {/* Swatch 1 (Left Curve) */}
    <path d="M10 7c0 5-2 11-4 13" className="opacity-80" />
    
    {/* Swatch 2 (Center Straight) */}
    <path d="M12 7.5v13" />
    
    {/* Swatch 3 (Right Curve) */}
    <path d="M14 7c0 5 2 11 4 13" className="opacity-80" />
    
    {/* Inner Detail Lines for Hair Texture */}
    <path d="M11.5 8v6" strokeWidth="1" className="opacity-40" />
    <path d="M12.5 8v6" strokeWidth="1" className="opacity-40" />
  </svg>
);