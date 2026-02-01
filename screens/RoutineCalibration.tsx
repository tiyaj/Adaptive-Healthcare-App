import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ChevronLeft, Sun, Sunrise, Sunset, Moon } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: 'When do you usually wake up?',
    icon: Sunrise,
    options: ['Before 6am', '6-8am', '8-10am', 'After 10am'],
  },
  {
    id: 2,
    question: 'When do you typically have meals?',
    icon: Sun,
    options: ['Regular schedule', 'Varies daily', 'Skip meals often', 'Late night eater'],
  },
  {
    id: 3,
    question: 'When do you go to bed?',
    icon: Moon,
    options: ['Before 10pm', '10pm-midnight', 'After midnight', 'No fixed time'],
  },
];

export function RoutineCalibration() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('careflow_routine', JSON.stringify(newAnswers));
      navigate('/dashboard');
    }
  };

  const question = QUESTIONS[currentQ];
  const Icon = question.icon;

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)] p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => currentQ > 0 ? setCurrentQ(currentQ - 1) : navigate('/onboarding/care-circle')}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Progress */}
        <div className="mb-8">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-[var(--color-accent)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <p className="text-sm text-[var(--color-text-muted)] text-center">
            Question {currentQ + 1} of {QUESTIONS.length}
          </p>
        </div>

        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-accent)] bg-opacity-20 mb-4"
            >
              <Icon className="w-10 h-10 text-[var(--color-accent)]" />
            </motion.div>
            <h2 className="text-2xl mb-2">{question.question}</h2>
            <p className="text-[var(--color-text-muted)]">
              This helps us remind you at the right times
            </p>
          </div>

          <div className="grid gap-3">
            {question.options.map((option, i) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                onClick={() => handleAnswer(option)}
                className="w-full p-5 rounded-xl bg-white border-2 border-gray-200 hover:border-[var(--color-accent)] hover:bg-yellow-50 transition-all text-left"
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium">{option}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
