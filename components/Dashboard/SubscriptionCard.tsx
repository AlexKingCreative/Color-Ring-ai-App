
import React, { useEffect, useState } from 'react';
import { CreditCard, Clock, AlertTriangle } from 'lucide-react';
import { InstallerProfile } from '../../types';

interface Props {
  profile: InstallerProfile;
  onManageBilling: () => void;
}

export const SubscriptionCard: React.FC<Props> = ({ profile, onManageBilling }) => {
  const [hoursRemaining, setHoursRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (profile.billingStatus === 'TRIAL' && profile.createdAt) {
        const trialDurationMs = 24 * 60 * 60 * 1000;
        const startTime = new Date(profile.createdAt).getTime();
        const now = Date.now();
        const diff = trialDurationMs - (now - startTime);
        const hours = Math.max(0, Math.ceil(diff / (1000 * 60 * 60)));
        setHoursRemaining(hours);
    }
  }, [profile.billingStatus, profile.createdAt]);

  const isExpired = profile.billingStatus === 'TRIAL' && hoursRemaining === 0;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
          <CreditCard size={20} className="text-gray-400" />
          <h3 className="font-bold text-gray-900">Subscription</h3>
      </div>
      
      <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">Status</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            profile.billingStatus === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
            isExpired ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {isExpired ? 'EXPIRED' : profile.billingStatus || 'Inactive'}
          </span>
      </div>

      {profile.billingStatus === 'TRIAL' && (
         <div className={`mt-4 mb-6 p-3 rounded-xl flex items-start gap-3 text-sm ${isExpired ? 'bg-red-50 text-red-800' : 'bg-brand-50 text-brand-800'}`}>
            {isExpired ? <AlertTriangle size={18} className="mt-0.5 shrink-0" /> : <Clock size={18} className="mt-0.5 shrink-0" />}
            <div>
               <p className="font-bold">{isExpired ? 'Demo Access Expired' : 'Demo Access Active'}</p>
               <p className="opacity-80 text-xs mt-1">
                 {isExpired 
                   ? 'Your 24-hour preview has ended. Subscribe to reactivate your widget.' 
                   : `You have ${hoursRemaining} hours remaining in your free demo period.`
                 }
               </p>
            </div>
         </div>
      )}

      {profile.billingStatus === 'ACTIVE' ? (
         <button onClick={onManageBilling} className="w-full py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors mt-4">
            Manage Billing
         </button>
      ) : (
         <button onClick={onManageBilling} className="w-full py-3 bg-brand-900 text-white rounded-lg font-bold hover:bg-brand-800 transition-colors shadow-sm mt-4">
            Upgrade to Pro ($297/mo)
         </button>
      )}
    </div>
  );
};
