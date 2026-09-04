---
name: state-management
description: Client state conventions — when to use local component state vs Zustand vs Context vs URL state (nuqs); never store server data in a client store. Use for any shared/global client state or URL query-param state decision.
---

# State Management

## Purpose

This document defines the required conventions for client state management across all frontend projects.

Server state is covered separately in `api-and-data-fetching`. This document only covers client-only state.

---

# Core Principles

Always:

- Keep state as local as possible.
- Never store server data in a global client store.
- Only reach for global state when multiple independent features truly share it.
- Prefer React state before reaching for a store.
- Keep stores small and focused.

---

# State Location Decision

Before adding state, decide in order:

1. Can it live inside the component? → `useState` / `useReducer`.
2. Is it derived from other state or props? → compute it, do not store it.
3. Is it shared by components inside one feature only? → feature-local context or feature store.
4. Is it shared across multiple independent features? → global store.

Never default to global state.

---

# Server State

Never put server data (API responses, query results) inside a global client store.

Server state belongs to TanStack Query. See `api-and-data-fetching`.

## Bad

```ts
useUserStore.setState({ user: apiResponse });
```

## Good

```tsx
const { data: user } = useUser();
```

---

# Store Library

Use Zustand for global client state.

Do not introduce Redux, MobX, or Recoil unless explicitly required.

---

# Store Location

Feature-scoped stores belong inside the feature.

```text
features/<feature>/store
```

Example

```text
features/cart/store/cart-store.ts
```

Cross-feature global stores belong inside

```text
shared/store
```

Only create a shared store once state is genuinely used by more than one feature.

---

# Store Files

Store files must end with `-store`, per `naming-conventions`.

```text
cart-store.ts
auth-store.ts
```

---

# Store Shape

Keep store state minimal.

Store actions alongside state in the same slice.

## Good

```ts
type CartStore = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
};
```

Avoid storing:

- derived values
- server data
- UI-only state that belongs to a single component

---

# Selectors

Always select only the slice of state a component needs.

## Good

```ts
const items = useCartStore((state) => state.items);
```

## Bad

```ts
const store = useCartStore();
```

Selecting the whole store causes unnecessary re-renders.

---

# Context

Use React Context for:

- dependency injection (theme, locale, auth session)
- state that rarely changes

Avoid Context for frequently updated state — prefer a store to avoid re-render fan-out.

---

# Persistence

Only persist state that must survive a page reload.

Example

```ts
persist(store, { name: "cart-store" })
```

Never persist server state or sensitive data (tokens, secrets) in client storage.

---

# URL State

Prefer the URL as the source of truth for state that should be shareable or bookmarkable.

Examples

- filters
- pagination
- selected tab
- search query

Always use `nuqs` for URL query-param state, in both Next.js and Vite + React projects. Never hand-roll `URLSearchParams` parsing/syncing.

## Good

```ts
import { useQueryState, parseAsInteger } from "nuqs";

const [search, setSearch] = useQueryState("q", { defaultValue: "" });
const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
```

In a Vite + React project, wrap the app with the router-specific adapter (e.g. `NuqsAdapter` from `nuqs/adapters/react-router`). In Next.js App Router, no adapter is required.

Do not duplicate URL state inside a store — if it is in the URL, that is the single source of truth, do not mirror it into Zustand.

---

# AI Rules

When generating state management code:

- Default to local component state.
- Use Zustand for global client state.
- Use nuqs for URL query-param state.
- Never store server data in a client store.
- Keep stores feature-scoped unless truly shared.
- Use selectors, never select the whole store.
- Prefer URL state for shareable UI state.
- Keep derived state computed, never stored.

---

# Forbidden

Never generate:

- Server data inside a Zustand/Redux store
- Whole-store subscriptions (`useStore()` with no selector)
- Global state for single-component concerns
- Redux, MobX, or Recoil without explicit request
- Persisted tokens or secrets in client storage

---

# Goal

Every piece of client state should be:

- Owned at the lowest level that makes sense
- Free of duplicated server data
- Selected narrowly to avoid unnecessary re-renders
- Easy to trace back to a single source of truth
