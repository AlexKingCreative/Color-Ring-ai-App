import React from 'react';
import { MessageCircle, CheckCircle2, Clock } from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const activities = [
    { id: 1, type: 'match', text: 'Matched "Bellami #18" to "Honey Blonde"', time: '2 mins ago' },
    { id: 2, type: 'query', text: 'User asked about "Dark Ash Brown"', time: '14 mins ago' },
    { id: 3, type: 'match', text: 'Matched "Luxy Chestnut" to "Mocha"', time: '45 mins ago' },
    { id: 4, type: 'match', text: 'Matched "Generic #60" to "Platinum Ice"', time: '1 hour ago' },
    { id: 5, type: 'query', text: 'User started a conversation', time: '2 hours ago' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900">Live Activity</h3>
        <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs text-gray-500 font-medium">Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-0">
        {activities.map((item, i) => (
          <div key={item.id} className={`p-4 flex gap-3 items-start hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0`}>
            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'match' ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-500'}`}>
              {item.type === 'match' ? <CheckCircle2 size={14} /> : <MessageCircle size={14} />}
            </div>
            <div>
              <p className="text-sm text-gray-800 font-medium">{item.text}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                <Clock size={10} /> {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
        <button className="text-xs text-brand-600 font-semibold hover:text-brand-800">View All History</button>
      </div>
    </div>
  );
};