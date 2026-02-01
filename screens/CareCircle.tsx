import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { ChevronLeft, Plus, X, Mail, Phone } from 'lucide-react';

interface CircleMember {
  name: string;
  contact: string;
  role: string;
}

export function CareCircle() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<CircleMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    contact: '',
    role: 'family',
  });

  const addMember = () => {
    if (newMember.name && newMember.contact) {
      setMembers([...members, newMember]);
      setNewMember({ name: '', contact: '', role: 'family' });
      setShowForm(false);
    }
  };

  const handleContinue = () => {
    localStorage.setItem('careflow_care_circle', JSON.stringify(members));
    navigate('/onboarding/routine');
  };

  const handleSkip = () => {
    navigate('/onboarding/routine');
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)] p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/onboarding/health-profile')}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="text-3xl mb-2">Your Care Circle</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Invite family, friends, or caregivers to support your journey
        </p>

        <div className="space-y-4 mb-6">
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{member.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                      {member.contact.includes('@') ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <Phone className="w-4 h-4" />
                      )}
                      {member.contact}
                    </div>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs capitalize">
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMembers(members.filter((_, idx) => idx !== i))}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-alert)] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {showForm ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <h3 className="text-lg mb-4">Add Member</h3>
              <div className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Full name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
                <Input
                  label="Contact"
                  placeholder="Email or phone"
                  value={newMember.contact}
                  onChange={(e) => setNewMember({ ...newMember, contact: e.target.value })}
                />
                <div>
                  <label className="text-sm text-[var(--color-text-muted)] block mb-2">
                    Role
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {['family', 'friend', 'caregiver', 'nurse'].map((role) => (
                      <button
                        key={role}
                        onClick={() => setNewMember({ ...newMember, role })}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          newMember.role === role
                            ? 'bg-[var(--color-accent)] text-[var(--color-primary-bg)]'
                            : 'bg-gray-100 text-[var(--color-text-muted)]'
                        }`}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={addMember} variant="primary" fullWidth>
                    Add Member
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="ghost" fullWidth>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Button
            onClick={() => setShowForm(true)}
            variant="secondary"
            fullWidth
            className="mb-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Member
          </Button>
        )}

        <div className="flex gap-3 mt-8">
          <Button onClick={handleContinue} variant="primary" fullWidth>
            Continue
          </Button>
          <Button onClick={handleSkip} variant="ghost" fullWidth>
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
