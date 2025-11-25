
import React from 'react';
import { Lock } from 'lucide-react';
import { InstallerProfile } from '../types';
import { ColorRingLogo } from './Logo';
import { useChat } from '../hooks/useChat';
import { ChatHeader } from './Chat/ChatHeader';
import { ChatBubble } from './Chat/ChatBubble';
import { ChatInput } from './Chat/ChatInput';

interface ChatWidgetProps {
  profile: InstallerProfile;
  defaultOpen?: boolean;
  position?: 'left' | 'right';
  variant?: 'floating' | 'inline';
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  profile, 
  defaultOpen = false, 
  position = 'right',
  variant = 'floating'
}) => {
  const {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isThinking,
    handleSend,
    messagesEndRef
  } = useChat(profile, defaultOpen || variant === 'inline');

  // Billing & Trial Logic
  const isActiveStatus = !profile.billingStatus || profile.billingStatus === 'ACTIVE';
  let isTrialValid = false;

  if (profile.billingStatus === 'TRIAL' && profile.createdAt) {
      const trialDurationMs = 24 * 60 * 60 * 1000; // 24 Hours
      const startTime = new Date(profile.createdAt).getTime();
      const now = Date.now();
      isTrialValid = (now - startTime) < trialDurationMs;
  } else if (profile.billingStatus === 'TRIAL' && !profile.createdAt) {
      // Fallback if creation date missing, assume active trial for demo
      isTrialValid = true; 
  }

  const isAccessGranted = isActiveStatus || isTrialValid;
  
  // Widget Theme Color - Updated default to Obsidian #0F172A
  const themeColor = profile.widgetColor || '#0F172A'; 

  // Dynamic classes
  const isFloating = variant === 'floating';
  
  const containerClasses = isFloating
    ? `fixed bottom-6 z-[9999] font-sans ${position === 'left' ? 'left-6' : 'right-6'}`
    : 'w-full h-full flex flex-col font-sans bg-white'; // Inline fills parent

  const buttonAlignClass = position === 'left' ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={containerClasses}>
      {/* Widget Toggle Button - Only for floating mode */}
      {isFloating && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: themeColor }}
          className={`text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-105 hover:brightness-110 flex items-center gap-3 ${buttonAlignClass}`}
        >
          <ColorRingLogo size={28} />
          <span className="font-medium pr-2">ColorRing.ai</span>
        </button>
      )}

      {/* Chat Window Container */}
      {(isOpen || !isFloating) && (
        <div className={`
          flex flex-col overflow-hidden
          ${isFloating 
            ? 'bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] h-[600px] border border-brand-100 animate-in slide-in-from-bottom-10 duration-300' 
            : 'w-full h-full' // Inline mode
          }
        `}>
          
          <ChatHeader 
            companyName={profile.companyName} 
            onClose={isFloating ? () => setIsOpen(false) : () => {}}
            themeColor={themeColor}
          />

          {isAccessGranted ? (
            <>
              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, idx) => (
                  <ChatBubble key={idx} message={msg} themeColor={themeColor} />
                ))}
                
                {isThinking && <ChatBubble isThinking themeColor={themeColor} />}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <ChatInput 
                value={input} 
                onChange={setInput} 
                onSend={handleSend} 
                disabled={isThinking} 
                themeColor={themeColor}
              />
            </>
          ) : (
            /* Locked State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
               <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-4">
                 <Lock size={32} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">
                   {profile.billingStatus === 'TRIAL' ? 'Trial Expired' : 'Subscription Required'}
               </h3>
               <p className="text-gray-500 text-sm mb-6">
                 {profile.billingStatus === 'TRIAL' 
                    ? 'Your 24-hour trial period has ended. Please upgrade to continue using the AI Color Ring.'
                    : 'The AI Color Ring feature is currently inactive for this store.'
                 }
               </p>
               <div className="text-xs text-gray-400">
                 Powered by ColorRing.ai
               </div>
            </div>
          )}

          {/* Footer Link - Only visible when billing is active (otherwise it shows in the locked state above) */}
          {isAccessGranted && (
             <div className="bg-white pb-2 pt-1 text-center border-t border-gray-50">
                <a 
                  href="https://colorring.ai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] font-medium text-gray-300 hover:text-brand-500 transition-colors"
                >
                  Powered by ColorRing.ai
                </a>
             </div>
          )}
        </div>
      )}
    </div>
  );
};
