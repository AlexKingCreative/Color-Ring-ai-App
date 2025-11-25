
import React, { useState } from 'react';
import { Palette, Check, Loader2 } from 'lucide-react';
import { InstallerProfile } from '../../types';
import { dbService } from '../../services/dbService';

interface Props {
  profile: InstallerProfile;
  userId: string;
  onUpdate: () => void;
}

export const WidgetSettings: React.FC<Props> = ({ profile, userId, onUpdate }) => {
  const [color, setColor] = useState(profile.widgetColor || '#2B1C10');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await dbService.updateProfile(userId, { widgetColor: color });
    if (success) {
      onUpdate();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2 mb-1">
          <Palette size={18} className="text-brand-600" />
          <h2 className="text-base font-bold text-gray-900">Widget Customization</h2>
        </div>
        <p className="text-xs text-gray-500">Match the chat widget to your brand.</p>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Brand Color</label>
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              value={color}
              onChange={(e) => { setColor(e.target.value); setSaved(false); }}
              className="w-12 h-12 p-1 rounded-lg border border-gray-200 cursor-pointer"
            />
            <div className="flex-1">
               <input 
                 type="text" 
                 value={color}
                 onChange={(e) => { setColor(e.target.value); setSaved(false); }}
                 className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono uppercase"
               />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
           <div className="text-xs text-gray-400 mb-2 text-center uppercase font-semibold">Preview</div>
           <div className="flex flex-col gap-3 items-center">
              <button 
                 className="text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium w-full justify-center transition-all"
                 style={{ backgroundColor: color }}
              >
                 <span>Chat with us</span>
              </button>
           </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving || saved}
          className={`
            w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all
            ${saved ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-brand-900 text-white hover:bg-brand-800 shadow-sm'}
          `}
        >
          {isSaving && <Loader2 size={16} className="animate-spin" />}
          {saved ? <><Check size={16} /> Saved!</> : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
