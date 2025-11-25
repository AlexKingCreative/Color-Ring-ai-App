
import { createClient } from '@supabase/supabase-js';

// Access environment variables safely
// We use a fallback object to prevent crashes if import.meta.env is undefined
const env = (import.meta as any).env || {};

// Hardcoded credentials to ensure immediate connectivity in preview environment
const envUrl = 'https://laoeipvtphcievqgvsc.supabase.co';
const envKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhb2VpcHZ0cGhjaWV2cWd2c2MiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMjc1OTc0NywiZXhwIjoyMDQ4MzM1NzQ3fQ.Pxs4CvjPURXb5YzU1xUHN-Gcs6t2HsPfXLJjZeKiqig';

// Fallback to local storage or empty strings (runtime check)
const supabaseUrl = envUrl || localStorage.getItem('sb_project_url') || '';
const supabaseAnonKey = envKey || localStorage.getItem('sb_anon_key') || '';

// Check if the app has valid credentials to actually make requests
export const isSupabaseConfigured = () => {
  const hasUrl = supabaseUrl && supabaseUrl.length > 0 && supabaseUrl !== 'https://placeholder.supabase.co';
  const hasKey = supabaseAnonKey && supabaseAnonKey.length > 0 && supabaseAnonKey !== 'placeholder';
  return hasUrl && hasKey;
};

if (!isSupabaseConfigured()) {
  console.warn("ColorRing.ai: App is running without Supabase credentials. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file or hosting provider.");
}

// Initialize the client
// If configuration is missing, we still initialize with placeholders to avoid app crash on import,
// but specific service calls will likely fail or be caught by isSupabaseConfigured checks.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);

export const saveSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem('sb_project_url', url);
  localStorage.setItem('sb_anon_key', key);
  window.location.reload();
};