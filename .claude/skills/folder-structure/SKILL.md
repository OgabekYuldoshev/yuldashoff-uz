---
name: folder-structure
description: Feature-based folder architecture for frontend projects — where components, hooks, services, api, store, types, and utils live inside features/<feature>/ vs shared/, plus providers/, layouts/, config/, styles/, assets/, middleware/. Use for any new file, any restructuring, or any "where does this go" decision, regardless of framework.
---

# Folder Structure

## Purpose

This document defines the standard folder structure for all frontend projects.

All frontend applications **must** follow a **feature-based architecture**.

Framework-specific directories and conventions are documented separately.

- `nextjs` → Next.js rules
- `vite-react` → Vite + React rules
- `state-management` → where stores live and when to use them
- `testing` → where test files live

This document only defines the shared application architecture.

---

# Core Principles

Follow these principles at all times:

- Organize code by business feature.
- Keep related files together.
- Keep features isolated.
- Shared code must remain generic.
- Avoid duplicate implementations.
- Prefer composition over duplication.
- Keep the project structure predictable.
- Do not organize code by file type.

---

# Base Structure

```text
src/
├── features/
├── shared/
├── providers/
├── layouts/
├── config/
├── styles/
├── assets/
└── middleware/
```

Every frontend project must use this structure regardless of framework.

---

# Features

The `features` directory contains all business domains.

Each feature owns everything required for that feature.

Example

```text
features/
├── auth/
├── dashboard/
├── users/
├── products/
├── orders/
└── settings/
```

Every feature should be independent.

Removing a feature should have minimal impact on the rest of the application.

---

# Feature Structure

Each feature may contain only the folders it actually needs.

Example

```text
features/
└── users/
    ├── api/
    ├── components/
    ├── hooks/
    ├── mappers/
    ├── services/
    ├── store/
    ├── types/
    ├── validation/
    ├── utils/
    ├── constants/
```

Do not create empty folders.

Do not create folders before they are needed.

---

# Shared

The `shared` directory contains reusable modules.

```text
shared/
├── components/
├── hooks/
├── lib/
├── store/
├── utils/
├── types/
├── constants/
├── icons/
└── ui/
```

Everything inside `shared` must be reusable.

Never place feature-specific business logic inside `shared`.

---

# Components

Decision:

Is the component reused by multiple independent features?

Yes

→ shared/components

No

→ features/<feature>/components

Examples

✅

```text
shared/components/button.tsx
```

```text
shared/components/modal.tsx
```

✅

```text
features/users/components/user-table.tsx
```

```text
features/products/components/product-card.tsx
```

---

# Hooks

Decision:

Is the hook reusable?

Yes

→ shared/hooks

No

→ features/<feature>/hooks

---

# Services

Feature business logic belongs inside

```text
features/<feature>/services
```

Do not place feature services inside shared.

---

# API

Feature API modules belong inside

```text
features/<feature>/api
```

Shared API clients belong inside

```text
shared/lib
```

Examples

Axios instance

Fetch wrapper

GraphQL client

---

# Store

Feature state

```text
features/<feature>/store
```

Global providers belong inside

```text
providers/
```

Only create global state when data is shared across multiple features.

---

# Validation

Validation belongs to the feature.

```text
features/auth/validation
```

Never place feature validation inside shared.

---

# Types

Feature types

```text
features/<feature>/types
```

Reusable types

```text
shared/types
```

---

# Utils

Generic helper

```text
shared/utils
```

Feature helper

```text
features/<feature>/utils
```

---

# Constants

Feature constants

```text
features/<feature>/constants
```

Shared constants

```text
shared/constants
```

---

# Providers

Application providers belong here.

```text
providers/
```

Examples

- Theme Provider
- Query Provider
- Authentication Provider
- Localization Provider

---

# Layouts

Reusable layouts belong here.

```text
layouts/
```

Examples

Dashboard Layout

Authentication Layout

Admin Layout

---

# Config

Application configuration.

```text
config/
```

Examples

- Site configuration
- Navigation
- Feature flags
- Environment mapping

---

# Styles

Global styles only.

```text
styles/
```

Examples

- globals.css
- animations.css
- fonts.css

Do not place component-specific styles here.

---

# Assets

Static assets.

```text
assets/
```

Examples

- images
- icons
- fonts
- videos

---

# Middleware

Application middleware.

```text
middleware/
```

Examples

- authentication
- localization
- logging

---

# Decision Rules

Before creating any new file:

1. Does it belong to a business feature?
   - Yes → Place it inside that feature.

2. Is it reused by multiple features?
   - Yes → Move it to `shared`.

3. Is it generic?
   - Yes → Place it inside `shared`.

4. Is it business-specific?
   - Yes → Keep it inside the feature.

Never move code to `shared` until it is actually reused by multiple independent features.

---

# Forbidden

Do not organize business code like this:

```text
src/
├── components/
├── hooks/
├── services/
├── utils/
```

These folders encourage type-based architecture.

Business code must remain inside its feature.

---

# AI Rules

When generating code:

- Always determine the correct feature first.
- Keep all related files together.
- Never mix unrelated business domains.
- Reuse existing folders.
- Avoid creating duplicate modules.
- Prefer feature ownership over shared ownership.
- Only use `shared` for genuinely reusable code.
- Do not create unnecessary nesting.
- Keep the folder structure simple and scalable.

---

# Goal

The project should remain modular, scalable, and easy to maintain.

Each feature should own its entire implementation.

Reusable code should be shared only when it is truly shared.