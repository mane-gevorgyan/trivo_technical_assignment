import type {
  ChannelValue,
  IAccountSettings,
  TimezoneValue,
} from "@/types/account";
import {
  CHANNEL_OPTIONS,
  TIMEZONE_OPTIONS,
  type SettingOption,
} from "@trivo/shared/constants/account-settings";

type BaseSettingDefinition<
  K extends keyof IAccountSettings,
  T extends string
> = {
  key: K;
  label: string;
  description?: string;
  required?: boolean;
  requiredMessage?: string;
  options?: SettingOption<T>[];
};

type BooleanSettingDefinition<K extends keyof IAccountSettings> =
  BaseSettingDefinition<K, never> & {
    type: "boolean";
  };

type TextSettingDefinition<K extends keyof IAccountSettings> =
  BaseSettingDefinition<K, never> & {
    type: "text";
    inputType?: "text" | "email";
    placeholder?: string;
    pattern?: RegExp;
    patternMessage?: string;
  };

type NumberSettingDefinition<K extends keyof IAccountSettings> =
  BaseSettingDefinition<K, never> & {
    type: "number";
    integer?: boolean;
    min?: number;
    max?: number;
    suffix?: string;
  };

type SelectSettingDefinition<
  K extends keyof IAccountSettings,
  T extends string
> = BaseSettingDefinition<K, T> & {
  type: "select";
  options: SettingOption<T>[];
};

type MultiSelectSettingDefinition<
  K extends keyof IAccountSettings,
  T extends string
> = BaseSettingDefinition<K, T> & {
  type: "multiselect";
  options: SettingOption<T>[];
};

export type AccountSettingDefinition =
  | BooleanSettingDefinition<"notifications">
  | TextSettingDefinition<"support_email">
  | NumberSettingDefinition<"daily_email_limit">
  | SelectSettingDefinition<"timezone", TimezoneValue>
  | MultiSelectSettingDefinition<"allowed_channels", ChannelValue>;

export const ACCOUNT_SETTINGS_SCHEMA: AccountSettingDefinition[] = [
  {
    key: "notifications",
    label: "Enable Notifications",
    description: "Allow this account to receive updates and alerts.",
    type: "boolean",
  },
  {
    key: "support_email",
    label: "Support Email",
    description: "Primary support address used for account communication.",
    type: "text",
    required: true,
    inputType: "email",
    placeholder: "support@example.com",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Enter a valid email address.",
  },
  {
    key: "daily_email_limit",
    label: "Daily Email Limit",
    description: "Maximum number of automated emails sent per day.",
    type: "number",
    required: true,
    integer: true,
    min: 0,
    suffix: "per day",
  },
  {
    key: "timezone",
    label: "Timezone",
    description: "Timezone used to schedule notifications and digests.",
    type: "select",
    required: true,
    options: TIMEZONE_OPTIONS,
  },
  {
    key: "allowed_channels",
    label: "Allowed Channels",
    description: "Choose which delivery channels this account can use.",
    type: "multiselect",
    options: CHANNEL_OPTIONS,
  },
];
