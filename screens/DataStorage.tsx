import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  ChevronLeft,
  HardDrive,
  Download,
  Trash2,
  FileText,
  Image,
  Database,
  Archive,
  AlertCircle,
  CheckCircle,
  Calendar,
  Clock,
} from 'lucide-react';

export function DataStorage() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const storageData = {
    total: 500, // MB
    used: 127.5,
    breakdown: [
      { type: 'Health Records', size: 45.2, icon: FileText, color: 'blue' },
      { type: 'Medication Data', size: 32.8, icon: Database, color: 'green' },
      { type: 'Photos & Documents', size: 38.5, icon: Image, color: 'purple' },
      { type: 'Care Circle Messages', size: 11.0, icon: Archive, color: 'orange' },
    ],
  };

  const usagePercentage = (storageData.used / storageData.total) * 100;

  const dataCategories = [
    {
      name: 'Health Profile',
      items: 156,
      lastUpdated: 'Today',
      size: '12.3 MB',
      description: 'Medical conditions, allergies, vital signs',
    },
    {
      name: 'Medications',
      items: 6,
      lastUpdated: '2 hours ago',
      size: '2.1 MB',
      description: 'Active medications, history, adherence data',
    },
    {
      name: 'Meal Logs',
      items: 342,
      lastUpdated: 'Today',
      size: '18.7 MB',
      description: 'Food diary, nutrition data, photos',
    },
    {
      name: 'Pharmacy Records',
      items: 24,
      lastUpdated: 'Yesterday',
      size: '5.4 MB',
      description: 'Prescriptions, refill history, pharmacy info',
    },
    {
      name: 'Care Circle',
      items: 5,
      lastUpdated: '3 days ago',
      size: '1.2 MB',
      description: 'Member profiles, shared data, messages',
    },
    {
      name: 'App Settings',
      items: 1,
      lastUpdated: 'Today',
      size: '0.3 MB',
      description: 'Preferences, notifications, customization',
    },
  ];

  const handleExportData = () => {
    // Simulate export
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleDeleteAllData = () => {
    // This would delete all user data
    setShowDeleteConfirm(false);
    navigate('/');
  };

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
            <h1 className="text-3xl font-bold">Data & Storage</h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              Manage your data storage and export your information
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Export Success Message */}
        {showExportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">Export Started!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your data export will be ready in a few minutes. Check your email for the download link.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Storage Overview */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <HardDrive className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Storage Overview</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {storageData.used} MB <span className="text-lg text-gray-500">/ {storageData.total} MB</span>
                </div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                  {usagePercentage.toFixed(1)}% of storage used
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${usagePercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              />
            </div>

            {/* Storage Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {storageData.breakdown.map((item) => {
                const Icon = item.icon;
                const colorClasses = {
                  blue: 'bg-blue-100 text-blue-700',
                  green: 'bg-green-100 text-green-700',
                  purple: 'bg-purple-100 text-purple-700',
                  orange: 'bg-orange-100 text-orange-700',
                };
                return (
                  <div key={item.type} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--color-text-muted)]">{item.type}</div>
                      <div className="font-semibold">{item.size} MB</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Data Categories */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Data Categories</h3>
          </div>

          <div className="space-y-3">
            {dataCategories.map((category) => (
              <div
                key={category.name}
                className="p-4 border border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{category.name}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {category.items} items
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Updated {category.lastUpdated}
                      </div>
                      <div className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        {category.size}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Data Export */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Export Your Data</h3>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              Download a complete copy of your CareFlow data in a portable format. This includes all your health records,
              medications, meal logs, and settings.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
                <div className="font-semibold mb-1">JSON Format</div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  Machine-readable format for developers
                </div>
              </button>

              <button className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
                <div className="font-semibold mb-1">PDF Report</div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  Human-readable report with charts
                </div>
              </button>

              <button className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
                <div className="font-semibold mb-1">CSV Spreadsheet</div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  Import into Excel or Google Sheets
                </div>
              </button>

              <button className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
                <div className="font-semibold mb-1">Medical Records</div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  HIPAA-compliant medical document
                </div>
              </button>
            </div>

            <Button variant="primary" fullWidth onClick={handleExportData}>
              <Download className="w-5 h-5 mr-2" />
              Export All Data
            </Button>
          </div>
        </Card>

        {/* Data Retention */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Data Retention</h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Automatic Cleanup</h4>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">
                Choose how long to keep old data before automatic deletion
              </p>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg">
                <option value="never">Keep forever</option>
                <option value="1year">Delete after 1 year</option>
                <option value="2years">Delete after 2 years</option>
                <option value="5years">Delete after 5 years</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Medical Records:</strong> According to HIPAA regulations, medical records are retained
                  for a minimum of 6 years regardless of this setting.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Delete All Data */}
        <Card className="border-red-200">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-red-600">Danger Zone</h3>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              Permanently delete all your data from CareFlow. This action cannot be undone.
            </p>

            {!showDeleteConfirm ? (
              <Button
                variant="ghost"
                fullWidth
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete All My Data
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Are you absolutely sure?</h4>
                      <p className="text-sm text-red-800">
                        This will permanently delete all your health data, medications, meal logs, care circle
                        connections, and account settings. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={handleDeleteAllData}
                    className="text-white bg-red-600 hover:bg-red-700"
                  >
                    Yes, Delete Everything
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
