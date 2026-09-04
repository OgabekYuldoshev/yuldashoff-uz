---
name: api-and-data-fetching
description: Client-side networking conventions for a Vite SPA or a Next.js app calling a standalone backend — Axios + TanStack Query, centralized query keys, mapping raw *Response types to application types via es-toolkit/compat get. Use for any client that talks to a separate backend service; not for a Next.js monolith's own database (see nextjs-server-actions instead).
---

# API and Data Fetching

## Purpose

This document defines the required conventions for API communication and server state management.

Always keep networking predictable, reusable, and separated from UI.

**Scope**: this document applies to Vite + React SPA projects, and to any client (including a Next.js app inside a Turborepo monorepo) that calls a standalone backend service such as a Hono API — see `monorepo`. For a Next.js monolith talking directly to its own database, Server Actions are the primary data layer instead — see `nextjs-server-actions`.

---

# Core Principles

Always:

- Separate UI from networking.
- Keep API logic inside the feature.
- Keep server state separate from client state.
- Reuse API modules.
- Keep requests predictable.
- Handle loading and errors consistently.

---

# API Location

Every feature owns its own API layer.

Example

```text
features/
└── users/
    └── api/
        ├── user-api.ts
        ├── user-queries.ts
        └── user-mutations.ts
```

Never place feature API inside `shared`.

---

# HTTP Client

Always use Axios.

Create a single shared Axios instance.

Example

```text
shared/lib/api-client.ts
```

Do not create multiple Axios instances.

---

# Data Fetching

Always use TanStack Query for server state.

Do not fetch data directly inside React components.

Good

```tsx
const { data } = useUsers();
```

Bad

```tsx
useEffect(() => {
    fetchUsers();
}, []);
```

---

# Query Hooks

Every feature should expose reusable query hooks.

Example

```text
features/
└── users/
    └── hooks/
        └── use-users.ts
```

Components should consume hooks instead of API functions directly.

---

# Mutations

Use TanStack Query mutations for all server mutations.

Examples

- create
- update
- delete
- login

Do not manually manage mutation loading state.

---

# Query Keys

Centralize query keys.

Example

```ts
export const USER_QUERY_KEYS = {
    all: ["users"] as const,
    detail: (id: string) => ["users", id] as const,
};
```

Never duplicate query keys.

---

# API Functions

Each API function should have a single responsibility.

Good

```ts
getUsers()

getUser()

createUser()

updateUser()

deleteUser()
```

Avoid functions that perform multiple unrelated requests.

---

# Response Types

Always define request and response types.

Example

```ts
type CreateUserRequest

type CreateUserResponse
```

Never use `any`.

---

# Mappers

Never trust the response shape blindly. The backend's actual response can drift from the declared type — a field can be missing, nested deeper than expected, or arrive as a different primitive. Do not assume `CreateUserResponse` on the wire matches `CreateUserResponse` in code.

Every feature that consumes external API data defines a mapper that converts the raw response into the application type used by the rest of the feature.

The raw server-shape type is named with a `Response` suffix (`ProfileResponse`, `CreateUserResponse`), not `Dto` — it names what actually comes back over HTTP for that endpoint. File name matches: `profile-response.ts`.

```text
features/
└── users/
    ├── api/
    │   └── user-api.ts
    ├── mappers/
    │   └── user-mapper.ts
    └── types/
        ├── user-response.ts   # what the server actually sends
        └── user.ts             # what the rest of the app uses
```

Response types are plain `type` declarations — no runtime schema library. Instead of validating the response with a schema, read every field through `get` from `es-toolkit/compat` with an explicit default value. `get`'s typed overload infers the field's type from the response type's path automatically (`get(response, "user.age")` resolves to the same type as `response.user.age`), so the mapper stays type-checked without a validation pass — a missing or differently-shaped field falls back to the default instead of throwing or silently producing `undefined`.

## Good

```ts
// types/user-response.ts
export type UserResponse = {
    id?: string;
    full_name?: string;
    age?: number;
};

// mappers/user-mapper.ts
import { get } from "es-toolkit/compat";

import type { User } from "@/features/users/types/user";
import type { UserResponse } from "@/features/users/types/user-response";

export function toUser(response: UserResponse): User {
    return {
        id: get(response, "id", ""),
        name: get(response, "full_name", ""),
        age: get(response, "age", 0),
    };
}
```

## Bad

```ts
export function getUsers() {
    return api.get<User[]>("/users").then((res) => res.data);
}
```

This trusts the generic parameter directly with no mapper and no fallback — if the server omits `age` or nests a field one level deeper than expected, `undefined` flows straight into a component far away from the request instead of being caught at the boundary.

Never use raw response types as component props — map them to the application type first, per `typescript`.

---

# Error Handling

Always handle API errors.

Never ignore rejected promises.

Convert server errors into user-friendly messages.

---

# Loading State

Always handle loading state.

Do not render incomplete UI.

---

# Empty State

Always handle empty responses.

Never assume data exists.

---

# Caching

Use TanStack Query caching.

Do not build manual caches.

---

# Refetching

Prefer query invalidation over manual refetching.

Example

```ts
queryClient.invalidateQueries(...)
```

---

# Optimistic Updates

Use optimistic updates only when appropriate.

Always rollback on failure.

---

# Pagination

Use server-side pagination whenever possible.

Avoid downloading unnecessary data.

---

# Filtering

Perform filtering on the server whenever possible.

Avoid fetching large datasets just to filter on the client.

---

# Sorting

Prefer server-side sorting.

---

# Authentication

Authentication tokens should be handled by the shared HTTP client.

Components should never manually attach authorization headers.

---

# File Uploads

Keep upload logic inside feature API.

Do not upload files directly from UI components.

---

# Abort Requests

Support request cancellation when appropriate.

Avoid updating unmounted components.

---

# Retries

Use TanStack Query retry behavior.

Do not implement custom retry loops unless required.

---

# Business Logic

Keep business logic outside API modules.

API modules should only communicate with the server.

---

# AI Rules

When generating API code:

- Use Axios.
- Use TanStack Query.
- Keep API inside features.
- Reuse query hooks.
- Separate UI from networking.
- Handle loading.
- Handle errors.
- Handle empty states.
- Use typed requests.
- Use typed responses.
- Map raw `*Response` types to application types through a mapper, reading fields with `get` from `es-toolkit/compat` and an explicit default.
- Invalidate queries after mutations.
- Never fetch inside components.

---

# Forbidden

Never generate:

- fetch inside components
- useEffect for data fetching
- any
- duplicated query keys
- manual caching
- manual loading state for server data
- business logic inside API modules

---

# Goal

Every API interaction should be:

- Typed
- Predictable
- Reusable
- Cached
- Easy to test
- Easy to maintain