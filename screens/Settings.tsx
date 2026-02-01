import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  ChevronLeft,
  Bell,
  MapPin,
  Users,
  User,
  Lock,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export function Settings() {
  const navigate = useNavigate();
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [selectedReminderTime, setSelectedReminderTime] = useState('30 minutes before');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Profile Information', action: () => navigate('/profile-information') },
        { label: 'Health Profile', action: () => navigate('/onboarding/health-profile') },
        { label: 'Change Password', action: () => navigate('/change-password') },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Medication Reminders',
          toggle: true,
          value: reminderEnabled,
          onChange: setReminderEnabled,
        },
        {
          label: 'Email Notifications',
          toggle: true,
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
      ],
    },
    {
      title: 'Care Circle',
      icon: Users,
      items: [
        { label: 'Manage Members', action: () => navigate('/onboarding/care-circle') },
        { label: 'Permissions & Sharing', action: () => {} },
      ],
    },
    {
      title: 'Pharmacy',
      icon: MapPin,
      items: [
        { label: 'Linked Pharmacy', action: () => navigate('/pharmacy-finder') },
        { label: 'Refill Preferences', action: () => {} },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Lock,
      items: [
        { label: 'Privacy Settings', action: () => navigate('/privacy-settings') },
        { label: 'Data & Storage', action: () => navigate('/data-storage') },
        { label: 'Connected Devices', action: () => navigate('/connected-devices') },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl mb-8">Settings</h1>

        <div className="space-y-6">
          {settingsSections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                    <h3 className="text-lg">{section.title}</h3>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item, j) => (
                      <div key={j}>
                        {'toggle' in item && item.toggle ? (
                          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="text-[var(--color-text-primary)]">{item.label}</span>
                            <button
                              onClick={() => item.onChange && item.onChange(!item.value)}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                item.value ? 'bg-[var(--color-accent)]' : 'bg-gray-300'
                              }`}
                            >
                              <motion.div
                                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
                                animate={{ left: item.value ? '26px' : '2px' }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={item.action}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <span className="text-[var(--color-text-primary)]">{item.label}</span>
                            <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {/* Reminder Preferences Detail */}
          <Card>
            <h3 className="text-lg mb-4">Reminder Preferences</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              How often do you want to be reminded about your medications?
            </p>
            <div className="space-y-2">
              {['15 minutes before', '30 minutes before', '1 hour before', 'At scheduled time'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedReminderTime(option)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    selectedReminderTime === option
                      ? 'border-[var(--color-accent)] bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {selectedReminderTime === option && (
                      <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* About */}
          <Card>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/help-support')}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <span className="text-[var(--color-text-primary)]">Help & Support</span>
                <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
              </button>
              <button 
                onClick={() => navigate('/terms-of-service')}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <span className="text-[var(--color-text-primary)]">Terms of Service</span>
                <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
              </button>
              <button 
                onClick={() => navigate('/privacy-policy')}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <span className="text-[var(--color-text-primary)]">Privacy Policy</span>
                <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
              </button>
              <div className="pt-3 border-t border-gray-200 text-center text-sm text-[var(--color-text-muted)]">
                CareFlow v1.0.0
              </div>
            </div>
          </Card>

          {/* Logout */}
          <Button
            variant="ghost"
            fullWidth
            onClick={handleLogout}
            className="text-[var(--color-alert)]"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}