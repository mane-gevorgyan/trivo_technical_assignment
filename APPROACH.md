# Approach Note

## Goal

The assignment emphasizes reusability and adaptability, so the implementation was designed as a small settings system rather than a page with hardcoded fields.

The main goals were:

- keep settings defined in code
- render the UI from that code-defined schema
- support account-specific state and persistence
- make supported settings easy to add without rewriting form JSX

## Core Design Choice

The central decision is the schema-driven model in:

- [config/accountSettings.ts](config/accountSettings.ts)

That schema is the source of truth for:

- setting keys
- labels and descriptions
- field type
- options for select-like fields
- metadata such as placeholders, numeric limits, input type, and validation rules

Instead of building separate JSX for each setting, the form iterates over that schema and renders the appropriate field. This keeps the implementation smaller, more consistent, and easier to extend.

## Architecture

### Data shape

The domain model is defined in:

- [types/account.ts](types/account.ts)

The key separation is:

- account identity: `id`, `name`
- account settings: reusable settings fields grouped in `IAccountSettings`

That allows the rendering logic to work with a predictable settings object rather than unrelated account metadata.

### Rendering flow

The main rendering flow is:

1. [app/dashboard/[accountId]/page.tsx](app/dashboard/%5BaccountId%5D/page.tsx) loads the selected account
2. [app/components/form/AccountSettingsForm.tsx](app/components/form/AccountSettingsForm.tsx) iterates through `ACCOUNT_SETTINGS_SCHEMA`
3. [app/components/form/AccountSettingField.tsx](app/components/form/AccountSettingField.tsx) decides between read-only and edit mode
4. [app/components/form/AccountSettingEditor.tsx](app/components/form/AccountSettingEditor.tsx) renders the correct control for the field type

This is what makes the UI adaptive for supported types.

### Form state and persistence

Form state is handled in:

- [app/hooks/useAccountSettings.ts](app/hooks/useAccountSettings.ts)

That hook is responsible for:

- extracting the editable settings shape from an account
- initializing React Hook Form
- tracking edit mode
- handling cancel/save behavior
- persisting account-specific values in `localStorage`

Validation rules are derived from schema metadata in:

- [app/hooks/useAccountSettingValidation.ts](app/hooks/useAccountSettingValidation.ts)

That keeps validation closer to the schema and reduces field-specific branching in the renderer.

## Why This Is Reusable

The code supports adding new settings of an already supported type by changing the model and schema rather than manually wiring new JSX.

For those cases, the usual extension points are:

- [types/account.ts](types/account.ts)
- [config/accountSettings.ts](config/accountSettings.ts)
- [config/mockData.ts](config/mockData.ts)
- [app/hooks/useAccountSettings.ts](app/hooks/useAccountSettings.ts)

Once those are updated, rendering, read-only display, and validation follow automatically for supported types because they are driven by the same schema.

This is the main reason the implementation aligns with the requirement that settings should be defined in code and the UI should adapt automatically.

## Tradeoffs

The main tradeoffs were:

- `localStorage` instead of backend persistence
- explicit support for a fixed set of field types
- schema-driven rendering instead of per-setting components
- a small client boundary rather than making the whole page interactive

The important limitation is that the UI adapts automatically only for supported field types. If a completely new type is introduced, such as `date`, the renderer and validation layer still need to be extended. That is an intentional tradeoff: the system is optimized for scalable addition of fields within a controlled set of field types.

## Technical Reasoning

This structure was chosen because it balances simplicity with scalability:

- it is small enough for an assignment-sized implementation
- it demonstrates reusable UI architecture rather than hardcoded screens
- it keeps TypeScript types and field definitions aligned
- it makes per-account persistence straightforward
- it leaves a clear path toward backend persistence later

If extended beyond the assignment, the next logical evolution would be replacing `localStorage` with a backend while keeping the same schema-driven UI layer.
