import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  ChevronLeft,
  Shield,
  Eye,
  EyeOff,
  Users,
  Bell,
  FileText,
  Lock,
  Globe,
  Smartphone,
  CheckCircle,
} from 'lucide-react';

export function PrivacySettings() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // Privacy toggles state
  const [settings, setSettings] = useState({
    profileVisibility: 'care-circle', // 'public', 'care-circle', 'private'
    shareHealthData: true,
    shareMedicationData: false,
    shareLocationData: true,
    allowAnalytics: true,
    allowMarketing: false,
    showOnlineStatus: true,
    allowCareCircleMessages: true,
    allowPharmacyMessages: true,
    twoFactorAuth: false,
    biometricAuth: true,
    sessionTimeout: '30', // minutes
  });

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleSetting = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const ToggleSwitch = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        value ? 'bg-[var(--color-accent)]' : 'bg-gray-300'
      }`}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
        animate={{ left: value ? '26px' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );

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
          <div>
            <h1 className="text-3xl font-bold">Privacy Settings</h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              Control who can see your information and how it's used
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">Privacy Settings Updated!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your privacy preferences have been saved successfully.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Profile Visibility */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Profile Visibility</h3>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Control who can view your profile information
            </p>

            <div className="space-y-2">
              {[
                { value: 'private', label: 'Private', desc: 'Only you can see your profile' },
                {
                  value: 'care-circle',
                  label: 'Care Circle Only',
                  desc: 'Only your care circle members can see your profile',
                },
                { value: 'public', label: 'Public', desc: 'Anyone can see your basic profile' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSettings({ ...settings, profileVisibility: option.value })}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    settings.profileVisibility === option.value
                      ? 'border-[var(--color-accent)] bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">{option.label}</div>
                      <div className="text-sm text-[var(--color-text-muted)]">{option.desc}</div>
                    </div>
                    {settings.profileVisibility === option.value && (
                      <CheckCircle className="w-6 h-6 text-[var(--color-accent)]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Data Sharing */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Data Sharing with Care Circle</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Share Health Data</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Allow care circle members to view your health conditions and vital signs
                </p>
              </div>
              <ToggleSwitch
                value={settings.shareHealthData}
                onChange={() => toggleSetting('shareHealthData')}
              />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Share Medication Data</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Allow care circle members to view your medication schedule and adherence
                </p>
              </div>
              <ToggleSwitch
                value={settings.shareMedicationData}
                onChange={() => toggleSetting('shareMedicationData')}
              />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Share Location Data</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Allow care circle members to see your location for safety purposes
                </p>
              </div>
              <ToggleSwitch
                value={settings.shareLocationData}
                onChange={() => toggleSetting('shareLocationData')}
              />
            </div>
          </div>
        </Card>

        {/* Communication Preferences */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Communication Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Show Online Status</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Let your care circle know when you're active in the app
                </p>
              </div>
              <ToggleSwitch
                value={settings.showOnlineStatus}
                onChange={() => toggleSetting('showOnlineStatus')}
              />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Care Circle Messages</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Allow care circle members to send you messages
                </p>
              </div>
              <ToggleSwitch
                value={settings.allowCareCircleMessages}
                onChange={() => toggleSetting('allowCareCircleMessages')}
              />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Pharmacy Messages</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Allow your pharmacy to send refill reminders and updates
                </p>
              </div>
              <ToggleSwitch
                value={settings.allowPharmacyMessages}
                onChange={() => toggleSetting('allowPharmacyMessages')}
              />
            </div>
          </div>
        </Card>

        {/* Security Options */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Security Options</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Two-Factor Authentication</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Require a verification code in addition to your password
                </p>
              </div>
              <ToggleSwitch
                value={settings.twoFactorAuth}
                onChange={() => toggleSetting('twoFactorAuth')}
              />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Biometric Authentication</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Use fingerprint or face recognition to unlock the app
                </p>
              </div>
              <ToggleSwitch
                value={settings.biometricAuth}
                onChange={() => toggleSetting('biometricAuth')}
              />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div>
              <h4 className="font-semibold mb-2">Session Timeout</h4>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">
                Automatically log out after period of inactivity
              </p>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </Card>

        {/* App Analytics & Marketing */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">App Analytics & Marketing</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Analytics & Performance</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Help us improve CareFlow by sharing anonymous usage data
                </p>
              </div>
              <ToggleSwitch
                value={settings.allowAnalytics}
                onChange={() => toggleSetting('allowAnalytics')}
              />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Marketing Communications</h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Receive updates about new features and health tips
                </p>
              </div>
              <ToggleSwitch
                value={settings.allowMarketing}
                onChange={() => toggleSetting('allowMarketing')}
              />
            </div>
          </div>
        </Card>

        {/* Privacy Policy Link */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Legal & Compliance</h3>
          </div>

          <div className="space-y-3">
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
              <div className="font-semibold mb-1">Privacy Policy</div>
              <div className="text-sm text-[var(--color-text-muted)]">
                Read our full privacy policy and data handling practices
              </div>
            </button>

            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
              <div className="font-semibold mb-1">Data Protection Rights</div>
              <div className="text-sm text-[var(--color-text-muted)]">
                Learn about your rights under GDPR and HIPAA
              </div>
            </button>

            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
              <div className="font-semibold mb-1">Request Data Report</div>
              <div className="text-sm text-[var(--color-text-muted)]">
                Download a copy of all your data stored in CareFlow
              </div>
            </button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex gap-3">
          <Button variant="primary" onClick={handleSave} fullWidth>
            <Shield className="w-5 h-5 mr-2" />
            Save Privacy Settings
          </Button>
          <Button variant="ghost" onClick={() => navigate('/settings')} fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
