
import { useState, useEffect, useCallback } from 'react';
import { BrandProfile } from '../types';
import { dbService } from '../services/dbService';
import { REFERENCE_BRANDS } from '../constants';

export const useReferenceBrands = () => {
  // Initialize with static brands to prevent flicker
  const [brands, setBrands] = useState<BrandProfile[]>(REFERENCE_BRANDS.map(b => ({ ...b, isSystem: true })));
  const [isLoading, setIsLoading] = useState(true);

  const refreshBrands = useCallback(async () => {
    setIsLoading(true);
    const fetchedBrands = await dbService.getReferenceBrands();
    setBrands(fetchedBrands);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshBrands();
  }, [refreshBrands]);

  return {
    brands,
    isLoading,
    refreshBrands
  };
};
