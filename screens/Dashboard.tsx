import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import {
  Heart,
  Pill as PillIcon,
  Camera,
  MapPin,
  Settings,
  Bell,
  Clock,
  Activity,
  Users,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  X,
  Phone,
  Calendar,
  FileText,
} from 'lucide-react';

type UserRole = 'patient' | 'caregiver' | 'pharmacist';

interface PharmacistTask {
  id: number;
  patient: string;
  task: string;
  urgent: boolean;
  type: 'refill' | 'review' | 'interaction';
  details?: {
    medication?: string;
    dosage?: string;
    prescribedBy?: string;
    currentSupply?: string;
    lastRefill?: string;
    allergies?: string[];
    currentMedications?: string[];
    interactions?: string[];
    notes?: string;
    phone?: string;
    email?: string;
  };
}

export function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('patient');
  const [selectedTask, setSelectedTask] = useState<PharmacistTask | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [tasks, setTasks] = useState<PharmacistTask[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdaptiveCheckIn, setShowAdaptiveCheckIn] = useState(false);
  const [showAllMedications, setShowAllMedications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reminder',
      title: 'Medication Reminder',
      message: 'Time to take Metformin 500mg',
      time: '12:00 PM',
      unread: true,
      icon: 'pill',
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: "Doctor's appointment tomorrow at 10:00 AM",
      time: '2 hours ago',
      unread: true,
      icon: 'calendar',
    },
    {
      id: 3,
      type: 'refill',
      title: 'Refill Reminder',
      message: 'Atorvastatin refill available at CVS Pharmacy',
      time: '5 hours ago',
      unread: true,
      icon: 'alert',
    },
    {
      id: 4,
      type: 'health',
      title: 'Blood Pressure Check',
      message: "Don't forget your 2:00 PM blood pressure reading",
      time: '1 day ago',
      unread: false,
      icon: 'activity',
    },
    {
      id: 5,
      type: 'message',
      title: 'Message from Care Circle',
      message: 'Mom sent you a message: "How are you feeling today?"',
      time: '2 days ago',
      unread: false,
      icon: 'users',
    },
  ]);

  // Mock data
  const todayMeds = [
    { id: 1, name: 'Lisinopril', dose: '10mg', time: '8:00 AM', taken: true },
    { id: 2, name: 'Metformin', dose: '500mg', time: '12:00 PM', taken: false },
    { id: 3, name: 'Atorvastatin', dose: '20mg', time: '8:00 PM', taken: false },
  ];

  // All medications with more complete data
  const allMedications = [
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
    },
  ];

  const upcomingReminders = [
    { id: 1, title: 'Take Metformin', time: '12:00 PM' },
    { id: 2, title: 'Blood pressure check', time: '2:00 PM' },
  ];

  const pharmacistTasks: PharmacistTask[] = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      task: 'Refill request - Lisinopril',
      urgent: true,
      type: 'refill',
      details: {
        medication: 'Lisinopril',
        dosage: '10mg',
        prescribedBy: 'Dr. Smith',
        currentSupply: '30 tablets',
        lastRefill: '2023-10-01',
        allergies: ['Penicillin'],
        currentMedications: ['Lisinopril', 'Metformin'],
        interactions: ['Metformin'],
        notes: 'Patient has a history of kidney issues.',
        phone: '555-1234',
        email: 'sarah.johnson@example.com',
      },
    },
    {
      id: 2,
      patient: 'Mike Chen',
      task: 'Medication review needed',
      urgent: false,
      type: 'review',
      details: {
        medication: 'Metformin',
        dosage: '500mg',
        prescribedBy: 'Dr. Johnson',
        currentSupply: '60 tablets',
        lastRefill: '2023-09-15',
        allergies: ['Sulfa'],
        currentMedications: ['Metformin', 'Atorvastatin'],
        interactions: ['Atorvastatin'],
        notes: 'Patient is experiencing side effects.',
        phone: '555-5678',
        email: 'mike.chen@example.com',
      },
    },
    {
      id: 3,
      patient: 'Emma Wilson',
      task: 'Interaction alert',
      urgent: true,
      type: 'interaction',
      details: {
        medication: 'Atorvastatin',
        dosage: '20mg',
        prescribedBy: 'Dr. Brown',
        currentSupply: '40 tablets',
        lastRefill: '2023-10-10',
        allergies: ['Aspirin'],
        currentMedications: ['Atorvastatin', 'Lisinopril'],
        interactions: ['Lisinopril'],
        notes: 'Potential interaction with Lisinopril.',
        phone: '555-9012',
        email: 'emma.wilson@example.com',
      },
    },
  ];

  useEffect(() => {
    // Initialize tasks
    setTasks(pharmacistTasks);
  }, []);

  useEffect(() => {
    // Show adaptive check-in after a delay (simulated)
    const timer = setTimeout(() => {
      setShowAdaptiveCheckIn(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleApproveRefill = () => {
    if (!selectedTask) return;

    // Remove task from list
    setTasks(tasks.filter((t) => t.id !== selectedTask.id));

    // Show success message
    setSuccessMessage(
      `✅ Refill approved for ${selectedTask.patient} - ${selectedTask.details?.medication}`
    );
    setShowSuccessMessage(true);

    // Close modal
    setShowTaskModal(false);

    // Hide success message after 4 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 4000);
  };

  const handleCompleteReview = () => {
    if (!selectedTask) return;

    // Remove task from list
    setTasks(tasks.filter((t) => t.id !== selectedTask.id));

    // Show success message
    setSuccessMessage(`✅ Medication review completed for ${selectedTask.patient}`);
    setShowSuccessMessage(true);

    // Close modal
    setShowTaskModal(false);

    // Hide success message after 4 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 4000);
  };

  const handleResolveAlert = () => {
    if (!selectedTask) return;

    // Remove task from list
    setTasks(tasks.filter((t) => t.id !== selectedTask.id));

    // Show success message
    setSuccessMessage(`✅ Interaction alert resolved for ${selectedTask.patient}`);
    setShowSuccessMessage(true);

    // Close modal
    setShowTaskModal(false);

    // Hide success message after 4 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 4000);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getNotificationIcon = (iconType: string) => {
    switch (iconType) {
      case 'pill':
        return <PillIcon className="w-5 h-5 text-[var(--color-accent)]" />;
      case 'calendar':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-purple-600" />;
      case 'users':
        return <Users className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent)]">
                <Heart className="w-5 h-5 text-[var(--color-primary-bg)]" fill="currentColor" />
              </div>
              <h1 className="text-xl">CareFlow</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Role Switcher (for demo) */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
              >
                <option value="patient">Patient View</option>
                <option value="caregiver">Care Circle View</option>
                <option value="pharmacist">Pharmacist View</option>
              </select>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-[var(--color-alert)] rounded-full flex items-center justify-center text-xs text-white font-semibold">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive Check-In Card */}
      <AnimatePresence>
        {showAdaptiveCheckIn && role === 'patient' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-6xl mx-auto px-6 pt-6"
          >
            <Card className="border-2 border-[var(--color-accent)]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Anything changed recently?</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-3">
                    Quick check-in to keep your care plan up to date
                  </p>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => setShowAdaptiveCheckIn(false)}>
                      Update Info
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowAdaptiveCheckIn(false)}>
                      All good
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <motion.div
          key={role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Patient Dashboard */}
          {role === 'patient' && (
            <div className="space-y-6">
              {/* Health Summary */}
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl mb-1">Good afternoon!</h2>
                    <p className="text-[var(--color-text-muted)]">Here's your health summary for today</p>
                  </div>
                  <Activity className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-semibold text-[var(--color-success)]">3/4</div>
                    <div className="text-sm text-[var(--color-text-muted)] mt-1">Meds taken</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-semibold text-blue-600">120/80</div>
                    <div className="text-sm text-[var(--color-text-muted)] mt-1">Blood pressure</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-semibold text-purple-600">7.2h</div>
                    <div className="text-sm text-[var(--color-text-muted)] mt-1">Sleep</div>
                  </div>
                </div>
              </Card>

              {/* Today's Medications */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Today's Medications</h3>
                  <button className="text-[var(--color-accent)] text-sm hover:underline" onClick={() => setShowAllMedications(!showAllMedications)}>
                    {showAllMedications ? 'Hide' : 'View all'}
                  </button>
                </div>
                <div className="space-y-3">
                  {todayMeds.map((med) => (
                    <motion.div
                      key={med.id}
                      onClick={() => navigate(`/medication/${med.id}`)}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        med.taken ? 'bg-green-100' : 'bg-gray-200'
                      }`}>
                        {med.taken ? (
                          <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
                        ) : (
                          <PillIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{med.name}</div>
                        <div className="text-sm text-[var(--color-text-muted)]">{med.dose}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[var(--color-text-muted)]">{med.time}</div>
                        {med.taken && (
                          <Pill variant="success" className="mt-1">Taken</Pill>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Card hoverable onClick={() => navigate('/meal-log')}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-[var(--color-warning)]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Log Meal</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">Track your food</p>
                    </div>
                  </div>
                </Card>
                <Card hoverable onClick={() => navigate('/pharmacy-finder')}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Find Pharmacy</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">Nearby locations</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Upcoming Reminders */}
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[var(--color-accent)]" />
                  <h3 className="text-lg">Coming Up</h3>
                </div>
                <div className="space-y-2">
                  {upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">{reminder.title}</span>
                      <span className="text-sm text-[var(--color-text-muted)]">{reminder.time}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Care Circle Dashboard */}
          {role === 'caregiver' && (
            <div className="space-y-6">
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl mb-1">Sarah's Care Overview</h2>
                    <p className="text-[var(--color-text-muted)]">You're connected as Family Member</p>
                  </div>
                  <Users className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
                    <span className="text-sm text-[var(--color-success)]">
                      All medications taken on time today
                    </span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg mb-4">Today's Medications</h3>
                <div className="space-y-3">
                  {todayMeds.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{med.name}</div>
                        <div className="text-sm text-[var(--color-text-muted)]">{med.dose} at {med.time}</div>
                      </div>
                      {med.taken && <Pill variant="success">Taken</Pill>}
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg mb-4">Upcoming Events</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-sm">Doctor's Appointment</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Tomorrow at 10:00 AM</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-medium text-sm">Refill Due</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Metformin - in 3 days</div>
                  </div>
                </div>
              </Card>

              <Button variant="secondary" fullWidth onClick={() => setShowMessageModal(true)}>
                Send Message to Sarah
              </Button>
            </div>
          )}

          {/* Pharmacist Dashboard */}
          {role === 'pharmacist' && (
            <div className="space-y-6">
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl mb-1">Task Queue</h2>
                    <p className="text-[var(--color-text-muted)]">{tasks.length} {tasks.length === 1 ? 'task requires' : 'tasks require'} attention</p>
                  </div>
                  <ClipboardList className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
              </Card>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <Card key={task.id} hoverable className={task.urgent ? 'border-2 border-red-200' : ''}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {task.urgent && (
                          <Pill variant="alert" className="mb-2">Urgent</Pill>
                        )}
                        <h3 className="font-medium mb-1">{task.patient}</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">{task.task}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTask(task);
                          setShowTaskModal(true);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <h3 className="text-lg mb-4">Today's Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-semibold">12</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Refills processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold">3</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Alerts resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold">8</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Consultations</div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>

      {/* Task Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl"
          >
            <Card className="max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold">{selectedTask.patient}</h2>
                    <Pill variant={selectedTask.urgent ? 'alert' : 'success'}>
                      {selectedTask.urgent ? 'Urgent' : 'Normal Priority'}
                    </Pill>
                  </div>
                  <p className="text-[var(--color-text-muted)]">{selectedTask.task}</p>
                </div>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedTask.details && (
                <div className="space-y-6">
                  {/* Patient Contact */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Patient Contact
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{selectedTask.details.phone}</span>
                        <button className="ml-auto text-blue-600 hover:underline text-sm">
                          Call
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{selectedTask.details.email}</span>
                        <button className="ml-auto text-blue-600 hover:underline text-sm">
                          Email
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Medication Information */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <PillIcon className="w-5 h-5 text-[var(--color-accent)]" />
                      Medication Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-[var(--color-text-muted)] mb-1">Medication</div>
                        <div className="font-medium">{selectedTask.details.medication}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-[var(--color-text-muted)] mb-1">Dosage</div>
                        <div className="font-medium">{selectedTask.details.dosage}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-[var(--color-text-muted)] mb-1">Prescribed By</div>
                        <div className="font-medium">{selectedTask.details.prescribedBy}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-[var(--color-text-muted)] mb-1">Current Supply</div>
                        <div className="font-medium">{selectedTask.details.currentSupply}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-[var(--color-text-muted)] mb-1">Last Refill</div>
                        <div className="font-medium">{selectedTask.details.lastRefill}</div>
                      </div>
                    </div>
                  </div>

                  {/* Current Medications */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-purple-600" />
                      Current Medications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.details.currentMedications?.map((med, idx) => (
                        <Pill key={idx} variant="default">{med}</Pill>
                      ))}
                    </div>
                  </div>

                  {/* Allergies & Interactions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-xl p-4">
                      <h3 className="font-medium mb-3 flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        Allergies
                      </h3>
                      <div className="space-y-1">
                        {selectedTask.details.allergies?.map((allergy, idx) => (
                          <div key={idx} className="text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            {allergy}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <h3 className="font-medium mb-3 flex items-center gap-2 text-orange-600">
                        <AlertCircle className="w-5 h-5" />
                        Interactions
                      </h3>
                      <div className="space-y-1">
                        {selectedTask.details.interactions?.map((interaction, idx) => (
                          <div key={idx} className="text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            {interaction}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clinical Notes */}
                  {selectedTask.details.notes && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-600" />
                        Clinical Notes
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {selectedTask.details.notes}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    {selectedTask.type === 'refill' && (
                      <Button variant="primary" fullWidth onClick={handleApproveRefill}>
                        Approve Refill
                      </Button>
                    )}
                    {selectedTask.type === 'review' && (
                      <Button variant="primary" fullWidth onClick={handleCompleteReview}>
                        Complete Review
                      </Button>
                    )}
                    {selectedTask.type === 'interaction' && (
                      <Button variant="primary" fullWidth onClick={handleResolveAlert}>
                        Resolve Alert
                      </Button>
                    )}
                    <Button variant="ghost" onClick={() => setShowTaskModal(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {unreadCount > 0 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                    </p>
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-[var(--color-accent)] hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <Bell className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-[var(--color-text-muted)]">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              notification.icon === 'pill'
                                ? 'bg-yellow-50'
                                : notification.icon === 'calendar'
                                ? 'bg-blue-50'
                                : notification.icon === 'alert'
                                ? 'bg-orange-50'
                                : notification.icon === 'activity'
                                ? 'bg-purple-50'
                                : 'bg-green-50'
                            }`}
                          >
                            {getNotificationIcon(notification.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium text-sm">{notification.title}</h3>
                              {notification.unread && (
                                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
                              )}
                            </div>
                            <p className="text-sm text-[var(--color-text-muted)] mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-[var(--color-text-muted)]">
                                {notification.time}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-xs text-red-500 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* All Medications Modal */}
      <AnimatePresence>
        {showAllMedications && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllMedications(false)}
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
              <Card className="w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h2 className="text-2xl font-bold">Today's Medications</h2>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1">
                        {allMedications.filter(m => m.taken).length} of {allMedications.length} medications taken
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAllMedications(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${(allMedications.filter(m => m.taken).length / allMedications.length) * 100}%` 
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full bg-[var(--color-success)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Medications List */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {/* Taken Medications */}
                    {allMedications.filter(m => m.taken).length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[var(--color-success)]">
                          <CheckCircle className="w-5 h-5" />
                          Taken ({allMedications.filter(m => m.taken).length})
                        </h3>
                        <div className="space-y-3">
                          {allMedications.filter(m => m.taken).map((med, index) => (
                            <motion.div
                              key={med.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className="bg-green-50 border border-green-200">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-6 h-6 text-[var(--color-success)]" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                      <div>
                                        <h4 className="font-bold text-lg">{med.name}</h4>
                                        <p className="text-sm text-[var(--color-text-muted)]">{med.dose}</p>
                                      </div>
                                      <Pill variant="success">Taken</Pill>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div>
                                        <span className="text-[var(--color-text-muted)]">Scheduled:</span>
                                        <span className="ml-1 font-medium">{med.time}</span>
                                      </div>
                                      <div>
                                        <span className="text-[var(--color-text-muted)]">Taken at:</span>
                                        <span className="ml-1 font-medium text-[var(--color-success)]">{med.takenAt}</span>
                                      </div>
                                      <div>
                                        <span className="text-[var(--color-text-muted)]">Frequency:</span>
                                        <span className="ml-1 font-medium">{med.frequency}</span>
                                      </div>
                                      <div>
                                        <span className="text-[var(--color-text-muted)]">Purpose:</span>
                                        <span className="ml-1 font-medium">{med.purpose}</span>
                                      </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-green-200">
                                      <span className="text-xs text-[var(--color-text-muted)]">
                                        Prescribed by {med.prescribedBy}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pending Medications */}
                    {allMedications.filter(m => !m.taken).length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-orange-600">
                          <Clock className="w-5 h-5" />
                          Pending ({allMedications.filter(m => !m.taken).length})
                        </h3>
                        <div className="space-y-3">
                          {allMedications.filter(m => !m.taken).map((med, index) => (
                            <motion.div
                              key={med.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (allMedications.filter(m => m.taken).length + index) * 0.05 }}
                            >
                              <Card className="bg-orange-50 border border-orange-200">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <PillIcon className="w-6 h-6 text-orange-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                      <div>
                                        <h4 className="font-bold text-lg">{med.name}</h4>
                                        <p className="text-sm text-[var(--color-text-muted)]">{med.dose}</p>
                                      </div>
                                      <Pill variant="warning">Pending</Pill>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div>
                                        <span className="text-[var(--color-text-muted)]">Scheduled:</span>
                                        <span className="ml-1 font-medium text-orange-600">{med.time}</span>
                                      </div>
                                      <div>
                                        <span className="text-[var(--color-text-muted)]">Frequency:</span>
                                        <span className="ml-1 font-medium">{med.frequency}</span>
                                      </div>
                                      <div>
                                        <span className="text-[var(--color-text-muted)]">Purpose:</span>
                                        <span className="ml-1 font-medium">{med.purpose}</span>
                                      </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-orange-200">
                                      <span className="text-xs text-[var(--color-text-muted)]">
                                        Prescribed by {med.prescribedBy}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                  <div className="flex gap-3">
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => {
                        setShowAllMedications(false);
                        navigate('/medications');
                      }}
                    >
                      Go to Medications Page
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => setShowAllMedications(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl"
          >
            <Card className="max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold">Send Message to Sarah</h2>
                  </div>
                </div>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message Form */}
              <div className="space-y-4">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="Type your message here..."
                ></textarea>
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setMessageSent(true);
                      setTimeout(() => {
                        setMessageSent(false);
                        setShowMessageModal(false);
                      }, 2000);
                    }}
                  >
                    Send
                  </Button>
                </div>
              </div>

              {/* Success Message */}
              {messageSent && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-[var(--color-success)]">
                  Message sent successfully!
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}