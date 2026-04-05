import type { ChannelValue, TimezoneValue } from "../types/account";

export type SettingOption<T extends string> = {
  label: string;
  value: T;
};

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
