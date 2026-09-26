import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useProducts, useCategories } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import { useCart } from '../../hooks/useCart';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { LoadingSkeleton } from '../../components/LoadingSkeleton/LoadingSkeleton';
import { EmptyState } from '../../components/EmptyState/EmptyState';

export function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { addToCart } = useCart();

  const {
    products,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts(selectedCategory || undefined);

  const { categories, loading: categoriesLoading } = useCategories();

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return products;
    const query = debouncedSearch.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    );
  }, [products, debouncedSearch]);

  function handleAddToCart(product: { id: number; title: string }) {
    addToCart(product as never);
    toast.success(`${product.title} added to cart`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        <p className="mt-1 text-sm text-slate-600">
          Browse our collection of products
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          loading={categoriesLoading}
        />
      </div>

      {productsLoading && <LoadingSkeleton count={8} />}

      {productsError && (
        <EmptyState
          type="error"
          message={productsError}
          onRetry={refetchProducts}
        />
      )}

      {!productsLoading && !productsError && filteredProducts.length === 0 && (
        <EmptyState
          type={debouncedSearch ? 'no-results' : 'empty'}
          onClear={debouncedSearch ? () => setSearch('') : undefined}
        />
      )}

      {!productsLoading && !productsError && filteredProducts.length > 0 && (
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
