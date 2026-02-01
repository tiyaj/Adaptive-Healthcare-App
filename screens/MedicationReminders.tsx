import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import {
  ChevronLeft,
  Bell,
  Clock,
  Plus,
  X,
  Save,
  Smartphone,
  Mail,
  Volume2,
  Vibrate,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface ReminderSetting {
  id: number;
  medicationName: string;
  dose: string;
  scheduledTime: string;
  reminderTimes: string[];
  enabled: boolean;
  notifications: {
    push: boolean;
    email: boolean;
    sound: boolean;
    vibration: boolean;
  };
}

export function MedicationReminders() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const [reminders, setReminders] = useState<ReminderSetting[]>([
    {
      id: 1,
      medicationName: 'Lisinopril',
      dose: '10mg',
      scheduledTime: '8:00 AM',
      reminderTimes: ['15 minutes before'],
      enabled: true,
      notifications: {
        push: true,
        email: false,
        sound: true,
        vibration: true,
      },
    },
    {
      id: 2,
      medicationName: 'Metformin',
      dose: '500mg',
      scheduledTime: '12:00 PM',
      reminderTimes: ['30 minutes before', 'At scheduled time'],
      enabled: true,
      notifications: {
        push: true,
        email: true,
        sound: true,
        vibration: false,
      },
    },
    {
      id: 3,
      medicationName: 'Atorvastatin',
      dose: '20mg',
      scheduledTime: '8:00 PM',
      reminderTimes: ['1 hour before', '15 minutes before'],
      enabled: false,
      notifications: {
        push: true,
        email: false,
        sound: false,
        vibration: true,
      },
    },
  ]);

  const [editingReminder, setEditingReminder] = useState<number | null>(null);

  const reminderTimeOptions = [
    '1 hour before',
    '30 minutes before',
    '15 minutes before',
    'At scheduled time',
    '15 minutes after',
  ];

  const toggleReminder = (id: number) => {
    setReminders(
      reminders.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const toggleNotification = (id: number, type: keyof ReminderSetting['notifications']) => {
    setReminders(
      reminders.map((r) =>
        r.id === id
          ? {
              ...r,
              notifications: {
                ...r.notifications,
                [type]: !r.notifications[type],
              },
            }
          : r
      )
    );
  };

  const addReminderTime = (id: number, time: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id && !r.reminderTimes.includes(time)
          ? { ...r, reminderTimes: [...r.reminderTimes, time] }
          : r
      )
    );
  };

  const removeReminderTime = (id: number, time: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id
          ? { ...r, reminderTimes: r.reminderTimes.filter((t) => t !== time) }
          : r
      )
    );
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/medications')}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Medications
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Medication Reminders</h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Customize when and how you receive medication reminders
              </p>
            </div>
            <Button variant="primary" onClick={handleSave}>
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <Card className="bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Reminders Updated!</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your medication reminder settings have been saved successfully.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Global Settings */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Global Reminder Settings</h3>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Notification Permissions</h4>
                <p className="text-sm text-blue-800">
                  Make sure notifications are enabled in your device settings to receive reminders.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Default Reminder Settings</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Smart reminders</span>
                  <span className="font-medium text-green-600">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Persistent alerts</span>
                  <span className="font-medium text-green-600">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Quiet hours</span>
                  <span className="font-medium">10:00 PM - 7:00 AM</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" fullWidth className="justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Test Notifications
                </Button>
                <Button variant="ghost" size="sm" fullWidth className="justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Set Quiet Hours
                </Button>
                <Button variant="ghost" size="sm" fullWidth className="justify-start">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Choose Reminder Sound
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Individual Medication Reminders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Medication-Specific Reminders</h3>
            <span className="text-sm text-[var(--color-text-muted)]">
              {reminders.filter((r) => r.enabled).length} of {reminders.length} active
            </span>
          </div>

          {reminders.map((reminder) => (
            <Card
              key={reminder.id}
              className={`${
                reminder.enabled
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold">{reminder.medicationName}</h4>
                      <Pill variant="default">{reminder.dose}</Pill>
                      {reminder.enabled ? (
                        <Pill variant="success">Active</Pill>
                      ) : (
                        <Pill variant="default">Inactive</Pill>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                      <Clock className="w-4 h-4" />
                      Scheduled for {reminder.scheduledTime}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reminder.enabled}
                      onChange={() => toggleReminder(reminder.id)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--color-accent)]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[var(--color-accent)]"></div>
                  </label>
                </div>

                {editingReminder === reminder.id ? (
                  <>
                    {/* Edit Mode */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      {/* Reminder Times */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          When to remind
                        </label>
                        <div className="space-y-2">
                          {reminder.reminderTimes.map((time) => (
                            <div
                              key={time}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <span className="text-sm font-medium">{time}</span>
                              <button
                                onClick={() => removeReminderTime(reminder.id, time)}
                                className="p-1 hover:bg-red-50 rounded transition-colors"
                              >
                                <X className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                addReminderTime(reminder.id, e.target.value);
                                e.target.value = '';
                              }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-sm"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Add another reminder time...
                            </option>
                            {reminderTimeOptions
                              .filter((opt) => !reminder.reminderTimes.includes(opt))
                              .map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      {/* Notification Methods */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Notification methods
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <button
                            onClick={() => toggleNotification(reminder.id, 'push')}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              reminder.notifications.push
                                ? 'border-[var(--color-accent)] bg-yellow-50'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <Smartphone
                              className={`w-6 h-6 mx-auto mb-2 ${
                                reminder.notifications.push
                                  ? 'text-[var(--color-accent)]'
                                  : 'text-gray-400'
                              }`}
                            />
                            <div className="text-xs font-medium">Push</div>
                          </button>

                          <button
                            onClick={() => toggleNotification(reminder.id, 'email')}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              reminder.notifications.email
                                ? 'border-[var(--color-accent)] bg-yellow-50'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <Mail
                              className={`w-6 h-6 mx-auto mb-2 ${
                                reminder.notifications.email
                                  ? 'text-[var(--color-accent)]'
                                  : 'text-gray-400'
                              }`}
                            />
                            <div className="text-xs font-medium">Email</div>
                          </button>

                          <button
                            onClick={() => toggleNotification(reminder.id, 'sound')}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              reminder.notifications.sound
                                ? 'border-[var(--color-accent)] bg-yellow-50'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <Volume2
                              className={`w-6 h-6 mx-auto mb-2 ${
                                reminder.notifications.sound
                                  ? 'text-[var(--color-accent)]'
                                  : 'text-gray-400'
                              }`}
                            />
                            <div className="text-xs font-medium">Sound</div>
                          </button>

                          <button
                            onClick={() => toggleNotification(reminder.id, 'vibration')}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              reminder.notifications.vibration
                                ? 'border-[var(--color-accent)] bg-yellow-50'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <Vibrate
                              className={`w-6 h-6 mx-auto mb-2 ${
                                reminder.notifications.vibration
                                  ? 'text-[var(--color-accent)]'
                                  : 'text-gray-400'
                              }`}
                            />
                            <div className="text-xs font-medium">Vibrate</div>
                          </button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setEditingReminder(null)}
                        >
                          Done
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingReminder(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* View Mode */}
                    <div className="space-y-3">
                      {/* Reminder Times */}
                      <div>
                        <div className="text-xs text-[var(--color-text-muted)] mb-2">
                          Reminder times:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {reminder.reminderTimes.map((time) => (
                            <Pill key={time} variant="default">
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </Pill>
                          ))}
                        </div>
                      </div>

                      {/* Notification Methods */}
                      <div>
                        <div className="text-xs text-[var(--color-text-muted)] mb-2">
                          Enabled notifications:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {reminder.notifications.push && (
                            <Pill variant="default">
                              <Smartphone className="w-3 h-3 mr-1" />
                              Push
                            </Pill>
                          )}
                          {reminder.notifications.email && (
                            <Pill variant="default">
                              <Mail className="w-3 h-3 mr-1" />
                              Email
                            </Pill>
                          )}
                          {reminder.notifications.sound && (
                            <Pill variant="default">
                              <Volume2 className="w-3 h-3 mr-1" />
                              Sound
                            </Pill>
                          )}
                          {reminder.notifications.vibration && (
                            <Pill variant="default">
                              <Vibrate className="w-3 h-3 mr-1" />
                              Vibrate
                            </Pill>
                          )}
                        </div>
                      </div>

                      {/* Edit Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingReminder(reminder.id)}
                      >
                        Customize Reminders
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-3">
          <Button variant="primary" fullWidth onClick={handleSave}>
            <Save className="w-5 h-5 mr-2" />
            Save All Changes
          </Button>
          <Button variant="secondary" onClick={() => navigate('/medications')}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
