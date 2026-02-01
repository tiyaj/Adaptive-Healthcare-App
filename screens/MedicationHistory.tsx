import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Pill } from '../components/ui/Pill';
import {
  ChevronLeft,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface MedicationHistoryEntry {
  id: number;
  medicationName: string;
  dose: string;
  scheduledTime: string;
  takenTime: string | null;
  status: 'taken' | 'missed' | 'skipped';
  date: string;
  notes?: string;
}

export function MedicationHistory() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);

  // Mock history data
  const historyData: MedicationHistoryEntry[] = [
    // Today
    {
      id: 1,
      medicationName: 'Lisinopril',
      dose: '10mg',
      scheduledTime: '8:00 AM',
      takenTime: '8:15 AM',
      status: 'taken',
      date: 'Today',
      notes: 'Taken with breakfast',
    },
    {
      id: 2,
      medicationName: 'Aspirin',
      dose: '81mg',
      scheduledTime: '8:00 AM',
      takenTime: '8:10 AM',
      status: 'taken',
      date: 'Today',
    },
    {
      id: 3,
      medicationName: 'Vitamin D3',
      dose: '2000 IU',
      scheduledTime: '8:00 AM',
      takenTime: '8:05 AM',
      status: 'taken',
      date: 'Today',
    },
    {
      id: 4,
      medicationName: 'Metformin',
      dose: '500mg',
      scheduledTime: '12:00 PM',
      takenTime: null,
      status: 'missed',
      date: 'Today',
      notes: 'Forgot to take at lunch',
    },
    // Yesterday
    {
      id: 5,
      medicationName: 'Lisinopril',
      dose: '10mg',
      scheduledTime: '8:00 AM',
      takenTime: '8:20 AM',
      status: 'taken',
      date: 'Yesterday',
    },
    {
      id: 6,
      medicationName: 'Metformin',
      dose: '500mg',
      scheduledTime: '12:00 PM',
      takenTime: '12:05 PM',
      status: 'taken',
      date: 'Yesterday',
    },
    {
      id: 7,
      medicationName: 'Atorvastatin',
      dose: '20mg',
      scheduledTime: '8:00 PM',
      takenTime: '8:30 PM',
      status: 'taken',
      date: 'Yesterday',
    },
    // 2 days ago
    {
      id: 8,
      medicationName: 'Lisinopril',
      dose: '10mg',
      scheduledTime: '8:00 AM',
      takenTime: '8:10 AM',
      status: 'taken',
      date: 'Jan 30',
    },
    {
      id: 9,
      medicationName: 'Metformin',
      dose: '500mg',
      scheduledTime: '12:00 PM',
      takenTime: null,
      status: 'skipped',
      date: 'Jan 30',
      notes: 'Intentionally skipped due to upset stomach',
    },
    {
      id: 10,
      medicationName: 'Atorvastatin',
      dose: '20mg',
      scheduledTime: '8:00 PM',
      takenTime: '8:15 PM',
      status: 'taken',
      date: 'Jan 30',
    },
    // 3 days ago
    {
      id: 11,
      medicationName: 'Lisinopril',
      dose: '10mg',
      scheduledTime: '8:00 AM',
      takenTime: '8:05 AM',
      status: 'taken',
      date: 'Jan 29',
    },
    {
      id: 12,
      medicationName: 'Metformin',
      dose: '500mg',
      scheduledTime: '12:00 PM',
      takenTime: '12:10 PM',
      status: 'taken',
      date: 'Jan 29',
    },
    {
      id: 13,
      medicationName: 'Atorvastatin',
      dose: '20mg',
      scheduledTime: '8:00 PM',
      takenTime: '8:05 PM',
      status: 'taken',
      date: 'Jan 29',
    },
  ];

  // Group by date
  const groupedHistory = historyData.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, MedicationHistoryEntry[]>);

  // Calculate stats
  const stats = {
    total: historyData.length,
    taken: historyData.filter((e) => e.status === 'taken').length,
    missed: historyData.filter((e) => e.status === 'missed').length,
    skipped: historyData.filter((e) => e.status === 'skipped').length,
    adherenceRate: Math.round((historyData.filter((e) => e.status === 'taken').length / historyData.length) * 100),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />;
      case 'missed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'skipped':
        return <XCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-green-50 border-green-200';
      case 'missed':
        return 'bg-red-50 border-red-200';
      case 'skipped':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/medications')}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Medications
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Medication History</h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Review your medication adherence and track patterns
              </p>
            </div>
            <Button variant="ghost">
              <Download className="w-5 h-5 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">{stats.total}</div>
              <div className="text-sm text-blue-600 mt-1">Total Doses</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">{stats.taken}</div>
              <div className="text-sm text-green-600 mt-1">Taken</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-700">{stats.missed}</div>
              <div className="text-sm text-red-600 mt-1">Missed</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-700">{stats.skipped}</div>
              <div className="text-sm text-orange-600 mt-1">Skipped</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700">{stats.adherenceRate}%</div>
              <div className="text-sm text-purple-600 mt-1">Adherence</div>
            </div>
          </Card>
        </div>

        {/* Adherence Trend */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">Adherence Trend</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Your medication compliance over time</p>
            </div>
            <TrendingUp className="w-6 h-6 text-[var(--color-accent)]" />
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Adherence</span>
              <span className="text-lg font-bold text-[var(--color-success)]">{stats.adherenceRate}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${stats.adherenceRate}%` }}
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              />
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Period:</span>
            <div className="flex gap-2">
              <Button
                variant={selectedPeriod === 'week' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('week')}
              >
                Last 7 Days
              </Button>
              <Button
                variant={selectedPeriod === 'month' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('month')}
              >
                Last 30 Days
              </Button>
              <Button
                variant={selectedPeriod === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('all')}
              >
                All Time
              </Button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-[var(--color-text-muted)]">Taken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-[var(--color-text-muted)]">Missed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-[var(--color-text-muted)]">Skipped</span>
            </div>
          </div>
        </Card>

        {/* History Timeline */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">History Timeline</h3>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([date, entries]) => (
              <div key={date}>
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-lg font-bold text-gray-900">{date}</div>
                  <div className="h-px flex-1 bg-gray-200"></div>
                  <Pill variant="default">
                    {entries.filter((e) => e.status === 'taken').length} / {entries.length} taken
                  </Pill>
                </div>

                {/* Entries for this date */}
                <div className="space-y-3 ml-4">
                  {entries.map((entry) => (
                    <div key={entry.id}>
                      <Card className={`border ${getStatusColor(entry.status)}`}>
                        <div className="flex items-start gap-4">
                          {/* Status Icon */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            {getStatusIcon(entry.status)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h4 className="font-bold text-lg">{entry.medicationName}</h4>
                                <p className="text-sm text-[var(--color-text-muted)]">{entry.dose}</p>
                              </div>
                              <Pill
                                variant={
                                  entry.status === 'taken'
                                    ? 'success'
                                    : entry.status === 'missed'
                                    ? 'alert'
                                    : 'warning'
                                }
                              >
                                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                              </Pill>
                            </div>

                            {/* Time Details */}
                            <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                              <div>
                                <span className="text-[var(--color-text-muted)]">Scheduled: </span>
                                <span className="font-medium">{entry.scheduledTime}</span>
                              </div>
                              {entry.takenTime && (
                                <div>
                                  <span className="text-[var(--color-text-muted)]">Taken: </span>
                                  <span className="font-medium text-[var(--color-success)]">
                                    {entry.takenTime}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Notes */}
                            {entry.notes && (
                              <button
                                onClick={() =>
                                  setExpandedEntry(expandedEntry === entry.id ? null : entry.id)
                                }
                                className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
                              >
                                {expandedEntry === entry.id ? (
                                  <>
                                    <ChevronUp className="w-4 h-4" />
                                    Hide notes
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-4 h-4" />
                                    View notes
                                  </>
                                )}
                              </button>
                            )}

                            {expandedEntry === entry.id && entry.notes && (
                              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-700">{entry.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="primary" fullWidth onClick={() => navigate('/medications')}>
            Back to Medications
          </Button>
          <Button variant="secondary" onClick={() => alert('Exporting data...')}>
            <Download className="w-5 h-5 mr-2" />
            Export as PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
