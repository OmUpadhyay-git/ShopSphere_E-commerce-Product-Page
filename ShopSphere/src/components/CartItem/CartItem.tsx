import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import type { CartItem as CartItemType } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-6">
      <Link
        to={`/product/${product.id}`}
        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-32 sm:w-32"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-2"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-medium text-slate-900 hover:text-primary sm:text-base"
          >
            {product.title}
          </Link>
          <p className="mt-1 text-xs capitalize text-slate-500">
            {product.category}
          </p>
        </div>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <QuantitySelector
            value={quantity}
            onChange={(val) => {
              if (val > quantity) onIncrease(product.id);
              else onDecrease(product.id);
            }}
          />

          <div className="flex items-center gap-4">
            <span className="text-base font-bold text-slate-900 sm:text-lg">
              {formatCurrency(product.price * quantity)}
            </span>
            <button
              onClick={() => onRemove(product.id)}
              className="text-slate-400 transition-colors hover:text-red-600"
              aria-label={`Remove ${product.title} from cart`}
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
