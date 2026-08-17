# 🔍 FILE FINDER – Quick Lookup Guide

**Need to find a specific file? This guide helps you locate it quickly!**

---

## 🎯 Find Files by What You Need to Do

### "I want to find a UI component"
👉 Go to: [`src/components/`](./src/components/README.md)

**Common components:**
- Navigation bar → `Navbar/Navbar.tsx`
- Product display → `ProductCard/ProductCard.tsx`
- Shopping cart item → `CartItem/CartItem.tsx`
- Search box → `SearchBar/SearchBar.tsx`
- Category filter → `CategoryFilter/CategoryFilter.tsx`
- Quantity buttons → `QuantitySelector/QuantitySelector.tsx`
- Cart totals → `CartSummary/CartSummary.tsx`
- Loading placeholder → `LoadingSkeleton/LoadingSkeleton.tsx`
- Empty state → `EmptyState/EmptyState.tsx`
- Star ratings → `RatingStars/RatingStars.tsx`

### "I want to find a full page"
👉 Go to: [`src/pages/`](./src/pages/README.md)

**All pages:**
- Home/catalog → `Home/Home.tsx`
- Single product → `ProductDetails/ProductDetails.tsx`
- Shopping cart → `Cart/Cart.tsx`
- Checkout → `Checkout/Checkout.tsx`
- 404 page → `NotFound/NotFound.tsx`

### "I want to find a custom hook"
👉 Go to: [`src/hooks/`](./src/hooks/README.md)

**All hooks:**
- Access cart state → `useCart.ts`
- Fetch products → `useProducts.ts`
- Debounce values → `useDebounce.ts`

### "I want to find a utility function"
👉 Go to: [`src/utils/`](./src/utils/README.md)

**All utilities:**
- Calculate prices → `calculations.ts`
- Save/load cart → `storage.ts`
- Format money → `currency.ts`

### "I want to find global state"
👉 Go to: [`src/context/CartContext.tsx`](./src/context/README.md)

### "I want to find API functions"
👉 Go to: [`src/services/api.ts`](./src/services/README.md)

### "I want to find route definitions"
👉 Go to: [`src/routes/AppRoutes.tsx`](./src/routes/README.md)

### "I want to find type definitions"
👉 Go to: [`src/types/product.ts`](./src/types/README.md)

### "I want to find images/fonts"
👉 Go to: [`src/assets/`](./src/assets/README.md)

### "I want to find the main layout"
👉 Go to: [`src/layouts/MainLayout/`](./src/layouts/README.md)

---

## 🌳 Complete Directory Tree

```
ShopSphere/
│
├── 📖 Documentation (Read these first!)
│   ├── README.md                    ← Start here
│   ├── QUICK_REFERENCE.md           ← Daily guide
│   ├── FILE_ARCHITECTURE.md         ← Detailed structure
│   ├── DOCUMENTATION_INDEX.md       ← Find any docs
│   └── FILE_FINDER.md               ← This file
│
├── ⚙️ Configuration
│   ├── vite.config.ts               ← Build config
│   ├── tsconfig.json                ← TypeScript config
│   ├── tailwind.config.js           ← Tailwind theme
│   ├── .eslintrc.cjs                ← Linting rules
│   ├── .prettierrc                  ← Code format
│   ├── package.json                 ← Dependencies
│   └── index.html                   ← HTML root
│
├── 🌍 Environment
│   ├── .env                         ← Environment variables
│   └── .env.example                 ← Template
│
├── 📁 src/
│   │
│   ├── 🧩 components/               ← UI components (13 total)
│   │   ├── README.md                ← Components guide
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   ├── ProductGrid/
│   │   ├── SearchBar/
│   │   ├── CategoryFilter/
│   │   ├── QuantitySelector/
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   ├── LoadingSkeleton/
│   │   ├── EmptyState/
│   │   ├── RatingStars/
│   │   └── Button/
│   │
│   ├── 📄 pages/                    ← Full pages (5 total)
│   │   ├── README.md                ← Pages guide
│   │   ├── Home/
│   │   ├── ProductDetails/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   └── NotFound/
│   │
│   ├── 🪝 hooks/                    ← Custom hooks (3 total)
│   │   ├── README.md                ← Hooks guide
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   └── useDebounce.ts
│   │
│   ├── 🛠️ utils/                    ← Utilities (3 total)
│   │   ├── README.md                ← Utils guide
│   │   ├── calculations.ts
│   │   ├── storage.ts
│   │   └── currency.ts
│   │
│   ├── 📍 context/                  ← Global state
│   │   ├── README.md                ← Context guide
│   │   └── CartContext.tsx
│   │
│   ├── 🔌 services/                 ← API layer
│   │   ├── README.md                ← Services guide
│   │   └── api.ts
│   │
│   ├── 🗺️ routes/                   ← Routing
│   │   ├── README.md                ← Routes guide
│   │   └── AppRoutes.tsx
│   │
│   ├── 📦 types/                    ← Type definitions
│   │   ├── README.md                ← Types guide
│   │   └── product.ts
│   │
│   ├── 🎨 layouts/                  ← Layout wrappers
│   │   ├── README.md                ← Layouts guide
│   │   └── MainLayout/
│   │       ├── MainLayout.tsx
│   │       └── MainLayout.css
│   │
│   ├── 🎭 assets/                   ← Static files
│   │   ├── README.md                ← Assets guide
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   │
│   ├── App.tsx                      ← Root component
│   ├── App.css                      ← Global styles
│   ├── main.tsx                     ← Entry point
│   ├── index.css                    ← Global styles
│   └── vite-env.d.ts                ← TypeScript defs
│
└── 📁 public/                       ← Static assets
    └── favicon.ico
```

---

## 🔎 Search Strategies

### **By File Type**

**Want to find all TypeScript React files (components)?**
- Look in: `src/components/*/ComponentName.tsx`
- Pattern: `ComponentName.tsx` in folder named `ComponentName`

**Want to find all page files?**
- Look in: `src/pages/*/PageName.tsx`
- Pattern: `PageName.tsx` in folder named `PageName`

**Want to find utility functions?**
- Look in: `src/utils/`.*.ts`
- Files: `calculations.ts`, `storage.ts`, `currency.ts`

**Want to find CSS styles?**
- Look alongside `.tsx` files with same name
- Example: `ProductCard.tsx` → `ProductCard.css`

### **By Purpose**

**Shopping cart related:**
- Component: `src/components/CartItem/`
- Component: `src/components/CartSummary/`
- Hook: `src/hooks/useCart.ts`
- Context: `src/context/CartContext.tsx`
- Utils: `src/utils/calculations.ts`, `storage.ts`

**Product display:**
- Component: `src/components/ProductCard/`
- Component: `src/components/ProductGrid/`
- Component: `src/components/RatingStars/`
- Page: `src/pages/ProductDetails/`
- Hook: `src/hooks/useProducts.ts`
- Service: `src/services/api.ts`

**Search & Filter:**
- Component: `src/components/SearchBar/`
- Component: `src/components/CategoryFilter/`
- Hook: `src/hooks/useDebounce.ts`
- Hook: `src/hooks/useProducts.ts`

**Navigation:**
- Component: `src/components/Navbar/`
- Component: `src/components/Footer/`
- Layout: `src/layouts/MainLayout/`
- Routes: `src/routes/AppRoutes.tsx`

---

## 📋 File Naming Patterns

### **Components**
- Folder: `ComponentName/` (PascalCase)
- File: `ComponentName.tsx` (matches folder)
- Style: `ComponentName.css`

**Example**: `src/components/ProductCard/ProductCard.tsx`

### **Pages**
- Folder: `PageName/` (PascalCase)
- File: `PageName.tsx` (matches folder)
- Style: `PageName.css`

**Example**: `src/pages/ProductDetails/ProductDetails.tsx`

### **Utilities**
- Files: `utility-name.ts` (kebab-case)
- Direct in folder: `src/utils/`

**Example**: `src/utils/calculations.ts`

### **Hooks**
- Files: `useHookName.ts` (camelCase with 'use' prefix)
- Direct in folder: `src/hooks/`

**Example**: `src/hooks/useCart.ts`

---

## 🚀 Quick Navigation Commands

**In VS Code terminal:**

```bash
# Open any directory
cd src/components
cd src/pages
cd src/hooks
cd src/utils

# List all files in a directory
ls src/components/
ls src/pages/
ls src/hooks/

# Search for files
grep -r "ProductCard" src/
grep -r "useCart" src/
```

---

## 💡 Pro Tips

1. **Use the README in each folder**: They explain what's there
2. **Look at folder names first**: They indicate content type
3. **Read component documentation**: See `src/components/README.md`
4. **Check QUICK_REFERENCE.md**: Has tables of all components/pages
5. **Use VS Code search**: `Ctrl+P` to find files by name
6. **Use VS Code grep**: `Ctrl+Shift+F` to search file contents

---

## 📞 Can't Find Something?

| Looking For | Location | Check |
|-------------|----------|-------|
| UI component | `src/components/` | Components README |
| Full page | `src/pages/` | Pages README |
| Custom hook | `src/hooks/` | Hooks README |
| Helper function | `src/utils/` | Utils README |
| Global state | `src/context/` | Context README |
| API function | `src/services/` | Services README |
| Routes | `src/routes/` | Routes README |
| Type definition | `src/types/` | Types README |
| Layout | `src/layouts/` | Layouts README |
| Static file | `src/assets/` | Assets README |
| Configuration | Root folder | Config files |
| Documentation | Root folder | .md files |

---

## ✅ Verification Checklist

To verify all files are organized correctly:

- [ ] All component folders have README.md
- [ ] All components are in `src/components/`
- [ ] All pages are in `src/pages/`
- [ ] All hooks are in `src/hooks/`
- [ ] All utils are in `src/utils/`
- [ ] Each folder has its own CSS file
- [ ] Root folder has all config files
- [ ] Documentation files are in root

---

**TIP**: Bookmark this file for quick reference! 🔖

**Last Updated**: 2024  
**Status**: ✅ Complete Organization
