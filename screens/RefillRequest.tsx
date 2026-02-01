import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import { ChevronLeft, Package, CheckCircle, Clock, MapPin } from 'lucide-react';

type RefillStatus = 'idle' | 'requested' | 'confirmed' | 'ready';

export function RefillRequest() {
  const { medicationId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<RefillStatus>('idle');

  const medication = {
    name: 'Lisinopril',
    dose: '10mg',
    quantity: '30 tablets',
  };

  const linkedPharmacy = {
    name: 'HealthPlus Pharmacy',
    address: '123 Main Street',
    phone: '(555) 123-4567',
  };

  const handleRequestRefill = () => {
    setStatus('requested');
    
    // Simulate status progression
    setTimeout(() => setStatus('confirmed'), 2000);
    setTimeout(() => setStatus('ready'), 4000);
  };

  const statusConfig = {
    idle: { icon: Package, color: 'default', text: 'Ready to request' },
    requested: { icon: Clock, color: 'warning', text: 'Request sent' },
    confirmed: { icon: CheckCircle, color: 'success', text: 'Confirmed by pharmacy' },
    ready: { icon: CheckCircle, color: 'success', text: 'Ready for pickup' },
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(`/medication/${medicationId}`)}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Medication
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Request Refill</h1>
          <p className="text-[var(--color-text-muted)]">Get your medication refilled</p>
        </div>

        {/* Status Progress */}
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Card className="bg-green-50 border-2 border-[var(--color-success)]">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="w-12 h-12 rounded-full bg-[var(--color-success)] flex items-center justify-center"
                >
                  <StatusIcon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{currentStatus.text}</h3>
                  {status === 'ready' && (
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Your medication is ready for pickup at {linkedPharmacy.name}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Progress Steps */}
        {status !== 'idle' && (
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'requested' || status === 'confirmed' || status === 'ready'
                    ? 'bg-[var(--color-success)]'
                    : 'bg-gray-200'
                }`}>
                  {status === 'requested' || status === 'confirmed' || status === 'ready' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-sm text-[var(--color-text-muted)]">1</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">Request Sent</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Pharmacy received your request</div>
                </div>
              </div>

              <div className="ml-4 w-0.5 h-8 bg-gray-200"></div>

              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'confirmed' || status === 'ready'
                    ? 'bg-[var(--color-success)]'
                    : 'bg-gray-200'
                }`}>
                  {status === 'confirmed' || status === 'ready' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-sm text-[var(--color-text-muted)]">2</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">Confirmed</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Pharmacy is preparing your medication</div>
                </div>
              </div>

              <div className="ml-4 w-0.5 h-8 bg-gray-200"></div>

              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === 'ready'
                    ? 'bg-[var(--color-success)]'
                    : 'bg-gray-200'
                }`}>
                  {status === 'ready' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-sm text-[var(--color-text-muted)]">3</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">Ready for Pickup</div>
                  <div className="text-sm text-[var(--color-text-muted)]">You'll receive a notification</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Medication Info */}
        <Card>
          <h3 className="text-lg mb-4">Medication Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-text-muted)]">Medication</span>
              <span className="font-medium">{medication.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-text-muted)]">Dosage</span>
              <span className="font-medium">{medication.dose}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-text-muted)]">Quantity</span>
              <span className="font-medium">{medication.quantity}</span>
            </div>
          </div>
        </Card>

        {/* Pharmacy Info */}
        <Card>
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
            <div className="flex-1">
              <h3 className="text-lg mb-1">Pickup Location</h3>
              <div className="text-[var(--color-text-muted)]">
                <div className="font-medium text-[var(--color-text-primary)]">{linkedPharmacy.name}</div>
                <div className="text-sm">{linkedPharmacy.address}</div>
                <div className="text-sm">{linkedPharmacy.phone}</div>
              </div>
            </div>
          </div>
          {status === 'idle' && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/pharmacy-finder')}>
              Change Pharmacy
            </Button>
          )}
        </Card>

        {/* Action Button */}
        {status === 'idle' && (
          <Button variant="primary" fullWidth onClick={handleRequestRefill}>
            Request Refill
          </Button>
        )}

        {status === 'ready' && (
          <div className="flex gap-3">
            <Button variant="primary" fullWidth onClick={() => navigate('/dashboard')}>
              Done
            </Button>
            <Button variant="ghost" fullWidth>
              Get Directions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
