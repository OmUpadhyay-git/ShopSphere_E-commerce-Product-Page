import { useState } from 'react';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/currency';
import { Button } from '../../components/Button/Button';

const checkoutSchema = yup.object({
  fullName: yup.string().required('Full name is required').min(2, 'Full name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  address: yup.string().required('Address is required').min(5, 'Address must be at least 5 characters'),
  city: yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  postalCode: yup.string().required('Postal code is required').min(3, 'Postal code must be at least 3 characters'),
  country: yup.string().required('Country is required').min(2, 'Country must be at least 2 characters'),
});

export function Checkout() {
  const {
    items,
    totalItems,
    subtotal,
    tax,
    shipping,
    grandTotal,
    clearCart,
  } = useCart();

  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleComplete() {
    clearCart();
    setCompleted(true);
  }

  const validateForm = async (): Promise<boolean> => {
    setFormErrors({});
    try {
      await checkoutSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (err) {
      const yupError = err as yup.ErrorValues;
      setFormErrors(yupError.inner?.reduce((acc: Record<string, string>, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {}));
      return false;
    }
  };

  if (items.length === 0 && !completed) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-2xl font-bold text-slate-900">No items to checkout</h1>
        <p className="mt-2 text-slate-600">Add some products first.</p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <FiCheckCircle className="h-16 w-16 text-green-600" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-center text-slate-600">
          Thank you for your order. This is a demo checkout — no real payment
          was processed.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/cart"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-slate-900">Checkout</h1>

      <form
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault();
          if (await validateForm()) {
            setIsSubmitting(true);
            try {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 1000));
              handleComplete();
              setCompleted(true);
            } catch (err) {
              // Error already handled by interceptor
            } finally {
              setIsSubmitting(false);
            }
          }
        }}
      >
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">
              Order Review ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h2>

            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-1 justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.product.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Summary</h2>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
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

              {Object.keys(formErrors).length > 0 && (
                <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-400 text-red-800">
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.values(formErrors).map((msg: string) => (
                      <li key={msg}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                size="lg"
                className="mt-6 w-full"
                type="submit"
                disabled={isSubmitting}
              >
                <FiCheckCircle className="h-5 w-5" />
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </Button>

              <p className="mt-3 text-center text-xs text-slate-500">
                This is a simulated checkout. No real payment is processed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="font-medium text-slate-900 mb-3">Customer Information</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}