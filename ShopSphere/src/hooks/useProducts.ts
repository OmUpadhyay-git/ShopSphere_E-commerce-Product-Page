import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/product';
import {
  getProducts as fetchProducts,
  getProductsByCategory as fetchProductsByCategory,
  getCategories as fetchCategories,
} from '../services/api';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(category?: string) {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: true,
    error: null,
  });

  const loadProducts = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = category
        ? await fetchProductsByCategory(category)
        : await fetchProducts();
      setState({ products: data, loading: false, error: null });
    } catch (err) {
      console.error('Failed to fetch products', err);
      const message = err instanceof Error ? err.message : 'Unable to load products';
      setState({
        products: [],
        loading: false,
        error: message,
      });
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { ...state, refetch: loadProducts };
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCategories();
        if (!cancelled) {
          setCategories(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to fetch categories';
          setError(message);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading, error };
}
