# Trivo Technical Assignment

Small account settings application built with Next.js, TypeScript, Material UI, and React Hook Form.

## Overview

This project implements a reusable account settings UI where:

- multiple accounts can be selected from a sidebar
- each account has its own saved settings
- settings are rendered from a central configuration schema
- supported field types are handled through one generic form system

Persistence is implemented with `localStorage` to keep the solution lightweight and aligned with the assignment scope.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Material UI
- React Hook Form
- Tailwind CSS utilities

## Features

- account sidebar with mocked data
- account-specific settings pages
- schema-driven form rendering
- edit, cancel, and save flow
- save-time validation
- per-account persistence in `localStorage`
- loading states for route and form content

## Supported Setting Types

- `boolean`
- `text`
- `number`
- `select`
- `multiselect`

## Getting Started

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

## Project Structure

```text
app/
  components/
    form/
    ui/
  dashboard/
  hooks/
config/
  accountSettings.ts
  mockData.ts
types/
  account.ts
```

## Extending Settings

For a new setting that uses an already supported field type, update:

- [types/account.ts](types/account.ts)
  - add the field to `IAccountSettings`
- [config/accountSettings.ts](config/accountSettings.ts)
  - add the field definition to `ACCOUNT_SETTINGS_SCHEMA`
  - add options and validation metadata if needed
- [config/mockData.ts](config/mockData.ts)
  - add the field to each mocked account
- [app/hooks/useAccountSettings.ts](app/hooks/useAccountSettings.ts)
  - include the field in `extractSettings`

For a brand new field type such as `date`, also extend:

- [app/components/form/AccountSettingEditor.tsx](app/components/form/AccountSettingEditor.tsx)
- [app/components/form/AccountSettingField.tsx](app/components/form/AccountSettingField.tsx)
- [app/hooks/useAccountSettingValidation.ts](app/hooks/useAccountSettingValidation.ts)

## Notes

- The runtime source of truth in this version is `localStorage`.
- The UI adapts automatically for new settings of already supported field types.
- New field types require renderer support, which is an intentional tradeoff for this scope.
