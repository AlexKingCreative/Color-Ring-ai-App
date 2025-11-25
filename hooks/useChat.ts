import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, InstallerProfile } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const useChat = (profile: InstallerProfile, defaultOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: `Hi! I'm the ${profile.companyName} Color Assistant. Please name a brand and color that you are looking to match to ${profile.companyName}.`, 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    }
  }, [defaultOpen]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const responseText = await sendMessageToGemini(
        messages.map(m => ({ role: m.role, text: m.text })),
        userMsg.text,
        profile
      );

      const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
      console.error("Chat Error:", e);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I'm having trouble connecting right now. Please try again.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isThinking,
    handleSend,
    messagesEndRef
  };
};