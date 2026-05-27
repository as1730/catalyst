# Cloudflare Workers React Starter

[cloudflarebutton]

A modern full-stack application template built with React, Vite, and Cloudflare Workers. Features type-safe TypeScript, Durable Objects for persistent state, Hono for API routing, and a polished shadcn/ui frontend.

## Description

This project provides a production-ready starting point for building interactive web applications on Cloudflare's edge network. It includes a React frontend with modern tooling and a serverless backend powered by Cloudflare Workers and Durable Objects for real-time, stateful data management.

The template demonstrates core patterns for entity management, indexed storage, and client-server communication while maintaining excellent developer experience and deployment simplicity.

## Key Features

- Full-stack TypeScript with strict type safety
- React frontend with Vite and Tailwind CSS
- Cloudflare Workers backend with Hono routing
- Durable Objects for scalable, stateful entities (Users, Chats)
- Indexed storage pattern for listing and pagination
- Responsive UI with shadcn/ui components and dark mode
- Client-side error reporting and global error boundaries
- Optimized build and deployment via Wrangler

## Technology Stack

**Frontend**
- React 18 + TypeScript
- Vite 6
- Tailwind CSS + shadcn/ui
- React Router, TanStack Query, Immer, Framer Motion
- Lucide icons, Sonner toasts

**Backend**
- Cloudflare Workers
- Hono framework
- Durable Objects (GlobalDurableObject + IndexedEntity)
- Wrangler for development and deployment

**Tooling**
- Bun (package manager & scripts)
- ESLint + Prettier
- TypeScript path aliases (@/*, @shared/*)

## Getting Started

### Prerequisites
- Bun (v1.2+ recommended)
- Cloudflare account (for deployment)

### Installation

```bash
bun install
```

### Development

Start the local development server:

```bash
bun run dev
```

The app will be available at `http://localhost:3000` (or the port specified by the `PORT` environment variable).

### Building for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

### Linting

```bash
bun run lint
```

## Usage

The template includes working examples for:

- Creating and listing users and chat boards
- Sending messages within chat entities
- Basic CRUD operations via the `/api` endpoints
- Real-time state updates through Durable Objects

Replace the demo content in `src/pages/HomePage.tsx` with your own UI. Extend or modify entities in `worker/entities.ts` to suit your data model.

## Deployment

Deploy to Cloudflare Workers with a single command:

```bash
bun run deploy
```

[cloudflarebutton]

The deployment uses Wrangler and the `wrangler.jsonc` configuration. Durable Object migrations are automatically handled.

For the quickest start, use the Cloudflare Deploy button above after connecting your GitHub repository.

## Project Structure

- `src/` — React frontend (pages, components, hooks, lib)
- `worker/` — Cloudflare Worker backend (routes, entities, core utilities)
- `shared/` — Types and mock data shared between client and server
- Configuration files for Vite, Tailwind, TypeScript, ESLint, and Wrangler

## Contributing

Contributions are welcome. Please open issues or pull requests following standard open-source practices.

## License

This project is provided as a template under the MIT License.