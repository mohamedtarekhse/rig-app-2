# Rigways ACM Monorepo

This folder contains the next-generation Rigways ACM rebuild running in parallel with the current `rig app` package.

## Stack

- `apps/web`: React + Vite + TypeScript
- `apps/api`: NestJS + Prisma + MySQL
- `apps/worker`: BullMQ worker and schedulers
- `packages/types`: shared enums, DTOs, Zod schemas, and API contracts
- `infra/docker`: local and Coolify-friendly service topology

## Goals

- Preserve the current deployed app while the new platform is built in parallel
- Introduce a versioned API under `/api/v1`
- Add RBAC, audit logs, notifications, MinIO-backed uploads, and queue-driven background work

## Quick start

```bash
pnpm install
cp .env.example .env
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Services

Use `infra/docker/docker-compose.yml` for local infrastructure:

- MySQL 8
- Redis
- MinIO
- Mailpit

The existing `rig app` remains untouched and can keep serving current users during the migration.
