import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChatWidget } from './components/ChatWidget';
import { dbService } from './services/dbService';
import { InstallerProfile } from './types';

// This is the standalone entry point for the widget.js file.
const initWidget = async () => {
  // 1. Find the script tag and extract config
  const currentScript = document.currentScript || (function() {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const userId = currentScript?.getAttribute('data-id');
  const positionAttribute = currentScript?.getAttribute('data-position');
  const position: 'left' | 'right' = positionAttribute === 'left' ? 'left' : 'right';
  const type = currentScript?.getAttribute('data-type') || 'floating'; // 'floating' or 'inline'

  if (!userId) {
    console.error("ColorRing.ai: No data-id found on script tag. Widget cannot initialize.");
    return;
  }

  try {
    // 2. Fetch Data via Service
    const [profileData, matches] = await Promise.all([
      dbService.fetchProfile(userId),
      dbService.fetchMatches(userId)
    ]);

    if (!profileData) {
       console.error("ColorRing.ai: Brand not found.");
       return;
    }

    const profile: InstallerProfile = {
        companyName: profileData.companyName || 'Unknown Brand',
        email: profileData.email,
        colorCount: matches.length,
        matches: matches,
        selectedReferenceBrandId: matches[0]?.referenceBrandId || 'bellami', 
        billingStatus: profileData.billingStatus || 'ACTIVE'
    };

    // 4. Mount the Widget
    if (type === 'inline') {
        // Inline Mode: Look for a specific div
        const targetDiv = document.getElementById('colorring-embed');
        if (targetDiv) {
            const root = ReactDOM.createRoot(targetDiv);
            root.render(
                <React.StrictMode>
                    <ChatWidget profile={profile} defaultOpen={true} variant="inline" />
                </React.StrictMode>
            );
        } else {
            console.warn("ColorRing.ai: Inline mode requested but <div id='colorring-embed'></div> not found.");
        }
    } else {
        // Floating Mode
        const container = document.createElement('div');
        container.id = 'colorring-widget-root';
        document.body.appendChild(container);
        
        const root = ReactDOM.createRoot(container);
        root.render(
            <React.StrictMode>
               <ChatWidget profile={profile} position={position} defaultOpen={false} variant="floating" />
            </React.StrictMode>
        );
    }

  } catch (err) {
    console.error("ColorRing.ai: Initialization failed", err);
  }
};

// Run initialization
if (document.readyState === 'complete') {
  initWidget();
} else {
  window.addEventListener('load', initWidget);
}