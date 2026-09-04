---
name: testing
description: Testing conventions — Vitest + React Testing Library for unit/component tests, Playwright for e2e, test co-location and naming, query priority (role > label > text > testid), mocking at the network boundary, factory functions for fixtures. Use when writing or modifying tests.
---

# Testing

## Purpose

This document defines the required testing conventions for all frontend projects.

Always write tests that verify behavior, not implementation details.

---

# Core Principles

Always:

- Test behavior, not internals.
- Keep tests close to the code they test.
- Prefer fewer, meaningful tests over exhaustive trivial ones.
- Write tests that fail for a clear reason.
- Keep tests independent of each other.

---

# Tooling

Always use:

- Vitest for unit and integration tests.
- React Testing Library for component tests.
- Playwright for end-to-end tests.

Do not introduce Jest, Enzyme, or Cypress unless explicitly required.

---

# Test Location

Co-locate unit and component tests with the code under test.

Example

```text
features/
└── users/
    └── components/
        ├── user-card.tsx
        └── user-card.test.tsx
```

End-to-end tests live outside `src`.

```text
e2e/
└── users.spec.ts
```

---

# Test File Naming

Unit and component test files must mirror the source file name with a `.test.ts` / `.test.tsx` suffix.

## Good

```text
user-card.tsx → user-card.test.tsx
format-date.ts → format-date.test.ts
use-users.ts → use-users.test.ts
```

End-to-end specs use `.spec.ts`.

---

# What To Test

Always test:

- Utility functions with non-trivial logic
- Custom hooks with branching logic
- Components with conditional rendering
- Form validation
- Error and empty states

Do not test:

- Third-party libraries
- Trivial getters/setters
- Static markup with no logic

---

# Component Tests

Test components through their public interface: rendered output and user interaction.

Never assert on internal state or private implementation.

## Good

```tsx
render(<LoginForm onSubmit={handleSubmit} />);

await userEvent.type(screen.getByLabelText("Email"), "user@example.com");
await userEvent.click(screen.getByRole("button", { name: "Log in" }));

expect(handleSubmit).toHaveBeenCalledWith({ email: "user@example.com" });
```

## Bad

```tsx
expect(wrapper.state("email")).toBe("user@example.com");
```

---

# Queries

Prefer queries in this order:

1. `getByRole`
2. `getByLabelText`
3. `getByText`
4. `getByTestId` — last resort only

Avoid `data-testid` when an accessible query works.

---

# Mocking

Mock network requests at the network boundary (MSW), not the API module.

Never mock React internals.

Never mock the component under test.

---

# Async Testing

Always use `findBy*` or `waitFor` for async UI updates.

Never use arbitrary `setTimeout` waits.

## Bad

```ts
await new Promise((r) => setTimeout(r, 500));
```

## Good

```ts
await screen.findByText("User created");
```

---

# Hooks Testing

Test custom hooks with `renderHook` from React Testing Library.

Only unit-test hooks with non-trivial logic (branching, memoization boundaries, reducers).

---

# Snapshot Testing

Avoid snapshot tests for components with logic.

Snapshots are acceptable only for stable, purely presentational output.

---

# Test Data

Use factory functions for test data instead of duplicating fixture objects.

## Good

```ts
function buildUser(overrides?: Partial<User>): User {
    return {
        id: "1",
        name: "Test User",
        ...overrides,
    };
}
```

---

# Coverage

Coverage percentage is not a goal by itself.

Prioritize covering business logic and edge cases over hitting a number.

---

# E2E Scope

Use Playwright only for critical user flows.

Examples

- login
- checkout
- account creation

Do not replicate component-level assertions in e2e tests.

---

# AI Rules

When generating tests:

- Use Vitest and React Testing Library for unit/component tests.
- Use Playwright for e2e.
- Co-locate unit/component tests with source.
- Query by role/label/text, not test id, when possible.
- Mock at the network boundary, not the API module.
- Use `findBy`/`waitFor` for async assertions.
- Test behavior and output, never internal state.
- Use factory functions for test fixtures.

---

# Forbidden

Never generate:

- Tests asserting internal component state
- Arbitrary `setTimeout` waits
- Snapshot tests for components with logic
- Mocks of the component under test
- `data-testid` when an accessible query exists
- Jest, Enzyme, or Cypress without explicit request

---

# Goal

Every test should be:

- Behavior-focused
- Independent
- Fast
- Deterministic
- Easy to understand when it fails
