import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { RatingStars } from '../RatingStars/RatingStars';
import { Button } from '../Button/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden rounded-t-xl bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-slate-900 hover:text-primary">
            {product.title}
          </h3>
        </Link>

        <p className="mt-1 text-xs capitalize text-slate-500">
          {product.category}
        </p>

        <div className="mt-2">
          <RatingStars rate={product.rating.rate} count={product.rating.count} />
        </div>

        <p className="mt-2 text-lg font-bold text-slate-900">
          {formatCurrency(product.price)}
        </p>

        <Button
          className="mt-3 w-full"
          onClick={() => onAddToCart?.(product)}
          aria-label={`Add ${product.title} to cart`}
        >
          <FiShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
