# Repository Guidelines

## Project Structure & Module Organization
Source lives under `src/app`, following the Next.js App Router. Top-level routes (`page.tsx`, `privacy/page.tsx`) are colocated with supporting components and Tailwind-powered styles in `globals.css`. Static assets live in `public/`, while repo config stays in `next.config.ts` and `eslint.config.mjs`. Database models sit in `prisma/schema.prisma`; run `npx prisma format` before committing schema changes.

## Build, Test, and Development Commands
Use `npm run dev` for the local development server at `http://localhost:3000`, which enables hot reload for the App Router. `npm run build` performs a production Next.js build and should stay clean before deployment. Serve a built bundle with `npm run start`. Lint everything—React components, Prisma helpers, and styles—via `npm run lint`. When changing the data layer, pair the above with `npx prisma generate` to refresh the client types.

## Coding Style & Naming Conventions
Write TypeScript with React Server Components by default; mark client-only modules with the first-line directive `"use client"`. Components live in PascalCase files (`ContactForm.tsx`), hooks in camelCase, and shared modules belong near their consumers to keep the app tree shallow. Prefer functional components and hooks, two-space indentation, strict undefined checks, and Tailwind utility classes defined directly inside JSX (reusing `globals.css` only for theme tokens). ESLint plus TypeScript strict mode are the sources of truth for formatting feedback.

## Testing Guidelines
There is no default test runner yet, so target Playwright or Vitest when adding coverage. Keep unit tests beside the feature (`src/app/patient/__tests__/form.spec.ts`) and ensure descriptive test names. Smoke-test key flows—homepage hero, privacy page render, and contact form validation—before opening a pull request. If you introduce Prisma logic, add lightweight integration checks using a temporary SQLite datasource defined via `.env.test`.

## Commit & Pull Request Guidelines
Recent history favors short, descriptive commit subjects (“add privacy claim page”) that describe the change in the imperative mood; match that tone and keep the subject under 72 characters. For pull requests, provide: a concise summary, screenshots or Loom links for UI updates, database migration notes when Prisma changes, and explicit testing instructions (`npm run dev`, manual steps). Link the relevant issue or discussion whenever possible, and ensure CI (lint + build) passes before requesting review.

## Database & Environment Notes
The app expects Prisma environment variables such as `DATABASE_URL`—store them in `.env.local` and never commit secrets. Use SQLite locally; for staging environments coordinate credentials and run `npx prisma migrate deploy` after merging schema updates.
