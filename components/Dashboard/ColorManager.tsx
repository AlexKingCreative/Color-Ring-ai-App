
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, AlertTriangle, CheckCircle2, Edit2, Save, X } from 'lucide-react';
import { ColorMatch, MatchType, InstallerProfile } from '../../types';
import { dbService } from '../../services/dbService';
import { useReferenceBrands } from '../../hooks/useReferenceBrands';

interface Props {
  profile: InstallerProfile;
  userSession?: any; 
  targetUserId?: string; // Optional: Allows Admin to edit another user. Defaults to session user.
  onUpdate: () => void;
}

export const ColorManager: React.FC<Props> = ({ profile, userSession, targetUserId, onUpdate }) => {
  const { brands, isLoading: brandsLoading } = useReferenceBrands();
  
  // Determine which ID to use for DB operations
  const effectiveUserId = targetUserId || userSession?.user?.id;

  // View State
  const [selectedViewBrandId, setSelectedViewBrandId] = useState<string>('');
  const [filter, setFilter] = useState('');
  
  // Initialize view brand once brands are loaded
  useEffect(() => {
    if (brands.length > 0 && !selectedViewBrandId) {
        setSelectedViewBrandId(profile.selectedReferenceBrandId || brands[0].id);
    }
  }, [brands, profile.selectedReferenceBrandId, selectedViewBrandId]);

  // Edit/Add State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // Null means adding new
  const [formData, setFormData] = useState({
    userColorName: '',
    referenceColorId: '',
    matchType: 'EXACT' as MatchType
  });
  const [loading, setLoading] = useState(false);

  // Derived Data
  const viewBrand = brands.find(b => b.id === selectedViewBrandId);
  const brandColors = viewBrand?.colors || [];

  // Filter matches: Show matches for the CURRENTLY selected view brand + text search
  const displayedMatches = profile.matches.filter(m => 
    m.referenceBrandId === selectedViewBrandId &&
    m.userColorName.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Are you sure you want to delete this match?')) return;
    await dbService.deleteMatch(id);
    onUpdate();
  };

  const startEdit = (match: ColorMatch) => {
    setFormData({
      userColorName: match.userColorName,
      referenceColorId: match.referenceColorId,
      matchType: match.matchType
    });
    setEditingId(match.id || null);
    setIsEditing(true);
  };

  const startAdd = () => {
    setFormData({
      userColorName: '',
      referenceColorId: '',
      matchType: 'EXACT'
    });
    setEditingId(null);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!formData.userColorName || !formData.referenceColorId || !viewBrand || !effectiveUserId) return;
    setLoading(true);

    try {
      if (editingId) {
        // Delete old match then save new one
        await dbService.deleteMatch(editingId);
      }

      await dbService.saveMatch(effectiveUserId, {
          userColorName: formData.userColorName,
          referenceBrandId: viewBrand.id,
          referenceColorId: formData.referenceColorId,
          matchType: formData.matchType
      });

      onUpdate();
      setIsEditing(false);
      setEditingId(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (brandsLoading) return <div className="p-6 text-center text-gray-500">Loading brands...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-white rounded-t-xl space-y-4 md:space-y-0 md:flex justify-between items-center">
        <div>
            <h3 className="font-bold text-gray-900">Color Inventory</h3>
            <p className="text-xs text-gray-500">Manage color mappings.</p>
        </div>
        <div className="flex items-center gap-3">
           {/* Brand Selector */}
           <select 
              value={selectedViewBrandId}
              onChange={(e) => setSelectedViewBrandId(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 font-medium"
           >
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>Map to {brand.name}</option>
              ))}
           </select>
           
           <button 
             onClick={startAdd}
             className="bg-brand-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-brand-800 transition-colors shadow-sm"
           >
             <Plus size={16} /> Add Match
           </button>
        </div>
      </div>

      {/* Edit/Add Form */}
      {isEditing && (
        <div className="p-4 bg-brand-50 border-b border-brand-100 animate-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold text-brand-900">{editingId ? 'Edit Match' : 'Add New Match'}</h4>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input 
                  placeholder="Color Name (e.g. Dark Mocha)" 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500"
                  value={formData.userColorName}
                  onChange={e => setFormData({...formData, userColorName: e.target.value})}
                />
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500 bg-white"
                  value={formData.referenceColorId}
                  onChange={e => setFormData({...formData, referenceColorId: e.target.value})}
                >
                    <option value="">Select {viewBrand?.name} Match...</option>
                    {brandColors.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                    ))}
                </select>
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500 bg-white"
                  value={formData.matchType}
                  onChange={e => setFormData({...formData, matchType: e.target.value as MatchType})}
                >
                    <option value="EXACT">Exact Match</option>
                    <option value="CLOSE">Close Match</option>
                </select>
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={() => setIsEditing(false)} className="text-gray-500 text-xs hover:text-gray-700 px-3 py-2">Cancel</button>
                <button onClick={handleSave} disabled={loading} className="bg-brand-600 text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-brand-700 flex items-center gap-2">
                    {loading ? 'Saving...' : <><Save size={14} /> Save Changes</>}
                </button>
            </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-3 bg-gray-50 border-b border-gray-100">
         <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-brand-400 transition-all"
              placeholder={`Search your colors matched to ${viewBrand?.name}...`}
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
         </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-y-auto min-h-[300px] max-h-[600px]">
         {displayedMatches.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-sm">
                <div className="mb-2 opacity-20"><Search size={48} /></div>
                <p>No matches found for {viewBrand?.name}.</p>
                <button onClick={startAdd} className="mt-2 text-brand-600 hover:underline font-medium">Add your first match</button>
             </div>
         ) : (
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-gray-600">Your Color</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">{viewBrand?.name} Equivalent</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Precision</th>
                        <th className="px-4 py-3 font-semibold text-gray-600 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {displayedMatches.map((match, idx) => {
                        const refColor = brandColors.find(c => c.id === match.referenceColorId);
                        return (
                            <tr key={match.id || idx} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-4 py-3 font-medium text-gray-900">{match.userColorName}</td>
                                <td className="px-4 py-3 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full border border-gray-200 shadow-sm flex-shrink-0" style={{ backgroundColor: refColor?.hex }}></div>
                                        <span className="truncate max-w-[150px]">{refColor?.name} ({refColor?.code})</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {match.matchType === 'EXACT' ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                                            <CheckCircle2 size={10} /> Exact
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                                            <AlertTriangle size={10} /> Close
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button 
                                        onClick={() => startEdit(match)}
                                        className="text-gray-400 hover:text-brand-600 p-1"
                                        title="Edit Match"
                                      >
                                          <Edit2 size={14} />
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(match.id)}
                                        className="text-gray-400 hover:text-red-500 p-1"
                                        title="Delete Match"
                                      >
                                          <Trash2 size={14} />
                                      </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
             </table>
         )}
      </div>
    </div>
  );
};
