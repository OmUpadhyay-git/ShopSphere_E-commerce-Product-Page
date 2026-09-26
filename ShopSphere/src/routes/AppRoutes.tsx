import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout/MainLayout';

const Home = lazy(() =>
  import('../pages/Home/Home').then((m) => ({ default: m.Home })),
);
const ProductDetails = lazy(() =>
  import('../pages/ProductDetails/ProductDetails').then((m) => ({
    default: m.ProductDetails,
  })),
);
const Cart = lazy(() =>
  import('../pages/Cart/Cart').then((m) => ({ default: m.Cart })),
);
const Checkout = lazy(() =>
  import('../pages/Checkout/Checkout').then((m) => ({ default: m.Checkout })),
);
const NotFound = lazy(() =>
  import('../pages/NotFound/NotFound').then((m) => ({ default: m.NotFound })),
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<PageLoader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<PageLoader />}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
