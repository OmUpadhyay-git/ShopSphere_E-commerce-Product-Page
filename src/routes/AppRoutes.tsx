// Routes configuration
// React Router route definitions and path mapping

import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { ProductDetails } from '../pages/ProductDetails/ProductDetails';
import { Cart } from '../pages/Cart/Cart';
import { Checkout } from '../pages/Checkout/Checkout';
import { NotFound } from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/product/:id',
    element: <ProductDetails />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
