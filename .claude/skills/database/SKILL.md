---
name: database
description: PostgreSQL + Drizzle ORM conventions — schema file layout, snake_case/camelCase naming, single client instance, query API vs raw SQL, inferred row types, migrations, transactions, and the server-only access boundary. Use for any schema, query, or migration work.
---

# Database

## Purpose

This document defines the required database conventions for fullstack Next.js monolith projects (and any app package inside a Turborepo monorepo that owns its own database access).

Always use PostgreSQL with Drizzle ORM.

---

# Core Principles

Always:

- Use PostgreSQL as the database.
- Use Drizzle ORM for schema, queries, and migrations.
- Keep the schema as the single source of truth for types.
- Keep database access out of components.
- Keep raw SQL to a minimum.

---

# Stack

Always use:

- `drizzle-orm`
- `drizzle-kit` (migrations, studio)
- `pg` (node-postgres driver) or `postgres` (postgres.js), pick one per project and stay consistent

Never mix ORMs (no Prisma, no TypeORM) in the same project.

---

# Location

## Next.js monolith

```text
src/
└── db/
    ├── schema/
    │   ├── users.ts
    │   ├── posts.ts
    │   └── index.ts
    ├── client.ts
    └── migrations/
```

## Turborepo monorepo

Database lives in a shared package, not inside an app.

```text
packages/
└── database/
    ├── src/
    │   ├── schema/
    │   ├── client.ts
    │   └── index.ts
    ├── drizzle.config.ts
    └── package.json
```

Apps (`apps/web`, `apps/api`) import from `@repo/database`. Never duplicate schema definitions across apps.

---

# Schema Files

One schema file per table/domain.

```text
db/schema/users.ts
db/schema/posts.ts
```

Re-export everything from `db/schema/index.ts`. This is the one exception alongside the feature root `index.ts` allowed by `imports-and-exports` — a schema barrel, because Drizzle relations require all tables in one graph.

## Good

```ts
// db/schema/users.ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

---

# Naming

Table and column names in the database are `snake_case`.

Drizzle column keys in TypeScript are `camelCase`.

## Good

```ts
export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    authorId: uuid("author_id").notNull().references(() => users.id),
    publishedAt: timestamp("published_at"),
});
```

Table variable names are plural, camelCase (`users`, `posts`, `orderItems`).

---

# Client

Create a single Drizzle client instance.

```text
db/client.ts
```

```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, { schema });
```

Never instantiate a new client per request.

Never create a client inside a component or server action — import the shared one.

---

# Queries

Prefer the Drizzle query API (`db.query.users.findMany(...)`) for reads with relations.

Use the query builder (`db.select()...`) when you need explicit column selection or joins Drizzle's relational API doesn't express well.

Never use raw SQL unless Drizzle cannot express the query — and isolate it in `db.execute(sql\`...\`)` with a comment explaining why.

---

# Types

Infer row types from the schema. Never hand-write types that duplicate a table shape.

```ts
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
```

These are DTO types — server/database contracts. Per `typescript`, never use them directly as component props; map them to application types at the feature boundary. See "Mappers" in `api-and-data-fetching`.

---

# Migrations

Always generate migrations with `drizzle-kit generate`.

Never hand-edit a generated migration file after it has been applied anywhere.

Never edit the database schema directly in production — migrations are the only path.

Commit migration files to version control.

---

# Transactions

Use `db.transaction()` for any operation that writes to more than one table and must be atomic.

```ts
await db.transaction(async (tx) => {
    const [order] = await tx.insert(orders).values(orderData).returning();
    await tx.insert(orderItems).values(items.map((i) => ({ ...i, orderId: order.id })));
});
```

Never perform multi-table writes without a transaction when they must succeed or fail together.

---

# Access Boundary

Database access happens only in:

- Server Actions (Next.js monolith — see `nextjs-server-actions`)
- Route Handlers / `app/api`
- Hono route handlers (standalone API package — see `monorepo`)

Never import `db` into a Client Component.

Never import `db` into `shared/` — database access is not generic reusable frontend code.

---

# Seeding

Keep seed scripts outside the schema directory.

```text
db/seed.ts
```

Seed scripts must be idempotent — safe to run more than once.

---

# AI Rules

When generating database code:

- Use Drizzle ORM against PostgreSQL.
- One schema file per table, re-exported from `schema/index.ts`.
- snake_case DB columns, camelCase TS keys.
- Infer types from schema, never hand-write duplicate types.
- Use `db.transaction()` for multi-table writes.
- Generate migrations with drizzle-kit, never hand-edit applied ones.
- Keep `db` access inside server actions, route handlers, or Hono routes only.

---

# Forbidden

Never generate:

- Prisma, TypeORM, or a second ORM alongside Drizzle
- A new Drizzle client instance per request
- Raw SQL when the query builder can express it
- Hand-edited applied migration files
- `db` imports inside Client Components or `shared/`
- Multi-table writes without a transaction

---

# Goal

Every database interaction should be:

- Type-safe, inferred from schema
- Migration-tracked
- Atomic where it needs to be
- Isolated to the server boundary
