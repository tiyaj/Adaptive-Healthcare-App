import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ChevronLeft } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Your Details', fields: ['name', 'email', 'phone'] },
  { id: 2, title: 'Security', fields: ['password', 'confirmPassword'] },
  { id: 3, title: 'Role', fields: ['role'] },
];

export function SignUp() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete signup
      localStorage.setItem('careflow_user', JSON.stringify({
        ...formData,
        loggedIn: true,
      }));
      navigate('/onboarding/health-profile');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)] p-6">
      {/* Progress Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <div className="text-sm text-[var(--color-text-muted)] mt-2 text-center">
          Step {currentStep} of {STEPS.length}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="max-w-md mx-auto"
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <h2 className="text-2xl mb-6">{STEPS[currentStep - 1].title}</h2>

        <div className="space-y-4">
          {currentStep === 1 && (
            <>
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </>
          )}

          {currentStep === 3 && (
            <div className="space-y-3">
              <label className="text-sm text-[var(--color-text-muted)]">I am a...</label>
              {['patient', 'caregiver', 'pharmacist'].map((role) => (
                <motion.button
                  key={role}
                  onClick={() => setFormData({ ...formData, role })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.role === role
                      ? 'border-[var(--color-accent)] bg-yellow-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium capitalize">{role}</div>
                  <div className="text-sm text-[var(--color-text-muted)] mt-1">
                    {role === 'patient' && 'Managing my own health'}
                    {role === 'caregiver' && 'Supporting a loved one'}
                    {role === 'pharmacist' && 'Professional care partner'}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <Button onClick={handleNext} variant="primary" fullWidth className="mt-8">
          {currentStep === STEPS.length ? 'Get Started' : 'Continue'}
        </Button>
      </motion.div>
    </div>
  );
}
