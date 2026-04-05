# Approach Note

## Goal

The assignment emphasized reusability, maintainability, account-specific behavior, and clear TypeScript usage. I treated it as a small full-stack system rather than a single page, with the goal of proving that new settings and persistence strategies can be added without rewriting the UI.

The key goals were:

- define settings in code and render them from that definition
- keep frontend and backend contracts typed and explicit
- isolate data access from UI rendering
- make account-specific settings easy to extend
- keep the implementation small enough for the assignment scope while still reflecting production-minded structure

## Main Design Decisions

### 1. Schema-driven settings UI

The central frontend decision is the schema in:

- [accountSettings.ts](/apps/web/config/accountSettings.ts)

That schema defines:

- setting keys
- labels and descriptions
- field type
- select and multiselect options
- validation metadata such as required flags, numeric constraints, and input type

The form renderer iterates over the schema instead of hardcoding one JSX block per setting. This is the main reason the UI can adapt automatically for already supported field types.

### 2. Shared domain contract

The monorepo uses a shared package for domain-safe code:

- [account.ts](/shared/src/types/account.ts)
- [account-settings.ts](/shared/src/constants/account-settings.ts)
- [account-settings-schema.ts](/shared/src/schemas/account-settings-schema.ts)

This keeps:

- frontend field types
- backend request/response types
- validation rules
- allowed option values

aligned through one shared layer instead of duplicating them in multiple apps.

I also kept the shared settings contract in camelCase end to end, for example:

- `supportEmail`
- `dailyEmailLimit`
- `allowedChannels`

That avoids unnecessary app-to-database field-name translation and keeps the TypeScript model consistent across the monorepo.

### 3. Monorepo split by responsibility

The repo is intentionally split into:

- `apps/web`
- `apps/api`
- `shared`

This gives a clean separation between:

- UI concerns
- HTTP/API concerns
- shared domain and validation concerns

That structure makes it easier to explain the system and leaves a straightforward path for future expansion.

## Frontend Architecture

### Rendering flow

The frontend rendering flow is:

1. [page.tsx](/apps/web/app/dashboard/[accountId]/page.tsx) loads the selected account through a loader
2. [AccountSettingsPanel.tsx](/apps/web/app/components/form/AccountSettingsPanel.tsx) provides the account context for the page
3. [AccountSettingsForm.tsx](/apps/web/app/components/form/AccountSettingsForm.tsx) iterates through the settings schema
4. [AccountSettingField.tsx](/apps/web/app/components/form/AccountSettingField.tsx) decides between read-only and edit mode
5. [AccountSettingEditor.tsx](/apps/web/app/components/form/AccountSettingEditor.tsx) renders the correct field control

This keeps rendering generic while still supporting different field types.

### API logic separated from UI

I intentionally moved request orchestration out of UI components:

- generic HTTP layer:
  - [callAPI.ts](/apps/web/lib/api/callAPI.ts)
- endpoint-specific API layer:
  - [account-api.ts](/apps/web/lib/api/account-api.ts)
- server-side data loading:
  - [account-loader.ts](/apps/web/app/loaders/account-loader.ts)
- client-side mutations:
  - [account-dispatcher.ts](/apps/web/app/dispatchers/account-dispatcher.ts)

That means UI components consume app-level functions like `loadSidebarAccounts()` or `dispatchAccountSettingsUpdate()` instead of making raw API calls directly.

### Form state

Form state lives in:

- [useAccountSettings.ts](/apps/web/app/hooks/useAccountSettings.ts)

This hook is responsible for:

- extracting editable settings from the full account object
- initializing React Hook Form
- handling edit/cancel/save flow
- syncing when the active account changes
- surfacing save errors to the UI

Validation rules for individual fields are derived from schema metadata in:

- [useAccountSettingValidation.ts](/apps/web/app/hooks/useAccountSettingValidation.ts)

## Backend Architecture

The backend is intentionally layered even though it currently uses mock persistence.

### Route -> controller -> service -> repository

The main request flow is:

1. route definition
   - [accounts.ts](/apps/api/src/routes/accounts.ts)
2. controller
   - [account-controller.ts](/apps/api/src/controllers/account-controller.ts)
3. service
   - [account-service.ts](/apps/api/src/services/account-service.ts)
4. repository
   - [account-repository.ts](/apps/api/src/repositories/account-repository.ts)
   - [mock-account-repository.ts](/apps/api/src/repositories/mock-account-repository.ts)

This split keeps responsibilities clear:

- routes define endpoints
- controllers translate HTTP request/response behavior
- services apply application logic and validation
- repositories handle persistence access

### Persistence strategy

The backend started with a backend-owned mock dataset:

- [mock-accounts.ts](/apps/api/src/data/mock-accounts.ts)

I chose a repository abstraction first because it gives a clean path to database persistence without rewriting the controller or service layers. That path is now implemented in two repository variants:

- [mock-account-repository.ts](/apps/api/src/repositories/mock-account-repository.ts)
- [db-account-repository.ts](/apps/api/src/repositories/db-account-repository.ts)

The database-backed repository uses Prisma with PostgreSQL:

- [schema.prisma](/apps/api/prisma/schema.prisma)
- [seed.ts](/apps/api/prisma/seed.ts)
- [prisma.ts](/apps/api/src/lib/prisma.ts)
- [account-repository-helpers.ts](/apps/api/src/repositories/helpers/account-repository-helpers.ts)

Repository selection is resolved in:

- [account-dependencies.ts](/apps/api/src/config/account-dependencies.ts)

That lets the API run against `DATA_SOURCE=mock` or `DATA_SOURCE=db` while keeping the rest of the request flow unchanged. I kept both modes intentionally:

- `mock` gives reviewers a friction-free startup path
- `db` demonstrates how the same backend can switch to real persistence without changing the controller or service layers

Even with the aligned camelCase field names, I still keep a small flattening helper in the repository layer because the database stores settings as a related `AccountSettings` record while the API returns a single flattened account object.

### Validation

Backend validation is split between:

- shared settings payload validation:
  - [account-settings-schema.ts](/shared/src/schemas/account-settings-schema.ts)
- backend account response and param validation:
  - [account.ts](/apps/api/src/validation/account.ts)
- request validation middleware:
  - [account-validation-middleware.ts](/apps/api/src/middleware/account-validation-middleware.ts)

This keeps request parsing and response validation explicit and typed.

## Why This Is Reusable

The solution is reusable in two important ways.

### 1. New settings of supported types are cheap to add

For an already supported field type, the main extension points are:

- [account.ts](/shared/src/types/account.ts)
- [accountSettings.ts](/apps/web/config/accountSettings.ts)
- [mock-accounts.ts](/apps/api/src/data/mock-accounts.ts)
- [account-settings-schema.ts](/shared/src/schemas/account-settings-schema.ts)
- [account-settings.ts](/apps/web/lib/account-settings.ts)

That is a good signal for maintainability because adding a field does not require editing the UI in multiple unrelated places.

### 2. Persistence can evolve independently

The backend can switch between:

- [mock-account-repository.ts](/apps/api/src/repositories/mock-account-repository.ts)
- [db-account-repository.ts](/apps/api/src/repositories/db-account-repository.ts)

while keeping:

- routes
- controllers
- services
- frontend API integration

mostly unchanged.

## Tradeoffs

The main tradeoffs in the current solution are:

- Prisma + PostgreSQL adds real persistence, but also adds local setup cost compared with a pure mock backend
- the mock repository is intentionally kept alongside the DB repository to preserve a simple fallback path and to make the persistence boundary explicit
- onboarding is optimized by documenting mock mode first and Docker/PostgreSQL second
- explicit support for a controlled set of field types
- server-side data loading for account fetches, with client-side mutation for saves
- a lightweight full-stack implementation rather than a more enterprise-heavy backend framework

These tradeoffs were intentional. The assignment scope is small enough that the most important signal is sound structure and reasoning, not maximum framework complexity.

## What I Would Do Next

If I extended this further, the next steps would be:

- add focused API and form interaction tests
- add Prisma migrations instead of relying only on `db push`
- improve frontend save/load feedback further with retry flows or inline status components
- add deployment configuration for the web and API apps

## Summary

The core idea behind the implementation is to keep the settings system schema-driven, typed, and extendable while introducing a backend structure that is realistic without being over-engineered for the size of the assignment.

That balance is what guided the main choices:

- schema-driven UI
- shared domain contract
- monorepo split
- layered backend
- frontend API orchestration separated from UI components
