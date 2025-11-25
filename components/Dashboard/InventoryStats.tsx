import React from 'react';
import { InstallerProfile } from '../../types';

interface Props {
  profile: InstallerProfile;
}

export const InventoryStats: React.FC<Props> = ({ profile }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
    <h3 className="font-bold text-gray-900 mb-4">Inventory Stats</h3>
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-500">Total Colors Matched</span>
        <span className="font-bold text-2xl">{profile.matches.length}</span>
    </div>
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-500">Reference Brand</span>
        <span className="font-medium uppercase">{profile.selectedReferenceBrandId}</span>
    </div>
  </div>
);