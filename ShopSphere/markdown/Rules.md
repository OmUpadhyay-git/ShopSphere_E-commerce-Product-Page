
# ShopSphere – AI Development Rules

## 1. General Rule

Build only what is specified in PRD.md and Architecture.md.

Do not introduce major features, libraries, architecture changes, or technologies without explicit approval.

---

## 2. Source of Truth

Priority order:

1. Direct user instructions
2. Rules.md
3. PRD.md
4. Architecture.md
5. Design.md
6. Phases.md
7. Memory.md
8. Existing code
9. AI assumptions

When two sources conflict, follow the higher-priority source and report the conflict.

---

## 3. Technology Rules

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API
- React Icons
- React Hot Toast
- Framer Motion

Do not introduce Redux unless explicitly requested.

Do not introduce a backend unless explicitly requested.

Do not introduce a database unless explicitly requested.

---

## 4. Coding Rules

Use TypeScript.

Avoid `any` unless there is a documented technical reason.

Use meaningful variable and function names.

Prefer small reusable components.

Avoid duplicated logic.

Keep business logic outside presentation components where practical.

Use custom hooks for reusable stateful logic.

---

## 5. React Rules

Use functional components.

Use React hooks appropriately.

Do not manipulate the DOM directly unless necessary.

Do not use unnecessary `useEffect`.

Do not use `useMemo` or `useCallback` everywhere without a reason.

Do not introduce global state for data that can remain local.

Avoid prop drilling when Context is genuinely appropriate.

---

## 6. API Rules

All API requests must go through the API service layer.

Do not make raw Axios/fetch requests directly inside reusable UI components.

Every API request should account for:

- Loading
- Success
- Error

Do not silently ignore API errors.

---

## 7. Error Handling

Never allow an API failure to break the entire interface.

Display a meaningful user-friendly error state.

Do not expose technical stack traces to users.

Do not fabricate product data when the API fails.

If localStorage contains invalid data:

1. Ignore invalid data.
2. Reset the cart safely.
3. Continue loading the application.

---

## 8. State Management Rules

Cart state is global.

Search state should normally remain local.

Category filter state should normally remain local.

Derived values such as subtotal and grand total must be calculated from cart data.

Do not duplicate the same source of truth in multiple locations.

---

## 9. localStorage Rules

Use a dedicated storage utility.

Do not scatter localStorage calls throughout components.

Validate stored data before using it.

Never assume localStorage contains valid JSON.

---

## 10. UI Rules

All UI must be responsive.

Do not use fixed desktop-only layouts.

Buttons must have clear states:

- Default
- Hover
- Active
- Disabled
- Loading where applicable

Interactive elements must be keyboard accessible.

---

## 11. Accessibility Rules

Use semantic HTML.

Images require meaningful alt text.

Buttons must describe their action.

Form fields require labels.

Do not use clickable `<div>` elements when a button or link is appropriate.

Maintain visible keyboard focus.

---

## 12. Styling Rules

Use Tailwind CSS.

Do not create excessive custom CSS.

Do not use inline styles unless required.

Keep spacing and typography consistent with Design.md.

Avoid random colors or arbitrary design changes.

---

## 13. Dependency Rules

Before adding a new dependency, determine whether the functionality can reasonably be implemented using the existing stack.

Do not install a library for trivial functionality.

Every additional dependency must have a clear purpose.

---

## 14. Security Rules

Never hardcode secrets.

Do not expose private API keys.

Do not collect unnecessary personal information.

The checkout is a simulation and must not process real payment information.

---

## 15. AI Behavior Rules

The AI must:

- Read existing project files before modifying them.
- Preserve working functionality.
- Avoid unnecessary rewrites.
- Explain significant architectural changes.
- Report errors honestly.
- Never claim a feature works without verifying it.
- Never fabricate test results.
- Never fabricate screenshots.
- Never fabricate API responses.

If something is unclear, ask instead of guessing.

---

## 16. Modification Rules

Before modifying an existing file:

1. Understand its current purpose.
2. Check dependencies.
3. Check components importing it.
4. Make the smallest appropriate change.
5. Verify that existing functionality remains intact.

---

## 17. Testing Rules

After implementing a feature:

- Run the application.
- Check for compilation errors.
- Check browser console errors.
- Test the relevant user flow.
- Fix errors before moving to the next phase.

Do not mark a phase complete without verification.

---

## 18. Git Rules

Use meaningful commit messages.

Examples:

```text
feat: add product catalog
feat: implement cart context
feat: add product search
fix: persist cart state
fix: handle API failure
style: improve mobile navbar
```

---
 
## 19. Truncation Note

This document was originally committed with unclosed code fences and a truncated ending. The content through Section 18 is complete and verified. Formatting was reconciled on 2026-08-18.