import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { ChevronLeft, Plus, X } from 'lucide-react';

export function HealthProfile() {
  const navigate = useNavigate();
  const [basicInfo, setBasicInfo] = useState({
    age: '',
    height: '',
    weight: '',
  });
  const [conditions, setConditions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [medications, setMedications] = useState<Array<{
    name: string;
    dose: string;
    frequency: string;
  }>>([]);
  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');

  const handleSave = () => {
    localStorage.setItem('careflow_health_profile', JSON.stringify({
      basicInfo,
      conditions,
      allergies,
      medications,
    }));
    navigate('/onboarding/care-circle');
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', dose: '', frequency: '' }]);
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)] p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/signup')}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="text-3xl mb-2">Health Profile</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Help us understand your health needs
        </p>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <h3 className="text-lg mb-4">Basic Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Age"
                type="number"
                placeholder="25"
                value={basicInfo.age}
                onChange={(e) => setBasicInfo({ ...basicInfo, age: e.target.value })}
              />
              <Input
                label="Height (cm)"
                type="number"
                placeholder="170"
                value={basicInfo.height}
                onChange={(e) => setBasicInfo({ ...basicInfo, height: e.target.value })}
              />
              <Input
                label="Weight (kg)"
                type="number"
                placeholder="70"
                value={basicInfo.weight}
                onChange={(e) => setBasicInfo({ ...basicInfo, weight: e.target.value })}
              />
            </div>
          </Card>

          {/* Medical Conditions */}
          <Card>
            <h3 className="text-lg mb-4">Medical Conditions</h3>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Add a condition"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCondition()}
              />
              <Button onClick={addCondition} variant="secondary">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
                >
                  {condition}
                  <button
                    onClick={() => setConditions(conditions.filter((_, idx) => idx !== i))}
                    className="hover:text-[var(--color-alert)]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Allergies */}
          <Card>
            <h3 className="text-lg mb-4">Allergies</h3>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Add an allergy"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
              />
              <Button onClick={addAllergy} variant="secondary">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-red-50 text-[var(--color-alert)] px-3 py-1.5 rounded-full text-sm"
                >
                  {allergy}
                  <button
                    onClick={() => setAllergies(allergies.filter((_, idx) => idx !== i))}
                    className="hover:opacity-70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Medications */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Current Medications</h3>
              <Button onClick={addMedication} variant="ghost" size="sm">
                <Plus className="w-5 h-5 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-4">
              {medications.map((med, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <Input
                    placeholder="Medication name"
                    value={med.name}
                    onChange={(e) => {
                      const updated = [...medications];
                      updated[i].name = e.target.value;
                      setMedications(updated);
                    }}
                  />
                  <Input
                    placeholder="Dose"
                    value={med.dose}
                    onChange={(e) => {
                      const updated = [...medications];
                      updated[i].dose = e.target.value;
                      setMedications(updated);
                    }}
                  />
                  <Input
                    placeholder="Frequency"
                    value={med.frequency}
                    onChange={(e) => {
                      const updated = [...medications];
                      updated[i].frequency = e.target.value;
                      setMedications(updated);
                    }}
                  />
                </motion.div>
              ))}
              {medications.length === 0 && (
                <p className="text-[var(--color-text-muted)] text-sm text-center py-4">
                  No medications added yet
                </p>
              )}
            </div>
          </Card>

          <Button onClick={handleSave} variant="primary" fullWidth>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
