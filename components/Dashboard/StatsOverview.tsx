import React, { useState } from 'react';
import { MessageSquare, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d'>('7d');

  // Mock data simulation based on time range
  const getStats = () => {
    switch (timeRange) {
      case 'today':
        return [
          { label: 'Total Conversations', value: '42', change: '', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Matches Found', value: '38', change: '90% Rate', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Missed Opportunities', value: '4', change: 'Needs Review', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        ];
      case '30d':
        return [
          { label: 'Total Conversations', value: '1,284', change: '+12%', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Matches Found', value: '1,150', change: '+8%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Missed Opportunities', value: '134', change: '-2%', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        ];
      case '7d':
      default:
        return [
          { label: 'Total Conversations', value: '342', change: '+5%', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Matches Found', value: '310', change: '+12%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Missed Opportunities', value: '32', change: '-5%', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        ];
    }
  };

  const stats = getStats();

  return (
    <div className="space-y-4">
      {/* Filter Row */}
      <div className="flex justify-end">
        <div className="bg-white border border-gray-200 rounded-lg p-1 flex items-center gap-1 text-sm shadow-sm">
          <button 
            onClick={() => setTimeRange('today')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${timeRange === 'today' ? 'bg-brand-100 text-brand-900' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${timeRange === '7d' ? 'bg-brand-100 text-brand-900' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Last 7 Days
          </button>
          <button 
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${timeRange === '30d' ? 'bg-brand-100 text-brand-900' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              {stat.change && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.label.includes('Missed') ? 'bg-amber-100 text-amber-700' : 'bg-green-50 text-green-600'}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <h4 className="text-gray-500 text-sm font-medium">{stat.label}</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
