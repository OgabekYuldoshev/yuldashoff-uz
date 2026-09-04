# yuldashoff.uz

Personal site and blog of Ogabek Yuldoshev — Next.js App Router, Outstatic as the
Git-backed CMS, Tailwind CSS v4, and Biome for linting and formatting.

## Requirements

- Node.js 20+
- pnpm (the repo's package manager — see `packageManager` in `package.json`)

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Biome lint + format check (no writes) |
| `pnpm lint:fix` | Biome check with autofixes |
| `pnpm format` | Format every file |
| `pnpm typecheck` | `tsc --noEmit` |

## Project Structure

The application follows a feature-based architecture. All source lives under
`src/`, aliased as `@/`.

```text
src/
├── app/                     # Next.js App Router — routing only, thin wrappers
│   ├── (app)/               # Public site
│   │   ├── blog/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (cms)/               # Outstatic dashboard
│   ├── api/                 # Route handlers
│   ├── layout.tsx           # Root layout (html/body, fonts, metadata)
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── config/                  # Site metadata, social links, work experience
├── features/                # Business domains; each owns its public API
│   ├── blog/                # api/ components/ types/ index.ts
│   ├── home/                # Landing page sections
│   └── projects/            # api/ components/ types/ index.ts
├── layouts/                 # Reusable page shells
├── providers/               # Application-wide React providers
├── shared/                  # Genuinely reusable code
│   ├── components/          # Composed shared components
│   ├── ui/                  # Presentational primitives
│   └── utils/
└── styles/                  # Global stylesheet
```

Content lives outside `src/`, in `outstatic/content/`, and is managed through the
Outstatic dashboard at `/outstatic`.

### Rules of thumb

- Route files (`page.tsx`, `layout.tsx`, `route.ts`, …) stay thin and delegate to a
  feature. They are the only files allowed a default export.
- Everything else uses named exports; a feature is consumed through its root
  `index.ts` only.
- Data access for a domain lives in `features/<feature>/api/*-api.ts` and runs on
  the server.
- Move code into `shared/` only once more than one feature actually uses it.

Full conventions are documented as skills under `.claude/skills/`; `AGENTS.md`
explains how to apply them.
