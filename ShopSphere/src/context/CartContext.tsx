/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types/product';
import { loadCart, saveCart } from '../utils/storage';
import {
  calculateSubtotal,
  calculateTax,
  calculateShipping,
  calculateGrandTotal,
} from '../utils/calculations';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'INCREASE_QUANTITY'; productId: number }
  | { type: 'DECREASE_QUANTITY'; productId: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (item) => item.product.id === action.product.id,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item,
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: action.quantity }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    case 'INCREASE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.product.id === action.productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    const saved = loadCart();
    return saved;
  });

  useEffect(() => {
    saveCart(state);
  }, [state]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const itemsForCalc = state.items.map((item) => ({
    price: item.product.price,
    quantity: item.quantity,
  }));
  const subtotal = calculateSubtotal(itemsForCalc);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const grandTotal = calculateGrandTotal(subtotal);

  function addToCart(product: Product, quantity: number = 1) {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  }

  function removeFromCart(productId: number) {
    dispatch({ type: 'REMOVE_ITEM', productId });
  }

  function increaseQuantity(productId: number) {
    dispatch({ type: 'INCREASE_QUANTITY', productId });
  }

  function decreaseQuantity(productId: number) {
    dispatch({ type: 'DECREASE_QUANTITY', productId });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        tax,
        shipping,
        grandTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
