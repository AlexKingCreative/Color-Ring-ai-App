
import React, { useState } from 'react';
import { useReferenceBrands } from '../../../hooks/useReferenceBrands';
import { Plus, Save, Loader2, Trash2, Edit2, Eye, EyeOff, MoreHorizontal, Check, X } from 'lucide-react';
import { dbService } from '../../../services/dbService';
import { BrandProfile, ColorDefinition } from '../../../types';

export const ReferenceManager: React.FC = () => {
  const { brands, refreshBrands } = useReferenceBrands();
  
  // Selection State
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  
  // Editing States
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [editingBrandName, setEditingBrandName] = useState('');
  
  const [editingColorId, setEditingColorId] = useState<string | null>(null);
  const [editColorForm, setEditColorForm] = useState<Partial<ColorDefinition>>({});

  // New Creation States
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  
  const [isAddingColor, setIsAddingColor] = useState(false);
  const [newColor, setNewColor] = useState({ name: '', code: '', standardId: '' });
  
  const [isSaving, setIsSaving] = useState(false);

  // Derived
  const selectedBrand = brands.find(b => b.id === selectedBrandId);

  // --- Brand Actions ---

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return;
    setIsSaving(true);
    await dbService.addReferenceBrand(newBrandName);
    await refreshBrands();
    setNewBrandName('');
    setIsAddingBrand(false);
    setIsSaving(false);
  };

  const handleDeleteBrand = async (id: string) => {
    if (!confirm("Are you sure? This will delete the brand and ALL its colors from the database.")) return;
    await dbService.deleteReferenceBrand(id);
    if (selectedBrandId === id) setSelectedBrandId(null);
    await refreshBrands();
  };

  const handleToggleBrandVisibility = async (brand: BrandProfile) => {
    await dbService.updateReferenceBrand(brand.id, { isVisible: !brand.isVisible });
    await refreshBrands();
  };

  const handleSaveBrandName = async (id: string) => {
    await dbService.updateReferenceBrand(id, { name: editingBrandName });
    setEditingBrandId(null);
    await refreshBrands();
  };

  // --- Color Actions ---

  const handleAddColor = async () => {
    if (!selectedBrandId || !newColor.name || !newColor.code) return;
    setIsSaving(true);
    // Hex is removed from UI, defaulting to black for DB consistency
    await dbService.addReferenceColor(selectedBrandId, {
        id: '',
        name: newColor.name,
        code: newColor.code,
        hex: '#000000', 
        standardId: newColor.standardId
    });
    await refreshBrands();
    setNewColor({ name: '', code: '', standardId: '' });
    setIsAddingColor(false);
    setIsSaving(false);
  };

  const handleSaveColorEdit = async (id: string) => {
    await dbService.updateReferenceColor(id, editColorForm);
    setEditingColorId(null);
    await refreshBrands();
  };

  const handleDeleteColor = async (id: string) => {
    if (!confirm("Delete this color?")) return;
    await dbService.deleteReferenceColor(id);
    await refreshBrands();
  };

  const handleToggleColorVisibility = async (color: ColorDefinition) => {
    await dbService.updateReferenceColor(color.id, { isVisible: !color.isVisible });
    await refreshBrands();
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
         <div>
            <h2 className="text-lg font-bold text-gray-900">Master Database</h2>
            <p className="text-xs text-gray-500">Manage brands, colors, and cross-matching standards.</p>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
          
          {/* --- LEFT PANEL: BRANDS --- */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/50">
             <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <span className="text-xs font-bold text-gray-500 uppercase">Brands</span>
                <button onClick={() => setIsAddingBrand(true)} className="text-brand-600 hover:bg-brand-50 p-1 rounded"><Plus size={16}/></button>
             </div>
             
             <div className="flex-1 overflow-y-auto">
                {isAddingBrand && (
                   <div className="p-2 border-b border-gray-200 bg-white">
                      <input 
                        autoFocus
                        className="w-full border border-brand-300 rounded px-2 py-1 text-sm outline-none mb-2"
                        placeholder="Brand Name..."
                        value={newBrandName}
                        onChange={e => setNewBrandName(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                         <button onClick={() => setIsAddingBrand(false)} className="text-xs text-gray-500">Cancel</button>
                         <button onClick={handleAddBrand} disabled={isSaving} className="text-xs bg-brand-900 text-white px-2 py-1 rounded font-bold">Save</button>
                      </div>
                   </div>
                )}

                {brands.map(brand => (
                   <div 
                     key={brand.id}
                     onClick={() => setSelectedBrandId(brand.id)}
                     className={`
                       group p-3 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-100 flex items-center justify-between
                       ${selectedBrandId === brand.id ? 'bg-white border-l-4 border-l-brand-600 shadow-sm' : 'border-l-4 border-l-transparent'}
                       ${!brand.isVisible ? 'opacity-60 grayscale' : ''}
                     `}
                   >
                      {editingBrandId === brand.id ? (
                          <div className="flex-1 flex items-center gap-2">
                             <input 
                               value={editingBrandName}
                               onChange={e => setEditingBrandName(e.target.value)}
                               className="w-full border rounded px-2 py-1 text-sm"
                               onClick={e => e.stopPropagation()}
                             />
                             <button onClick={(e) => { e.stopPropagation(); handleSaveBrandName(brand.id); }} className="text-green-600"><Check size={16}/></button>
                          </div>
                      ) : (
                          <div className="flex-1">
                             <div className="font-bold text-gray-800 text-sm flex items-center gap-2">
                                {brand.name}
                                {!brand.isVisible && <EyeOff size={10} className="text-gray-400" />}
                             </div>
                             <div className="text-xs text-gray-400">{brand.colors.length} colors</div>
                          </div>
                      )}

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                            onClick={(e) => { e.stopPropagation(); handleToggleBrandVisibility(brand); }}
                            className="p-1 text-gray-400 hover:text-brand-600"
                            title={brand.isVisible ? "Hide Brand" : "Show Brand"}
                         >
                            <Eye size={14} />
                         </button>
                         <button 
                            onClick={(e) => { 
                               e.stopPropagation(); 
                               setEditingBrandId(brand.id); 
                               setEditingBrandName(brand.name); 
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                         >
                            <Edit2 size={14} />
                         </button>
                         <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteBrand(brand.id); }}
                            className="p-1 text-gray-400 hover:text-red-600"
                         >
                            <Trash2 size={14} />
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* --- RIGHT PANEL: COLORS --- */}
          <div className="flex-1 flex flex-col bg-white">
             {!selectedBrand ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                   <div className="bg-gray-50 p-4 rounded-full mb-4"><MoreHorizontal size={32} /></div>
                   <p>Select a brand to manage colors</p>
                </div>
             ) : (
                <>
                   <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white">
                      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                        {selectedBrand.name} Colors
                        <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full text-xs font-normal">{selectedBrand.colors.length}</span>
                      </h3>
                      <button 
                          onClick={() => setIsAddingColor(true)}
                          className="bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
                      >
                          <Plus size={14} /> Add Color
                      </button>
                   </div>

                   <div className="flex-1 overflow-y-auto p-4">
                      <table className="w-full text-left text-sm">
                         <thead className="text-gray-500 border-b border-gray-100">
                            <tr>
                               <th className="pb-2 font-medium pl-2">Color Name</th>
                               <th className="pb-2 font-medium">Code</th>
                               <th className="pb-2 font-medium">Universal Standard ID</th>
                               <th className="pb-2 font-medium text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-50">
                            {isAddingColor && (
                                <tr className="bg-brand-50">
                                   <td className="py-3 pl-2"><input className="w-full border p-1 rounded text-sm" placeholder="Name" value={newColor.name} onChange={e => setNewColor({...newColor, name: e.target.value})}/></td>
                                   <td className="py-3"><input className="w-20 border p-1 rounded text-sm" placeholder="Code" value={newColor.code} onChange={e => setNewColor({...newColor, code: e.target.value})}/></td>
                                   <td className="py-3"><input className="w-24 border p-1 rounded text-sm" placeholder="e.g. std-1" value={newColor.standardId} onChange={e => setNewColor({...newColor, standardId: e.target.value})}/></td>
                                   <td className="py-3 text-right">
                                      <div className="flex justify-end gap-2">
                                        <button onClick={() => setIsAddingColor(false)} className="p-1 text-gray-500"><X size={16}/></button>
                                        <button onClick={handleAddColor} className="p-1 text-green-600"><Check size={16}/></button>
                                      </div>
                                   </td>
                                </tr>
                            )}

                            {selectedBrand.colors.map(color => {
                                const isEditing = editingColorId === color.id;
                                return (
                                   <tr key={color.id} className={`hover:bg-gray-50 ${!color.isVisible ? 'opacity-50' : ''}`}>
                                      <td className="py-3 pl-2 px-2">
                                         {isEditing ? (
                                            <input className="w-full border p-1 rounded" value={editColorForm.name ?? color.name} onChange={e => setEditColorForm({...editColorForm, name: e.target.value})} />
                                         ) : (
                                            <span className="font-medium text-gray-900">{color.name}</span>
                                         )}
                                      </td>
                                      <td className="py-3 px-2">
                                         {isEditing ? (
                                            <input className="w-20 border p-1 rounded" value={editColorForm.code ?? color.code} onChange={e => setEditColorForm({...editColorForm, code: e.target.value})} />
                                         ) : (
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{color.code}</span>
                                         )}
                                      </td>
                                      <td className="py-3 px-2">
                                         {isEditing ? (
                                            <input className="w-24 border p-1 rounded" placeholder="std-X" value={editColorForm.standardId ?? color.standardId ?? ''} onChange={e => setEditColorForm({...editColorForm, standardId: e.target.value})} />
                                         ) : (
                                            color.standardId ? (
                                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 font-mono">{color.standardId}</span>
                                            ) : (
                                                <span className="text-xs text-gray-300 italic">--</span>
                                            )
                                         )}
                                      </td>
                                      <td className="py-3 text-right pr-2">
                                         <div className="flex justify-end gap-1">
                                            {isEditing ? (
                                               <>
                                                 <button onClick={() => setEditingColorId(null)} className="p-1.5 hover:bg-gray-200 rounded text-gray-500"><X size={14}/></button>
                                                 <button onClick={() => handleSaveColorEdit(color.id)} className="p-1.5 bg-green-50 hover:bg-green-100 rounded text-green-600"><Check size={14}/></button>
                                               </>
                                            ) : (
                                               <>
                                                 <button onClick={() => handleToggleColorVisibility(color)} className={`p-1.5 rounded hover:bg-gray-100 ${color.isVisible ? 'text-gray-400' : 'text-red-400'}`}>
                                                    {color.isVisible ? <Eye size={14}/> : <EyeOff size={14}/>}
                                                 </button>
                                                 <button onClick={() => { setEditingColorId(color.id); setEditColorForm({}); }} className="p-1.5 text-blue-400 hover:bg-blue-50 rounded hover:text-blue-600"><Edit2 size={14}/></button>
                                                 <button onClick={() => handleDeleteColor(color.id)} className="p-1.5 text-red-300 hover:bg-red-50 rounded hover:text-red-600"><Trash2 size={14}/></button>
                                               </>
                                            )}
                                         </div>
                                      </td>
                                   </tr>
                                );
                            })}
                         </tbody>
                      </table>
                   </div>
                </>
             )}
          </div>
      </div>
    </div>
  );
};
