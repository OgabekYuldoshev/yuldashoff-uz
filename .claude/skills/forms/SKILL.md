---
name: forms
description: Form conventions — React Hook Form + Zod validation, zodResolver, schema location, inferred form types, submit handling via TanStack Query mutations, accessibility. Use when building or modifying any form.
---

# Forms

## Purpose

This document defines the required conventions for building forms in all frontend projects.

Always build forms that are type-safe, validated, reusable, and easy to maintain.

---

# Core Principles

Always:

- Use React Hook Form.
- Use Zod for validation.
- Keep validation separate from UI.
- Keep submit logic outside components when possible.
- Prefer reusable form components.
- Keep forms predictable.

---

# Form Library

Always use React Hook Form.

Do not manage complex forms with `useState`.

Good

```tsx
const form = useForm<FormValues>();
```

Bad

```tsx
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

---

# Validation

Always use Zod.

Never write manual validation inside components.

Good

```ts
const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});
```

---

# Schema Location

Validation schemas belong inside the feature.

Example

```text
features/
└── auth/
    ├── validation/
    │   └── login-schema.ts
```

---

# Resolver

Always connect React Hook Form with Zod using `zodResolver`.

Good

```tsx
useForm({
    resolver: zodResolver(loginSchema),
});
```

---

# Form Types

Infer form types from the schema.

Good

```ts
type LoginFormValues = z.infer<typeof loginSchema>;
```

Never duplicate types.

---

# Default Values

Always define explicit default values.

Good

```tsx
defaultValues: {
    email: "",
    password: "",
}
```

---

# Controlled Inputs

Prefer React Hook Form registration.

Good

```tsx
<input {...register("email")} />
```

Use `Controller` only when required by third-party components.

---

# Submit Handling

Submit handlers should focus only on form submission.

Business logic belongs in:

- mutations
- hooks
- services

Avoid large submit functions.

---

# Async Submission

Always use TanStack Query mutations for asynchronous form submission.

Do not call Axios directly from the component.

---

# Loading State

Disable form controls during submission.

Prevent duplicate submissions.

---

# Error Handling

Display validation errors near their corresponding fields.

Display server errors separately.

Never silently ignore errors.

---

# Field Components

Prefer reusable form field components.

Example

```text
shared/components/form/
```

Avoid duplicating field layouts.

---

# Form Layout

Keep forms simple.

Split large forms into logical sections.

---

# Reset

Use React Hook Form's `reset()` instead of manually clearing fields.

---

# Watch

Use `watch()` only when necessary.

Avoid unnecessary subscriptions.

---

# Conditional Fields

Render conditional fields based on form state.

Do not duplicate forms.

---

# Nested Forms

Avoid nested `<form>` elements.

A page should normally contain one form per submission flow.

---

# File Uploads

Keep file upload logic separate from UI.

Use dedicated upload mutations.

---

# Accessibility

Every input should have:

- label
- id
- error message
- helper text when appropriate

Never rely solely on placeholders.

---

# Form State

Prefer React Hook Form state instead of custom state.

Examples

- isDirty
- isSubmitting
- isValid
- errors

---

# Validation Messages

Keep validation messages consistent.

Avoid hardcoded duplicated strings.

---

# AI Rules

When generating forms:

- Use React Hook Form.
- Use Zod.
- Infer types from schemas.
- Never duplicate validation.
- Use zodResolver.
- Keep validation inside `validation/`.
- Use mutations for submit.
- Disable inputs while submitting.
- Display validation errors.
- Display server errors.
- Keep submit handlers small.

---

# Forbidden

Never generate:

- useState for complex forms
- Manual validation
- Duplicated validation rules
- Axios inside components
- Nested forms
- Duplicated form state
- Duplicated form types

---

# Goal

Every form should be:

- Type-safe
- Validated
- Accessible
- Reusable
- Predictable
- Easy to maintain