---
name: typescript
description: Required TypeScript conventions — type over interface, strict mode, no any/enum, union types over enums, DTO/Response vs application types and mapping, utility types, es-toolkit for generic helpers. Use for any TypeScript type or code generation task.
---

# TypeScript

## Purpose

This document defines the required TypeScript conventions for all frontend projects.

Always write type-safe, predictable, and maintainable TypeScript.

Favor explicit types over implicit assumptions.

DTO types represent server contracts — the raw shape as it actually arrives, before mapping. For an HTTP API response specifically, name it with a `Response` suffix (`ProfileResponse`, `UserResponse`), not `Dto`; for a raw database row, keep the `Dto` suffix per `database`.

Application types represent frontend models.

Never use a raw response/DTO type directly inside React components. Convert it to an application type through a mapper — see "Mappers" in `api-and-data-fetching` and `database`.

---

# Core Principles

Always:

- Write strict TypeScript.
- Prefer type safety over convenience.
- Keep types simple.
- Prefer composition over inheritance.
- Avoid unnecessary complexity.
- Keep types close to the feature that owns them.

---

# Strict Mode

Always use TypeScript strict mode.

Never rely on implicit `any`.

---

# Type vs Interface

Prefer `type` over `interface`.

## Good

```ts
export type User = {
    id: string;
    name: string;
};
```

## Bad

```ts
export interface User {
    id: string;
    name: string;
}
```

Only use `interface` when extending third-party library types is required.

---

# Any

Never use `any`.

## Bad

```ts
const user: any = {};
```

Prefer:

```ts
unknown
```

or create an appropriate type.

---

# Unknown

Use `unknown` when the type cannot be determined safely.

Always narrow `unknown` before using it.

## Good

```ts
function parse(value: unknown) {
    if (typeof value === "string") {
        return value;
    }

    return "";
}
```

---

# Type Assertions

Avoid type assertions.

## Bad

```ts
const user = data as User;
```

Prefer proper type narrowing.

Only use assertions when absolutely necessary.

---

# Non-null Assertions

Avoid the non-null assertion operator.

## Bad

```ts
user!.name;
```

Always check for null or undefined.

---

# Type Inference

Let TypeScript infer obvious types.

## Good

```ts
const count = 10;
```

Do not write:

```ts
const count: number = 10;
```

unless the annotation improves readability.

---

# Functions

Always type function parameters.

Always type function return values when the return type is not obvious.

## Good

```ts
export function createUser(name: string): User {
    ...
}
```

---

# Arrow Functions

Prefer named functions for exported utilities.

## Good

```ts
export function formatDate() {}
```

Avoid

```ts
export const formatDate = () => {};
```

unless required.

---

# Union Types

Prefer union types over enums.

## Good

```ts
type Status =
    | "idle"
    | "loading"
    | "success"
    | "error";
```

---

# Enums

Do not use enums.

## Bad

```ts
enum Status {}
```

Prefer:

- union types
- const objects
- literal types

---

# Literal Types

Prefer literal types whenever possible.

```ts
type Theme =
    | "light"
    | "dark";
```

---

# Const Assertions

Use `as const` for immutable values.

## Good

```ts
export const ROLES = [
    "admin",
    "user",
] as const;
```

---

# Readonly

Prefer immutable data.

Use `readonly` when mutation is not intended.

---

# Generics

Use generics only when they improve type safety.

Avoid unnecessary generic abstractions.

---

# Utility Types

Prefer built-in utility types.

Examples

- Pick
- Omit
- Partial
- Required
- Record
- ReturnType
- Parameters

Do not recreate existing utility types.

---

# Record

Prefer `Record` for object maps.

## Good

```ts
type Users = Record<string, User>;
```

---

# Utility Functions

Use `es-toolkit` for generic array/object/function helpers (`groupBy`, `sortBy`, `uniqBy`, `get`, `debounce`, `pick`, `omit`, etc.) instead of hand-writing them or adding lodash.

## Good

```ts
import { groupBy, sortBy } from "es-toolkit";

const byStatus = groupBy(orders, (order) => order.status);
```

Never add `lodash` or `lodash-es` alongside it. Only hand-write a utility in `shared/utils` when `es-toolkit` has no equivalent.

---

# Type Imports

Always use `import type`.

## Good

```ts
import type { User } from "@/shared/types/user";
```

---

# Type Exports

Export types explicitly.

## Good

```ts
export type { User };
```

---

# Optional Properties

Use optional properties only when they are truly optional.

Avoid making everything optional.

---

# Nullable Values

Prefer explicit nullable types.

## Good

```ts
type User = {
    email: string | null;
};
```

Avoid hidden nullable behavior.

---

# Boolean Types

Do not create boolean unions.

## Good

```ts
isLoading: boolean;
```

---

# Object Types

Keep object types focused.

Large object types should be split into smaller reusable types.

---

# Discriminated Unions

Prefer discriminated unions for complex state.

## Good

```ts
type Result =
    | {
          status: "success";
          data: User;
      }
    | {
          status: "error";
          message: string;
      };
```

---

# Type Location

Feature types belong inside:

types/
├── user.ts
├── user-response.ts

```text
features/<feature>/types
```

Reusable types belong inside:

```text
shared/types
```

---

# API Types

Keep request and response types separate.

Example

```ts
type CreateUserRequest = {};

type CreateUserResponse = {};
```

---

# Props

Always create dedicated props types.

## Good

```ts
type UserCardProps = {
    user: User;
};
```

---

# Event Types

Use React event types instead of `any`.

Example

```ts
React.ChangeEvent<HTMLInputElement>
```

---

# Error Types

Never throw strings.

Always throw `Error`.

## Good

```ts
throw new Error("User not found");
```

---

# AI Rules

When generating TypeScript:

- Prefer `type` over `interface`.
- Never use `any`.
- Prefer `unknown`.
- Avoid type assertions.
- Avoid non-null assertions.
- Prefer union types.
- Never use enums.
- Prefer immutable data.
- Use `import type`.
- Keep types small.
- Reuse existing types.
- Use utility types.
- Keep feature types inside the feature.
- Keep shared types inside `shared/types`.

---

# Forbidden

Never generate:

- any
- enum
- default exported types
- non-null assertions (`!`)
- unnecessary type assertions (`as`)
- duplicated types
- oversized object types

---

# Goal

Every TypeScript type should be:

- Explicit
- Reusable
- Predictable
- Easy to understand
- Easy to maintain
- Type-safe