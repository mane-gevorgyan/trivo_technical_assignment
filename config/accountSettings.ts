import type {
  ChannelValue,
  IAccountSettings,
  TimezoneValue,
} from "@/types/account";

type SettingOption<T extends string> = {
  label: string;
  value: T;
};

type BaseSettingDefinition<
  K extends keyof IAccountSettings,
  T extends string
> = {
  key: K;
  label: string;
  description?: string;
  options?: SettingOption<T>[];
};

type BooleanSettingDefinition<K extends keyof IAccountSettings> =
  BaseSettingDefinition<K, never> & {
    type: "boolean";
  };

type TextSettingDefinition<K extends keyof IAccountSettings> =
  BaseSettingDefinition<K, never> & {
    type: "text";
    placeholder?: string;
  };

type NumberSettingDefinition<K extends keyof IAccountSettings> =
  BaseSettingDefinition<K, never> & {
    type: "number";
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

export const CHANNEL_OPTIONS: SettingOption<ChannelValue>[] = [
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "Push Notifications", value: "push" },
  { label: "In-App Messages", value: "in_app" },
  { label: "Whatsapp", value: "whatsapp" },
];

export const TIMEZONE_OPTIONS: SettingOption<TimezoneValue>[] = [
  { label: "Asia/Tokyo", value: "Asia/Tokyo" },
  { label: "Europe/Warsaw", value: "Europe/Warsaw" },
  { label: "Asia/Chongqing", value: "Asia/Chongqing" },
  { label: "America/Sao_Paulo", value: "America/Sao_Paulo" },
  { label: "America/Montreal", value: "America/Montreal" },
  { label: "Europe/Oslo", value: "Europe/Oslo" },
  { label: "Europe/Moscow", value: "Europe/Moscow" },
  { label: "Asia/Jakarta", value: "Asia/Jakarta" },
  { label: "Europe/Lisbon", value: "Europe/Lisbon" },
  { label: "Indian/Mauritius", value: "Indian/Mauritius" },
];

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
    placeholder: "support@example.com",
  },
  {
    key: "daily_email_limit",
    label: "Daily Email Limit",
    description: "Maximum number of automated emails sent per day.",
    type: "number",
    min: 0,
    suffix: "per day",
  },
  {
    key: "timezone",
    label: "Timezone",
    description: "Timezone used to schedule notifications and digests.",
    type: "select",
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
