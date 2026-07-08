# AGENTS.md

## Project

This project is a modern Next.js starter template for local service businesses.

The current implementation is for:

JA Möllers Plåt AB

The long-term goal is to make the project reusable for other companies
such as electricians, industrial mechanics, roofers, painters and similar.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

---

## General Philosophy

Keep the project simple.

Avoid unnecessary abstractions.

Prefer readable code over clever code.

Always prefer maintainability.

If introducing new patterns or libraries, they should provide a clear long-term benefit.

---

## Architecture

Prefer:

- Server Components
- API Route Handlers
- Small reusable components
- Feature-first architecture for new features

Avoid:

- Large utility files
- Global state unless necessary
- Premature optimization

---

## Workflow

Before implementing larger changes:

1. Analyze the existing code.
2. Explain the implementation plan.
3. Wait for approval.
4. Implement the feature.
5. Summarize all modified files.

---

## Styling

Use the global design system.

Avoid hardcoded colors.

Prefer semantic Tailwind classes such as:

- bg-card
- bg-background
- text-foreground
- text-muted
- border-border
- bg-primary
- bg-danger

Keep components compatible with both Light and Dark mode.

---

## Features

Current major features:

- Projects
- Gallery
- Contact Form
- Admin
- Multiple project images

Upcoming:

- Admin Messages
- Email notifications
- SEO
- siteConfig
- Reusable starter template

---

## Database

Supabase is the single source of truth.

Use RLS whenever possible.

Backend logic should preferably live inside Route Handlers.

Do not duplicate database logic across multiple components.

---

## Coding Style

TypeScript everywhere.

Prefer async/await.

Prefer explicit naming.

Small focused functions.

Avoid deeply nested code.

---

## Pull Requests

Keep PRs small.

One feature per PR.

Refactor only when it improves maintainability.

---

## Code Reviews

Before finishing a feature:

- Look for duplicated code.
- Look for future extensibility.
- Keep implementations simple.
- Avoid introducing abstractions that are not yet needed.

---

## When making suggestions

Before implementing larger features:

1. Explain the plan.
2. Explain why.
3. Then implement.

Favor long-term maintainability over quick fixes.
