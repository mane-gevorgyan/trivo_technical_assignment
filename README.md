# Trivo Technical Assignment

Account settings application implemented as a small monorepo with:

- `apps/web`: Next.js frontend
- `apps/api`: Express backend
- `shared`: shared domain types, constants, and validation schemas

The frontend is schema-driven, account-specific, and connected to a typed backend API. The backend uses a layered repository architecture and can run either against backend-owned mock data or a PostgreSQL database through Prisma.

## Highlights

- reusable schema-driven account settings form
- strict TypeScript across frontend, backend, and shared package
- account list, single-account, and settings-update APIs
- frontend connected to backend through a reusable Axios API layer
- clear separation between UI, loaders, dispatchers, controllers, services, and repositories
- validation on both the frontend form flow and backend request/response boundaries
- user-facing loading and error states for account fetch and save flows
- one shared camelCase account/settings contract across frontend, backend, and database code

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Material UI
- React Hook Form
- Axios
- Express
- Prisma
- PostgreSQL
- Zod
- npm workspaces

## API Endpoints

- `GET /health`
- `GET /accounts`
- `GET /accounts/:accountId`
- `PATCH /accounts/:accountId/settings`

## Getting Started

Install dependencies:

```bash
npm install
```

If you are running the API with `DATA_SOURCE=db`, initialize Prisma and seed the database before starting the app:

```bash
npm run db:generate:api
npm run dev
```

### Fastest Start: Mock Mode

This is the easiest path for reviewers and new users. It requires no local database.

Set the API env to use the mock repository:

```env
PORT=9000
DATA_SOURCE=mock
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/trivo_assignment?schema=public"
```

Then run both frontend and backend:

```bash
npm run dev
```

### Full Setup: PostgreSQL via Docker

If you want to run the real Prisma + PostgreSQL flow:

1. Start PostgreSQL in Docker:

```bash
docker rm -f trivo-postgres 2>/dev/null || true
docker run --name trivo-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=trivo_assignment \
  -p 5433:5432 \
  -d postgres
```

2. Set the API env to database mode:

```env
PORT=9000
DATA_SOURCE=db
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/trivo_assignment?schema=public"
```

3. Prepare the database:

```bash
npm run db:setup:api
```

4. Start the apps after the database setup completes:

```bash
npm run dev
```

Run only the frontend:

```bash
npm run dev:web
```

Run only the backend:

```bash
npm run dev:api
```

Database helpers from the repo root:

```bash
npm run db:generate:api
npm run db:push:api
npm run db:seed:api
npm run db:setup:api
```

Type-check the frontend:

```bash
npm run typecheck:web
```

Type-check the backend:

```bash
npm run typecheck -w apps/api
```

Lint the frontend:

```bash
npm run lint:web
```

## Local URLs

- frontend: `http://localhost:3000`
- backend: `http://localhost:9000`

The frontend Axios client uses:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:9000
```

If this variable is not set, the frontend falls back to `http://localhost:9000`.

Frontend env example:

- [apps/web/.env.example](/apps/web/.env.example)

The backend environment lives in `apps/api/.env`:

```env
PORT=9000
DATA_SOURCE=mock
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/trivo_assignment?schema=public"
```

Use:

- `DATA_SOURCE=mock` for the easiest local startup
- `DATA_SOURCE=db` to run against PostgreSQL through Prisma

Backend env example:

- [apps/api/.env.example](/apps/api/.env.example)

## Project Structure

```text
apps/
  web/
    app/
      components/
        form/
        ui/
      dashboard/
      dispatchers/
      hooks/
      loaders/
    config/
      accountSettings.ts
    lib/
      account-settings.ts
      api/
        account-api.ts
        callAPI.ts
    axiosInstance.ts
    theme.ts
    types/
      account.ts
  api/
    src/
      config/
      controllers/
      data/
      lib/
      mappers/
      middleware/
      prisma/
      repositories/
      routes/
      services/
      validation/
      app.ts
      server.ts
shared/
  src/
    constants/
    schemas/
    types/
```

## Adding New Settings

For a new setting that uses an already supported field type, update:

- [account.ts](/shared/src/types/account.ts)
  - add the camelCase field to `IAccountSettings`
- [accountSettings.ts](/apps/web/config/accountSettings.ts)
  - add the field definition to `ACCOUNT_SETTINGS_SCHEMA`
  - add options and validation metadata if needed
- [mock-accounts.ts](/apps/api/src/data/mock-accounts.ts)
  - add the field to each backend mock account
- [account-settings.ts](/apps/web/lib/account-settings.ts)
  - include the field in `extractAccountSettings`
- [account-settings-schema.ts](/shared/src/schemas/account-settings-schema.ts)
  - add the field to backend/shared validation if it belongs to the editable settings payload

The shared settings contract is camelCase end to end, for example:

- `supportEmail`
- `dailyEmailLimit`
- `allowedChannels`

For a brand new field type such as `date`, also extend:

- [AccountSettingEditor.tsx](/apps/web/app/components/form/AccountSettingEditor.tsx)
- [AccountSettingField.tsx](/apps/web/app/components/form/AccountSettingField.tsx)
- [useAccountSettingValidation.ts](/apps/web/app/hooks/useAccountSettingValidation.ts)

## Current Tradeoffs

- PostgreSQL support is now in place through Prisma, but the mock repository is still kept for fast local fallback and for clearly demonstrating the repository abstraction.
- The mock path is intentionally documented first so new users can run the project quickly without needing local database tooling.
- The database model and app contract use the same camelCase field names, but the API still intentionally flattens the nested `Account -> settings` relation into one account response object.
- The UI adapts automatically for supported field types, but introducing a completely new field type still requires renderer support.
- API reads for sidebar and account detail are server-side in Next.js, while settings updates are client-triggered.

This was a deliberate scope decision: the solution demonstrates a maintainable full-stack structure first, while keeping persistence swappable through the repository layer rather than binding the whole backend directly to one storage strategy.

## AI Usage Note

- Tools used:
  - OpenAI Codex / ChatGPT-style coding assistance
- What they were used for:
  - small implementation suggestions
  - review support
  - documentation refinement
  - sanity-checking architecture and extension paths
- Primarily my own implementation and decisions:
  - overall solution structure
  - schema-driven form design
  - monorepo split between web, api, and shared
  - API boundaries, layering, and extension points
  - how frontend and backend should integrate for this assignment scope
- Review and modification:
  - the implementation and final decisions were made by me
  - AI suggestions were reviewed critically and adjusted before use
  - AI was used as support, not as the source of core architectural decisions
- Representative prompt workflows:
  - review this implementation and suggest small improvements
  - help refine validation and error handling without breaking the current architecture
  - suggest cleaner naming and separation of concerns
  - help improve README and approach-note wording for submission clarity
