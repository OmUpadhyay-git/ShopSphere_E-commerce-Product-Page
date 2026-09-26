import type { Cart } from '../types/product';

const STORAGE_KEY = 'shopsphere_cart';

export function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    const validItems = parsed.items.filter(
      (item: unknown): item is { product: { id: number; title: string; price: number; description: string; category: string; image: string; rating: { rate: number; count: number } }; quantity: number } => {
        if (!item || typeof item !== 'object') return false;
        const obj = item as Record<string, unknown>;
        if (!obj.product || typeof obj.product !== 'object') return false;
        const p = obj.product as Record<string, unknown>;
        if (
          typeof p.id !== 'number' ||
          typeof p.title !== 'string' ||
          typeof p.price !== 'number' ||
          typeof p.description !== 'string' ||
          typeof p.category !== 'string' ||
          typeof p.image !== 'string' ||
          !p.rating ||
          typeof p.rating !== 'object'
        )
          return false;
        const r = p.rating as Record<string, unknown>;
        if (typeof r.rate !== 'number' || typeof r.count !== 'number') return false;
        if (typeof obj.quantity !== 'number' || obj.quantity < 1) return false;
        return true;
      },
    );
    return { items: validItems };
  } catch {
    return { items: [] };
  }
}

export function saveCart(cart: Cart): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Silently ignore storage errors
  }
}

export function clearStoredCart(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently ignore storage errors
  }
}
