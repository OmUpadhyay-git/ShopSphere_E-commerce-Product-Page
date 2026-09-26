# ShopSphere – Architecture Document

## 1. Architecture Overview

ShopSphere follows a component-based React frontend architecture.

The application separates:

- UI components
- Pages
- Global state
- API communication
- Utility functions
- Custom hooks
- Type definitions

The architecture should remain simple enough for a student project while being structured according to real-world frontend development practices.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | React |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router |
| State Management | React Context API |
| API Client | Axios |
| Data Source | Fake Store API |
| Persistence | localStorage |
| Icons | React Icons |
| Notifications | React Hot Toast |
| Animation | Framer Motion |
| Deployment | Vercel / Netlify |

---

## 3. High-Level Data Flow

Fake Store API
        |
        v
API Service
        |
        v
Product Data
        |
        v
Product Hooks
        |
        v
Product Pages
        |
        | Add to Cart
        v
Cart Context
        |
        +-------------------+
        |                   |
        v                   v
Navbar Cart Badge       Cart Page
                            |
                            v
                    Price Calculations
                            |
                            v
                       Checkout

Cart Context
      |
      v
localStorage
      |
      v
Application Reload
      |
      v
Cart Rehydration

---

## 4. Folder Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── ProductCard/
│   ├── ProductGrid/
│   ├── SearchBar/
│   ├── CategoryFilter/
│   ├── QuantitySelector/
│   ├── CartItem/
│   ├── CartSummary/
│   ├── LoadingSkeleton/
│   ├── EmptyState/
│   ├── RatingStars/
│   └── Button/
│
├── pages/
│   ├── Home/
│   ├── ProductDetails/
│   ├── Cart/
│   ├── Checkout/
│   └── NotFound/
│
├── layouts/
│   └── MainLayout/
│
├── context/
│   └── CartContext.tsx
│
├── hooks/
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useDebounce.ts
│
├── services/
│   └── api.ts
│
├── utils/
│   ├── calculations.ts
│   ├── storage.ts
│   └── currency.ts
│
├── types/
│   └── product.ts
│
├── routes/
│   └── AppRoutes.tsx
│
├── App.tsx
├── main.tsx
└── index.css