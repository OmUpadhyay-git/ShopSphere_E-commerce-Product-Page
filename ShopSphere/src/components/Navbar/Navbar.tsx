import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartContext } from '../../context/CartContext';

export function Navbar() {
  const { totalItems } = useCartContext();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold text-primary">
          ShopSphere
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="relative text-slate-600 hover:text-primary"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <FiShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
