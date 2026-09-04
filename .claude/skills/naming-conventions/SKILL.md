---
name: naming-conventions
description: File, folder, component, hook, function, variable, boolean, constant, type, interface, and suffix (-api/-service/-store/-schema/-provider/-layout) naming conventions — kebab-case files, PascalCase components/types, camelCase functions/variables. Use whenever creating or renaming any file, folder, or symbol.
---

# Naming Conventions

## Purpose

This document defines the required naming conventions for all frontend projects.

All files, folders, variables, functions, components, types, and constants must follow these conventions.

Consistency is more important than personal preference.

---

# General Rules

- Always use descriptive names.
- Avoid abbreviations unless they are widely accepted.
- Keep names short but meaningful.
- Be consistent across the entire project.

---

# Files

All file names **must** use **kebab-case**.

## Good

```text
user-card.tsx
product-list.tsx
login-form.tsx
user-service.ts
user-api.ts
auth-provider.tsx
use-auth.ts
loading-spinner.tsx
```

## Bad

```text
UserCard.tsx
userCard.tsx
user_card.tsx
User_Card.tsx
```

---

# Folders

All folder names **must** use **kebab-case**.

## Good

```text
user-management/
product-management/
shared/
auth/
```

## Bad

```text
UserManagement/
userManagement/
user_management/
```

---

# React Components

Component names must use **PascalCase**.

File names remain **kebab-case**.

## Good

File

```text
user-card.tsx
```

Code

```tsx
export function UserCard() {}
```

---

# Hooks

Hook files must use **kebab-case**.

Hook names must begin with **use**.

## Good

```text
use-auth.ts
use-products.ts
use-window-size.ts
```

```tsx
export function useAuth() {}
```

## Bad

```text
auth-hook.ts
UseAuth.ts
useAuth.ts
```

---

# Functions

Function names must use **camelCase**.

## Good

```ts
getUser()

createProduct()

formatCurrency()

calculateTotal()
```

---

# Variables

Variables must use **camelCase**.

## Good

```ts
currentUser

isLoading

totalPrice

selectedProduct
```

---

# Boolean Variables

Boolean variables should clearly express intent.

Prefer prefixes like:

- is
- has
- can
- should

## Good

```ts
isLoading

hasPermission

canEdit

shouldRedirect
```

---

# Constants

Constants must use **SCREAMING_SNAKE_CASE**.

## Good

```ts
API_TIMEOUT

MAX_FILE_SIZE

DEFAULT_PAGE_SIZE
```

---

# Types

Type aliases must use **PascalCase**.

## Good

```ts
type User

type Product

type ApiResponse
```

---

# Interfaces

Interfaces must use **PascalCase**.

Do not prefix interfaces with `I`.

## Good

```ts
interface User
```

## Bad

```ts
interface IUser
```

---

# Enums

Enum names must use **PascalCase**.

Enum members must use **PascalCase**.

> Note: Prefer union types or constant objects over enums unless explicitly required.

---

# Props

Component props must use the component name followed by `Props`.

## Good

```ts
type UserCardProps
```

---

# Event Handlers

Event handlers should begin with `handle`.

## Good

```ts
handleClick

handleSubmit

handleDelete

handleClose
```

---

# API Files

API modules must end with `-api`.

## Good

```text
user-api.ts

product-api.ts

payment-api.ts
```

---

# Service Files

Service modules must end with `-service`.

## Good

```text
auth-service.ts

user-service.ts
```

---

# Store Files

Store modules must end with `-store`.

## Good

```text
auth-store.ts

cart-store.ts
```

---

# Validation

Validation files must end with `-schema`.

## Good

```text
login-schema.ts

user-schema.ts
```

---

# Provider Files

Provider files must end with `-provider`.

## Good

```text
theme-provider.tsx

query-provider.tsx
```

---

# Layout Files

Layout components must end with `-layout`.

## Good

```text
dashboard-layout.tsx

auth-layout.tsx
```

---

# Utility Files

Utility files should describe their purpose.

## Good

```text
format-date.ts

format-currency.ts

generate-slug.ts

parse-error.ts
```

---

# AI Rules

When generating new code:

- Always use kebab-case for files.
- Always use kebab-case for folders.
- Always use PascalCase for React components.
- Always use camelCase for variables and functions.
- Always use descriptive names.
- Never abbreviate names without a clear reason.
- Keep naming consistent throughout the project.

---

# Forbidden

Do not generate:

```text
UserCard.tsx

userCard.tsx

user_card.tsx

USER_CARD.tsx
```

Always generate:

```text
user-card.tsx
```

---

# Goal

Every file, folder, and symbol should have a predictable, consistent, and descriptive name.

Following these conventions improves readability, maintainability, and collaboration across the project.