---
name: nextjs
description: Next.js App Router conventions — routing, Server vs Client Components, Server Actions vs Route Handlers, layouts, loading/error/not-found states, Metadata API, next/image, next/link, next/font, caching, middleware. Use for any Next.js project work.
---

# Next.js

## Purpose

This document defines the required conventions for all Next.js projects.

These rules apply only to projects using the App Router.

Always follow these rules when creating or modifying Next.js applications.

---

# Framework Version

Always use:

- Next.js App Router
- React Server Components by default
- TypeScript
- Turbopack (development)

Never use the Pages Router unless explicitly requested.

---

# Routing

All routes must live inside:

```text
src/app/
```

Example

```text
app/
├── page.tsx
├── layout.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
└── dashboard/
```

Never create routes outside `app`.

---

# Route Groups

Use Route Groups to organize the application.

Example

```text
app/
├── (marketing)/
├── (dashboard)/
├── (auth)/
```

Route Groups are preferred over deeply nested directories.

---

# Private Folders

Private folders should begin with `_`.

Example

```text
_dashboard/
```

Use them only for internal organization.

---

# Server Components

Use Server Components by default.

Do not add `"use client"` unless it is actually required.

---

# Client Components

Only use `"use client"` when:

- React hooks are required
- Browser APIs are required
- Event handlers are required
- Interactive UI is required

Never make an entire page a Client Component unless necessary.

---

# Data Fetching

Prefer Server Components for data fetching.

Use:

- async Server Components
- Server Actions
- Route Handlers

Avoid unnecessary client-side fetching.

---

# Server Actions

Prefer Server Actions for mutations.

Example

- Login
- Create User
- Update Profile
- Delete Product

Avoid creating unnecessary API routes for internal mutations.

---

# Route Handlers

API endpoints belong inside

```text
app/api/
```

Example

```text
app/api/users/route.ts
```

Always use Route Handlers.

---

# Layouts

Reuse layouts whenever possible.

Example

```text
app/
├── layout.tsx
├── (dashboard)/
│   ├── layout.tsx
│   └── users/
```

Avoid duplicate layouts.

---

# Loading UI

Provide loading states when fetching data.

Use

```text
loading.tsx
```

instead of manually rendering loading screens.

---

# Error Handling

Use

```text
error.tsx
```

for route-level errors.

Use Error Boundaries where appropriate.

---

# Not Found

Use

```text
not-found.tsx
```

for missing resources.

Do not manually redirect to 404 pages.

---

# Metadata

Always use the Metadata API.

Prefer

```ts
export const metadata
```

or

```ts
generateMetadata()
```

Do not manually modify the document head.

---

# Images

Always use

```tsx
<Image />
```

from Next.js.

Never use raw `<img>` unless explicitly required.

---

# Links

Always use

```tsx
<Link />
```

for internal navigation.

Do not use `<a>` for internal routes.

---

# Fonts

Use

```ts
next/font
```

Never import fonts from external CDNs.

---

# Environment Variables

Client variables must start with

```text
NEXT_PUBLIC_
```

Never expose server secrets to the client.

---

# Dynamic Imports

Use

```ts
dynamic()
```

when appropriate.

Prefer lazy loading for heavy components.

---

# Caching

Use Next.js caching defaults.

Only disable caching when necessary.

Do not disable caching globally.

---

# Middleware

Application middleware belongs inside

```text
src/middleware.ts
```

Keep middleware lightweight.

---

# AI Rules

When generating Next.js code:

- Prefer Server Components.
- Add "use client" only when required.
- Keep routing inside App Router.
- Use Route Handlers.
- Use Server Actions for mutations.
- Use Metadata API.
- Use next/image.
- Use next/link.
- Follow the feature-based architecture.
- Keep business logic inside features.

---

# Default Exports

App Router convention files require a default export:

- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- `route.ts`

This is a framework requirement, not a style choice.

Everything else (components, hooks, utils, services, api functions) must still follow `imports-and-exports` and use named exports only.

## Good

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
    return <UsersPage />;
}
```

```tsx
// app/dashboard/page.tsx
import { UsersPage } from "@/features/users";
```

The route file stays a thin wrapper; real implementation lives in the feature and is exported as a named export.

---

# Forbidden

Do not use:

- Pages Router
- getServerSideProps
- getStaticProps
- getInitialProps
- Head component
- Raw img tags
- Default exports outside App Router convention files
- Client Components by default

---

# Goal

Every Next.js application should be:

- Server-first
- Fast
- Scalable
- Feature-based
- Type-safe
- Easy to maintain