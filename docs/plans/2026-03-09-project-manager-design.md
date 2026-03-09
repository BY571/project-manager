# Project Manager — Design Document

## Overview

A web application for organizing and tracking multiple projects. Provides an interactive graph visualization showing how projects relate to each other, with detailed per-project views for tasks, notes, and blockers.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Prisma** ORM + **SQLite** database
- **Tailwind CSS** + **shadcn/ui** for components
- **D3.js** for force-directed graph visualization
- **Server Actions** for mutations

## Data Model

### Project
- `id`, `name`, `description`, `status` (not_started | in_progress | on_hold | done)
- `priority` (low | medium | high | urgent), `createdAt`, `updatedAt`

### Task (belongs to Project)
- `id`, `projectId`, `title`, `description`, `completed`, `order`, `createdAt`

### Note (belongs to Project)
- `id`, `projectId`, `content`, `type` (note | blocker), `resolved`, `createdAt`

### Tag
- `id`, `name`, `color`
- Many-to-many with Projects via `ProjectTag` join table

### ProjectRelation
- `id`, `sourceProjectId`, `targetProjectId`
- `type` (follow_up | based_on | related_to), `label` (optional)

## UI Structure

### Dashboard (`/`)
- Interactive D3.js force-directed graph
- Nodes = projects, colored by status, border by priority
- Edges = relationships, styled by type (solid/dashed/dotted)
- Tag-based clustering with subtle background bubbles
- Hover tooltip, click to navigate, drag/zoom/pan
- Sidebar tag filter highlights matching nodes

### Project Detail (`/projects/[id]`)
- Header: name, status badge, priority badge, tags
- Tasks section: checklist with add/edit/reorder/complete
- Notes & Blockers section: freeform notes, blockers shown distinctly, resolvable
- Connections section: related projects with relationship type

### Sidebar (persistent)
- Dashboard link, project list grouped by status
- "New Project" button
- Tag filter for graph and list

### Create/Edit Project (modal)
- Form: name, description, status, priority, tags, connections

## Project Structure

```
project-manager/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── page.tsx              # dashboard with graph
│   │   ├── projects/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # project detail
│   │   └── layout.tsx            # sidebar + shell
│   ├── components/
│   │   ├── graph/                # D3 graph components
│   │   ├── projects/             # project-related UI
│   │   └── ui/                   # shadcn/ui primitives
│   ├── lib/
│   │   ├── db.ts                 # prisma client
│   │   └── actions/              # server actions
│   └── types/                    # shared TypeScript types
├── package.json
└── tailwind.config.ts
```

## Key Decisions

- Single-user (no auth), can be extended to multi-user later
- Server Actions over REST API — less boilerplate
- SQLite for simplicity, Prisma makes PostgreSQL swap trivial
- D3.js client-side in a React wrapper component
- shadcn/ui for polished, accessible components
