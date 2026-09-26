import { FiMinus, FiPlus } from 'react-icons/fi';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  function handleDecrease() {
    if (value > min) onChange(value - 1);
  }

  function handleIncrease() {
    if (value < max) onChange(value + 1);
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDecrease}
        disabled={value <= min}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <FiMinus className="h-4 w-4" />
      </button>
      <span
        className="w-10 text-center text-sm font-medium text-slate-900"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        onClick={handleIncrease}
        disabled={value >= max}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Increase quantity"
      >
        <FiPlus className="h-4 w-4" />
      </button>
    </div>
  );
}
