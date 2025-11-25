
import { useState, useEffect, useMemo } from 'react';
import { InstallerProfile, ColorMatch, MatchType } from '../types';
import { useReferenceBrands } from './useReferenceBrands';

export const useColorMatching = (
  profile: InstallerProfile,
  currentMatchIndex: number,
  onAddMatch: (match: ColorMatch) => Promise<void>,
  onSkip: () => void
) => {
  // Dynamic Brands Hook
  const { brands } = useReferenceBrands();

  // Inputs for the user's color
  const [userColorName, setUserColorName] = useState('');
  
  // Input for the selected reference color ID
  const [selectedRefColorId, setSelectedRefColorId] = useState<string>('');
  
  // Match Type State (Exact vs Close)
  const [matchType, setMatchType] = useState<MatchType>('EXACT');
  
  const [isSaving, setIsSaving] = useState(false);

  // Get the Reference Brand details from the Dynamic list
  const refBrand = useMemo(() => 
    brands.find(b => b.id === profile.selectedReferenceBrandId),
  [profile.selectedReferenceBrandId, brands]);

  // Get the list of available colors for the dropdown
  const referenceColors = useMemo(() => refBrand ? refBrand.colors : [], [refBrand]);

  // Track which reference colors have already been used
  const usedReferenceColorIds = useMemo(() => {
    return new Set(profile.matches.map(m => m.referenceColorId));
  }, [profile.matches]);

  // Reset state when moving to the next match
  useEffect(() => {
    setUserColorName('');
    setSelectedRefColorId('');
    setMatchType('EXACT'); // Default to Exact
    setIsSaving(false);
  }, [currentMatchIndex]);

  const handleNext = async () => {
    if (!userColorName || !selectedRefColorId || !refBrand) return;

    setIsSaving(true);
    try {
      const match: ColorMatch = {
        referenceBrandId: refBrand.id,
        referenceColorId: selectedRefColorId,
        userColorName: userColorName,
        matchType: matchType, // Use the selected match type
        inventoryIndex: currentMatchIndex
      };

      await onAddMatch(match);
    } catch (e) {
      console.error("Error saving match", e);
    } finally {
      setIsSaving(false);
    }
  };

  const canProceed = !!userColorName.trim() && !!selectedRefColorId;

  return {
    userColorName,
    setUserColorName,
    selectedRefColorId,
    setSelectedRefColorId,
    matchType,
    setMatchType,
    
    referenceColors,
    refBrand,
    usedReferenceColorIds,
    
    isSaving,
    canProceed,
    
    totalInventoryCount: profile.colorCount,
    handleNext,
    handleSkip: onSkip
  };
};
