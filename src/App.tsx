// Root application component
// Main app with router and providers

import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { router } from './routes/AppRoutes';
import './App.css';

export function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
