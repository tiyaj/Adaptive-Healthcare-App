import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Heart } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - store user data
    localStorage.setItem('careflow_user', JSON.stringify({ email, loggedIn: true }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary-bg)] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Brand Mark */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent)] mb-4"
          >
            <Heart className="w-8 h-8 text-[var(--color-primary-bg)]" fill="currentColor" />
          </motion.div>
          <h1 className="text-3xl text-white mb-2">CareFlow</h1>
          <p className="text-gray-400 text-sm">Healthcare that fits your life</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" fullWidth>
            Log In
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/signup')}
            className="text-[var(--color-accent)] hover:underline text-sm"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
}
