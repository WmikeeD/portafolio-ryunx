# Developer Portfolio — Mayckol Rodríguez

[![CI](https://github.com/WmikeeD/portafolio-ryunx/actions/workflows/ci.yml/badge.svg)](https://github.com/WmikeeD/portafolio-ryunx/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

Personal portfolio of Mayckol Rodríguez, Full-Stack & QA Engineer.
**Live site:** https://portafolio-ryunx.vercel.app

## What's inside
- Single-page site built with React 19, TypeScript, Vite and Tailwind CSS 3.
- Projects with two views: a business summary and a technical layer (pipeline and QA gate).
- **QA Showcase:** an animated, clearly labeled *demo* of test cases per project. It does not
  display real test results yet; wiring it to the Vitest report generated in CI is planned.
- Contact form backed by a Vercel serverless function (Resend), validated with zod on both
  client and server (strict schema, 10 KB body limit, hidden honeypot field). A parity test keeps
  both schemas in sync.

## Quality checks
GitHub Actions runs on every push and pull request to `main`:
1. `npm audit --omit=dev` — dependency audit
2. `npm run type-check` — TypeScript project references
3. `npm run test:run` — Vitest + Testing Library

`main` is protected by a branch ruleset: changes land only through pull requests, and the CI check (`Quality & Security Gates`) must pass before merging.

Lint and the production build run locally before each pull request; adding them to CI is planned.
Deployment is handled by Vercel's Git integration.

## Getting started

To run this project locally (Node 24.x, see `engines` in `package.json`):

1. Clone the repository:
   ```bash
   git clone https://github.com/WmikeeD/portafolio-ryunx.git
   cd portafolio-ryunx
   ```
2. Install dependencies (deterministic install):
   ```bash
   npm ci
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Run the quality gates locally:
   ```bash
   npm run lint
   npm run type-check
   npm run test:run
   npm run build
   ```

## Environment variables
The contact function (`api/contact.ts`) reads these from the Vercel project settings. All three are
required; if any is missing the endpoint answers `500`. Example values only:

| Variable | Purpose | Example |
|---|---|---|
| `RESEND_API_KEY` | Resend API key (secret, server-only) | — |
| `CONTACT_TO_EMAIL` | Inbox that receives the messages | `inbox@example.com` |
| `CONTACT_FROM_EMAIL` | Sender address verified in Resend | `Portfolio <contact@example.com>` |

Tests for the function live in `tests/api/`, outside `api/`, because Vercel turns every file in
`api/` into an endpoint.

## Project docs
- [`CLAUDE.md`](CLAUDE.md) — conventions for AI-assisted development with Claude Code.
- [`docs/auditoria-inicial.md`](docs/auditoria-inicial.md) — technical snapshot and debt log (Spanish).
- [`docs/guia-confidencialidad.md`](docs/guia-confidencialidad.md) — content rules for past work experience (Spanish).
