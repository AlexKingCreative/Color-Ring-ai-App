
import React from 'react';
import { LegalLayout } from './LegalLayout';

interface Props {
  onBack: () => void;
}

export const TermsOfService: React.FC<Props> = ({ onBack }) => {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="March 10, 2024" onBack={onBack}>
      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">1. Acceptance of Terms</h3>
        <p>
          These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Hair Pro 360 LLC ("Company," “we,” “us,” or “our”), 
          concerning your access to and use of the ColorRing.ai website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
        </p>
        <p className="mt-2">
          By accessing the Site, you acknowledge that you have read, understood, and agree to be bound by all of these Terms of Use. If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the Site and you must discontinue use immediately.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">2. Services Provided</h3>
        <p>
          ColorRing.ai provides an AI-powered inventory matching system designed to assist hair extension brands in matching their products to industry standards.
          The Service includes a chatbot widget that can be embedded on third-party websites to assist end-users with color selection.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">3. Accuracy of Color Matching (Disclaimer)</h3>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-4 rounded-r-lg">
          <p className="text-amber-900 font-bold mb-2">LIMITATION OF LIABILITY FOR COLOR ACCURACY</p>
          <p className="text-amber-800 text-sm leading-relaxed">
            THE SERVICE PROVIDES RECOMMENDATIONS BASED ON DATA INPUT BY YOU AND AI-GENERATED PREDICTIONS. HAIR PRO 360 LLC DOES NOT GUARANTEE THE ACCURACY OF ANY COLOR MATCH. 
            HAIR COLOR PERCEPTION IS SUBJECTIVE AND CAN BE AFFECTED BY LIGHTING, MONITOR CALIBRATION, AND MANUFACTURING VARIATIONS. 
            YOU ACKNOWLEDGE THAT "CLOSE MATCHES" MAY NOT BE EXACT. WE ARE NOT RESPONSIBLE FOR ANY RETURNS, REFUNDS, OR CUSTOMER COMPLAINTS ARISING FROM COLOR MISMATCHES SUGGESTED BY THE SERVICE.
            YOU ARE SOLELY RESPONSIBLE FOR VERIFYING THE ACCURACY OF THE MAPPINGS IN YOUR DASHBOARD BEFORE DEPLOYING THE WIDGET.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">4. User Representations</h3>
        <p>By using the Site, you represent and warrant that:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>All registration information you submit will be true, accurate, current, and complete.</li>
          <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
          <li>You are not a minor in the jurisdiction in which you reside.</li>
          <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
          <li>You will not use the Site for any illegal or unauthorized purpose.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">5. Billing and Subscriptions</h3>
        <p>
          Access to certain features of the Service requires a paid subscription. By subscribing, you agree to pay the fees associated with your chosen plan.
          Payments are processed securely via Stripe. We reserve the right to change our pricing at any time, with notice provided to you prior to your next billing cycle.
          You may cancel your subscription at any time; however, refunds are not provided for partial months of service.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">6. Intellectual Property Rights</h3>
        <p>
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site 
          (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, 
          and are protected by copyright and trademark laws.
        </p>
        <p className="mt-2">
          You retain ownership of your specific inventory data and brand imagery uploaded to the Service. However, you grant us a non-exclusive, worldwide, royalty-free license to use, copy, and display such data for the purpose of providing and improving the Service (including training our AI models).
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">7. Governing Law</h3>
        <p>
          These Terms shall be governed by and defined following the laws of the State of North Carolina. 
          Hair Pro 360 LLC and yourself irrevocably consent that the courts of North Carolina shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">8. Contact Us</h3>
        <p>
          In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
        </p>
        <p className="mt-4 font-medium">
          Hair Pro 360 LLC<br />
          Email: admin@colorring.ai
        </p>
      </section>
    </LegalLayout>
  );
};
