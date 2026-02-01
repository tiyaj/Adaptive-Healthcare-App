import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  ChevronLeft,
  Smartphone,
  Monitor,
  Tablet,
  Chrome,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Shield,
  Wifi,
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  browser: string;
  location: string;
  lastActive: string;
  ipAddress: string;
  isCurrent: boolean;
  lastLogin: string;
  trustLevel: 'trusted' | 'new' | 'suspicious';
}

export function ConnectedDevices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 14 Pro',
      type: 'mobile',
      browser: 'Safari 17.2',
      location: 'Springfield, IL',
      lastActive: 'Active now',
      ipAddress: '192.168.1.105',
      isCurrent: true,
      lastLogin: 'Today at 2:45 PM',
      trustLevel: 'trusted',
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      browser: 'Chrome 120',
      location: 'Springfield, IL',
      lastActive: '2 hours ago',
      ipAddress: '192.168.1.102',
      isCurrent: false,
      lastLogin: 'Today at 12:30 PM',
      trustLevel: 'trusted',
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      browser: 'Safari 17.2',
      location: 'Springfield, IL',
      lastActive: 'Yesterday',
      ipAddress: '192.168.1.108',
      isCurrent: false,
      lastLogin: 'Yesterday at 8:15 PM',
      trustLevel: 'trusted',
    },
    {
      id: '4',
      name: 'Windows PC',
      type: 'desktop',
      browser: 'Firefox 121',
      location: 'Chicago, IL',
      lastActive: '3 days ago',
      ipAddress: '74.125.224.72',
      isCurrent: false,
      lastLogin: 'Jan 28 at 10:22 AM',
      trustLevel: 'new',
    },
    {
      id: '5',
      name: 'Unknown Device',
      type: 'mobile',
      browser: 'Chrome Mobile',
      location: 'New York, NY',
      lastActive: '1 week ago',
      ipAddress: '203.0.113.45',
      isCurrent: false,
      lastLogin: 'Jan 24 at 3:45 PM',
      trustLevel: 'suspicious',
    },
  ]);

  const [showRevokeConfirm, setShowRevokeConfirm] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRevokeAccess = (deviceId: string) => {
    setDevices(devices.filter((d) => d.id !== deviceId));
    setShowRevokeConfirm(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      case 'desktop':
        return Monitor;
      default:
        return Smartphone;
    }
  };

  const getTrustBadge = (trustLevel: string) => {
    switch (trustLevel) {
      case 'trusted':
        return { color: 'bg-green-100 text-green-700', label: 'Trusted', icon: CheckCircle };
      case 'new':
        return { color: 'bg-blue-100 text-blue-700', label: 'New Device', icon: Shield };
      case 'suspicious':
        return { color: 'bg-red-100 text-red-700', label: 'Suspicious', icon: AlertCircle };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: 'Unknown', icon: Shield };
    }
  };

  const stats = {
    total: devices.length,
    active: devices.filter((d) => d.lastActive.includes('now') || d.lastActive.includes('hour')).length,
    trusted: devices.filter((d) => d.trustLevel === 'trusted').length,
    suspicious: devices.filter((d) => d.trustLevel === 'suspicious').length,
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
            <h1 className="text-3xl font-bold">Connected Devices</h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              Manage devices that have access to your CareFlow account
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Success Message */}
        <AnimatePresence>
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
                    <h3 className="font-semibold text-green-900">Device Removed Successfully!</h3>
                    <p className="text-sm text-green-700 mt-1">
                      The device no longer has access to your account.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
                <div className="text-sm text-blue-600">Total Devices</div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">{stats.active}</div>
                <div className="text-sm text-green-600">Active</div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-700">{stats.trusted}</div>
                <div className="text-sm text-purple-600">Trusted</div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-700">{stats.suspicious}</div>
                <div className="text-sm text-red-600">Suspicious</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Notice */}
        {stats.suspicious > 0 && (
          <Card className="bg-red-50 border-red-200">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Suspicious Activity Detected</h3>
                <p className="text-sm text-red-800 mb-3">
                  We've detected {stats.suspicious} device(s) with unusual login patterns. Review these devices
                  and revoke access if you don't recognize them.
                </p>
                <Button variant="ghost" size="sm" className="text-red-700 border-red-300 hover:bg-red-100">
                  Review Now
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Devices List */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Your Devices</h3>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {devices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.type);
                const trustBadge = getTrustBadge(device.trustLevel);
                const BadgeIcon = trustBadge.icon;

                return (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className={`p-5 border-2 rounded-lg transition-all ${
                      device.isCurrent
                        ? 'border-[var(--color-accent)] bg-yellow-50'
                        : device.trustLevel === 'suspicious'
                        ? 'border-red-200 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Device Icon */}
                      <div
                        className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          device.isCurrent
                            ? 'bg-[var(--color-accent)]'
                            : device.trustLevel === 'suspicious'
                            ? 'bg-red-200'
                            : 'bg-gray-200'
                        }`}
                      >
                        <DeviceIcon
                          className={`w-7 h-7 ${
                            device.isCurrent || device.trustLevel === 'suspicious'
                              ? 'text-white'
                              : 'text-gray-600'
                          }`}
                        />
                      </div>

                      {/* Device Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-bold">{device.name}</h4>
                              {device.isCurrent && (
                                <span className="px-2 py-1 bg-[var(--color-accent)] text-white text-xs font-medium rounded-full">
                                  This Device
                                </span>
                              )}
                              <span className={`px-2 py-1 ${trustBadge.color} text-xs font-medium rounded-full flex items-center gap-1`}>
                                <BadgeIcon className="w-3 h-3" />
                                {trustBadge.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                              <Chrome className="w-4 h-4" />
                              <span>{device.browser}</span>
                            </div>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-4">
                          <div>
                            <div className="text-xs text-[var(--color-text-muted)] mb-1">Last Active</div>
                            <div className="font-medium flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {device.lastActive}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-[var(--color-text-muted)] mb-1">Location</div>
                            <div className="font-medium flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {device.location}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-[var(--color-text-muted)] mb-1">Last Login</div>
                            <div className="font-medium">{device.lastLogin}</div>
                          </div>
                        </div>

                        {/* IP Address */}
                        <div className="text-xs text-[var(--color-text-muted)] mb-3">
                          IP Address: {device.ipAddress}
                        </div>

                        {/* Actions */}
                        {!device.isCurrent && (
                          <>
                            {showRevokeConfirm === device.id ? (
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-800 mb-3">
                                  Are you sure you want to revoke access for this device? It will need to log in
                                  again.
                                </p>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRevokeAccess(device.id)}
                                    className="text-white bg-red-600 hover:bg-red-700"
                                  >
                                    Yes, Revoke Access
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowRevokeConfirm(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowRevokeConfirm(device.id)}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Revoke Access
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </Card>

        {/* Security Tips */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Security Tips</h3>
          </div>

          <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p>
                <strong className="text-gray-900">Review regularly:</strong> Check this list monthly and revoke
                access from devices you don't recognize.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p>
                <strong className="text-gray-900">Enable 2FA:</strong> Two-factor authentication adds an extra
                layer of security to your account.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p>
                <strong className="text-gray-900">Secure networks:</strong> Avoid logging in on public Wi-Fi
                without a VPN.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p>
                <strong className="text-gray-900">Log out:</strong> Always log out when using shared or public
                devices.
              </p>
            </div>
          </div>
        </Card>

        {/* Revoke All Devices */}
        <Card className="border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-red-600">Security Actions</h3>
          </div>

          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            If you suspect unauthorized access, you can sign out all devices except this one. You'll need to log
            in again on other devices.
          </p>

          <Button
            variant="ghost"
            fullWidth
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Sign Out All Other Devices
          </Button>
        </Card>
      </div>
    </div>
  );
}
