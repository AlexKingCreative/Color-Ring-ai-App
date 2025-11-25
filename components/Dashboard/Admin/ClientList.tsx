
import React, { useEffect, useState } from 'react';
import { ClientProfile } from '../../../types';
import { dbService } from '../../../services/dbService';
import { Search, Edit, MoreHorizontal } from 'lucide-react';
import { ColorManager } from '../ColorManager';

export const ClientList: React.FC = () => {
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setIsLoading(true);
    const data = await dbService.getAllClients();
    setClients(data);
    setIsLoading(false);
  };

  // Fetch full profile matches when a client is selected for editing
  const handleSelectClient = async (client: ClientProfile) => {
    const matches = await dbService.fetchMatches(client.id);
    const fullProfile = await dbService.fetchProfile(client.id);
    
    setSelectedClient({
        ...client,
        ...fullProfile,
        matches: matches
    });
  };

  const filteredClients = clients.filter(c => 
    c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedClient) {
    return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="flex items-center justify-between">
                <div>
                    <button onClick={() => setSelectedClient(null)} className="text-sm text-gray-500 hover:text-brand-900 mb-2">← Back to Client List</button>
                    <h2 className="text-2xl font-bold text-gray-900">Managing: {selectedClient.companyName}</h2>
                    <p className="text-gray-500 text-sm">{selectedClient.email}</p>
                </div>
            </div>
            
            <div className="h-[600px]">
                {/* Reuse the ColorManager component, passing the client's ID as the target for DB operations */}
                <ColorManager 
                    profile={selectedClient} 
                    targetUserId={selectedClient.id} // Admin editing this user
                    onUpdate={() => handleSelectClient(selectedClient)} // Reload matches on change
                />
            </div>
        </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
         <h2 className="text-lg font-bold text-gray-900">All Clients</h2>
         <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500" 
                placeholder="Search clients..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
      </div>
      
      {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading clients...</div>
      ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
                <tr>
                    <th className="px-6 py-3 font-medium">Company</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Joined</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {filteredClients.map(client => (
                    <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{client.companyName || 'Unknown'}</td>
                        <td className="px-6 py-4 text-gray-500">{client.email}</td>
                        <td className="px-6 py-4 text-gray-500">{new Date(client.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${client.billingStatus === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {client.billingStatus || 'TRIAL'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button 
                                onClick={() => handleSelectClient(client)}
                                className="text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1 ml-auto"
                            >
                                <Edit size={14} /> Manage
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
      )}
    </div>
  );
};
