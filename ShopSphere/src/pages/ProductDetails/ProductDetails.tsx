import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getProductById } from '../../services/api';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { useCart } from '../../hooks/useCart';
import { RatingStars } from '../../components/RatingStars/RatingStars';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import { Button } from '../../components/Button/Button';
import { EmptyState } from '../../components/EmptyState/EmptyState';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      setQuantity(1);
      try {
        const data = await getProductById(Number(id));
        if (!cancelled) {
          setProduct(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Product not found';
          setError(message);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleAddToCart() {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${quantity}x ${product.title} added to cart`);
    }
  }

  if (loading) {
    return (
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to products
        </Link>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-xl bg-slate-200" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to products
        </Link>
        <div className="mt-8">
          <EmptyState type="error" message={error ?? 'Product not found.'} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium capitalize text-primary">
            {product.category}
          </span>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            {product.title}
          </h1>

          <div className="mt-3">
            <RatingStars
              rate={product.rating.rate}
              count={product.rating.count}
            />
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            {formatCurrency(product.price)}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {product.description}
          </p>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Quantity
            </label>
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>

          <Button
            size="lg"
            className="mt-6"
            onClick={handleAddToCart}
            aria-label={`Add ${quantity} ${product.title} to cart`}
          >
            <FiShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
