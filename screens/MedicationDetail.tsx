import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import { ChevronLeft, Clock, Calendar, AlertTriangle, Package, Edit } from 'lucide-react';

export function MedicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  // Mock medication data
  const medication = {
    id: id,
    name: 'Lisinopril',
    dose: '10mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Sarah Williams',
    purpose: 'Blood pressure management',
    sideEffects: ['Dizziness', 'Dry cough', 'Headache'],
    nextDose: 'Today at 8:00 PM',
    refillStatus: '15 doses remaining',
    history: [
      { date: 'Jan 30', time: '8:00 AM', taken: true },
      { date: 'Jan 29', time: '8:00 AM', taken: true },
      { date: 'Jan 28', time: '8:00 AM', taken: false },
      { date: 'Jan 27', time: '8:00 AM', taken: true },
    ],
  };

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

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Medication Header */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl mb-2">{medication.name}</h1>
              <p className="text-[var(--color-text-muted)] mb-4">{medication.purpose}</p>
              <div className="flex flex-wrap gap-2">
                <Pill variant="default">{medication.dose}</Pill>
                <Pill variant="default">{medication.frequency}</Pill>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setShowEdit(!showEdit)}>
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Next Dose */}
        <Card className="bg-[var(--color-accent)] bg-opacity-10 border-2 border-[var(--color-accent)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
              <Clock className="w-6 h-6 text-[var(--color-primary-bg)]" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Next Dose</h3>
              <p className="text-[var(--color-text-muted)]">{medication.nextDose}</p>
            </div>
          </div>
        </Card>

        {/* Refill Status */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-[var(--color-accent)]" />
              <div>
                <h3 className="font-medium">Refill Status</h3>
                <p className="text-[var(--color-text-muted)] text-sm">{medication.refillStatus}</p>
              </div>
            </div>
            <Pill variant="warning">Low stock</Pill>
          </div>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate(`/refill/${medication.id}`)}
          >
            Request Refill
          </Button>
        </Card>

        {/* Details */}
        <Card>
          <h3 className="text-lg mb-4">Details</h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Prescribed by</div>
              <div className="font-medium">{medication.prescribedBy}</div>
            </div>
            <div>
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Dosage</div>
              <div className="font-medium">{medication.dose}, {medication.frequency}</div>
            </div>
          </div>
        </Card>

        {/* Side Effects */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-[var(--color-warning)]" />
            <h3 className="text-lg">Possible Side Effects</h3>
          </div>
          <ul className="space-y-2">
            {medication.sideEffects.map((effect, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]"></span>
                {effect}
              </li>
            ))}
          </ul>
        </Card>

        {/* History */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-lg">Recent History</h3>
          </div>
          <div className="space-y-2">
            {medication.history.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.taken ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    entry.taken ? 'bg-[var(--color-success)]' : 'bg-[var(--color-alert)]'
                  }`}></div>
                  <span className="text-sm">{entry.date}</span>
                  <span className="text-sm text-[var(--color-text-muted)]">{entry.time}</span>
                </div>
                <Pill variant={entry.taken ? 'success' : 'alert'}>
                  {entry.taken ? 'Taken' : 'Missed'}
                </Pill>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
