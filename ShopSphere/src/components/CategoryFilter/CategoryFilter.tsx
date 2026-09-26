interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  loading?: boolean;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
  loading,
}: CategoryFilterProps) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-9 w-24 animate-pulse rounded-lg bg-slate-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('')}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          selected === ''
            ? 'bg-primary text-white'
            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
            selected === category
              ? 'bg-primary text-white'
              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
