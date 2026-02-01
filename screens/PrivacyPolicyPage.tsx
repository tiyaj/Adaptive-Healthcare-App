import { useNavigate } from 'react-router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  ChevronLeft,
  Shield,
  Download,
  Printer,
  Lock,
  Eye,
  Database,
  Users,
  Globe,
  AlertCircle,
} from 'lucide-react';

export function PrivacyPolicyPage() {
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
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
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
            <Shield className="w-6 h-6 text-[var(--color-accent)]" />
            <h2 className="text-2xl font-bold">Our Commitment to Your Privacy</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              At CareFlow, your privacy and the security of your health information are our highest
              priorities. This Privacy Policy explains how we collect, use, protect, and share your
              personal and health information when you use our services.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed mt-4">
              We are committed to transparency and giving you control over your data. This policy applies
              to all users of CareFlow, including patients, caregivers, and healthcare providers.
            </p>
          </div>
        </Card>

        {/* HIPAA Compliance */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">HIPAA Compliance</h3>
              <p className="text-blue-800 leading-relaxed">
                CareFlow is designed to comply with the Health Insurance Portability and Accountability
                Act (HIPAA). We implement comprehensive administrative, physical, and technical safeguards
                to protect your Protected Health Information (PHI) as required by federal law.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 1 */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-[var(--color-accent)]" />
            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
          </div>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1.1 Health Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Medication information (names, dosages, schedules, adherence data)</li>
                <li>Health conditions, allergies, and medical history</li>
                <li>Meal logs and dietary information</li>
                <li>Vital signs and health metrics</li>
                <li>Photos of medications and meals</li>
                <li>Notes and health journal entries</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1.2 Personal Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, phone number, date of birth</li>
                <li>Postal address for delivery tracking</li>
                <li>Profile photo (optional)</li>
                <li>Care circle member information</li>
                <li>Pharmacy and healthcare provider information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1.3 Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Device information (type, operating system, browser)</li>
                <li>IP address and location data (with your permission)</li>
                <li>Usage data (features used, time spent, interaction patterns)</li>
                <li>Log data (access times, errors, performance metrics)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Section 2 */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-[var(--color-accent)]" />
            <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
          </div>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              We use your information to provide, maintain, and improve CareFlow services:
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2.1 Core Service Functions
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Send medication reminders and notifications</li>
                <li>Analyze potential food-drug interactions</li>
                <li>Track medication adherence and generate reports</li>
                <li>Facilitate care circle coordination and communication</li>
                <li>Connect you with pharmacies for refills and delivery</li>
                <li>Generate health insights and recommendations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2.2 Communication
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Send you service updates and important notifications</li>
                <li>Respond to your support requests</li>
                <li>Send educational health content (with your consent)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2.3 Service Improvement
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Analyze usage patterns to improve features (anonymized data)</li>
                <li>Develop new features and enhancements</li>
                <li>Ensure security and prevent fraud</li>
                <li>Conduct research (only with explicit consent)</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Section 3 */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-[var(--color-accent)]" />
            <h2 className="text-2xl font-bold">3. How We Share Your Information</h2>
          </div>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">Important: Your Control</p>
              <p className="text-yellow-900 leading-relaxed">
                We NEVER sell your health information to third parties. You control who can access your
                data through our Privacy Settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3.1 With Your Care Circle (With Your Consent)
              </h3>
              <p className="leading-relaxed">
                You can choose to share specific health information with your care circle members. You
                control what data is shared and can revoke access at any time.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3.2 With Healthcare Providers and Pharmacies
              </h3>
              <p className="leading-relaxed">
                When you link a pharmacy or healthcare provider, we may share relevant medication
                information to facilitate refills, delivery, and care coordination (with your permission).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3.3 Service Providers
              </h3>
              <p className="leading-relaxed">
                We work with trusted third-party service providers who help us deliver CareFlow (e.g.,
                cloud hosting, analytics, customer support). These providers are bound by strict
                confidentiality agreements and can only use your data to perform services for us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3.4 Legal Requirements
              </h3>
              <p className="leading-relaxed">
                We may disclose your information when required by law, such as in response to a court
                order, subpoena, or to comply with regulatory requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3.5 Emergency Situations
              </h3>
              <p className="leading-relaxed">
                In case of a medical emergency or threat to health/safety, we may share information with
                emergency responders or healthcare providers without your prior consent.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 4 */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-[var(--color-accent)]" />
            <h2 className="text-2xl font-bold">4. How We Protect Your Information</h2>
          </div>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              We implement industry-leading security measures to protect your data:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">🔒 Encryption</h4>
                <p className="text-green-800 text-sm">
                  All data is encrypted in transit (TLS 1.3) and at rest (AES-256)
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">🛡️ Access Controls</h4>
                <p className="text-green-800 text-sm">
                  Role-based access and two-factor authentication available
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">🔐 Secure Infrastructure</h4>
                <p className="text-green-800 text-sm">
                  HIPAA-compliant cloud hosting with regular security audits
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">👁️ Monitoring</h4>
                <p className="text-green-800 text-sm">
                  24/7 security monitoring and anomaly detection
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">📱 Device Security</h4>
                <p className="text-green-800 text-sm">
                  Biometric authentication and session management
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">🔍 Regular Audits</h4>
                <p className="text-green-800 text-sm">
                  Annual security assessments and penetration testing
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Section 5 */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-[var(--color-accent)]" />
            <h2 className="text-2xl font-bold">5. Your Rights and Choices</h2>
          </div>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">You have the following rights regarding your data:</p>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5.1 Access and Portability</h3>
              <p className="leading-relaxed">
                You can access, download, and export all your data at any time through Settings → Data &
                Storage. We provide data in multiple formats (JSON, PDF, CSV).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5.2 Correction</h3>
              <p className="leading-relaxed">
                You can update or correct your personal and health information at any time through the
                app or by contacting support.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5.3 Deletion</h3>
              <p className="leading-relaxed">
                You can delete your account and all associated data through Settings → Data & Storage →
                Delete All My Data. Some information may be retained as required by law.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5.4 Privacy Settings</h3>
              <p className="leading-relaxed">
                Control who can see your data, what you share with care circle members, and your
                communication preferences through Settings → Privacy Settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5.5 Opt-Out Rights</h3>
              <p className="leading-relaxed">
                You can opt out of marketing communications, analytics collection, and data sharing at
                any time through your privacy settings.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 6 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              We retain your information for as long as your account is active or as needed to provide
              services. You can set automatic cleanup preferences in Settings.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">Medical Records:</strong> In accordance with HIPAA and
              state laws, we retain medical records for a minimum of 6 years from the date of creation or
              last use, whichever is later.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">After Deletion:</strong> When you delete your account, we
              remove your data from active systems within 30 days. Backups may retain data for up to 90
              days for disaster recovery purposes.
            </p>
          </div>
        </Card>

        {/* Section 7 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              CareFlow is not intended for use by children under 13. We do not knowingly collect
              information from children under 13. If you are under 18, you may use CareFlow only with the
              consent and supervision of a parent or guardian.
            </p>
          </div>
        </Card>

        {/* Section 8 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">8. International Users</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              CareFlow is based in the United States. If you access our services from outside the U.S.,
              your information may be transferred to, stored, and processed in the U.S. where our servers
              are located.
            </p>
            <p className="leading-relaxed">
              <strong className="text-gray-900">GDPR Rights:</strong> If you are in the European Economic
              Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR),
              including the right to object to processing and the right to lodge a complaint with a
              supervisory authority.
            </p>
          </div>
        </Card>

        {/* Section 9 */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
          <div className="space-y-4 text-[var(--color-text-muted)]">
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material
              changes by email and through the app. Your continued use of CareFlow after changes
              constitutes acceptance of the updated policy.
            </p>
            <p className="leading-relaxed">
              We will maintain prior versions of this policy for your review in our legal archive.
            </p>
          </div>
        </Card>

        {/* Contact */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-900">10. Contact Us</h2>
              <div className="space-y-2 text-blue-800">
                <p className="leading-relaxed">
                  If you have questions about this Privacy Policy or want to exercise your rights:
                </p>
                <div className="ml-4 space-y-1">
                  <p>
                    <strong>Privacy Officer Email:</strong> privacy@careflow.com
                  </p>
                  <p>
                    <strong>Phone:</strong> 1-800-CAREFLOW
                  </p>
                  <p>
                    <strong>Mail:</strong> CareFlow Inc., Privacy Office, 123 Health Street, Springfield,
                    IL 62701
                  </p>
                  <p className="mt-3">
                    <strong>Data Protection Officer (GDPR):</strong> dpo@careflow.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Acceptance */}
        <Card className="bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-lg text-gray-900 font-semibold mb-2">
              By using CareFlow, you acknowledge that you have read and understood this Privacy Policy.
            </p>
            <p className="text-sm text-gray-700">Effective Date: February 1, 2026</p>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="primary" fullWidth onClick={() => navigate('/privacy-settings')}>
            Manage Privacy Settings
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/settings')}>
            Back to Settings
          </Button>
        </div>
      </div>
    </div>
  );
}