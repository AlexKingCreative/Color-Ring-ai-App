import React, { useState } from 'react';
import { Code, Copy, Check, Layout, MessageSquare } from 'lucide-react';

interface Props {
  cdnBaseUrl: string;
  userId: string;
}

export const InstallInstructions: React.FC<Props> = ({ cdnBaseUrl, userId }) => {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'floating' | 'inline'>('floating');

  const scriptCode = mode === 'floating' 
    ? `<!-- ColorRing.ai Floating Widget -->
<script 
  src="${cdnBaseUrl}/widget.js" 
  data-id="${userId}" 
  data-position="right" 
  defer
></script>`
    : `<!-- ColorRing.ai Inline Embed -->
<div id="colorring-embed" style="width: 100%; height: 600px;"></div>
<script 
  src="${cdnBaseUrl}/widget.js" 
  data-id="${userId}" 
  data-type="inline"
  defer
></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="p-5 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <Code size={18} className="text-brand-600" />
            <h2 className="text-base font-bold text-gray-900">Install Widget</h2>
          </div>
          <p className="text-xs text-gray-500">Copy and paste code to your site.</p>
      </div>
      
      <div className="p-5 flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => setMode('floating')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${mode === 'floating' ? 'bg-white text-brand-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <MessageSquare size={14} /> Chat
            </button>
            <button 
                onClick={() => setMode('inline')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${mode === 'inline' ? 'bg-white text-brand-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Layout size={14} /> Inline
            </button>
        </div>

        <div className="bg-brand-900 rounded-xl p-4 relative group">
            <pre className="text-gray-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
            {scriptCode}
            </pre>
            <button 
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            aria-label="Copy code"
            >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
        </div>
        
        <div className="text-xs text-gray-400 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${mode === 'floating' ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
            {mode === 'floating' ? 'Floats in bottom corner' : 'Embeds directly into page layout'}
        </div>
      </div>
    </div>
  );
};
