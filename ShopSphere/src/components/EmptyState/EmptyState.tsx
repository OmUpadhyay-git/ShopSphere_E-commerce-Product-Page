import type { ReactNode } from 'react';
import { FiAlertCircle, FiSearch } from 'react-icons/fi';
import { Button } from '../Button/Button';

interface EmptyStateProps {
  type?: 'empty' | 'error' | 'no-results';
  message?: string;
  onRetry?: () => void;
  onClear?: () => void;
  icon?: ReactNode;
}

const defaultConfig = {
  empty: {
    icon: <FiSearch className="h-12 w-12 text-slate-400" />,
    message: 'No products available.',
  },
  'no-results': {
    icon: <FiSearch className="h-12 w-12 text-slate-400" />,
    message: 'No products match your search.',
  },
  error: {
    icon: <FiAlertCircle className="h-12 w-12 text-red-500" />,
    message: 'Something went wrong.',
  },
};

export function EmptyState({
  type = 'empty',
  message,
  onRetry,
  onClear,
  icon,
}: EmptyStateProps) {
  const config = defaultConfig[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon ?? config.icon}
      <p className="mt-4 text-lg font-medium text-slate-700">
        {message ?? config.message}
      </p>
      <div className="mt-4 flex gap-3">
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            Retry
          </Button>
        )}
        {onClear && (
          <Button onClick={onClear} variant="secondary">
            Clear Search
          </Button>
        )}
      </div>
    </div>
  );
}
