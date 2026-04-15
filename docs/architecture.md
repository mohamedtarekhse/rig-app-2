# Rigways ACM Architecture

## Monorepo layout

- `apps/web`: front-end application
- `apps/api`: NestJS API with Prisma
- `apps/worker`: queue consumers, push/email dispatch, and expiry scans
- `packages/types`: shared role enum, response envelope, and DTO schemas

## Runtime shape

- API serves `/api/v1`
- Web app consumes the API directly
- Worker handles BullMQ jobs for notifications and certificate expiry
- MinIO stores certificate files and related uploads

## Migration stance

The existing `rig app` package is the live baseline. This monorepo is the replacement path and should be adopted module-by-module until final cutover.
