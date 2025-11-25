
import React from 'react';
import { Loader2 } from 'lucide-react';
import { ChatMessage } from '../../types';

interface ChatBubbleProps {
  message?: ChatMessage;
  isThinking?: boolean;
  themeColor?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isThinking, themeColor = '#2B1C10' }) => {
  if (isThinking) {
    return (
      <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-white text-gray-500 p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2 text-sm">
          <Loader2 size={14} className="animate-spin" />
          <span>Checking color ring...</span>
        </div>
      </div>
    );
  }

  if (!message) return null;

  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
      <div 
        className={`
          max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isUser 
            ? 'text-white rounded-br-none' 
            : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
          }
        `}
        style={isUser ? { backgroundColor: themeColor } : {}}
      >
        {message.text}
      </div>
    </div>
  );
};
