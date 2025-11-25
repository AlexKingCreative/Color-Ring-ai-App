
import React from 'react';
import { LegalLayout } from './LegalLayout';

interface Props {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<Props> = ({ onBack }) => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 10, 2024" onBack={onBack}>
      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">1. Introduction</h3>
        <p>
          Hair Pro 360 LLC ("Company", "we", "our", or "us") respects your privacy and is committed to protecting it through compliance with this policy.
          This policy describes the types of information we may collect from you or that you may provide when you visit our website, ColorRing.ai (our "Website") 
          and use our AI-powered color matching services (the "Service"), and our practices for collecting, using, maintaining, protecting, and disclosing that information.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">2. Information We Collect</h3>
        <p className="mb-4">We collect several types of information from and about users of our Website, including information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Identification Information:</strong> Name, email address, business name, and payment information (processed via our third-party payment processors).</li>
          <li><strong>Business Data:</strong> Inventory lists, custom color names, brand preferences, and color mapping configurations.</li>
          <li><strong>Usage Data:</strong> Information regarding your interaction with our AI chatbot, including chat logs, queries submitted, and match results.</li>
          <li><strong>Technical Data:</strong> IP addresses, browser type, internet service provider (ISP), referring/exit pages, and operating system.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">3. AI Training and Data Usage (Important)</h3>
        <p className="font-medium mb-2">By using our Service, you acknowledge and agree to the following regarding Artificial Intelligence (AI) usage:</p>
        <div className="bg-brand-50 border-l-4 border-brand-500 p-6 my-4 rounded-r-lg">
          <p className="text-brand-900 font-semibold mb-2">AI Model Training</p>
          <p className="text-brand-800">
            We may use the data you provide—specifically regarding color matching logic, brand names, color codes, and user interaction logs—to train, improve, and refine our Artificial Intelligence models. 
            This helps us provide more accurate color matching predictions for you and other users. While we strive to anonymize data where possible, the specific color mapping logic you create contributes to the aggregate intelligence of our system.
          </p>
        </div>
        <p>
           We utilize third-party AI providers (such as Google Gemini) to process your requests. Your input data is transmitted to these providers for the purpose of generating responses. 
           We advise against entering sensitive personal, financial, or health information into the AI chat interface.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">4. How We Use Your Information</h3>
        <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>To present our Website and its contents to you.</li>
          <li>To provide you with the AI color matching services.</li>
          <li>To process billing and subscription payments.</li>
          <li>To improve our Website, products, or services (including AI model training).</li>
          <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">5. Disclosure of Your Information</h3>
        <p>
          We may disclose aggregated information about our users without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>To our subsidiaries and affiliates.</li>
          <li>To contractors, service providers, and other third parties we use to support our business (e.g., Supabase for database hosting, Stripe for payments, Google for AI processing).</li>
          <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Hair Pro 360 LLC's assets.</li>
          <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">6. Data Security</h3>
        <p>
          We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. 
          However, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Website.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-900 mb-4">7. Contact Information</h3>
        <p>
          To ask questions or comment about this privacy policy and our privacy practices, contact us at:
        </p>
        <p className="mt-4 font-medium">
          Hair Pro 360 LLC<br />
          Registered in North Carolina, USA<br />
          Email: admin@colorring.ai
        </p>
      </section>
    </LegalLayout>
  );
};
