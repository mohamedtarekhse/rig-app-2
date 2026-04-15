# Migration Checklist

## Current-state imports

- Export current `rig app` MySQL datasets
- Inventory usable data from legacy `worker` notification and push flows
- Normalize client identifiers from string codes into relational foreign keys

## Cutover gates

- New API health and auth verified
- Seed data loaded and admin login working
- Module-level smoke tests pass for admin and client-scoped users
- Queue worker and MinIO connectivity verified

## Safety rules

- Do not decommission `rig app` until the new module has matching CRUD and reporting coverage
- Keep import scripts idempotent
- Record migration actions in `audit_logs`
