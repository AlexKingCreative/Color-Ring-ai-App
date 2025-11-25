
import { useState, useEffect, useCallback } from 'react';
import { InstallerProfile, AppStep, ColorMatch } from '../types';
import { isSupabaseConfigured } from '../services/supabase';
import { dbService } from '../services/dbService';
import { authService } from '../services/authService';
import { MASTER_ADMIN_EMAIL } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAppController = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Helper to parse URL query params (Legacy support) ---
  const getStepFromUrl = (): AppStep => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const path = window.location.pathname;
    
    // Check pathname for routing consistency if we are on the demo route
    // Use includes/endsWith to handle potential base paths or trailing slashes
    if (path.includes('/demo') || page === 'demo') {
        return AppStep.ONBOARDING_NAME;
    }
    
    return AppStep.LANDING;
  };

  // --- State for Navigation ---
  const [step, setStep] = useState<AppStep>(getStepFromUrl);

  // --- State for Data ---
  const [userSession, setUserSession] = useState<any>(null);
  const [profile, setProfile] = useState<InstallerProfile>({
    companyName: '',
    colorCount: 0,
    selectedReferenceBrandId: null,
    matches: [],
    billingStatus: 'TRIAL',
    email: '',
    createdAt: new Date().toISOString()
  });

  // --- State for Onboarding Wizard Flow ---
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // --- Actions: Data Loading ---
  const loadUserData = useCallback(async (userId: string) => {
    try {
      const [fetchedProfile, fetchedMatches] = await Promise.all([
        dbService.fetchProfile(userId),
        dbService.fetchMatches(userId)
      ]);

      setProfile(prev => ({
        ...prev,
        ...(fetchedProfile || {}),
        matches: fetchedMatches.length > 0 ? fetchedMatches : prev.matches
      }));

    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // --- Effects: Sync Step with Route ---
  useEffect(() => {
    if (location.pathname.includes('/demo') && step === AppStep.LANDING) {
        setStep(AppStep.ONBOARDING_NAME);
    } else if (location.pathname === '/' && step !== AppStep.LANDING && !step) {
        setStep(AppStep.LANDING);
    }
  }, [location.pathname, step]);

  // --- Effects: Auth & Config ---
  useEffect(() => {
    // Check Config
    if (!isSupabaseConfigured()) {
      console.error("App is not configured with Supabase credentials.");
    }

    // Check initial session
    authService.getSession().then(({ data: { session } }) => {
      setUserSession(session);
      if (session) {
        if (session.user.email === MASTER_ADMIN_EMAIL) {
            navigate('/admin');
        } else {
            // If we are currently in the onboarding flow (creating account), don't jump to dashboard yet.
            // Let the flow continue naturally.
            if (!location.pathname.includes('/demo')) {
               navigate('/dashboard');
            }
            loadUserData(session.user.id);
        }
      }
    });

    // Listen for Auth changes
    const { data: { subscription } } = authService.onAuthStateChange((_event, session) => {
      setUserSession(session);
      if (session) {
        if (session.user.email === MASTER_ADMIN_EMAIL) {
             navigate('/admin');
        } else {
             loadUserData(session.user.id);
             // Note: We don't auto-navigate here to avoid interrupting the onboarding flow if they just signed up
        }
      } else {
         // If signed out
         if (location.pathname.includes('/dashboard') || location.pathname.includes('/admin')) {
             navigate('/');
         }
      }
    });

    return () => subscription.unsubscribe();
  }, [loadUserData, navigate, location.pathname]);

  // --- Navigation Actions ---

  const goHome = useCallback(() => {
    navigate('/');
    setStep(AppStep.LANDING);
  }, [navigate]);

  const handleSignInClick = useCallback(() => {
    // Trigger Auth UI
    setStep(AppStep.AUTH);
    navigate('/demo'); 
  }, [navigate]);

  const handleStartOnboarding = useCallback(() => {
    navigate('/demo');
    // Ensure state is reset to start if needed
    setStep(AppStep.ONBOARDING_NAME);
  }, [navigate]);

  const handleOpenPrivacy = useCallback(() => {
      navigate('/privacy-policy');
  }, [navigate]);
  const handleOpenTerms = useCallback(() => {
      navigate('/terms-of-service');
  }, [navigate]);
  const handleOpenPricing = useCallback(() => {
      navigate('/pricing');
  }, [navigate]);

  // --- Onboarding Wizard Navigation ---
  const goNext = useCallback(() => {
    if (step === AppStep.MATCHING_PROCESS) return;
    if (step === AppStep.ONBOARDING_SELECT_REF) {
      setStep(AppStep.CREATE_ACCOUNT);
      return;
    }
    setStep(prev => prev + 1); // Relies on enum order
  }, [step]);

  const goBack = useCallback(() => {
    switch (step) {
      case AppStep.ONBOARDING_NAME: 
        goHome();
        break;
      case AppStep.ONBOARDING_COUNT: setStep(AppStep.ONBOARDING_NAME); break;
      case AppStep.ONBOARDING_SELECT_REF: setStep(AppStep.ONBOARDING_COUNT); break;
      case AppStep.CREATE_ACCOUNT: setStep(AppStep.ONBOARDING_SELECT_REF); break;
      case AppStep.MATCHING_PROCESS:
        if (currentMatchIndex === 0) setStep(AppStep.CREATE_ACCOUNT);
        else setCurrentMatchIndex(prev => prev - 1);
        break;
      case AppStep.PRICING_STEP: setStep(AppStep.MATCHING_PROCESS); break;
      case AppStep.CHECKOUT: setStep(AppStep.PRICING_STEP); break;
      case AppStep.AUTH: goHome(); break;
      default: break;
    }
  }, [step, currentMatchIndex, goHome]);


  // --- Auth & Flow Completion Handlers ---

  const logout = useCallback(async () => {
    await authService.signOut();
    navigate('/');
  }, [navigate]);

  const handleAccountCreated = (email: string) => {
    updateProfile({ email, billingStatus: 'TRIAL', createdAt: new Date().toISOString() });
    setStep(AppStep.MATCHING_PROCESS);
  };

  const handleAuthSuccess = (email: string) => {
     navigate('/dashboard');
  };

  const handlePricingActivate = () => {
    setStep(AppStep.CHECKOUT);
  };

  const handleCheckoutSuccess = async () => {
    // Update DB to active
    if (userSession) {
        await dbService.updateProfile(userSession.user.id, { billingStatus: 'ACTIVE' });
        await loadUserData(userSession.user.id);
    }
    navigate('/dashboard');
  };
  
  // New handler for upgrading from dashboard
  const handleUpgradeSubscription = useCallback(() => {
      setStep(AppStep.PRICING_STEP);
  }, []);

  // --- Data Modification ---
  const updateProfile = (updates: Partial<InstallerProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleAddMatch = async (newMatch: ColorMatch) => {
    // Optimistic Update
    setProfile(prev => ({ ...prev, matches: [...prev.matches, newMatch] }));

    // DB Persist
    if (userSession) {
      await dbService.saveMatch(userSession.user.id, newMatch);
    }

    // Advance logic
    if (currentMatchIndex < profile.colorCount - 1) {
      setCurrentMatchIndex(prev => prev + 1);
    } else {
      // MATCHING COMPLETE -> Go directly to Dashboard (24h Trial)
      navigate('/dashboard');
    }
  };

  const skipMatch = () => {
    if (currentMatchIndex < profile.colorCount - 1) {
      setCurrentMatchIndex(prev => prev + 1);
    } else {
       // MATCHING COMPLETE -> Go directly to Dashboard (24h Trial)
       navigate('/dashboard');
    }
  };

  const steps = [
    { label: 'Brand', isActive: step === AppStep.ONBOARDING_NAME, isCompleted: step > AppStep.ONBOARDING_NAME },
    { label: 'Inventory', isActive: step === AppStep.ONBOARDING_COUNT, isCompleted: step > AppStep.ONBOARDING_COUNT },
    { label: 'Reference', isActive: step === AppStep.ONBOARDING_SELECT_REF, isCompleted: step > AppStep.ONBOARDING_SELECT_REF },
    { label: 'Account', isActive: step === AppStep.CREATE_ACCOUNT, isCompleted: step > AppStep.CREATE_ACCOUNT },
    { label: 'Matching', isActive: step === AppStep.MATCHING_PROCESS, isCompleted: step > AppStep.MATCHING_PROCESS },
    // Launch step is now hidden from the progress bar during initial onboarding as it is skipped
  ];

  return {
    state: {
      step,
      profile,
      userSession,
      currentMatchIndex,
      steps,
      isOnboarding: [
          AppStep.ONBOARDING_NAME, 
          AppStep.ONBOARDING_COUNT, 
          AppStep.ONBOARDING_SELECT_REF, 
          AppStep.CREATE_ACCOUNT,
          AppStep.MATCHING_PROCESS,
          AppStep.PRICING_STEP,
          AppStep.CHECKOUT
      ].includes(step)
    },
    actions: {
      updateProfile,
      goNext,
      goBack,
      goHome,
      logout,
      handleAddMatch,
      skipMatch,
      handleAccountCreated,
      handleAuthSuccess,
      handlePricingActivate,
      handleCheckoutSuccess,
      handleUpgradeSubscription,
      handleSignInClick,
      handleStartOnboarding,
      handleOpenPrivacy,
      handleOpenTerms,
      handleOpenPricing,
      setStep
    }
  };
};
