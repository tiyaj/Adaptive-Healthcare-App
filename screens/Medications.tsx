import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import {
  ChevronLeft,
  Pill as PillIcon,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Plus,
  AlertCircle,
  Calendar,
  Package,
  TrendingUp,
  X,
  Save,
} from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dose: string;
  time: string;
  taken: boolean;
  takenAt: string | null;
  frequency: string;
  purpose: string;
  prescribedBy: string;
  category: 'prescription' | 'supplement' | 'otc';
  nextDose?: string;
  refillDue?: string;
  daysRemaining?: number;
}

interface NewMedicationForm {
  name: string;
  dose: string;
  time: string;
  frequency: string;
  purpose: string;
  prescribedBy: string;
  category: 'prescription' | 'supplement' | 'otc';
  daysSupply: string;
}

export function Medications() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'prescription' | 'supplement' | 'otc'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'taken' | 'pending'>('all');

  const [showAddMedication, setShowAddMedication] = useState(false);
  const [newMed, setNewMed] = useState<NewMedicationForm>({
    name: '',
    dose: '',
    time: '08:00',
    frequency: 'Once daily',
    purpose: '',
    prescribedBy: '',
    category: 'prescription',
    daysSupply: '30',
  });

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: 'Lisinopril',
      dose: '10mg',
      time: '8:00 AM',
      taken: true,
      takenAt: '8:15 AM',
      frequency: 'Once daily',
      purpose: 'Blood pressure control',
      prescribedBy: 'Dr. Smith',
      category: 'prescription',
      nextDose: 'Tomorrow at 8:00 AM',
      refillDue: 'Feb 15, 2026',
      daysRemaining: 15,
    },
    {
      id: 2,
      name: 'Metformin',
      dose: '500mg',
      time: '12:00 PM',
      taken: false,
      takenAt: null,
      frequency: 'Twice daily',
      purpose: 'Diabetes management',
      prescribedBy: 'Dr. Johnson',
      category: 'prescription',
      nextDose: 'Today at 12:00 PM',
      refillDue: 'Feb 10, 2026',
      daysRemaining: 10,
    },
    {
      id: 3,
      name: 'Atorvastatin',
      dose: '20mg',
      time: '8:00 PM',
      taken: false,
      takenAt: null,
      frequency: 'Once daily at bedtime',
      purpose: 'Cholesterol management',
      prescribedBy: 'Dr. Smith',
      category: 'prescription',
      nextDose: 'Today at 8:00 PM',
      refillDue: 'Feb 20, 2026',
      daysRemaining: 20,
    },
    {
      id: 4,
      name: 'Aspirin',
      dose: '81mg',
      time: '8:00 AM',
      taken: true,
      takenAt: '8:10 AM',
      frequency: 'Once daily',
      purpose: 'Heart health',
      prescribedBy: 'Dr. Smith',
      category: 'otc',
      nextDose: 'Tomorrow at 8:00 AM',
      refillDue: 'Mar 1, 2026',
      daysRemaining: 30,
    },
    {
      id: 5,
      name: 'Vitamin D3',
      dose: '2000 IU',
      time: '8:00 AM',
      taken: true,
      takenAt: '8:05 AM',
      frequency: 'Once daily',
      purpose: 'Bone health',
      prescribedBy: 'Dr. Johnson',
      category: 'supplement',
      nextDose: 'Tomorrow at 8:00 AM',
      refillDue: 'Feb 25, 2026',
      daysRemaining: 25,
    },
    {
      id: 6,
      name: 'Omeprazole',
      dose: '20mg',
      time: '7:30 AM',
      taken: true,
      takenAt: '7:35 AM',
      frequency: 'Once daily before breakfast',
      purpose: 'Acid reflux',
      prescribedBy: 'Dr. Wilson',
      category: 'prescription',
      nextDose: 'Tomorrow at 7:30 AM',
      refillDue: 'Feb 5, 2026',
      daysRemaining: 5,
    },
  ]);

  const handleAddMedication = () => {
    // Convert 24h time to 12h format
    const [hours, minutes] = newMed.time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;

    const newMedication: Medication = {
      id: medications.length + 1,
      name: newMed.name,
      dose: newMed.dose,
      time: formattedTime,
      taken: false,
      takenAt: null,
      frequency: newMed.frequency,
      purpose: newMed.purpose,
      prescribedBy: newMed.prescribedBy,
      category: newMed.category,
      nextDose: `Today at ${formattedTime}`,
      refillDue: 'Mar 1, 2026',
      daysRemaining: parseInt(newMed.daysSupply),
    };

    setMedications([...medications, newMedication]);
    setShowAddMedication(false);
    
    // Reset form
    setNewMed({
      name: '',
      dose: '',
      time: '08:00',
      frequency: 'Once daily',
      purpose: '',
      prescribedBy: '',
      category: 'prescription',
      daysSupply: '30',
    });
  };

  // Filter medications
  const filteredMedications = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || med.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'taken' && med.taken) ||(filterStatus === 'pending' && !med.taken);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: medications.length,
    taken: medications.filter((m) => m.taken).length,
    pending: medications.filter((m) => !m.taken).length,
    needingRefill: medications.filter((m) => m.daysRemaining && m.daysRemaining <= 10).length,
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prescription':
        return 'bg-blue-100 text-blue-700';
      case 'supplement':
        return 'bg-purple-100 text-purple-700';
      case 'otc':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'prescription':
        return 'Prescription';
      case 'supplement':
        return 'Supplement';
      case 'otc':
        return 'OTC';
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Medications</h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Manage your medication schedule and refills
              </p>
            </div>
            <Button variant="primary" onClick={() => setShowAddMedication(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Medication
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <PillIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
                <div className="text-sm text-blue-600">Total Medications</div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">{stats.taken}</div>
                <div className="text-sm text-green-600">Taken Today</div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-700">{stats.pending}</div>
                <div className="text-sm text-orange-600">Pending</div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-700">{stats.needingRefill}</div>
                <div className="text-sm text-red-600">Need Refill</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search medications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                <Button
                  variant={filterCategory === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterCategory('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterCategory === 'prescription' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterCategory('prescription')}
                >
                  Prescription
                </Button>
                <Button
                  variant={filterCategory === 'supplement' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterCategory('supplement')}
                >
                  Supplements
                </Button>
                <Button
                  variant={filterCategory === 'otc' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterCategory('otc')}
                >
                  OTC
                </Button>
              </div>

              <div className="w-px h-8 bg-gray-300"></div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All Status
                </Button>
                <Button
                  variant={filterStatus === 'taken' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterStatus('taken')}
                >
                  Taken
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Medications List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredMedications.length} {filteredMedications.length === 1 ? 'Medication' : 'Medications'}
            </h2>
          </div>

          {filteredMedications.length === 0 ? (
            <Card className="text-center py-12">
              <PillIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No medications found</h3>
              <p className="text-[var(--color-text-muted)]">Try adjusting your search or filters</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {filteredMedications.map((med, index) => (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/medication/${med.id}`)}
                  >
                    <Card
                      hoverable
                      className={`cursor-pointer ${
                        med.taken
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-orange-50 border border-orange-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                            med.taken ? 'bg-green-100' : 'bg-orange-100'
                          }`}
                        >
                          {med.taken ? (
                            <CheckCircle className="w-7 h-7 text-[var(--color-success)]" />
                          ) : (
                            <PillIcon className="w-7 h-7 text-orange-600" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold">{med.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(med.category)}`}>
                                  {getCategoryLabel(med.category)}
                                </span>
                              </div>
                              <p className="text-sm text-[var(--color-text-muted)] mb-2">{med.purpose}</p>
                              <div className="flex flex-wrap gap-2">
                                <Pill variant="default">{med.dose}</Pill>
                                <Pill variant="default">{med.frequency}</Pill>
                              </div>
                            </div>
                            <Pill variant={med.taken ? 'success' : 'warning'}>
                              {med.taken ? 'Taken' : 'Pending'}
                            </Pill>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <div className="text-[var(--color-text-muted)] text-xs mb-1">Scheduled Time</div>
                              <div className="font-medium flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {med.time}
                              </div>
                            </div>
                            {med.taken && med.takenAt && (
                              <div>
                                <div className="text-[var(--color-text-muted)] text-xs mb-1">Taken At</div>
                                <div className="font-medium text-[var(--color-success)]">{med.takenAt}</div>
                              </div>
                            )}
                            <div>
                              <div className="text-[var(--color-text-muted)] text-xs mb-1">Next Dose</div>
                              <div className="font-medium flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {med.nextDose?.split(' at ')[0]}
                              </div>
                            </div>
                            <div>
                              <div className="text-[var(--color-text-muted)] text-xs mb-1">Refill In</div>
                              <div className={`font-medium flex items-center gap-1 ${
                                med.daysRemaining && med.daysRemaining <= 10 ? 'text-red-600' : ''
                              }`}>
                                <Package className="w-4 h-4" />
                                {med.daysRemaining} days
                                {med.daysRemaining && med.daysRemaining <= 10 && (
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Prescribed By */}
                          <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-[var(--color-text-muted)]">
                            Prescribed by {med.prescribedBy}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Adherence Tracking Card */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Today's Adherence</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Track your medication compliance
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-[var(--color-accent)]" />
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {stats.taken} of {stats.total} medications taken
              </span>
              <span className="text-sm font-bold text-[var(--color-success)]">
                {Math.round((stats.taken / stats.total) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.taken / stats.total) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" fullWidth onClick={() => navigate('/medication-history')}>
              View History
            </Button>
            <Button variant="ghost" fullWidth onClick={() => navigate('/medication-reminders')}>
              Set Reminders
            </Button>
          </div>
        </Card>
      </div>

      {/* Add Medication Modal */}
      <AnimatePresence>
        {showAddMedication && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddMedication(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Add New Medication</h2>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1">
                        Fill in the medication details below
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddMedication(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-5">
                    {/* Medication Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Medication Name *
                      </label>
                      <input
                        type="text"
                        value={newMed.name}
                        onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                        placeholder="e.g., Lisinopril"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                      />
                    </div>

                    {/* Dosage and Category */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Dosage *
                        </label>
                        <input
                          type="text"
                          value={newMed.dose}
                          onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
                          placeholder="e.g., 10mg"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          value={newMed.category}
                          onChange={(e) => setNewMed({ ...newMed, category: e.target.value as any })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                        >
                          <option value="prescription">Prescription</option>
                          <option value="supplement">Supplement</option>
                          <option value="otc">Over-the-Counter (OTC)</option>
                        </select>
                      </div>
                    </div>

                    {/* Time and Frequency */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Time *
                        </label>
                        <input
                          type="time"
                          value={newMed.time}
                          onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Frequency *
                        </label>
                        <select
                          value={newMed.frequency}
                          onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                        >
                          <option value="Once daily">Once daily</option>
                          <option value="Twice daily">Twice daily</option>
                          <option value="Three times daily">Three times daily</option>
                          <option value="Four times daily">Four times daily</option>
                          <option value="Every other day">Every other day</option>
                          <option value="As needed">As needed</option>
                          <option value="Once daily at bedtime">Once daily at bedtime</option>
                          <option value="Once daily before breakfast">Once daily before breakfast</option>
                          <option value="Once weekly">Once weekly</option>
                        </select>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Purpose / Condition *
                      </label>
                      <input
                        type="text"
                        value={newMed.purpose}
                        onChange={(e) => setNewMed({ ...newMed, purpose: e.target.value })}
                        placeholder="e.g., Blood pressure control"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                      />
                    </div>

                    {/* Prescribed By and Days Supply */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Prescribed By
                        </label>
                        <input
                          type="text"
                          value={newMed.prescribedBy}
                          onChange={(e) => setNewMed({ ...newMed, prescribedBy: e.target.value })}
                          placeholder="e.g., Dr. Smith"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Days Supply *
                        </label>
                        <input
                          type="number"
                          value={newMed.daysSupply}
                          onChange={(e) => setNewMed({ ...newMed, daysSupply: e.target.value })}
                          placeholder="30"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={handleAddMedication}
                      disabled={!newMed.name || !newMed.dose || !newMed.purpose}
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Add Medication
                    </Button>
                    <Button variant="ghost" onClick={() => setShowAddMedication(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
