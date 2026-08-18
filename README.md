# Plåtslageri Site

A Next.js website for **JA Möllers Plåt AB**, built as a practical foundation for local service business websites.

The current implementation supports a public company website, a project gallery, contact form submissions and an authenticated admin area for managing project content. The longer-term direction is to extract the company-specific parts into configuration so the project can become a reusable starter template.

## Project Overview

This repository uses Next.js App Router, React Server Components where practical, Supabase for data/auth/storage and Vercel for deployment.

The codebase is intentionally simple. New features should favor readable TypeScript, small components, route handlers for backend work and clear ownership over broad abstractions.

## Goals

- Provide a fast, maintainable website for JA Möllers Plåt AB.
- Keep the public site easy to update through an admin interface.
- Use Supabase as the source of truth for projects, images, contact messages and authentication.
- Improve SEO and performance without adding unnecessary complexity.
- Gradually make the project reusable for other local service businesses.

## Features

### Public Site

- Home page
- Gallery of completed jobs
- Individual project pages
- Contact page
- Contact form that stores messages in Supabase

### Admin

- Supabase Auth login
- Protected admin page
- Create projects with a main image
- Edit project title and description
- Delete projects
- Add and remove additional project images

## Tech Stack

- [Next.js](https://nextjs.org/) App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)

## Installation

```bash
git clone <repository-url>
cd platslageri-site
npm install
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
RESEND_API_KEY=your-resend-api-key
CONTACT_EMAIL=company-notification-email
RESEND_FROM=Company Name <contact@your-verified-domain.com>
```

These values are available in Supabase under **Project Settings > API**.
The Resend values are used server-side by the contact form notification email. `RESEND_FROM` must use a sender address from a verified Resend domain in production.

## Supabase Setup

Create a Supabase project and configure authentication, storage and database tables.

### Authentication

Enable email/password authentication and create at least one admin user. Admin users sign in at `/login`.

### Storage

Create a public storage bucket named:

```text
jobs
```

The app uses this bucket for main project images and additional project images.

### Database Tables

```sql
create table jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

create table job_images (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  image_url text not null,
  caption text,
  created_at timestamptz not null default now()
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);
```

Enable Row Level Security and add policies suitable for your deployment. At minimum, public pages need read access to project data, authenticated admins need write access to project records and storage, and the contact form needs insert access for `contact_messages`.

## Local Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment

The intended deployment target is Vercel.

1. Push the repository to a Git provider.
2. Import the project in Vercel.
3. Add the required Supabase environment variables.
4. Deploy.

After deployment, verify that project pages load, contact form submissions are stored, admin login works and image uploads reach the `jobs` bucket.

## Project Structure

```text
app/
  admin/              Protected admin page
  api/contact/        Contact form route handler
  contact/            Contact page
  gallery/            Public gallery page
  jobs/[id]/          Project detail pages
  login/              Admin login page
components/           Shared UI and feature components
features/admin/       Admin-specific components
lib/                  Supabase browser and server clients
public/               Static assets
```

## Roadmap

### Milestone 1: Admin Messages

- Admin messages page
- Messages list and message cards
- Mark messages as read
- Delete messages
- Unread message badge in admin navigation

### Milestone 2: Notifications

- Email notifications for new contact form submissions
- Resend integration
- Admin inbox workflow

### Milestone 3: SEO

- Static and dynamic metadata
- Sitemap and robots.txt
- Open Graph metadata
- Canonical URLs
- JSON-LD
- LocalBusiness schema

### Milestone 4: Performance

- Replace raw image tags with `next/image` where appropriate
- Image optimization
- Lazy loading
- Better caching strategy for production pages

### Milestone 5: Reusable Starter Template

- Central `siteConfig`
- Shared domain types
- Feature-first folder organization
- Remove hardcoded company-specific content where practical

## Future Improvements

- Add database migrations or SQL setup files to the repository.
- Document recommended RLS policies in more detail.
- Add seed data for local development.
- Add tests for route handlers and admin workflows.
- Add contribution guidelines before opening the repository publicly.

## License

No license has been selected yet.

Before publishing this repository as open source, add a `LICENSE` file and update this section with the chosen license.
