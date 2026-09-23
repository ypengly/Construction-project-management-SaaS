# BuildFlow

Construction project management SaaS — client → project → estimate → tasks →
workers → materials → expenses → progress → invoice → payment → completion.

## What's built (Phase 1 — Foundation)

- **Database**: full Prisma schema covering every model in the spec
  (`prisma/schema.prisma`) — organizations, users/roles, clients, projects,
  phases, tasks, milestones, workers/teams, materials/inventory, suppliers,
  equipment, estimates, budgets, expenses, site reports, documents/photos,
  invoices, payments, notifications, audit logs, subscriptions.
- **Backend** (`backend/`): Express + TypeScript API.
  - Auth: register (bootstraps an org + default roles), login, refresh
    (rotating refresh tokens), logout, forgot/reset password.
  - Multi-tenant isolation: `organizationId` is derived server-side from the
    verified JWT on every request — never trusted from the client.
  - RBAC middleware for the six roles (Owner, Project Manager, Site
    Supervisor, Accountant, Worker, Client).
  - Security: helmet, CORS allow-list, rate limiting (tighter on auth
    routes), bcrypt password hashing, zod input validation, audit logging.
  - Organization settings + onboarding-checklist endpoints.
- **Frontend** (`frontend/`): React + TypeScript + Vite + Tailwind.
  - Landing page (hero, features, client-portal preview, pricing, FAQ).
  - Login / register / forgot-password.
  - Onboarding checklist.
  - Protected dashboard shell: role-aware sidebar, topbar search,
    dashboard overview (project/financial overview, alerts, today's work).
  - Placeholder routes for Projects, Clients, Workers, Materials, Equipment,
    Estimates, Expenses, Invoices, Reports, Settings — wired into routing
    and the sidebar, ready to build out.

## Not yet built

Everything from Phase 2 onward: the actual CRUD + business logic for
projects/tasks/kanban, materials/inventory transactions, estimates→project
conversion, budgets, expenses, daily site reports, invoicing/payments,
the client portal, notifications, and reports/analytics. The schema and
auth/RBAC foundation are in place so those can be added module by module.

## Running locally

```bash
# 1. Database
docker compose up -d postgres

# 2. Backend
cd backend
cp .env.example .env   # edit DATABASE_URL/secrets if needed
npm install
npm run prisma:migrate
npm run dev             # http://localhost:4000

# 3. Frontend
cd ../frontend
npm install
npm run dev              # http://localhost:5173
```
