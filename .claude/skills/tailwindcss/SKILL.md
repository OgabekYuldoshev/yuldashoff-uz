---
name: tailwindcss
description: Tailwind CSS conventions — utility-first styling, class ordering, cn() merging, shadcn/ui as the base component layer, dark mode, responsive design, forbidden patterns (inline styles, arbitrary values, random colors). Use for any styling task.
---

# Tailwind CSS

## Purpose

This document defines the required Tailwind CSS conventions for all frontend projects.

Always write clean, consistent, reusable, and maintainable utility classes.

Prefer reusable UI over duplicated utility strings.

---

# Core Principles

Always:

- Prefer utility classes.
- Keep class lists readable.
- Reuse common styles.
- Avoid duplicated class strings.
- Prefer design system values.
- Keep styling predictable.

---

# Utility First

Always use Tailwind utility classes.

Avoid writing custom CSS unless absolutely necessary.

Prefer Tailwind over CSS modules or inline styles.

---

# Class Organization

Group classes logically.

Recommended order:

1. Layout
2. Flex/Grid
3. Spacing
4. Sizing
5. Typography
6. Background
7. Border
8. Effects
9. Transitions
10. State
11. Responsive

Example

```tsx
className="
flex
items-center
justify-between
gap-4
p-4
rounded-lg
border
bg-white
text-sm
font-medium
shadow-sm
transition-colors
hover:bg-gray-50
md:p-6
"
```

---

# Class Formatting

Keep long class lists readable.

Break long class strings onto multiple lines.

Avoid one-line class strings containing dozens of utilities.

---

# Repeated Classes

If the same utility string appears multiple times:

Extract it.

Prefer:

- reusable component
- reusable variant
- shared UI component

Avoid copy-paste styling.

---

# cn()

Always use a class merging utility.

Example

```tsx
cn(
    "rounded-md",
    isActive && "bg-primary",
    className,
)
```

Avoid manual string concatenation.

Bad

```tsx
className={
    "rounded " +
    (isActive ? "bg-primary" : "")
}
```

---

# Conditional Classes

Always use `cn()` for conditional styling.

Avoid nested ternary expressions inside `className`.

---

# Arbitrary Values

Avoid arbitrary values.

Bad

```tsx
w-[37px]

mt-[13px]

rounded-[11px]
```

Prefer Tailwind scale.

Good

```tsx
w-10

mt-3

rounded-lg
```

Only use arbitrary values when no design token exists.

---

# Colors

Always use project design tokens.

Avoid random color values.

Good

```tsx
bg-primary

text-muted-foreground

border-border
```

Avoid

```tsx
bg-[#3b82f6]
```

unless explicitly required.

---

# Spacing

Use Tailwind spacing scale.

Avoid custom spacing values.

---

# Typography

Use Tailwind typography utilities.

Avoid inline styles.

---

# Width & Height

Prefer responsive sizing.

Avoid fixed pixel dimensions unless required.

---

# Responsive Design

Always use responsive utilities.

Example

```tsx
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
```

Avoid separate mobile and desktop components.

---

# Dark Mode

Always support dark mode if the project uses it.

Use Tailwind dark variants.

Example

```tsx
bg-white

dark:bg-neutral-900
```

---

# Hover & Focus

Always include appropriate interactive states.

Examples

- hover
- focus
- active
- disabled

---

# Transitions

Prefer Tailwind transition utilities.

Example

```tsx
transition-colors

duration-200
```

Avoid custom CSS transitions unless necessary.

---

# Flex & Grid

Prefer Flexbox and Grid utilities.

Avoid unnecessary wrapper elements.

---

# Overflow

Explicitly define overflow behavior.

Avoid unexpected scrolling.

---

# Z-Index

Use project z-index scale.

Avoid random z-index values.

Bad

```tsx
z-[99999]
```

---

# Inline Styles

Avoid inline styles.

Bad

```tsx
style={{
    marginTop: 13,
}}
```

Prefer Tailwind utilities.

---

# Component Library — shadcn/ui

Always use shadcn/ui as the base component layer.

Never hand-roll a primitive (button, dialog, dropdown, select, popover, tooltip, etc.) that shadcn/ui already provides.

Install components via the shadcn CLI — do not copy-paste component code manually.

```text
shared/components/ui/
├── button.tsx
├── dialog.tsx
└── input.tsx
```

In a Turborepo monorepo, shared shadcn components live in `packages/ui` instead — see `monorepo`.

Customize a shadcn component by editing the generated file directly (it is owned code once installed), not by wrapping it in another abstraction layer.

Feature-specific composites built on top of shadcn primitives go in the feature.

```text
features/users/components/user-card.tsx   # composes shadcn Card, Avatar, Badge
```

Use shadcn's own `cn()` (`shared/lib/cn.ts` or `packages/ui/src/lib/cn.ts`) as the one class-merging utility for the whole project — do not create a second one.

---

# Custom CSS

Only write custom CSS when Tailwind cannot solve the problem.

Examples

- complex animations
- third-party overrides
- browser-specific fixes

---

# Components

If styling becomes complex:

Extract a reusable component.

Do not keep extremely long utility strings inside pages.

---

# Variants

When a component has multiple visual variants:

Use a variant system.

Avoid duplicating utility strings.

---

# AI Rules

When generating Tailwind code:

- Prefer utility classes.
- Keep class lists readable.
- Use shadcn/ui for primitives instead of hand-rolling them.
- Use `cn()`.
- Avoid duplicated class strings.
- Avoid arbitrary values.
- Prefer design tokens.
- Prefer reusable UI.
- Use responsive utilities.
- Support dark mode when applicable.
- Extract repeated styling into reusable components.

---

# Forbidden

Never generate:

- Inline styles
- Random spacing values
- Random colors
- Extremely long utility strings
- Manual class concatenation
- Repeated utility strings
- Unnecessary custom CSS

---

# Goal

Every Tailwind component should be:

- Clean
- Consistent
- Reusable
- Responsive
- Easy to read
- Easy to maintain