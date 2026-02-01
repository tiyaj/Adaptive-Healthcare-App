import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronLeft, Camera, Loader, AlertCircle, TrendingUp, Utensils, Pill } from 'lucide-react';

interface MealAnalysis {
  items: string[];
  calories: number;
  warnings: string[];
  detectedType: 'food' | 'medicine';
  expectedType: 'food' | 'medicine';
  confidence: number;
  nutrients?: string[];
  isCorrectType: boolean;
}

export function MealLog() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [showRestrictionAlert, setShowRestrictionAlert] = useState(false);
  const [expectedType, setExpectedType] = useState<'food' | 'medicine'>('food');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with random detection
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // 75% chance of correct detection, 25% wrong for demo
    const detectedType: 'food' | 'medicine' = Math.random() > 0.25 ? expectedType : (expectedType === 'food' ? 'medicine' : 'food');
    const isCorrectType = detectedType === expectedType;
    
    if (detectedType === 'food') {
      const foodItems = ['Grilled chicken breast', 'Brown rice', 'Steamed broccoli', 'Mixed salad', 'Sweet potato'];
      const nutrients = ['Protein: 35g', 'Carbs: 48g', 'Fiber: 9g', 'Vitamin C: 95mg', 'Iron: 3mg'];
      const warnings: string[] = [];
      
      // Add nutrient warnings
      if (Math.random() > 0.6) warnings.push('⚠️ High sodium detected (950mg) - May affect blood pressure management');
      if (Math.random() > 0.7) warnings.push('⚠️ High sugar content (32g) - Monitor blood glucose levels');
      if (Math.random() > 0.8) warnings.push('⚠️ High saturated fat (12g) - Consider heart health');
      
      // Critical warning if wrong type
      if (!isCorrectType) {
        warnings.unshift('🚨 CRITICAL ERROR: This appears to be MEDICATION, not food!', 
                         '⛔ Please log medications in the Medications section for safety!',
                         '⚠️ Do not consume medications as food!');
      }
      
      if (warnings.length === 0) {
        warnings.push('✅ No dietary warnings - This meal looks healthy!');
      }
      
      const mockAnalysis: MealAnalysis = {
        items: foodItems.slice(0, 2 + Math.floor(Math.random() * 2)),
        calories: 380 + Math.floor(Math.random() * 150),
        warnings,
        detectedType: 'food',
        expectedType,
        confidence: 87 + Math.floor(Math.random() * 10),
        nutrients: nutrients.slice(0, 4),
        isCorrectType
      };
      
      setIsAnalyzing(false);
      setAnalysis(mockAnalysis);
      
      if (mockAnalysis.warnings.length > 0 || !isCorrectType) {
        setShowRestrictionAlert(true);
      }
    } else {
      // Detected as medicine
      const mockAnalysis: MealAnalysis = {
        items: ['Metformin 500mg', 'Lisinopril 10mg', 'Vitamin D3'],
        calories: 0,
        warnings: [
          '🚨 MEDICATION DETECTED!',
          '⛔ This appears to be medication, NOT food!',
          'Please log this in the Medications section instead.',
          '⚠️ Medications should not be logged as meals.',
          '⚠️ Consult your doctor about medication timing with food.'
        ],
        detectedType: 'medicine',
        expectedType,
        confidence: 92 + Math.floor(Math.random() * 6),
        isCorrectType
      };
      
      setIsAnalyzing(false);
      setAnalysis(mockAnalysis);
      setShowRestrictionAlert(true);
    }
  };

  const todayMeals = [
    { time: 'Breakfast - 8:30 AM', calories: 320, items: ['Oatmeal', 'Banana', 'Coffee'] },
    { time: 'Snack - 11:00 AM', calories: 150, items: ['Apple', 'Almonds'] },
  ];

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
        <div>
          <h1 className="text-3xl mb-2">Meal Log</h1>
          <p className="text-[var(--color-text-muted)]">Track your meals and nutrition</p>
        </div>

        {/* Restricted Food Alert */}
        <AnimatePresence>
          {showRestrictionAlert && analysis && analysis.warnings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Card className="bg-orange-50 border-2 border-[var(--color-warning)]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-warning)] bg-opacity-20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-[var(--color-warning)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">Heads up</h3>
                    {analysis.warnings.map((warning, i) => (
                      <p key={i} className="text-sm text-[var(--color-text-primary)] mb-2">
                        {warning}
                      </p>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowRestrictionAlert(false)}
                    >
                      Got it
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Camera Capture */}
        <Card>
          <div className="text-center py-8">
            {/* Type Selector */}
            {!isAnalyzing && !analysis && (
              <div className="mb-6">
                <p className="text-sm text-[var(--color-text-muted)] mb-3">What are you logging?</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setExpectedType('food')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                      expectedType === 'food'
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] bg-opacity-10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Utensils className={`w-5 h-5 ${expectedType === 'food' ? 'text-[var(--color-accent)]' : 'text-gray-500'}`} />
                    <span className={`font-semibold ${expectedType === 'food' ? 'text-[var(--color-accent)]' : 'text-gray-700'}`}>food</span>
                  </button>
                  <button
                    onClick={() => setExpectedType('medicine')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                      expectedType === 'medicine'
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] bg-opacity-10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Pill className={`w-5 h-5 ${expectedType === 'medicine' ? 'text-[var(--color-accent)]' : 'text-gray-500'}`} />
                    <span className={`font-semibold ${expectedType === 'medicine' ? 'text-[var(--color-accent)]' : 'text-gray-700'}`}>Medicine</span>
                  </button>
                </div>
              </div>
            )}

            {isAnalyzing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <Loader className="w-12 h-12 text-[var(--color-accent)]" />
                </motion.div>
                <p className="text-[var(--color-text-muted)]">Analyzing your meal...</p>
              </motion.div>
            ) : analysis ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-[var(--color-success)]" />
                </div>
                <h3 className="text-xl mb-4">Meal Analyzed</h3>
                <div className="text-left bg-gray-50 rounded-xl p-4 max-w-md mx-auto">
                  <div className="mb-3">
                    <div className="text-sm text-[var(--color-text-muted)] mb-2">Detected items:</div>
                    <ul className="space-y-1">
                      {analysis.items.map((item, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-[var(--color-text-muted)]">Estimated calories</div>
                    <div className="text-2xl font-semibold text-[var(--color-accent)]">{analysis.calories}</div>
                  </div>
                </div>
                <div className="flex gap-3 justify-center mt-6">
                  <Button variant="primary" onClick={() => {
                    setAnalysis(null);
                    setShowRestrictionAlert(false);
                  }}>
                    Confirm
                  </Button>
                  <Button variant="ghost" onClick={() => {
                    setAnalysis(null);
                    setShowRestrictionAlert(false);
                  }}>
                    Retake
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  id="photoCapture"
                  onChange={handlePhotoCapture}
                />
                <motion.label
                  htmlFor="photoCapture"
                  className="w-20 h-20 rounded-full bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-4 hover:opacity-90 transition-opacity cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="w-10 h-10 text-[var(--color-primary-bg)]" />
                </motion.label>
                <h3 className="text-xl mb-2">
                  {expectedType === 'food' ? 'Capture Your Food' : 'Capture Your Medicine'}
                </h3>
                <p className="text-[var(--color-text-muted)]">
                  Take a photo for AI-powered {expectedType === 'food' ? 'nutrition' : 'medication'} analysis
                </p>
              </>
            )}
          </div>
        </Card>

        {/* Today's Summary */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Today's Meals</h3>
            <div className="text-right">
              <div className="text-2xl font-semibold">{todayMeals.reduce((sum, meal) => sum + meal.calories, 0)}</div>
              <div className="text-sm text-[var(--color-text-muted)]">calories</div>
            </div>
          </div>
          <div className="space-y-3">
            {todayMeals.map((meal, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{meal.time}</div>
                  <div className="text-sm text-[var(--color-accent)]">{meal.calories} cal</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {meal.items.map((item, j) => (
                    <span key={j} className="text-xs bg-white px-2 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Trend */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
            <h3 className="text-lg">Weekly Average</h3>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-semibold mb-2">1,850</div>
            <div className="text-[var(--color-text-muted)]">calories per day</div>
            <div className="mt-4 h-24 flex items-end justify-between gap-2">
              {[1600, 1900, 1750, 2100, 1800, 1950, 1700].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 2200) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex-1 bg-[var(--color-accent)] rounded-t"
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}