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
    useAccountSettingValidation.ts
    useIsHydrated.ts
  layout.tsx
  page.tsx
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

## AI Usage Note

- Tools used:
  - OpenAI Codex / ChatGPT-style coding assistance
- What they were used for:
  - small implementation suggestions
  - review support
  - documentation phrasing and refinement
  - sanity-checking extension paths for new settings and validation
- Primarily my own implementation and decisions:
  - structuring the frontend implementation around the assignment requirements
  - translating the required schema-driven form idea into the actual component and hook structure
  - implementing how the supported field types are rendered and validated in the UI
  - deciding how save-time validation should fit into the existing reusable form structure
  - organizing the code and documentation so the extension points are clear
- Review and modification:
  - most of the implementation and writing were done by me
  - any AI-generated suggestions or code were reviewed carefully and adjusted before being used
  - AI output was used only as support, not as the source of architectural or product decisions
- Representative prompt workflows:
  - review this form implementation and suggest small improvements
  - help add save-time validation without breaking the schema-driven approach
  - suggest a cleaner way to refactor validation logic into a reusable hook
  - help refine README and approach-note wording for the submission
