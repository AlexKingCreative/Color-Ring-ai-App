
import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Activity } from 'lucide-react';
import { dbService } from '../../../services/dbService';
import { AdminStats as AdminStatsType } from '../../../types';

export const AdminStats: React.FC = () => {
  const [stats, setStats] = useState<AdminStatsType>({ totalUsers: 0, activeSubscriptions: 0, mrr: 0 });

  useEffect(() => {
    dbService.getAdminStats().then(setStats);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Users size={20} /></div>
            <span className="font-medium">Total Clients</span>
         </div>
         <div className="text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="bg-green-50 p-2 rounded-lg text-green-600"><Activity size={20} /></div>
            <span className="font-medium">Active Subscriptions</span>
         </div>
         <div className="text-3xl font-bold text-gray-900">{stats.activeSubscriptions}</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><DollarSign size={20} /></div>
            <span className="font-medium">Monthly Revenue</span>
         </div>
         <div className="text-3xl font-bold text-gray-900">${stats.mrr}</div>
      </div>
    </div>
  );
};
