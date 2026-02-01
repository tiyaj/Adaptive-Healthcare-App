import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  ChevronLeft,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Book,
  Video,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  Clock,
  CheckCircle,
} from 'lucide-react';

export function HelpSupport() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const faqs = [
    {
      question: 'How do I add a new medication?',
      answer:
        'Go to the Medications page and click the "Add Medication" button. Fill in the medication details including name, dosage, frequency, and time. You can also add photos and set up custom reminders.',
    },
    {
      question: 'How do I invite someone to my Care Circle?',
      answer:
        'Navigate to Settings > Care Circle > Manage Members. Click "Invite Member" and enter their email address. They will receive an invitation to join your care circle and can choose what data to share.',
    },
    {
      question: 'Can I track multiple medications at once?',
      answer:
        'Yes! CareFlow supports unlimited medications. Each medication can have its own schedule, reminders, and tracking settings. You can view all medications in a single dashboard.',
    },
    {
      question: 'How do medication reminders work?',
      answer:
        'CareFlow sends push notifications based on your medication schedule. You can customize reminder timing (15 min, 30 min, 1 hour before, or at scheduled time) in Settings > Reminder Preferences.',
    },
    {
      question: 'Is my health data secure and private?',
      answer:
        'Absolutely. CareFlow uses end-to-end encryption for all health data. We are HIPAA-compliant and never share your data without explicit permission. You can review our privacy settings anytime in Settings > Privacy & Security.',
    },
    {
      question: 'How do I log meals and track food interactions?',
      answer:
        'Use the Meal Log feature to take photos of your meals or manually enter food items. CareFlow\'s AI will analyze potential interactions with your medications and provide warnings if needed.',
    },
    {
      question: 'Can I export my health data?',
      answer:
        'Yes! Go to Settings > Privacy & Security > Data & Storage. You can export your data in multiple formats including JSON, PDF, CSV, or HIPAA-compliant medical records.',
    },
    {
      question: 'How do I connect my pharmacy?',
      answer:
        'Visit the Pharmacy Finder page, search for your pharmacy, and click "Link Pharmacy". This enables features like automatic refill reminders and delivery tracking.',
    },
    {
      question: 'What should I do if I miss a dose?',
      answer:
        'Mark the missed dose in your medication log. CareFlow will adjust your schedule and notify your care circle if you\'ve enabled sharing. Never double up on doses without consulting your doctor.',
    },
    {
      question: 'How do I change my notification preferences?',
      answer:
        'Go to Settings > Notifications to customize which alerts you receive. You can enable/disable medication reminders, email notifications, care circle messages, and pharmacy updates.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
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
            <h1 className="text-3xl font-bold">Help & Support</h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              Get answers to your questions and connect with our support team
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <Card className="bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Message Sent!</h3>
                <p className="text-sm text-green-700 mt-1">
                  Our support team will get back to you within 24 hours.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Live Chat</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">
                Chat with our support team
              </p>
              <Button variant="secondary" fullWidth size="sm">
                Start Chat
              </Button>
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Email Support</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">
                support@careflow.com
              </p>
              <Button variant="secondary" fullWidth size="sm">
                Send Email
              </Button>
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Call Us</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">
                1-800-CAREFLOW
              </p>
              <Button variant="secondary" fullWidth size="sm">
                Call Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Support Hours */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Support Hours</h3>
              <p className="text-sm text-blue-800 mt-1">
                Monday - Friday: 8:00 AM - 8:00 PM EST | Saturday - Sunday: 9:00 AM - 5:00 PM EST
              </p>
            </div>
          </div>
        </Card>

        {/* Resources */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Book className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Learning Resources</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Video className="w-6 h-6 text-blue-600" />
                <h4 className="font-semibold">Video Tutorials</h4>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Step-by-step guides for all features
              </p>
            </button>

            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Book className="w-6 h-6 text-green-600" />
                <h4 className="font-semibold">User Guide</h4>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Complete documentation and best practices
              </p>
            </button>

            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold">Community Forum</h4>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Connect with other CareFlow users
              </p>
            </button>

            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-6 h-6 text-orange-600" />
                <h4 className="font-semibold">Getting Started</h4>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Quick start guide for new users
              </p>
            </button>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-[var(--color-text-muted)] border-t border-gray-200 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-[var(--color-text-muted)]">
                No FAQs found matching "{searchQuery}"
              </p>
            </div>
          )}
        </Card>

        {/* Contact Form */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold">Send Us a Message</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="How can we help?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Tell us more about your question or issue..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-lg resize-none"
              />
            </div>

            <Button variant="primary" fullWidth onClick={handleSubmit}>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
