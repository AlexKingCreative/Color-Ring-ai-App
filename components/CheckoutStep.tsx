
import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const CheckoutStep: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  useEffect(() => {
     // Simulate redirect
     const t = setTimeout(onSuccess, 2000);
     return () => clearTimeout(t);
  }, [onSuccess]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md animate-in fade-in slide-in-from-bottom-4">
            <Loader2 size={48} className="text-brand-600 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Securely Redirecting...</h2>
            <p className="text-gray-500">We are taking you to our secure payment processor.</p>
        </div>
    </div>
  );
};
