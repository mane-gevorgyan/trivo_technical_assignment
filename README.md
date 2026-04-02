# Trivo Technical Assignment

Small account settings application built for the Trivo technical assignment.

The focus of this implementation is not just rendering forms, but building a reusable, schema-driven settings system where settings are defined in code and the UI adapts automatically.

## Assignment Coverage

This implementation covers the core requirements from the assignment:

- React
- TypeScript
- Material UI
- React Hook Form
- Mocked accounts with per-account settings
- Per-account persistence using `localStorage`
- Supported field types:
  - Boolean
  - Text input
  - Number input
  - Select
  - Multiselect / checkboxes
- Settings defined in code through a configuration schema
- Dynamic UI rendering from that schema

## Core Idea

The key architectural decision is that settings are defined in a single configuration file:

- [config/accountSettings.ts](config/accountSettings.ts)

That file defines:

- the setting key
- label
- description
- field type
- options where needed
- additional metadata such as placeholder, min, max, and suffix

The form UI does not hardcode specific settings like "timezone" or "support_email". Instead, it maps through the schema and renders the correct field dynamically. If a new setting is added in the schema and its data shape exists in the settings type, it will automatically appear in the UI without per-setting UI wiring.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Material UI
- React Hook Form
- Tailwind CSS utilities for a few page-level layout styles
- localStorage for simple persistence

## Features

- Home page with entry point into the dashboard
- Dashboard with a mocked account sidebar
- Per-account settings page
- Schema-driven settings rendering
- Edit / cancel / save interactions
- Per-account persistence in `localStorage`
- Loading fallback for the server-rendered account route
- Schema-driven loading skeleton for the settings area
- Simulated response delay for:
  - account page fetch
  - save action

## Supported Setting Types

The schema currently supports:

- `boolean`
- `text`
- `number`
- `select`
- `multiselect`

These cover the assignment examples:

- Enable notifications
- Support email
- Daily email limit
- Timezone
- Allowed channels

## Project Structure

```
app/
  components/
    form/
      AccountSettingEditor.tsx
      AccountSettingField.tsx
      AccountSettingsActions.tsx
      AccountSettingsForm.tsx
      AccountSettingsLoading.tsx
      AccountSettingsPanel.tsx
    ui/
      AccountSidebar.tsx
      Button.tsx
      SidebarListItem.tsx
  dashboard/
    [accountId]/
      loading.tsx
      page.tsx
    layout.tsx
    page.tsx
  hooks/
    useAccountSettings.ts
    useAccountSettingsLoading.ts
    useIsHydrated.ts
  layout.tsx
  page.tsx
config/
  accountSettings.ts
  mockData.ts
types/
  account.ts
```

## How It Works

### Accounts

Accounts are mocked in:

- [config/mockData.ts](config/mockData.ts)

Each account has:

- `id`
- `name`
- settings values

Selecting an account opens:

- [app/dashboard/[accountId]/page.tsx](app/dashboard/[accountId]/page.tsx)

### Settings Schema

The settings schema lives in:

- [config/accountSettings.ts](config/accountSettings.ts)

It defines the structure of the form and is the source of truth for the rendered settings UI.

### Form Rendering

The settings page is split into layers:

- [app/components/form/AccountSettingsPanel.tsx](app/components/form/AccountSettingsPanel.tsx)
  - server component shell
- [app/components/form/AccountSettingsForm.tsx](app/components/form/AccountSettingsForm.tsx)
  - client-side interactive form
- [app/components/form/AccountSettingField.tsx](app/components/form/AccountSettingField.tsx)
  - field wrapper and read-only state
- [app/components/form/AccountSettingEditor.tsx](app/components/form/AccountSettingEditor.tsx)
  - edit-mode renderer with React Hook Form `Controller`

### Form State

Form state is managed with React Hook Form through:

- [app/hooks/useAccountSettings.ts](app/hooks/useAccountSettings.ts)

That hook is responsible for:

- initializing account settings
- loading saved values from `localStorage`
- edit mode state
- save pending state
- persisting settings per account

### Loading UI

Loading behavior is split into:

- [app/dashboard/[accountId]/loading.tsx](app/dashboard/[accountId]/loading.tsx)
  - route-level fallback
- [app/components/form/AccountSettingsLoading.tsx](app/components/form/AccountSettingsLoading.tsx)
  - settings skeleton
- [app/hooks/useAccountSettingsLoading.ts](app/hooks/useAccountSettingsLoading.ts)
  - loading metadata derived from the schema

## Persistence

Persistence is implemented with `localStorage`.

Each account stores its settings independently using a key based on account id:

- `account-settings:<accountId>`

This approach was chosen because:

- it satisfies the assignment requirement for simple storage
- it keeps the implementation lightweight
- backend persistence is optional

## Rendering Strategy

The implementation tries to keep as much rendering on the server as possible while preserving interactivity:

- [app/dashboard/[accountId]/page.tsx](app/dashboard/[accountId]/page.tsx) is a server component
- [app/components/form/AccountSettingsPanel.tsx](app/components/form/AccountSettingsPanel.tsx) is a server component
- only the actual editable form subtree is client-rendered

This keeps the client boundary smaller than making the whole page interactive.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Run type-check:

```bash
npx tsc --noEmit
```

## Notes and Tradeoffs

- `localStorage` is used for persistence because the assignment allows a simple approach.
- The current hydration/loading strategy is tailored for client-side persistence.
- If this project later moves to a database-backed implementation, the client-side hydration logic can be simplified significantly.
- Adding a new setting of a supported type only requires updating the schema and the settings shape.
- Adding a completely new field type would still require extending the renderer, which is a reasonable tradeoff for this scope.

## AI Usage Disclosure

AI tools were used during development as permitted by the assignment. The generated suggestions were reviewed, adapted, and integrated into the final implementation.
