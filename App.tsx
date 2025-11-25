
import React from 'react';
import { AppStep } from './types';
import { useAppController } from './hooks/useAppController';
import { CDN_BASE_URL } from './constants';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import { StepIndicator } from './components/Onboarding/UI/StepIndicator';
import { ChatWidget } from './components/ChatWidget';
import { LandingPage } from './components/LandingPage';
import { BrandNameStep } from './components/Onboarding/BrandNameStep';
import { InventoryCountStep } from './components/Onboarding/InventoryCountStep';
import { ReferenceBrandStep } from './components/Onboarding/ReferenceBrandStep';
import { CreateAccountStep } from './components/Onboarding/CreateAccountStep';
import { ColorMatchingStep } from './components/Onboarding/ColorMatchingStep';
import { PricingStep } from './components/Onboarding/PricingStep';
import { AuthForm } from './components/Auth/AuthForm';
import { CheckoutStep } from './components/CheckoutStep';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';

// Legal & Marketing Pages
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsOfService } from './components/Legal/TermsOfService';
import { PublicPricing } from './components/Landing/PublicPricing';
import { BookingConfirmed } from './components/Landing/BookingConfirmed';

function App() {
  const { state, actions } = useAppController();
  const { step, profile, userSession, currentMatchIndex, steps, isOnboarding } = state;

  return (
    <div className="font-sans text-brand-900 selection:bg-brand-200 selection:text-brand-900">
      
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={
          <LandingPage
            onSignIn={actions.handleSignInClick}
            onStart={actions.handleStartOnboarding}
            onOpenPrivacy={actions.handleOpenPrivacy}
            onOpenTerms={actions.handleOpenTerms}
            onOpenPricing={actions.handleOpenPricing}
          />
        } />
        
        <Route path="/booking-confirmed" element={<BookingConfirmed onBack={actions.goHome} />} />
        <Route path="/pricing" element={<PublicPricing onBack={actions.goHome} onStart={actions.handleStartOnboarding} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy onBack={actions.goHome} />} />
        <Route path="/terms-of-service" element={<TermsOfService onBack={actions.goHome} />} />
        
        {/* Auth Route - For simplicity we render AuthForm here or overlay it */}
        {/* Note: In previous structure AUTH was a step. If we route there: */}
        {/* We can use a modal or a route. Let's assume a route for cleaner URLs if desired, or keep as overlay. 
            For now, Landing Page handles auth logic via state if we didn't add a /auth route.
            Let's add one for robustness. */}
        
        {/* Dashboard */}
        <Route path="/dashboard" element={
           userSession ? (
             <Dashboard
                profile={profile}
                userSession={userSession}
                onManageBilling={actions.handleUpgradeSubscription} 
                cdnBaseUrl={CDN_BASE_URL}
                onLogout={actions.logout}
             />
           ) : <Navigate to="/" />
        } />

        <Route path="/admin" element={
           userSession ? (
             <AdminDashboard onLogout={actions.logout} />
           ) : <Navigate to="/" />
        } />

        {/* Onboarding Flow (Demo) */}
        <Route path="/demo" element={
          <div className="min-h-screen bg-brand-50 flex flex-col">
            {step === AppStep.AUTH && (
                <AuthForm onBack={actions.goHome} onSuccess={actions.handleAuthSuccess} />
            )}

            {isOnboarding && (
               <>
                 <StepIndicator steps={steps} bgClass="bg-brand-50" />
                 <div className="flex-1 flex flex-col justify-center">
                    {step === AppStep.ONBOARDING_NAME && (
                      <BrandNameStep
                        value={profile.companyName}
                        onChange={val => actions.updateProfile({ companyName: val })}
                        onNext={actions.goNext}
                        onBack={actions.goBack}
                      />
                    )}

                    {step === AppStep.ONBOARDING_COUNT && (
                      <InventoryCountStep
                        value={profile.colorCount}
                        onChange={val => actions.updateProfile({ colorCount: val })}
                        onNext={actions.goNext}
                        onBack={actions.goBack}
                      />
                    )}

                    {step === AppStep.ONBOARDING_SELECT_REF && (
                      <ReferenceBrandStep
                        selectedId={profile.selectedReferenceBrandId}
                        onSelect={id => actions.updateProfile({ selectedReferenceBrandId: id })}
                        onNext={actions.goNext}
                        onBack={actions.goBack}
                      />
                    )}

                    {step === AppStep.CREATE_ACCOUNT && (
                      <CreateAccountStep
                        email={profile.email || ''}
                        companyName={profile.companyName}
                        steps={steps}
                        onBack={actions.goBack}
                        onSuccess={actions.handleAccountCreated}
                      />
                    )}

                    {step === AppStep.MATCHING_PROCESS && (
                      <ColorMatchingStep
                        profile={profile}
                        currentMatchIndex={currentMatchIndex}
                        steps={steps}
                        onBack={actions.goBack}
                        onAddMatch={actions.handleAddMatch}
                        onSkip={actions.skipMatch}
                      />
                    )}

                    {/* These steps are now reachable via Dashboard Upgrade action, but exist in the "demo" route context conceptually if we reuse logic */}
                    {step === AppStep.PRICING_STEP && (
                      <PricingStep
                        steps={steps}
                        matchCount={profile.matches.length}
                        onBack={() => actions.setStep(AppStep.DASHBOARD)} // Back goes to dashboard if accessed from there
                        onActivate={actions.handlePricingActivate}
                      />
                    )}

                    {step === AppStep.CHECKOUT && (
                      <CheckoutStep
                        onSuccess={actions.handleCheckoutSuccess}
                      />
                    )}
                 </div>
               </>
            )}
          </div>
        } />

      </Routes>

      {/* Global Widget - Only show on Dashboard */}
      {step === AppStep.DASHBOARD && <ChatWidget profile={profile} defaultOpen={false} />}
    </div>
  );
}

export default App;
