# ShopSphere – Development Phases

## Development Strategy

Build ShopSphere incrementally.

Never attempt to implement the entire application in one step.

Each phase must be completed, tested, and verified before moving to the next phase.

---

# Phase 0 – Project Setup

## Objectives

Create the basic development environment.

## Tasks

- Create Vite React TypeScript project.
- Configure Tailwind CSS.
- Configure ESLint.
- Configure Prettier.
- Install required dependencies.
- Create initial folder structure.
- Configure application entry point.
- Create basic layout.

## Expected Result

Application starts successfully with:

```text
npm run dev
```

The application shell (layout, navbar, footer) renders with no console errors, and `npm run build` completes without errors.

## Requirement Basis

- SRS §2.4 Operating Environment (modern browsers, client-side rendering)
- SRS §6.4 Coding Standards (TypeScript, ESLint, Prettier)
- Architecture.md §2 Technology Stack

---

# Phase 1 – Types & API Layer

## Objectives

Define the data model and centralized API communication.

## Tasks

- `src/types/product.ts`: `Product`, `CartItem`, `Cart` types (SRS §5.1, §5.2)
- `src/services/api.ts`: Axios client with endpoints `/products`, `/products/{id}`, `/products/categories`, `/products/category/{category}` (SRS §6.1)
- `src/hooks/useProducts.ts`: product fetching with loading/success/error states
- `src/hooks/useDebounce.ts`: 300ms debounce hook (PRD §5.3)

## Expected Result

TypeScript compiles. API functions are typed and centralized. Hooks return typed loading/error/data states.

## Requirement Basis

- SRS §5.1, §5.2, §6.1, §6.4
- PRD §5.1, §5.3, §8 (maintainability), §5.10 (error handling)
- Rules.md §6 (API rules)
- Architecture.md §4 (folder structure)

---

# Phase 2 – Routing, Layout & Shell

## Objectives

Create the application shell: routing, main layout, navbar, and footer.

## Tasks

- `index.html`: title and mount point
- `src/main.tsx`: application entry point (StrictMode)
- `src/App.tsx`: `CartProvider` + router wiring
- `src/routes/AppRoutes.tsx`: routes `/`, `/product/:id`, `/cart`, `/checkout`, `*` → NotFound
- `src/layouts/MainLayout`: navbar + outlet + footer
- `src/components/Navbar`: ShopSphere logo/name, Home link, search (where appropriate), cart icon with item count
- `src/components/Footer`

## Expected Result

All five routes render within the layout. Cart badge shows 0. No console errors.

## Requirement Basis

- PRD §6 (pages), §7 (navigation)
- SRS §3.1.1 (user interfaces, navbar requirements)
- Architecture.md §3 (data flow), §4 (folder structure)

---

# Phase 3 – Home Catalog, Search & Filter

## Objectives

Implement the product catalog with search and category filtering.

## Tasks

- `src/pages/Home`: catalog page combining search, filter, and grid
- `src/components/ProductCard`: image, title, category, price, rating, Add to Cart, View Details
- `src/components/ProductGrid`: responsive grid
- `src/components/SearchBar`: debounced (300ms), case-insensitive, clearable (PRD §5.3)
- `src/components/CategoryFilter`: "All Products" + categories from `/products/categories` (PRD §5.2)
- `src/components/RatingStars`
- `src/components/Button`
- `src/components/LoadingSkeleton`: skeleton loaders while fetching (PRD §5.9)
- `src/components/EmptyState`: no-match results and API error with retry (PRD §5.10)

## Expected Result

Products load from the API. Search and category filter combine correctly. Skeletons show during load. Error state offers retry. Empty state shows when nothing matches. Add to Cart works.

## Requirement Basis

- PRD §5.1–5.3, §5.9, §5.10, §9 (performance)
- SRS FR-001, FR-002, FR-003, FR-009, FR-010
- Rules.md §7 (error handling)

---

# Phase 4 – Product Details

## Objectives

Implement the dedicated product details page.

## Tasks

- `src/pages/ProductDetails`: image, title, category, description, price, rating, quantity selector, Add to Cart, navigation back to catalog (PRD §5.4)
- `src/components/QuantitySelector`
- Invalid product ID handling → friendly not-found state (PRD §5.10)
- Fetch product by ID through API layer

## Expected Result

Valid ID renders full details. Invalid ID shows friendly not-found state. Add to Cart uses selected quantity and merges with existing cart entry.

## Requirement Basis

- PRD §5.4, §5.10
- SRS FR-004, FR-010

---

# Phase 5 – Cart State & Persistence

## Objectives

Implement global cart state with derived totals and localStorage persistence.

## Tasks

- `src/context/CartContext.tsx`: `cartItems`, `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`; derived `totalItems`, `subtotal`, `tax`, `shipping`, `grandTotal` (PRD §8, SRS §6.2)
- `src/hooks/useCart.ts`: context consumer hook, throws outside provider
- `src/utils/storage.ts`: `shopsphere_cart` key; load/save/clear/validate; safe reset on invalid data (PRD §5.7, Rules §9)
- `src/utils/calculations.ts`: tax 10% of subtotal (2 decimals); shipping $0 if subtotal >= $100, else $9.99 — academic/demo policy per Design.md §3.17–3.18
- `src/utils/currency.ts`: price formatting via `Intl.NumberFormat` (USD, project/demo convention per Design.md §3.19)
- Duplicate prevention: adding an existing product increases quantity (PRD §5.5)

## Expected Result

Cart operations work. Totals are derived, never hardcoded. Cart persists across refresh. Corrupted localStorage is safely ignored and reset.

## Requirement Basis

- PRD §5.5–5.7, §8
- SRS FR-005, FR-006, FR-007, §5.2, §5.3, §6.2
- Rules.md §8 (state management), §9 (localStorage)

---

# Phase 6 – Cart Page

## Objectives

Implement the cart page with item management and summary.

## Tasks

- `src/pages/Cart`: item list, quantity controls, remove, clear cart, checkout link
- `src/components/CartItem`
- `src/components/CartSummary`: subtotal, tax, shipping, grand total
- Empty cart state with call to action

## Expected Result

Quantity never drops below 1 (except removal). Removing a product removes it entirely. Clear cart empties all items. Totals update correctly. Empty cart shows friendly state.

## Requirement Basis

- PRD §5.5, §5.6, §6
- SRS FR-005, FR-006

---

# Phase 7 – Checkout & Confirmation

## Objectives

Implement order review and simulated checkout completion.

## Tasks

- `src/pages/Checkout`: order review (products, quantities, item prices, subtotal, tax, shipping, grand total) (PRD §5.8)
- Simulated completion with success state — no real payment processing (PRD §5.8, Rules §14)
- Cart cleared after simulated completion

## Expected Result

Review matches cart totals. Completion shows a clear success state. Cart is cleared after completion.

## Requirement Basis

- PRD §5.8, §11 (out of scope: real payments)
- SRS FR-008
- Rules.md §14 (security: no payment information)

---

# Phase 8 – Polish & Final Verification

## Objectives

Responsive and accessibility audit, performance polish, and final verification.

## Tasks

- Responsive audit at 320px, 375px, 768px, 1024px, 1280px, 1440px (mobile-first)
- Accessibility audit: semantic HTML, labels, focus states, keyboard navigation (PRD §9, Rules §11)
- Lazy-load suitable pages (PRD §9)
- Framer Motion transitions per approved Design.md decisions
- Final `npm run build` and verification against PRD §12 Success Criteria

## Expected Result

All PRD §12 success criteria pass. No console errors. Build succeeds cleanly.

## Requirement Basis

- PRD §9 (non-functional), §12 (success criteria)
- SRS NFR-001 through NFR-005
- Rules.md §11 (accessibility), §17 (testing)

---

## Plan Status

Phases 1–8 constitute the proposed development plan approved on 2026-08-18. Phases must be implemented in order, and each phase must be verified before moving to the next.