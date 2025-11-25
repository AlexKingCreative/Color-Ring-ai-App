
import { supabase } from './supabase';
import { ColorMatch, MatchType, InstallerProfile, AdminStats, ClientProfile, BrandProfile, ColorDefinition } from '../types';
import { REFERENCE_BRANDS } from '../constants';

export const dbService = {
  // --- User / Installer Methods ---

  async fetchProfile(userId: string): Promise<Partial<InstallerProfile> | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return {
      companyName: data.company_name,
      email: data.email,
      billingStatus: data.billing_status || 'TRIAL', // Default to TRIAL if null
      widgetColor: data.widget_color || '#0F172A',
      createdAt: data.created_at // Fetch creation time for trial logic
    };
  },

  async updateProfile(userId: string, updates: Partial<InstallerProfile>): Promise<boolean> {
    const dbUpdates: any = {};
    if (updates.widgetColor) dbUpdates.widget_color = updates.widgetColor;
    if (updates.companyName) dbUpdates.company_name = updates.companyName;
    if (updates.billingStatus) dbUpdates.billing_status = updates.billingStatus;
    
    const { error } = await supabase
      .from('profiles')
      .update(dbUpdates)
      .eq('id', userId);
      
    if (error) {
      console.error("Error updating profile:", error);
      return false;
    }
    return true;
  },

  async fetchMatches(userId: string): Promise<ColorMatch[]> {
    const { data, error } = await supabase
      .from('color_matches')
      .select('id, reference_brand_id, reference_color_id, match_type, created_at, inventory_colors(color_name)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching matches:', error);
      return [];
    }

    return (data || []).map((m: any) => ({
      id: m.id,
      referenceBrandId: m.reference_brand_id,
      referenceColorId: m.reference_color_id,
      userColorName: m.inventory_colors?.color_name || 'Unknown',
      matchType: m.match_type as MatchType,
      createdAt: m.created_at,
      inventoryIndex: 0
    }));
  },

  async saveMatch(userId: string, match: ColorMatch): Promise<boolean> {
    try {
      // 1. Create Inventory Color
      const { data: invColor, error: invError } = await supabase
        .from('inventory_colors')
        .insert({
          user_id: userId,
          color_name: match.userColorName
        })
        .select()
        .single();

      if (invError || !invColor) throw invError;

      // 2. Create Match Record
      const { error: matchError } = await supabase
        .from('color_matches')
        .insert({
          user_id: userId,
          reference_brand_id: match.referenceBrandId,
          reference_color_id: match.referenceColorId,
          inventory_color_id: invColor.id,
          match_type: match.matchType
        });

      if (matchError) throw matchError;
      return true;

    } catch (error) {
      console.error('Error saving match:', error);
      return false;
    }
  },

  async deleteMatch(matchId: string): Promise<boolean> {
    const { error } = await supabase
      .from('color_matches')
      .delete()
      .eq('id', matchId);
    
    if (error) {
        console.error("Error deleting match", error);
        return false;
    }
    return true;
  },

  async createProfile(userId: string, email: string, companyName: string) {
    return await supabase.from('profiles').insert({
      id: userId,
      email: email,
      company_name: companyName,
      billing_status: 'TRIAL' // Explicitly set trial on creation
    });
  },

  // --- Admin Methods ---

  async getAdminStats(): Promise<AdminStats> {
    // Mock data for prototype, ideally count(*) from DB
    const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    
    return {
      totalUsers: userCount || 1,
      activeSubscriptions: 0, 
      mrr: 0 
    };
  },

  async getAllClients(): Promise<ClientProfile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return [];

    return data.map((p: any) => ({
       id: p.id,
       email: p.email,
       companyName: p.company_name,
       createdAt: p.created_at,
       billingStatus: p.billing_status || 'TRIAL',
       colorCount: 0, 
       matches: [], 
       selectedReferenceBrandId: null,
       widgetColor: p.widget_color || '#0F172A' 
    }));
  },

  // --- Reference Brand Management (Dynamic DB) ---

  async getReferenceBrands(): Promise<BrandProfile[]> {
    try {
        // 1. Fetch Brands
        const { data: brands, error: brandError } = await supabase
            .from('reference_brands')
            .select('*')
            .order('name');
        
        if (brandError) throw brandError;

        // 2. Fetch Colors for those brands
        const { data: colors, error: colorError } = await supabase
            .from('reference_colors')
            .select('*')
            .order('name');

        if (colorError) throw colorError;

        // 3. Map to BrandProfile
        const dbBrands: BrandProfile[] = brands.map((b: any) => ({
            id: b.id,
            name: b.name,
            isSystem: false,
            isVisible: b.is_visible !== false, // Default to true if undefined
            colors: colors
                .filter((c: any) => c.brand_id === b.id)
                .map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    code: c.code,
                    hex: c.hex_code,
                    standardId: c.standard_id,
                    isVisible: c.is_visible !== false
                }))
        }));

        // 4. Merge with Static Constants (System Brands)
        const systemBrands = REFERENCE_BRANDS.map(b => ({ ...b, isSystem: true, isVisible: true }));
        return [...systemBrands, ...dbBrands];

    } catch (e) {
        console.warn("Could not fetch dynamic brands, using static only.", e);
        return REFERENCE_BRANDS.map(b => ({ ...b, isSystem: true, isVisible: true }));
    }
  },

  // --- Brand CRUD ---
  async addReferenceBrand(name: string): Promise<string | null> {
    const { data, error } = await supabase
        .from('reference_brands')
        .insert({ name, is_visible: true })
        .select()
        .single();
    
    if (error) { console.error(error); return null; }
    return data.id;
  },

  async updateReferenceBrand(id: string, updates: { name?: string, isVisible?: boolean }) {
    const { error } = await supabase
        .from('reference_brands')
        .update({ 
           ...(updates.name && { name: updates.name }),
           ...(updates.isVisible !== undefined && { is_visible: updates.isVisible })
        })
        .eq('id', id);
    return !error;
  },

  async deleteReferenceBrand(id: string) {
    // Note: Requires Cascade Delete on DB or manual deletion of colors first
    const { error } = await supabase.from('reference_brands').delete().eq('id', id);
    return !error;
  },

  // --- Color CRUD ---
  async addReferenceColor(brandId: string, color: ColorDefinition): Promise<boolean> {
     const { error } = await supabase
        .from('reference_colors')
        .insert({
            brand_id: brandId,
            name: color.name,
            code: color.code,
            hex_code: color.hex,
            standard_id: color.standardId,
            is_visible: true
        });
    return !error;
  },

  async updateReferenceColor(id: string, updates: Partial<ColorDefinition>) {
    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.code) dbUpdates.code = updates.code;
    if (updates.hex) dbUpdates.hex_code = updates.hex;
    if (updates.standardId) dbUpdates.standard_id = updates.standardId;
    if (updates.isVisible !== undefined) dbUpdates.is_visible = updates.isVisible;

    const { error } = await supabase
        .from('reference_colors')
        .update(dbUpdates)
        .eq('id', id);
    return !error;
  },

  async deleteReferenceColor(id: string) {
    const { error } = await supabase.from('reference_colors').delete().eq('id', id);
    return !error;
  }
};
