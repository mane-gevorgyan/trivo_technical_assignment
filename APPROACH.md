# Approach Note

## Objective

The assignment is centered on reusability and adaptability, so the main goal of the implementation was to avoid building a one-off settings form. Instead, the goal was to create a small settings system where:

- settings are described in code
- the UI is generated from that description
- each account can manage and persist its own values

## Main Design Decision

The most important design decision is the schema-driven settings model in:

- [config/accountSettings.ts](config/accountSettings.ts)

That schema defines each setting’s:

- key
- label
- description
- field type
- options
- extra metadata such as placeholder, min, max, and suffix

The settings UI is then built by iterating over this schema rather than hardcoding each field. This makes the system flexible and much easier to extend.

## Why This Matters

Without a schema, the implementation would likely end up with custom JSX for each setting:

- one block for notifications
- another block for timezone
- another block for support email

That approach becomes repetitive quickly and makes future changes harder. In this implementation, the schema is the source of truth, and the form rendering logic follows it.

## Data Model

The domain types live in:

- [types/account.ts](types/account.ts)

There are two important aspects here:

1. The account has simple identity fields:
   - `id`
   - `name`

2. The account settings are separated into a reusable settings shape:
   - `notifications`
   - `support_email`
   - `daily_email_limit`
   - `timezone`
   - `allowed_channels`

This keeps the rendering logic focused on a settings model rather than on unrelated account metadata.

## Rendering Structure

The account settings page is split into layers:

### Server Layer

- [app/dashboard/[accountId]/page.tsx](app/dashboard/[accountId]/page.tsx)
- [app/components/form/AccountSettingsPanel.tsx](app/components/form/AccountSettingsPanel.tsx)

These are server-rendered and handle the route-level page shell plus account lookup.

### Client Layer

- [app/components/form/AccountSettingsForm.tsx](app/components/form/AccountSettingsForm.tsx)
- [app/components/form/AccountSettingField.tsx](app/components/form/AccountSettingField.tsx)
- [app/components/form/AccountSettingEditor.tsx](app/components/form/AccountSettingEditor.tsx)
- [app/components/form/AccountSettingsActions.tsx](app/components/form/AccountSettingsActions.tsx)

These components handle interactivity, editing, and form binding.

This split keeps the client boundary smaller while still allowing the local interactive behavior needed by the assignment.

## React Hook Form

The assignment explicitly asks for React Hook Form, so the editable form state is managed with it in:

- [app/hooks/useAccountSettings.ts](app/hooks/useAccountSettings.ts)

This hook is responsible for:

- initializing form values
- keeping track of saved values
- handling edit mode
- handling save progress
- persisting values to `localStorage`

The individual form controls are bound dynamically with `Controller` in:

- [app/components/form/AccountSettingEditor.tsx](app/components/form/AccountSettingEditor.tsx)

That allows the form to remain schema-driven while still using React Hook Form correctly.

## Persistence Strategy

Persistence is implemented with `localStorage`, which is acceptable under the assignment’s “simple approach” requirement.

Why `localStorage`:

- no backend was required
- it keeps the project lightweight
- it allows per-account persistence
- it is easy to demonstrate independently in a frontend-only assignment

Each account’s settings are stored independently using a key derived from account id.

## Supported Field Types

The implementation supports all required setting types:

- boolean
- text
- number
- select
- multiselect

The field renderer handles these types generically, which means adding a new setting of an existing type does not require new field-specific JSX.

## Where To Change Things When Adding Settings

The implementation is meant to support adding new settings in code rather than wiring each one manually in JSX.

For a new setting of an already supported type, the main update points are:

- [types/account.ts](types/account.ts)
  - add the field to `IAccountSettings`
  - add a union type if the setting introduces new select-like values
- [config/accountSettings.ts](config/accountSettings.ts)
  - add the field definition to `ACCOUNT_SETTINGS_SCHEMA`
  - define options and validation metadata there when needed
- [config/mockData.ts](config/mockData.ts)
  - add the field value for each mocked account
- [app/hooks/useAccountSettings.ts](app/hooks/useAccountSettings.ts)
  - include the field in `extractSettings`

Once those changes are made, the UI adapts automatically because:

- [app/components/form/AccountSettingsForm.tsx](app/components/form/AccountSettingsForm.tsx) renders by iterating over the schema
- [app/components/form/AccountSettingEditor.tsx](app/components/form/AccountSettingEditor.tsx) handles supported field types generically
- [app/components/form/AccountSettingField.tsx](app/components/form/AccountSettingField.tsx) handles supported read-only rendering generically
- [app/hooks/useAccountSettingValidation.ts](app/hooks/useAccountSettingValidation.ts) builds validation rules from schema metadata

Example:

- adding a new `language` setting of type `select` only requires changes to the settings type, schema, mock data, and extracted settings shape
- no new form-specific JSX is needed for that case

If a completely new field type is introduced, for example `date`, then the renderer must also be extended. In that case, update:

- [config/accountSettings.ts](config/accountSettings.ts)
  - add the new setting-definition type and schema entry
- [app/components/form/AccountSettingEditor.tsx](app/components/form/AccountSettingEditor.tsx)
  - add edit-mode support for the new type
- [app/components/form/AccountSettingField.tsx](app/components/form/AccountSettingField.tsx)
  - add read-only rendering for the new type
- [app/hooks/useAccountSettingValidation.ts](app/hooks/useAccountSettingValidation.ts)
  - add validation behavior if the new type needs type-specific rules

## Loading and Async Behavior

To make the experience closer to a real application, the implementation includes simulated asynchronous behavior:

- account page server delay in [app/dashboard/[accountId]/page.tsx](app/dashboard/[accountId]/page.tsx)
- save delay in [app/hooks/useAccountSettings.ts](app/hooks/useAccountSettings.ts)

Loading states are also separated:

- route fallback in [app/dashboard/[accountId]/loading.tsx](app/dashboard/[accountId]/loading.tsx)
- schema-aware loading component in [app/components/form/AccountSettingsLoading.tsx](app/components/form/AccountSettingsLoading.tsx)
- loading metadata hook in [app/hooks/useAccountSettingsLoading.ts](app/hooks/useAccountSettingsLoading.ts)

This keeps loading logic consistent with the same schema-driven philosophy used by the form itself.

## Folder Organization

The components were split into:

- `app/components/ui`
  - generic UI pieces
- `app/components/form`
  - account settings form flow and rendering

This separation makes the codebase easier to navigate and better reflects intent.

## Tradeoffs

### Chosen tradeoffs

- `localStorage` instead of backend persistence
- explicit support for a fixed set of field types
- schema-driven rendering rather than hardcoded fields
- smaller client boundary instead of making the entire page interactive

### Known limitation

If a completely new setting type is introduced, the renderer still needs to be extended. That is an intentional tradeoff. The system is optimized for adding new settings of supported types automatically, which is the main requirement of the assignment.

## Future Improvements

If this were extended beyond the assignment, the next steps would be:

- replace `localStorage` with backend persistence
- fetch account settings from a database on the server
- save via server actions or an API route
- simplify hydration logic once persistence becomes server-readable
- add validation rules per field in the schema
- add tests for schema rendering and persistence behavior

## Summary

This implementation is designed around the assignment’s core evaluation criteria:

- reusable structure
- settings defined in code
- adaptive UI
- clean separation of concerns
- practical handling of per-account state

The final result is intentionally small, but the structure is meant to scale better than a one-off form implementation.
