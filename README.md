# yuldashoff.uz

Personal site and blog of Ogabek Yuldoshev — Next.js App Router, Outstatic as the
Git-backed CMS, Tailwind CSS v4 with shadcn/ui, and Biome for linting and
formatting.

## Requirements

- Node.js 20+
- Bun (the repo's package manager — see `bun.lock`)

## Scripts

| Script | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Biome lint + format check (no writes) |
| `bun run lint:fix` | Biome check with autofixes |
| `bun run format` | Format every file |
| `bun run typecheck` | `tsc --noEmit` |

## Project Structure

The application follows a feature-based architecture. All source lives under
`src/`, aliased as `@/`.

```text
src/
├── app/                     # Next.js App Router — routing only, thin wrappers
│   ├── (app)/               # Public site
│   │   ├── blog/            # index + [slug]/ (own article layout)
│   │   ├── projects/        # index + [slug]/ (own article layout)
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
│   ├── ui/                  # shadcn/ui components + motion primitives
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

## Design System

Colour, radius, shadow and typography come from a single set of CSS variables in
`src/styles/globals.css` — the "Clean Green" theme from
[tweakcn](https://tweakcn.com). Components style themselves with the semantic
tokens (`bg-background`, `text-muted-foreground`, `border`, `bg-primary`, …)
rather than palette classes, so both light and dark modes follow the theme and
swapping it is a one-file change.

## SEO & Icons

Everything search engines and social cards need is generated from `SITE_CONFIG`:

- **Metadata** — canonical URLs, `robots`/`googlebot` directives, keywords, author
  and per-page Open Graph / Twitter tags via the Metadata API.
- **Social cards** — one layout in `src/shared/lib/og-image.tsx`, rendered by
  `next/og` into `opengraph-image` routes for the site, every post and every
  project. Nothing to design by hand when content is added.
- **Structured data** — `Person`, `WebSite`, `BlogPosting`, `CreativeWork` and
  `BreadcrumbList` JSON-LD from `src/shared/lib/structured-data.ts`.
- **Feeds** — `/sitemap.xml`, `/robots.txt` and an RSS feed at `/blog/rss.xml`.
- **Icons** — `icon.svg`, a multi-size `favicon.ico`, `apple-icon.png` and the
  PWA icons in `manifest.webmanifest`, all drawn from the theme's primary green.
  Regenerate the raster ones with the script in the commit that added them if the
  mark ever changes.

Markdown code blocks are highlighted at render time by `rehype-highlight`; the
token colours are their own `--code-*` variables in `globals.css`, so they flip
with the theme and cost no client-side JavaScript.

`components.json` configures the shadcn CLI for this layout: new components land
in `src/shared/ui/` and import `cn` from the `cn` package.

```bash
bunx shadcn@latest add <component>
```

The `radix-ui` umbrella package the CLI generates does not tree-shake on its own,
so `next.config.mjs` lists it under `experimental.optimizePackageImports`.

Full conventions are documented as skills under `.claude/skills/`; `AGENTS.md`
explains how to apply them.
