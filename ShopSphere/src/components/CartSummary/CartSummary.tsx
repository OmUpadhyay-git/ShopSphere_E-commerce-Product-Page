import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
  totalItems: number;
}

export function CartSummary({
  subtotal,
  tax,
  shipping,
  grandTotal,
  totalItems,
}: CartSummaryProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Items ({totalItems})</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Tax (10%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>
        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      <Link
        to="/checkout"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
