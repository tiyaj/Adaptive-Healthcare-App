import { useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-2xl mb-2">Page Not Found</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/dashboard')} variant="primary">
          <Home className="w-5 h-5 mr-2" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
