---
name: monorepo
description: When and how to structure a project as a Turborepo monorepo — apps/ vs packages/, Hono for a standalone backend, shared packages/database, ui, config, package naming, dependency direction. Use when adding an app or package, or deciding whether a project needs a monorepo at all.
---

# Monorepo (Turborepo)

## Purpose

This document defines when and how to structure a project as a Turborepo monorepo.

Use this only when the project is not a single Next.js monolith — i.e. it has multiple independent apps (a public site + an admin cabinet, a web app + a separate API service, multiple client "cabinets" for different user types) or standalone microservices.

A single Next.js fullstack app stays a monolith. Do not reach for a monorepo by default — see the decision rule below.

---

# When To Use A Monorepo

Use Turborepo when any of these is true:

- More than one deployable app shares code (e.g. web app + admin cabinet).
- A standalone backend service exists separately from the frontend (e.g. a Hono API consumed by multiple clients).
- Multiple independent "cabinets" (dashboards) exist per user role.

Stay a Next.js monolith when there is exactly one app and one deploy target — do not split into apps/packages prematurely.

---

# Runtime

Follow the project's detected package manager and runtime, per `tooling` — do not assume Bun. Workspaces are declared via `bunfig.toml` (Bun), `pnpm-workspace.yaml` (pnpm), or `package.json#workspaces` (npm/Yarn), matching whichever package manager the project already uses.

---

# Core Principles

Always:

- Deployable applications go in `apps/`.
- Shared code goes in `packages/`.
- A package is only created once code is reused by more than one app.
- Each app/package owns its own `package.json` and depends on internal packages via the workspace protocol.
- Keep the dependency graph one-directional: `apps` depend on `packages`, `packages` never depend on `apps`.

---

# Base Structure

```text
.
├── apps/
│   ├── web/          # Next.js frontend, or Vite + React frontend
│   └── api/           # Hono backend, when a standalone API is needed
├── packages/
│   ├── database/      # Drizzle schema + client, see database
│   ├── ui/             # shared shadcn/ui-based component library
│   ├── config/        # shared tsconfig, biome config, tailwind config
│   └── types/          # cross-app shared types (rare — prefer per-package types)
├── turbo.json
├── package.json
└── bunfig.toml
```

Do not create a package with a single consumer — that code belongs inside the app that uses it until a second consumer exists.

---

# Apps

Each app in `apps/` is a full application and internally follows `folder-structure` (its own `src/features`, `src/shared`, etc.) exactly as a standalone project would.

```text
apps/
└── web/
    └── src/
        ├── features/
        ├── shared/
        ├── providers/
        └── ...
```

`apps/web/src/shared` is app-local reusable code. `packages/ui` is cross-app reusable code. Only promote something from an app's `shared/` into `packages/ui` once a second app needs it.

---

# Backend-Only App (Hono)

When a standalone API is needed, use Hono.

```text
apps/
└── api/
    └── src/
        ├── routes/
        │   ├── users.ts
        │   └── posts.ts
        ├── middleware/
        ├── app.ts
        └── index.ts
```

Routes call into `packages/database` for data access, never redefine schema locally.

```ts
// apps/api/src/routes/users.ts
import { Hono } from "hono";
import { db } from "@repo/database";

export const users = new Hono().get("/", async (c) => {
    const result = await db.query.users.findMany();
    return c.json(result);
});
```

The web app consumes this API the standard client-side way — Axios + TanStack Query, per `api-and-data-fetching`. Server Actions (`nextjs-server-actions`) are for a Next.js monolith talking to its own database directly, not for calling a separate Hono service.

---

# Shared Packages

## `packages/database`

Drizzle schema, client, and migrations. See `database`. Only this package touches the database directly.

## `packages/ui`

Shared shadcn/ui-based components used by more than one app.

```text
packages/ui/
└── src/
    ├── button.tsx
    ├── input.tsx
    └── ...
```

Feature-specific or single-app components stay inside that app's `shared/components`, not here.

## `packages/config`

Shared `tsconfig.json` base, `biome.json` base, `tailwind.config` base. Apps extend these, never duplicate them.

---

# Package Naming

Internal packages are scoped under the repo's workspace scope.

```text
@repo/database
@repo/ui
@repo/config
```

Import them like any other dependency.

```ts
import { db } from "@repo/database";
import { Button } from "@repo/ui";
```

---

# Turborepo Pipeline

Define `build`, `dev`, `lint`, `test` tasks in `turbo.json` with correct `dependsOn` so `packages/database` builds/types before apps that consume it.

Never let an app import another app directly — only through `packages/`.

---

# AI Rules

When generating monorepo code:

- Deployable apps in `apps/`, shared code in `packages/`.
- Use whichever package manager/runtime the project already uses for install/run/workspaces — see `tooling`.
- Create a package only when a second consumer exists.
- Keep dependency direction one-way: apps → packages.
- Backend-only services use Hono under `apps/<name>`.
- Database access only through `packages/database`.
- Each app still follows `folder-structure` internally.

---

# Forbidden

Never generate:

- A package with only one consumer
- An app importing another app directly
- A second Drizzle schema/client outside `packages/database`
- Duplicated tsconfig/biome/tailwind config instead of extending `packages/config`
- A monorepo scaffold for a project with a single app and single deploy target

---

# Goal

Every monorepo should be:

- Organized around real code reuse, not speculative structure
- One-directional in its dependency graph
- Fast to build via Turborepo caching
- Easy to add a new app to without duplicating shared logic
