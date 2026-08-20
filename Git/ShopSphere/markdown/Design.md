# ShopSphere – Design System

## 1. Verified Design Requirements

### 1.1 Design Objective

ShopSphere should have a modern, clean, trustworthy e-commerce interface.

The design should feel like a real shopping application rather than a basic student CRUD project.

The interface should prioritize:

- Product visibility
- Easy navigation
- Clear pricing
- Simple cart interaction
- Mobile responsiveness
- Visual consistency

### 1.2 Design Direction

Style:

Modern Minimal E-commerce

Characteristics:

- Clean layouts
- Generous spacing
- Rounded cards
- Subtle shadows
- Clear typography
- Strong product imagery
- Minimal visual clutter
- Smooth interactions

Avoid:

- Excessive gradients
- Excessive animations
- Too many colors
- Large decorative elements
- Cluttered interfaces

### 1.3 Responsive Testing Requirements

Verified from the agent specification (direct user instruction):

- Mobile-first design.
- Test at minimum: 320px, 375px, 768px, 1024px, 1280px, 1440px.
- Check for: horizontal overflow, broken grids, navbar issues, product card problems, cart layout issues, checkout layout issues, button overflow, typography problems.

### 1.4 Accessibility Requirements

Verified from PRD.md and Rules.md:

- Semantic HTML
- Accessible buttons and links
- Proper form labels
- Keyboard-friendly controls
- Appropriate ARIA attributes where required
- Visible focus states
- No clickable `<div>` elements where a button or link is appropriate

---

## 2. Existing Design Decisions

### 2.1 Documented Decisions

- Use a neutral base with one primary brand color.
- Primary: `#2563EB` — VERIFIED (explicitly documented in this file)

### 2.2 Recovered from Previous Implementation

These decisions were recovered from the deleted implementation (git commit `91156f5`). Status is marked per item:

- Secondary color: `#64748B` (Tailwind slate-500) — APPROVED (Decision 3.1)
- Tailwind CSS v3 as the styling system — VERIFIED (Architecture.md §2 mandates Tailwind; v3 recovered, version confirmed at Phase 0)
- Application title: `ShopSphere - E-commerce Store` — pending approval (non-design, recorded in Memory.md)
- Routes `/`, `/product/:id`, `/cart`, `/checkout`, `*` via `createBrowserRouter` — approved via Phases.md Phase 2 approval
- Dependency set and versions — pending confirmation at Phase 0 (recorded in Memory.md)
- ESLint 8 (`.eslintrc.cjs`) + Prettier 3 configuration — pending confirmation at Phase 0

---

## 3. Approved Design Decisions

The following decisions were previously unspecified. All 20 were reviewed individually and APPROVED by the user on 2026-08-18.

Classification legend:

- VERIFIED — explicitly defined in PRD/SRS/Architecture/Rules/Design
- DERIVED — logically derived from an existing requirement
- PROPOSED — a design/implementation decision not explicitly specified

### 3.1 Secondary Color — PROPOSED (recovered, approved)

`#64748B` (Tailwind slate-500). Used for secondary buttons, links, and supporting UI.

### 3.2 Neutral Color Scale — PROPOSED

Tailwind default slate scale (`slate-50` through `slate-900`) for backgrounds, borders, and text. Rationale: Tailwind is the mandated styling system; the slate family is already present via the secondary color.

### 3.3 Semantic Colors — PROPOSED

Tailwind defaults: `green-600` (success), `red-600` (danger), `amber-500` (warning). Required for button states (Rules.md §10) and error handling (PRD.md §5.10).

### 3.4 Font Family — PROPOSED

Tailwind default sans stack (system-ui based). No external font loading; zero custom CSS (Rules.md §12).

### 3.5 Typography Scale — PROPOSED

Tailwind default type scale: body `text-sm`/`text-base`, headings `text-lg` through `text-4xl`.

### 3.6 Spacing System — PROPOSED

Tailwind default spacing scale (4px base, 0.25rem increments).

### 3.7 Border Radius — PROPOSED

`rounded-lg` for buttons and inputs; `rounded-xl` for cards.

### 3.8 Shadows — PROPOSED

`shadow-sm` for cards; `shadow-md` on hover.

### 3.9 Button Styles — PROPOSED

Primary button: filled `#2563EB`, white text, `rounded-lg`, `px-4 py-2`; hover `blue-700`; active, disabled (`opacity-50`, `cursor-not-allowed`), and loading (spinner) states defined. Secondary button: `#64748B`-based outline variant.

### 3.10 Card Styles — PROPOSED

White background, `rounded-xl`, `border border-slate-200`, `shadow-sm`; `shadow-md` with slight lift on hover. Image at top with consistent aspect ratio.

### 3.11 Input Styles — PROPOSED

Tailwind default input styling: `border-slate-300`, `rounded-lg`, `px-3 py-2`, focus ring `#2563EB`. Always paired with a label (Rules.md §11).

### 3.12 Responsive Breakpoints — PROPOSED

Tailwind default breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px. Test widths 320–1440 are verified requirements (Design.md §1.3).

### 3.13 Focus States — PROPOSED

2px focus ring in `#2563EB` with 2px offset on all interactive elements. Requirement "visible focus states" is verified (PRD.md §9, Rules.md §11).

### 3.14 Loading / Skeleton Behavior — PROPOSED

Skeleton loaders using Tailwind `animate-pulse` slate-200 blocks shaped like cards and grid cells; disabled buttons with spinner while loading. Requirement "skeleton loaders, loading indicators, disabled states" is verified (PRD.md §5.9, SRS FR-009).

### 3.15 Error / Empty State UI — PROPOSED

- API error: icon + friendly message + Retry button (no stack traces).
- Empty search results: icon + message + clear-search action.
- Empty cart: icon + message + "Start Shopping" action.

Requirement "graceful, friendly, no stack traces, retry" is verified (PRD.md §5.10, SRS FR-010, Rules.md §7).

### 3.16 Animation Behavior — PROPOSED

Framer Motion page-level fade/slide transitions under 200ms and card hover lift only. Respect `prefers-reduced-motion`. No animations that delay interaction. Direction ("smooth interactions", "avoid excessive animations") is verified (Design.md §1.2); Framer Motion is mandated (Architecture.md §2).

### 3.17 Tax Policy — PROPOSED (academic/demo policy)

10% of subtotal, calculated in `src/utils/calculations.ts`, rounded to 2 decimal places, displayed as a separate line item in cart summary and checkout. This is an academic/demo policy because the checkout is simulated (PRD.md §5.8, §11). Requirement "tax derived from cart state, never hardcoded" is verified (PRD.md §5.6, SRS FR-006); the rate itself is a project/demo convention. No real-world tax assumptions.

### 3.18 Shipping Policy — PROPOSED (academic/demo policy)

$0 when subtotal is >= $100; otherwise $9.99. Calculated in `src/utils/calculations.ts`, displayed as a separate line item in cart summary and checkout. Explicitly an academic/demo policy because the checkout is simulated (PRD.md §5.8, §11) and real shipping integration is out of scope (PRD.md §11). No real-world shipping assumptions.

### 3.19 Currency & Price Formatting — PROPOSED

Currency: USD — PROPOSED (project/demo convention). The SRS defines `price: number` (SRS §5.1) and does NOT specify a currency (SRS §6.1 lists endpoints only); therefore USD is a project/demo convention, not verified and not derived.

Price formatting: `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` via `formatCurrency()` in `src/utils/currency.ts`; 2 decimals, `$` prefix. Requirement "clear pricing" is verified (Design.md §1.1).

### 3.20 Product Image Behavior — PROPOSED

`object-cover` with consistent square aspect ratio (`aspect-square`) on product cards and the details page; `alt` text from the product title (alt requirement verified, Rules.md §11); broken-image fallback icon.

---

## 4. Reconciliation Note

This document was originally committed truncated (ended at `Primary: #2563EB`) and wrapped in code fences. It was restructured into Verified / Existing / Missing sections on 2026-08-18. The 20 previously-missing decisions were individually reviewed and approved on 2026-08-18 and are recorded in Section 3 with their classifications. Nothing in this document is fabricated: every value is either documented, recovered from the project's own git history, or approved as a project/demo convention.