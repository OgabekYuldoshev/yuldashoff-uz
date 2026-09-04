---
name: react
description: React component conventions for Next.js or Vite — composition, component size, props, state, hooks, JSX, lists/keys, memoization, accessibility, forbidden patterns (default exports, class components, unnecessary effects). Use for any React component work.
---

# React

## Purpose

This document defines the required React conventions for all frontend projects.

Always write simple, composable, predictable, and maintainable React components.

---

# Core Principles

Always:

- Prefer composition over inheritance.
- Keep components focused.
- Keep components reusable.
- Avoid unnecessary abstractions.
- Prefer readability over clever code.
- Write declarative React.

---

# Components

Every component should have a single responsibility.

If a component becomes too large, split it into smaller components.

Avoid components with multiple unrelated responsibilities.

---

# Component Size

Keep components small.

As a general guideline:

- Small components are preferred.
- Split large components into logical pieces.
- Avoid components that become difficult to read.

---

# Component Organization

Organize components by feature.

Feature components belong inside:

```text
features/<feature>/components
```

Reusable components belong inside:

```text
shared/components
```

---

# Component Naming

Component names must use PascalCase.

File names must use kebab-case.

Example

```text
user-card.tsx
```

```tsx
export function UserCard() {}
```

---

# Props

Always create dedicated props types.

Example

```tsx
type UserCardProps = {
    user: User;
};

export function UserCard({
    user,
}: UserCardProps) {
    ...
}
```

Avoid inline object types.

---

# Destructuring

Always destructure props.

## Good

```tsx
export function UserCard({
    user,
}: UserCardProps) {}
```

Avoid

```tsx
export function UserCard(props: UserCardProps) {}
```

---

# State

Keep state as local as possible.

Do not lift state unnecessarily.

Prefer:

- useState
- useReducer

Only use global state when multiple features truly share the data.

---

# Derived State

Never duplicate derived state.

Compute values instead.

## Good

```tsx
const completedTodos = todos.filter(...);
```

Avoid storing derived values inside state.

---

# Effects

Use effects only when synchronizing with external systems.

Do not use useEffect for derived state.

Avoid unnecessary effects.

---

# Custom Hooks

Move reusable logic into custom hooks.

Feature hooks belong inside:

```text
features/<feature>/hooks
```

Shared hooks belong inside:

```text
shared/hooks
```

---

# Hook Rules

Always follow the Rules of Hooks.

Never call hooks:

- inside loops
- inside conditions
- inside nested functions

---

# Event Handlers

Use descriptive event handlers.

Examples

```tsx
handleClick

handleSubmit

handleDelete

handleClose
```

Avoid anonymous functions with complex logic inside JSX.

---

# JSX

Keep JSX clean and readable.

Move complex logic outside JSX.

Prefer variables over nested expressions.

---

# Conditional Rendering

Prefer early returns.

Example

```tsx
if (!user) {
    return null;
}
```

Avoid deeply nested ternaries.

---

# Lists

Always provide stable keys.

Prefer unique IDs.

Avoid array indexes as keys unless the list is static.

---

# Keys

Good

```tsx
key={user.id}
```

Bad

```tsx
key={index}
```

---

# Memoization

Do not use memoization by default.

Use:

- useMemo
- useCallback
- memo

only when there is measurable performance benefit.

---

# Context

Do not place everything inside Context.

Context is for shared application state.

Avoid using Context as a global store.

---

# Composition

Prefer composition.

Example

```tsx
<Card>
    <CardHeader />
    <CardContent />
</Card>
```

Avoid inheritance patterns.

---

# Forms

Keep form state close to the form.

Do not duplicate form state.

---

# Children

Use children when composition improves flexibility.

Do not overuse children.

---

# Rendering

Keep render functions pure.

Never mutate state during rendering.

Never perform side effects during rendering.

---

# Async Code

Avoid async React components unless supported by the framework.

Keep asynchronous logic outside rendering.

---

# Error Handling

Handle loading, empty, and error states explicitly.

Do not render blank screens.

---

# Accessibility

Always write accessible components.

Prefer semantic HTML.

Examples

- button
- nav
- main
- section
- article

Always provide labels where appropriate.

---

# Performance

Optimize only after identifying a real bottleneck.

Avoid premature optimization.

For long lists (roughly 100+ rendered rows, or any list causing measurable scroll/render jank), use `@tanstack/react-virtual` instead of rendering every item. Do not add it to short or bounded lists "just in case."

---

# Code Duplication

If logic is reused:

Extract it into:

- custom hook
- utility
- reusable component

Avoid copy-paste implementations.

---

# AI Rules

When generating React code:

- Keep components small.
- Prefer composition.
- Use named exports.
- Keep logic outside JSX.
- Prefer early returns.
- Keep state local.
- Avoid unnecessary effects.
- Avoid unnecessary memoization.
- Extract reusable logic.
- Follow feature-based architecture.
- Write accessible HTML.

---

# Forbidden

Never generate:

- Default exports
- Class components
- Component inheritance
- Anonymous default components
- Complex JSX expressions
- Deeply nested ternaries
- Array indexes as keys
- Side effects during rendering
- Unnecessary useEffect
- Unnecessary memoization

---

# Goal

Every React component should be:

- Small
- Reusable
- Predictable
- Easy to understand
- Easy to test
- Easy to maintain