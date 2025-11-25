
export interface ColorDefinition {
  id: string;
  name: string;
  code: string;
  hex: string; // Approximation for UI
  standardId?: string; // Universal ID to link colors across brands (e.g. "std-1", "std-60")
  isVisible?: boolean;
}

export interface BrandProfile {
  id: string;
  name: string;
  colors: ColorDefinition[];
  isSystem?: boolean; // True for hardcoded constants, False for DB-added
  isVisible?: boolean;
}

export type MatchType = 'EXACT' | 'CLOSE';

export interface ColorMatch {
  id?: string; // Database ID
  referenceBrandId: string;
  referenceColorId: string;
  userColorName: string;
  matchType: MatchType;
  inventoryIndex?: number; // Track which step this match belongs to
  createdAt?: string;
}

export interface InstallerProfile {
  companyName: string;
  colorCount: number;
  selectedReferenceBrandId: string | null;
  matches: ColorMatch[];
  billingStatus?: 'ACTIVE' | 'INACTIVE' | 'PAST_DUE' | 'TRIAL';
  email?: string;
  widgetColor?: string;
  createdAt?: string; // Added to track trial expiration
}

export interface ClientProfile extends InstallerProfile {
  id: string;
  createdAt: string; // Required for clients
  email: string;
}

export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  mrr: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppStep {
  LANDING,
  PRICING,
  BOOKING_CONFIRMED,
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
  AUTH,
  DASHBOARD,
  ADMIN_DASHBOARD,
  // Onboarding Wizard Steps
  ONBOARDING_NAME,
  ONBOARDING_COUNT,
  ONBOARDING_SELECT_REF,
  CREATE_ACCOUNT, 
  MATCHING_PROCESS,
  PRICING_STEP, 
  CHECKOUT
}
