import { FiStar } from 'react-icons/fi';

interface RatingStarsProps {
  rate: number;
  count: number;
}

export function RatingStars({ rate, count }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-label={`${rate} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.round(rate);
          return (
            <FiStar
              key={star}
              className={`h-4 w-4 ${filled ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
            />
          );
        })}
      </div>
      <span className="text-xs text-slate-500">({count})</span>
    </div>
  );
}
