import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../components/CartItem/CartItem';
import { CartSummary } from '../../components/CartSummary/CartSummary';
import { Button } from '../../components/Button/Button';

export function Cart() {
  const {
    items,
    totalItems,
    subtotal,
    tax,
    shipping,
    grandTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <FiShoppingBag className="h-16 w-16 text-slate-300" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-slate-600">
          Add some products to get started.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>
        <Button variant="secondary" size="sm" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            grandTotal={grandTotal}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
}
