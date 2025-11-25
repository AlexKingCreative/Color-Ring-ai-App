
import React from 'react';
import { InstallerProfile } from '../../types';
import { ColorRingLogo } from '../Logo';
import { LogOut, Settings, User, Bell } from 'lucide-react';
import { InstallInstructions } from './InstallInstructions';
import { SubscriptionCard } from './SubscriptionCard';
import { StatsOverview } from './StatsOverview';
import { ActivityFeed } from './ActivityFeed';
import { ColorManager } from './ColorManager';
import { WidgetSettings } from './WidgetSettings';

interface DashboardProps {
  profile: InstallerProfile;
  userSession: any;
  onManageBilling: () => void;
  cdnBaseUrl: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, userSession, onManageBilling, cdnBaseUrl, onLogout }) => {
  // Mock a refresh function passed to children
  const handleDataRefresh = () => {
     window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
         <div className="max-w-[1600px] mx-auto px-6 h-16 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-brand-900 p-1.5 rounded-lg text-white"><ColorRingLogo size={18} /></div>
                <span className="font-serif font-bold text-lg text-brand-900 tracking-tight">ColorRing.ai</span>
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                <span className="text-sm font-medium text-gray-500">{profile.companyName}</span>
            </div>
            
            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-brand-900 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm">
                        {profile.companyName.charAt(0)}
                    </div>
                    <button onClick={onLogout} className="text-sm font-medium text-gray-500 hover:text-brand-900 transition-colors">Sign Out</button>
                </div>
            </div>
         </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 space-y-6">
        
        {/* 1. Stats Row */}
        <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
            <StatsOverview />
        </section>

        {/* 2. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Color Management (Grow) */}
            <div className="lg:col-span-8 space-y-6">
                <ColorManager profile={profile} userSession={userSession} onUpdate={handleDataRefresh} />
            </div>

            {/* Right Column: Activity & Utilities (Fixed Width) */}
            <div className="lg:col-span-4 space-y-6">
                {/* Install Widget */}
                <div className="h-auto">
                    <InstallInstructions cdnBaseUrl={cdnBaseUrl} userId={userSession?.user?.id} />
                </div>

                {/* Widget Customization */}
                <div className="h-auto">
                    <WidgetSettings 
                      profile={profile} 
                      userId={userSession?.user?.id} 
                      onUpdate={handleDataRefresh} 
                    />
                </div>

                {/* Activity Feed */}
                <div className="h-[400px]">
                    <ActivityFeed />
                </div>

                {/* Settings / Billing */}
                <SubscriptionCard profile={profile} onManageBilling={onManageBilling} />
            </div>
        </div>
      </main>
    </div>
  );
};
