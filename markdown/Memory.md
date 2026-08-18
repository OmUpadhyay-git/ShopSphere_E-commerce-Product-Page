# ShopSphere – Project Memory

## Project Status

Status: Specification Reconciliation COMPLETE. All 20 design decisions approved and recorded in Design.md §3. Awaiting explicit user instruction to begin Phase 0 implementation.

## Current Phase

Phase 0 – Project Setup (NOT STARTED: no package.json, no Vite/Tailwind/TS config, no index.html; application cannot run)

## Completed

- Repository inspection (markdown specs + src structure + git history) — verified 2026-08-18
- SRS extraction from ShopSphere_SRS.docx (264 lines) — verified consistent with PRD.md; no conflicts
- Reconciliation of PRD.md — VERIFIED COMPLETE (380 lines, ends cleanly at §12 Success Criteria; consistent with SRS FR-001..FR-010). No changes made.
- Reconciliation of Architecture.md — VERIFIED COMPLETE (141 lines; consistent). No changes made.
- Reconciliation of Rules.md — COMPLETED: removed code-fence/header artifacts; aligned §2 Source of Truth priority with agent prompt; closed truncation; added §19 Truncation Note
- Reconciliation of Phases.md — COMPLETED: 8-phase plan (Phase 0 + Phases 1–8) approved and written; Phase 5 now cites approved tax/shipping/currency policy
- Reconciliation of Design.md — COMPLETED: restructured into §1 Verified / §2 Existing / §3 Approved; all 20 decisions approved and recorded with classifications
- Design decision review — COMPLETED: 20 decisions reviewed in chat, approved with corrections (currency classified PROPOSED, not DERIVED)
- SRS currency check — COMPLETED: SRS specifies only `price: number` (SRS §5.1); no USD mention anywhere in SRS → USD is a project/demo convention

## Currently Working On

Nothing. Awaiting explicit user instruction to start Phase 0.

## Next Tasks

Upon instruction: implement Phase 0 (Vite React TS scaffold, Tailwind, ESLint, Prettier, dependencies, entry point, basic layout). Confirm recovered dependency versions + ESLint/Prettier configs at that point (still pending approval).

## Important Decisions

- CartItem structure: SRS §5.2 defines `{ product: Product, quantity: number }` — AUTHORITATIVE. The deleted implementation used a flat CartItem (id/title/price/quantity/image) — deviates from SRS; NOT reused.
- Routing: React Router `createBrowserRouter` + `RouterProvider` with `/`, `/product/:id`, `/cart`, `/checkout`, `*` — approved via Phases.md Phase 2.
- localStorage key: `shopsphere_cart` (agent spec).
- Tax: 10% of subtotal, 2 decimals, line item — APPROVED, academic/demo policy (Design.md §3.17).
- Shipping: $0 if subtotal >= $100 else $9.99, line item — APPROVED, academic/demo policy (Design.md §3.18).
- Currency: USD — PROPOSED project/demo convention (Design.md §3.19). SRS does NOT specify currency. NOT derived, NOT verified.
- Price formatting: Intl.NumberFormat('en-US', currency USD) in utils/currency.ts (Design.md §3.19).
- Secondary color: #64748B — APPROVED (Design.md §3.1).
- Remaining pending (non-design): dependency versions, ESLint 8 (.eslintrc.cjs) + Prettier 3 config, app title "ShopSphere - E-commerce Store" — to be confirmed at Phase 0.
- Previous implementation (commits 78df668..91156f5) was DELETED by commit c625593 "SRS". Configs recovered as reference. Do NOT restore its source code; it was a scaffold.

## Known Issues

1. Dependency versions, ESLint/Prettier configs, and app title (recovered from deleted implementation) are pending confirmation at Phase 0 — user has not explicitly approved them.
2. ShopSphere_SRS.pdf unreadable by the current model (PDF input unsupported); SRS.docx extracted successfully instead.
3. No build configuration exists — Phase 0 tasks incomplete.

## Important Files

- markdown/PRD.md — VERIFIED COMPLETE (source of truth for features)
- markdown/Architecture.md — VERIFIED COMPLETE (stack, folder structure, data flow)
- markdown/Rules.md — reconciled 2026-08-18 (fence cleanup, priority order, §19 note)
- markdown/Design.md — reconciled 2026-08-18 (§1 Verified / §2 Existing / §3 Approved — all 20 decisions recorded)
- markdown/Phases.md — reconciled 2026-08-18 (Phase 0 + approved 8-phase plan)
- markdown/Memory.md — this file
- ShopSphere_SRS.docx — extracted; source of SRS text (Temp: C:\Users\omupa\AppData\Local\Temp\opencode\srs_extract\srs_text.txt)
- git commit 91156f5 — deleted implementation (configs only, recovered as reference)

## Dependencies

Recovered from deleted implementation (commit 91156f5) — PENDING confirmation at Phase 0:
- react 18.2.0, react-dom 18.2.0, react-router-dom 6.18.0, axios 1.6.0, react-icons 4.12.0, react-hot-toast 2.4.1, framer-motion 10.16.0
- Dev: vite 5.0.5, typescript 5.2.2, tailwindcss 3.3.6, postcss 8.4.31, autoprefixer 10.4.16, @vitejs/plugin-react 4.2.0, @types/react 18.2.37, @types/react-dom 18.2.15, eslint 8.54.0 + @typescript-eslint 6.11.0 + eslint-plugin-react-hooks 4.6.0 + eslint-plugin-react-refresh, prettier 3.1.0
- Tailwind config: primary #2563EB, secondary #64748B (approved)
- ESLint 8 (.eslintrc.cjs) + Prettier 3 (.prettierrc: semi, singleQuote, tabWidth 2, trailingComma es5, printWidth 100)
- .env.example: VITE_API_BASE_URL=https://fakestoreapi.com, VITE_APP_NAME=ShopSphere (api.ts falls back to the URL if unset)

## Testing Status

Not started. No build configuration exists; nothing runs yet.

## Architecture Notes

- Stack: React + Vite + TS + Tailwind + React Router + Axios + Context API + localStorage + React Icons + React Hot Toast + Framer Motion (Architecture.md)
- src/ folder structure already mirrors Architecture.md (all files are placeholders)
- API: https://fakestoreapi.com — endpoints /products, /products/{id}, /products/categories, /products/category/{category} (SRS §6.1)
- All API requests through src/services/api.ts (Rules §6)
- Cart persistence: localStorage key `shopsphere_cart`, validated on load, safe reset on corruption

## UI/Design Notes

- All design decisions approved 2026-08-18 — see Design.md §3 (20 decisions, classified VERIFIED/DERIVED/PROPOSED)
- Key approved values: primary #2563EB, secondary #64748B, Tailwind defaults for fonts/type/spacing/radius/shadows/breakpoints, 2px #2563EB focus ring, animate-pulse skeletons, friendly error/empty states, Framer Motion fade <200ms + hover lift, demo tax 10% / shipping $0 ≥ $100 else $9.99, USD via Intl.NumberFormat
- Responsive test widths (verified): 320, 375, 768, 1024, 1280, 1440

## Last Completed Task

Recorded all 20 approved design decisions into Design.md §3; updated Phases.md Phase 5 with approved tax/shipping/currency policy; updated this file.

## Last Updated

2026-08-18