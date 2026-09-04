---
name: vite-react
description: Vite + React SPA conventions — React Router createBrowserRouter with Component/lazy route fields, feature-owned pages, layouts, providers, path aliases, route-level code splitting. Use for any Vite + React project work.
---

# Vite + React

## Purpose

This document defines the required conventions for all Vite + React projects.

Always follow these rules when creating or modifying Vite applications.

---

# Framework Version

Always use:

- Vite
- React
- TypeScript
- React Router

Do not use Create React App.

---

# Application Entry

The application entry point must be:

```text
src/main.tsx
```

Do not create additional application entry files unless explicitly required.

---

# Routing

All routing must be managed using React Router, via `createBrowserRouter`.

Never use the legacy `<BrowserRouter>` component-based API for new projects.

Routes should be organized in a dedicated router configuration.

```text
src/
└── router/
    ├── index.tsx
    ├── routes.tsx
    └── protected-route.tsx
```

```tsx
// src/router/routes.tsx
import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: DashboardLayout,
        children: [
            {
                index: true,
                async lazy() {
                    const { DashboardPage } = await import("@/features/dashboard");
                    return { Component: DashboardPage };
                },
            },
            {
                path: "users",
                Component: ProtectedRoute,
                children: [
                    {
                        index: true,
                        async lazy() {
                            const { UsersPage } = await import("@/features/users");
                            return { Component: UsersPage };
                        },
                    },
                ],
            },
        ],
    },
]);
```

```tsx
// src/router/index.tsx
import { RouterProvider } from "react-router";
import { router } from "./routes";

export function AppRouter() {
    return <RouterProvider router={router} />;
}
```

Route-level page components come from the owning feature's public API, per `imports-and-exports` — never import a page's internal path directly. Prefer `lazy: () => import(...)` route entries over `React.lazy()` + `<Suspense>` wrapping for route-level code splitting — it is the data-router-native way to lazy load and avoids manual `Suspense` boundaries per route.

Use the `Component` field, not `element`, to attach a component to a route (`Component: DashboardLayout`, not `element: <DashboardLayout />`) — it lets the router construct the element itself and keeps static and lazy routes consistent. Only fall back to `element` when the route genuinely needs JSX at that position (passing children/props the route object can't express, e.g. `element: <DashboardLayout><ExtraChrome /></DashboardLayout>`).

For lazy routes, use the `async lazy()` form that awaits the dynamic `import()` and returns `{ Component }`, not `lazy: () => import(...).then((m) => ({ Component: m.X }))`. Same behavior, reads top-to-bottom instead of nested in a `.then()`.

Avoid defining all routes inside `main.tsx`.

---

# Pages

Route components belong inside their corresponding feature whenever possible.

Example

```text
features/
└── users/
    └── pages/
        ├── users-page.tsx
        └── user-details-page.tsx
```

Do not create a global `pages/` directory unless the project architecture explicitly requires it.

---

# Layouts

Reusable layouts belong inside:

```text
src/layouts/
```

Examples

- Dashboard Layout
- Authentication Layout
- Public Layout

Do not duplicate layouts across features.

---

# Providers

Global providers belong inside:

```text
src/providers/
```

Examples

- Theme Provider
- Query Provider
- Authentication Provider
- Localization Provider

Keep provider composition inside a single location.

---

# Feature Organization

All business logic must remain inside its feature.

Example

```text
features/
└── products/
    ├── api/
    ├── components/
    ├── hooks/
    ├── services/
    ├── store/
    ├── validation/
    ├── utils/
    └── types/
```

Never organize business logic by file type.

---

# Shared Code

Reusable modules belong inside:

```text
shared/
```

Only move code to `shared` after it is reused by multiple independent features.

---

# Data Fetching

Keep API communication inside:

```text
features/<feature>/api
```

Do not fetch data directly inside reusable UI components.

Separate UI from data access.

---

# Environment Variables

Client environment variables must start with:

```text
VITE_
```

Never expose secrets inside the client application.

---

# Static Assets

Static assets belong inside:

```text
src/assets/
```

Examples

- Images
- Icons
- Fonts
- Videos

---

# Lazy Loading

Lazy load route-level pages via the router's `lazy` route field (see Routing above), not `React.lazy()` + `Suspense`.

Reserve `React.lazy()` + `Suspense` for non-route code splitting — a heavy component that isn't itself a route (a chart library, a rich text editor, a modal's contents).

Avoid eagerly loading large route components.

---

# Error Handling

Provide proper loading and error states.

Avoid rendering blank screens while data is loading.

---

# Path Aliases

Prefer path aliases instead of deep relative imports.

Example

Good

```ts
import { Button } from "@/shared/components/button";
```

Bad

```ts
import { Button } from "../../../../shared/components/button";
```

---

# AI Rules

When generating Vite applications:

- Follow feature-based architecture.
- Keep business logic inside features.
- Keep reusable code inside shared.
- Use React Router's `createBrowserRouter`.
- Use `Component` on route objects instead of `element`; reserve `element` for cases that genuinely need JSX.
- Use route-level `async lazy()` for code splitting instead of `React.lazy()` + `Suspense`.
- Keep routing separate from application entry.
- Use TypeScript.
- Prefer lazy loading for routes.
- Keep providers centralized.
- Reuse existing modules before creating new ones.

---

# Forbidden

Do not use:

- Create React App
- Deep relative imports
- Global business components
- Feature-specific code inside shared
- Multiple application entry files

---

# Goal

Every Vite application should be:

- Feature-based
- Modular
- Scalable
- Type-safe
- Easy to maintain
- Easy to extend