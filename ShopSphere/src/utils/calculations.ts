const TAX_RATE = 0.1;
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 9.99;

export function calculateSubtotal(items: { price: number; quantity: number }[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function calculateGrandTotal(subtotal: number): number {
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  return Math.round((subtotal + tax + shipping) * 100) / 100;
}
