import { useNavigate } from 'react-router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronLeft, FileText, Download, Printer } from 'lucide-react';

export function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Settings
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Terms of Service</h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Last updated: February 1, 2026
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="ghost" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Introduction */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-[var(--color-accent)]" />
            <h2 className="text-2xl font-bold">Agreement to Terms</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Welcome to CareFlow. These Terms of Service ("Terms") govern your use of the CareFlow
              application and services (collectively, the "Service"). By accessing or using the Service,
              you agree to be bound by these Terms. If you do not agree to these Terms, please do not
              use the Service.
            </p>
          </div>
        </Card>

        {/* Section 1 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              By creating an account or using CareFlow, you acknowledge that you have read, understood,
              and agree to be bound by these Terms, as well as our Privacy Policy. These Terms apply to
              all users of the Service, including patients, caregivers, and healthcare providers.
            </p>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of any material
              changes via email or through the Service. Your continued use of the Service after such
              modifications constitutes your acceptance of the updated Terms.
            </p>
          </div>
        </Card>

        {/* Section 2 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              CareFlow is a healthcare management platform designed to help users track medications,
              manage health records, coordinate care circles, and connect with pharmacies. The Service
              includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Medication tracking and reminder features</li>
              <li>Meal logging and food interaction analysis</li>
              <li>Care circle coordination tools</li>
              <li>Pharmacy integration and refill management</li>
              <li>Health data storage and export capabilities</li>
              <li>Communication tools for care coordination</li>
            </ul>
            <p className="leading-relaxed">
              CareFlow is intended to complement, not replace, professional medical advice. Always
              consult with qualified healthcare providers for medical decisions.
            </p>
          </div>
        </Card>

        {/* Section 3 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">3. User Accounts and Responsibilities</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              <strong className="text-gray-900">3.1 Account Creation:</strong> You must provide accurate,
              current, and complete information during registration. You are responsible for maintaining
              the confidentiality of your account credentials.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">3.2 Age Requirements:</strong> You must be at least 18
              years old to create an account. Users under 18 may use the Service only with parental or
              guardian consent and supervision.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">3.3 Account Security:</strong> You are responsible for all
              activities that occur under your account. Notify us immediately of any unauthorized access
              or security breaches.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">3.4 Accurate Information:</strong> You agree to provide
              accurate health information and update it as necessary. Inaccurate information may affect
              the quality of the Service and could have health implications.
            </p>
          </div>
        </Card>

        {/* Section 4 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">4. Medical Disclaimer</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">IMPORTANT MEDICAL NOTICE</p>
              <p className="text-yellow-900 leading-relaxed">
                CareFlow is NOT a substitute for professional medical advice, diagnosis, or treatment.
                Always seek the advice of your physician or other qualified health provider with any
                questions you may have regarding a medical condition. Never disregard professional medical
                advice or delay in seeking it because of information obtained through CareFlow.
              </p>
            </div>
            <p className="leading-relaxed">
              In case of a medical emergency, call 911 or your local emergency number immediately.
              CareFlow does not provide emergency medical services.
            </p>
            <p className="leading-relaxed">
              While we strive to provide accurate medication interaction warnings and health insights, we
              make no warranties regarding the accuracy, completeness, or reliability of such information.
              Always verify medication information with your healthcare provider or pharmacist.
            </p>
          </div>
        </Card>

        {/* Section 5 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">5. Privacy and Data Protection</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              Your privacy is important to us. Our collection, use, and protection of your personal and
              health information is governed by our Privacy Policy, which is incorporated into these Terms
              by reference.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">HIPAA Compliance:</strong> CareFlow is designed to comply
              with the Health Insurance Portability and Accountability Act (HIPAA). We implement
              administrative, physical, and technical safeguards to protect your Protected Health
              Information (PHI).
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">Data Sharing:</strong> You control who can access your
              health information through the Care Circle feature. You may revoke access at any time
              through the Privacy Settings.
            </p>
          </div>
        </Card>

        {/* Section 6 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">6. Acceptable Use Policy</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Impersonate any person or entity</li>
              <li>Share false or misleading health information intentionally</li>
            </ul>
          </div>
        </Card>

        {/* Section 7 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">7. Intellectual Property Rights</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              The Service, including all content, features, and functionality, is owned by CareFlow and
              is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">Your Data:</strong> You retain all rights to the health
              data and content you submit to the Service. By using the Service, you grant us a limited
              license to process, store, and display your data solely for the purpose of providing the
              Service to you.
            </p>
          </div>
        </Card>

        {/* Section 8 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <p className="leading-relaxed text-red-900">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CAREFLOW SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR
                REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR
                OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
              </p>
            </div>
            <p className="leading-relaxed">
              This includes, but is not limited to, damages arising from missed medication doses,
              incorrect health information, service interruptions, or data loss.
            </p>
          </div>
        </Card>

        {/* Section 9 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate your account at any time, with or without
              notice, for any violation of these Terms or for any other reason we deem necessary.
            </p>
            <p className="leading-relaxed">
              You may terminate your account at any time through Settings → Data & Storage → Delete All
              My Data. Upon termination, your right to use the Service will immediately cease.
            </p>
            <p className="leading-relaxed">
              You may export your data before termination. After account deletion, we will retain certain
              information as required by law or for legitimate business purposes.
            </p>
          </div>
        </Card>

        {/* Section 10 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">10. Governing Law and Dispute Resolution</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of
              Illinois, United States, without regard to its conflict of law provisions.
            </p>
            <p className="leading-relaxed">
              Any disputes arising from these Terms or your use of the Service shall be resolved through
              binding arbitration in accordance with the American Arbitration Association's rules.
            </p>
          </div>
        </Card>

        {/* Contact */}
        <Card className="bg-blue-50 border-blue-200">
          <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
          <div className="space-y-2 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="ml-4 space-y-1">
              <p>
                <strong className="text-gray-900">Email:</strong> legal@careflow.com
              </p>
              <p>
                <strong className="text-gray-900">Phone:</strong> 1-800-CAREFLOW
              </p>
              <p>
                <strong className="text-gray-900">Address:</strong> CareFlow Inc., 123 Health Street,
                Springfield, IL 62701
              </p>
            </div>
          </div>
        </Card>

        {/* Acceptance */}
        <Card className="bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-lg text-gray-900 font-semibold mb-2">
              By using CareFlow, you acknowledge that you have read and understood these Terms of Service
              and agree to be bound by them.
            </p>
            <p className="text-sm text-gray-700">
              Effective Date: February 1, 2026
            </p>
          </div>
        </Card>

        <Button variant="primary" fullWidth onClick={() => navigate('/settings')}>
          I Understand
        </Button>
      </div>
    </div>
  );
}