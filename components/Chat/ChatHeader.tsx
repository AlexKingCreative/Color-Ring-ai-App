
import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  companyName: string;
  onClose: () => void;
  themeColor?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ companyName, onClose, themeColor = '#2B1C10' }) => (
  <div 
    className="p-4 flex justify-between items-center text-white transition-colors"
    style={{ backgroundColor: themeColor }}
  >
    <div className="flex items-center gap-2">
      <div className="bg-white/10 p-2 rounded-full">
        <Sparkles size={20} className="text-white/80" />
      </div>
      <div>
        <h3 className="font-semibold">{companyName} AI</h3>
        <p className="text-xs text-white/70">Expert Color Matcher</p>
      </div>
    </div>
    <button 
      onClick={onClose} 
      className="hover:bg-white/10 p-1 rounded-full transition-colors"
      aria-label="Close chat"
    >
      <X size={20} />
    </button>
  </div>
);
