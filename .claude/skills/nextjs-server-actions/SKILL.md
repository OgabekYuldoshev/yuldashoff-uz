---
name: nextjs-server-actions
description: Data fetching/mutation conventions for a Next.js monolith using Actium Server Actions — createAction, Zod .input(), ActionError, .use() middleware, useActionMutation/useActionQuery, cache invalidation. Use for any data-layer work in a Next.js monolith that owns its own database.
---

# Next.js Server Actions (Actium)

## Purpose

This document defines the required conventions for data fetching and mutations inside Next.js monolith projects.

In a Next.js monolith, Server Actions built with Actium (https://www.npmjs.com/package/actium) are the primary data layer — not Axios, not TanStack Query, not manual `fetch`. `api-and-data-fetching` applies to Vite + React SPA projects and to any client talking to a standalone backend (e.g. `apps/api` in a Turborepo monorepo). This document overrides it for Next.js monolith projects.

---

# Core Principles

Always:

- Use Actium (`createAction`) to define both reads and writes.
- Validate input with Zod via `.input()`.
- Use `ActionError` for expected failures, never throw raw strings or generic `Error` for user-facing failures.
- Compose cross-cutting concerns (auth, logging) with `.use()` middleware, never inline in every handler.
- Call actions from Client Components with `useActionMutation` / `useActionQuery` from `actium/react`.
- Keep the action's `handler` thin — delegate real logic to `features/<feature>/services`.

---

# Location

Server actions belong inside the feature that owns them.

```text
features/
└── posts/
    └── actions/
        ├── get-posts.ts
        ├── create-post.ts
        └── delete-post.ts
```

Every action file starts with `"use server"`.

---

# Defining a Read Action

```ts
// features/posts/actions/get-posts.ts
"use server";

import { createAction } from "actium";
import { listPosts } from "../services/post-service";

export const getPosts = createAction().handler(async () => {
    const posts = await listPosts();
    return { posts };
});
```

Database access and business logic live in the service, not inside the action handler. See `database` and `folder-structure` for `services/`.

---

# Defining a Write Action

Always validate input with `.input(zodSchema)`.

```ts
// features/posts/actions/create-post.ts
"use server";

import { createAction } from "actium";
import { z } from "zod";
import { createPost as createPostService } from "../services/post-service";

const createPostSchema = z.object({
    title: z.string().min(1),
    content: z.string(),
});

export const createPost = createAction()
    .input(createPostSchema)
    .handler(async ({ input }) => {
        const post = await createPostService(input);
        return { post };
    });
```

Infer the action's input type from the schema, per `typescript`. Never hand-write a duplicate type.

---

# Middleware / Auth

Compose reusable middleware with `.use()` instead of repeating auth checks in every handler.

```ts
// features/auth/actions/require-auth.ts
"use server";

import { createAction, ActionError } from "actium";
import { getSession } from "../services/auth-service";

export const requireAuth = createAction().handler(async () => {
    const session = await getSession();

    if (!session) {
        throw new ActionError("NOT_AUTHORIZED", "Login required");
    }

    return { user: session.user };
});
```

```ts
export const deletePost = createAction()
    .input(z.object({ postId: z.string() }))
    .use(requireAuth)
    .handler(async ({ input, ctx }) => {
        await assertOwnsPost(ctx.user.id, input.postId);
        await deletePostService(input.postId);
        return { deleted: true };
    });
```

---

# Error Handling

Always throw `ActionError` for expected, user-facing failures.

```ts
throw new ActionError("VALIDATION_ERROR", "Validation failed", {
    email: ["Invalid email address"],
});

throw new ActionError("FORBIDDEN", "Not your post");
```

Never leak internal error details — unexpected errors sanitize automatically to `INTERNAL_SERVER_ERROR` in production; do not catch-and-rethrow to work around this.

---

# Calling Actions — Mutations

Use `useActionMutation` for creates/updates/deletes. Do not call the server action function directly and manage `isPending`/error state by hand.

```tsx
"use client";

import { useActionMutation, invalidateActionCache } from "actium/react";
import { createPost } from "@/features/posts";

export function CreatePostForm() {
    const { run, isPending, error } = useActionMutation(createPost, {
        onSuccess: () => {
            invalidateActionCache({ key: ["posts"] });
        },
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                run(values);
            }}
        >
            {/* fields via react-hook-form, see forms */}
        </form>
    );
}
```

Pair with `react-hook-form` + `zodResolver(createPostSchema)` per `forms`. Submit handlers call `run(values)`, they do not call Axios or `fetch`.

---

# Calling Actions — Reads

Prefer reading data directly inside Server Components by calling the service/action's underlying function — do not use `useActionQuery` when a Server Component can fetch it directly.

Use `useActionQuery` only inside Client Components that need client-side reads (e.g. reacting to user interaction, polling, or reading inside a component that must stay a Client Component).

```tsx
"use client";

import { useActionQuery } from "actium/react";
import { getPosts } from "@/features/posts";

export function PostList() {
    const { data, isPending, error } = useActionQuery(getPosts, {
        key: ["posts"],
        staleTime: 60_000,
    });

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <ul>
            {data?.posts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
```

---

# Cache Invalidation

Always invalidate the relevant cache key after a mutation that changes data another query reads.

```ts
onSuccess: () => {
    invalidateActionCache({ key: ["posts"] });
};
```

Centralize cache keys the same way `api-and-data-fetching` centralizes TanStack Query keys — never duplicate a key string across files.

```ts
export const POST_ACTION_KEYS = {
    all: ["posts"] as const,
    detail: (id: string) => ["posts", id] as const,
};
```

---

# Public API

Export actions from the feature's `index.ts`, same as any other feature module per `imports-and-exports`.

```ts
// features/posts/index.ts
export { getPosts } from "./actions/get-posts";
export { createPost } from "./actions/create-post";
```

---

# AI Rules

When generating Next.js data code:

- Use `createAction` from Actium for every read and write.
- Validate all input with `.input(zodSchema)`.
- Throw `ActionError`, never a raw `Error` or string, for expected failures.
- Compose auth/logging with `.use()` middleware.
- Keep handlers thin, delegate to `services/`.
- Use `useActionMutation` for writes from Client Components.
- Prefer direct Server Component reads over `useActionQuery` when possible.
- Invalidate cache keys after mutations that affect other queries.

---

# Forbidden

Never generate, inside a Next.js monolith:

- Axios or manual `fetch` for internal app data
- TanStack Query for internal app data (Actium's own hooks replace it)
- Server actions without Zod input validation
- Raw `Error`/string throws for expected failures
- Business logic or `db` calls written directly inside a Server Component instead of a service — see `database`

---

# Goal

Every Next.js data operation should be:

- Type-safe end to end, client to server
- Validated at the boundary
- Free of duplicated loading/error state handling
- Cache-consistent after mutations
