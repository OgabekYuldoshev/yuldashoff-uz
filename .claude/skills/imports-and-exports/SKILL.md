---
name: imports-and-exports
description: Import/export conventions — named exports only (no default exports except Next.js App Router convention files), no namespace/wildcard imports, one barrel file per feature (index.ts), import ordering via Biome, import type usage. Use whenever writing, reviewing, or reorganizing import/export statements or a feature's public API.
---

# Imports and Exports

## Purpose

This document defines the required import and export conventions for all frontend projects.

These rules ensure:

- Consistent code organization
- Better tree-shaking
- Easier refactoring
- Better IDE auto-imports
- Predictable module boundaries
- Clear public APIs

Always follow these rules when creating or modifying modules.

---

# Core Principles

Always:

- Use ES Modules.
- Prefer explicit imports.
- Prefer explicit exports.
- Import only what is needed.
- Export only what should be public.
- Keep module boundaries clear.

---

# Named Exports

Always use named exports.

## Good

```tsx
export function UserCard() {}

export function UserTable() {}

export const createUser = () => {};

export type User = {};

export interface UserResponse {}
```

## Bad

```tsx
export default function UserCard() {}

export default UserCard;

export default {};
```

---

# Default Exports

Never use default exports.

Default exports make refactoring harder and reduce discoverability.

Always use named exports.

Exception: Next.js App Router convention files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`) require a default export by framework contract. See `nextjs`. Keep these files thin — re-export a named implementation from the feature.

---

# Named Imports

Always use named imports.

## Good

```ts
import { UserCard } from "@/features/users";

import { Button } from "@/shared/components/button";

import { createUser } from "@/features/users";
```

## Bad

```ts
import UserCard from "@/features/users";

import Button from "@/shared/components/button";
```

---

# Namespace Imports

Never use namespace imports.

## Bad

```ts
import * as React from "react";

import * as Icons from "lucide-react";

import * as Utils from "@/shared/utils";
```

Always import only what is required.

## Good

```ts
import { useEffect } from "react";

import { Search } from "lucide-react";

import { formatDate } from "@/shared/utils/format-date";
```

---

# Wildcard Exports

Never use wildcard exports.

## Bad

```ts
export * from "./button";

export * from "./hooks";

export * from "./utils";
```

Always export explicitly.

## Good

```ts
export { Button } from "./button";

export { useUsers } from "./use-users";

export { formatDate } from "./format-date";
```

---

# Feature Public API

Every feature must expose its public API through a single `index.ts` file.

The feature root `index.ts` is the only allowed barrel file in the project.

Consumers should always import from the feature root.

---

## Feature Structure

```text
features/
└── users/
    ├── api/
    ├── components/
    ├── hooks/
    ├── services/
    ├── store/
    ├── types/
    ├── validation/
    ├── utils/
    └── index.ts
```

---

## Good

```ts
// features/users/index.ts

export { UsersPage } from "./pages/users-page";

export { UserTable } from "./components/user-table";

export { useUsers } from "./hooks/use-users";

export { createUser } from "./api/user-api";

export type { User } from "./types/user";
```

Usage

```ts
import { UsersPage } from "@/features/users";

import { UserTable } from "@/features/users";

import { useUsers } from "@/features/users";
```

---

## Bad

```ts
import { UsersPage } from "@/features/users/pages/users-page";

import { UserTable } from "@/features/users/components/user-table";

import { useUsers } from "@/features/users/hooks/use-users";
```

---

# Public API

Only export modules intended to be used outside the feature.

Keep internal implementation private.

Do not export:

- Internal helpers
- Internal utilities
- Internal validation helpers
- Internal components
- Internal constants

The feature's `index.ts` should expose only the feature's public API.

---

# Barrel Files

The only allowed barrel file is the feature root `index.ts`.

Do not create barrel files anywhere else.

## Forbidden

```text
shared/index.ts

shared/components/index.ts

shared/hooks/index.ts

shared/utils/index.ts

features/users/components/index.ts

features/users/hooks/index.ts

features/users/api/index.ts

features/users/utils/index.ts
```

---

# Import Order

Import order is enforced automatically by Biome's `organizeImports` config — see `tooling`. Do not hand-order imports; run `biome check --write` and let it sort them.

The enforced groups, in print order: catch-all/unmatched, Node & Bun built-ins, scoped (`@*`) packages, other packages, blank line, `@/**` alias imports, blank line, relative imports.

Example output

```ts
import { useEffect } from "react";
import { Search } from "lucide-react";

import { Button } from "@/shared/components/button";
import { useUsers } from "@/features/users";

import { helper } from "./helper";

import type { User } from "@/shared/types/user";
```

---

# Type Imports

Always use `import type` for TypeScript types.

## Good

```ts
import type { User } from "@/shared/types/user";
```

```ts
import { Button, type ButtonProps } from "@/shared/components/button";
```

---

# Relative Imports

Avoid deep relative imports.

## Bad

```ts
import { Button } from "../../../../shared/components/button";
```

Prefer project aliases.

## Good

```ts
import { Button } from "@/shared/components/button";
```

---

# Aliases

Always use project path aliases.

Example

```text
@
```

Avoid long relative paths whenever possible.

---

# Duplicate Imports

Never import the same module multiple times.

## Bad

```ts
import { Button } from "@/shared/components/button";

import { ButtonProps } from "@/shared/components/button";
```

## Good

```ts
import {
    Button,
    type ButtonProps,
} from "@/shared/components/button";
```

---

# Side Effect Imports

Avoid side-effect imports.

Only use them when absolutely necessary.

Example

```ts
import "@/styles/globals.css";
```

---

# Dynamic Imports

Use dynamic imports only for:

- Lazy loading
- Route splitting
- Performance optimization

Do not replace static imports without a valid reason.

---

# Circular Dependencies

Never create circular dependencies.

Module dependencies must always remain one-directional.

---

# AI Rules

When generating imports and exports:

- Always use named exports.
- Never use default exports.
- Never use namespace imports.
- Never use wildcard exports.
- Never create barrel files except the feature root `index.ts`.
- Always import only what is used.
- Always export only what should be public.
- Prefer project aliases.
- Avoid deep relative imports.
- Use `import type` whenever possible.
- Keep imports grouped.
- Keep feature internals private.
- Expose only the feature public API.

---

# Forbidden

Never generate:

- `export default`
- `import * as`
- `export *`
- Multiple barrel files
- Deep relative imports
- Unused imports
- Circular dependencies

---

# Goal

Every module should have a clear public API.

Imports should be explicit.

Exports should be predictable.

Features should expose a clean public interface while keeping implementation details private.

The project should remain scalable, tree-shakable, and easy to maintain.