# AI Development Rules

Before making any code changes:

## 1. Detect the shape of the project

Check `package.json` (root, and each `apps/*` in a monorepo) and the repo root:

- Package manager & runtime: detect from the lockfile (`bun.lock`/`bunfig.toml` → Bun, `pnpm-lock.yaml` → pnpm, `package-lock.json` → npm, `yarn.lock` → Yarn) and use that consistently for every command. Never default to Bun on an existing project.
- `turbo.json` present, or an `apps/` + `packages/` layout → Turborepo monorepo → treat each `apps/*` entry as its own project and apply the rules below to it individually.
- `next` in dependencies, no separate standalone backend → Next.js fullstack monolith.
- `next` in dependencies inside a monorepo `apps/web`, with a separate `apps/api` → Next.js is the frontend only here — it talks to `apps/api`, not its own database.
- `vite` + `react`, no `next` → Vite + React SPA.
- `hono`, no `react`/`next` → standalone backend package/app. Frontend conventions do not apply.

## 2. Use the matching skills

Conventions for every concern below live as Claude Skills under `.claude/skills/` — folder structure, naming conventions, imports and exports, TypeScript, tooling, React, Tailwind CSS, forms, state management, testing, API and data fetching, Next.js, Next.js Server Actions, database, monorepo, Vite + React.

Each skill's own description states what it covers and when to use it. Invoke the skill(s) relevant to the task at hand before writing code in that area — do not guess a convention a skill already defines.

## 3. Priority and behavior rules

- Follow project conventions found in existing code over these defaults when the two conflict — these skills define the default for new code, not a mandate to rewrite working code that predates them. If existing code violates a skill, do not silently "fix" it as a side effect of an unrelated task; flag it instead.
- Do not invent architecture not covered by a skill — ask, or pick the closest existing pattern in the codebase.
- Reuse existing components and modules before creating new ones.
- Keep consistency across the codebase.
- Default stack, absent project signals to the contrary: Next.js monolith + Postgres/Drizzle + Actium + Tailwind/shadcn + React Hook Form/Zod + Zustand + nuqs + Biome/Husky/commitlint, package-managed with Bun. Reach for Turborepo/Hono only per the decision rule in the `monorepo` skill. The package manager/runtime default (Bun) applies only to brand-new projects with no lockfile — for an existing project, always follow its detected lockfile per rule 1, never override it with this default.
