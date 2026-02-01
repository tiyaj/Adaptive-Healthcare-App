import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronLeft, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

export function ChangePassword() {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
    return requirements;
  };

  const requirements = validatePassword(formData.newPassword);

  const handleSubmit = () => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!Object.values(requirements).every((req) => req)) {
      newErrors.newPassword = 'Password does not meet all requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      // Success
      setSuccess(true);
      setTimeout(() => {
        navigate('/settings');
      }, 2000);
    }
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
            <h1 className="text-3xl font-bold">Change Password</h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              Update your password to keep your account secure
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {success && (
          <Card className="bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Password Changed Successfully!</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your password has been updated. Redirecting to settings...
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Change Password Form */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Password Information</h3>
          </div>

          <div className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className={`w-full px-4 py-3 pr-12 border ${
                    errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg`}
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className={`w-full px-4 py-3 pr-12 border ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-3 pr-12 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Password Requirements */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Password Requirements</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  requirements.length ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {requirements.length && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className={requirements.length ? 'text-green-700' : 'text-gray-600'}>
                At least 8 characters long
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  requirements.uppercase ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {requirements.uppercase && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className={requirements.uppercase ? 'text-green-700' : 'text-gray-600'}>
                Contains an uppercase letter
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  requirements.lowercase ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {requirements.lowercase && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className={requirements.lowercase ? 'text-green-700' : 'text-gray-600'}>
                Contains a lowercase letter
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  requirements.number ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {requirements.number && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className={requirements.number ? 'text-green-700' : 'text-gray-600'}>
                Contains a number
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  requirements.special ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {requirements.special && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className={requirements.special ? 'text-green-700' : 'text-gray-600'}>
                Contains a special character (!@#$%^&*)
              </span>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button variant="primary" onClick={handleSubmit} fullWidth disabled={success}>
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </Button>
          <Button variant="ghost" onClick={() => navigate('/settings')} fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
