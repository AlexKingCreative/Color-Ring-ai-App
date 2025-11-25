
import React, { useState } from 'react';
import { LogOut, Users, Database, LayoutDashboard } from 'lucide-react';
import { ColorRingLogo } from '../Logo';
import { AdminStats } from './Admin/AdminStats';
import { ClientList } from './Admin/ClientList';
import { ReferenceManager } from './Admin/ReferenceManager';

interface Props {
  onLogout: () => void;
}

type Tab = 'overview' | 'clients' | 'database';

export const AdminDashboard: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Top Nav */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
           <div className="bg-brand-900 p-1.5 rounded-lg text-white"><ColorRingLogo size={20} /></div>
           <span className="font-serif font-bold text-xl text-brand-900">ColorRing Admin</span>
        </div>
        <button onClick={onLogout} className="text-gray-600 hover:text-red-600 flex items-center gap-2 text-sm font-medium transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <div className="flex max-w-7xl mx-auto mt-8 px-6 gap-8 items-start">
          {/* Sidebar Nav */}
          <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24 hidden md:block">
              <div className="space-y-1">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-brand-50 text-brand-900' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                      <LayoutDashboard size={18} /> Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('clients')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'clients' ? 'bg-brand-50 text-brand-900' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                      <Users size={18} /> Clients
                  </button>
                  <button 
                    onClick={() => setActiveTab('database')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'database' ? 'bg-brand-50 text-brand-900' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                      <Database size={18} /> Master Database
                  </button>
              </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
              {activeTab === 'overview' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6">Platform Overview</h1>
                      <AdminStats />
                      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-400 mt-8">
                        <p>Additional charts (Growth, Churn) coming soon.</p>
                      </div>
                  </div>
              )}

              {activeTab === 'clients' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4">
                      <ClientList />
                  </div>
              )}

              {activeTab === 'database' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4">
                      <ReferenceManager />
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
