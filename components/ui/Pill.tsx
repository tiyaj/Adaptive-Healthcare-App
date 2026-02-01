import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PillProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'alert';
  onClick?: () => void;
}

export function Pill({ children, variant = 'default', onClick }: PillProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-[var(--color-text-muted)]',
    success: 'bg-green-50 text-[var(--color-success)]',
    warning: 'bg-orange-50 text-[var(--color-warning)]',
    alert: 'bg-red-50 text-[var(--color-alert)]',
  };

  const clickableClass = onClick ? 'cursor-pointer hover:opacity-80' : '';

  return (
    <motion.div
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${variantStyles[variant]} ${clickableClass}`}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.95 } : {}}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
