import { z } from "zod";
import {
  CHANNEL_OPTIONS,
  TIMEZONE_OPTIONS,
} from "@trivo/shared/constants/account-settings";

const timezoneValues = TIMEZONE_OPTIONS.map((option) => option.value);
const channelValues = CHANNEL_OPTIONS.map((option) => option.value);

export const accountParamsSchema = z.object({
  accountId: z.uuid(),
});

export const accountSummarySchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1),
});

export const fullAccountDataSchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1),
  notifications: z.boolean(),
  daily_email_limit: z.number().int().nonnegative(),
  support_email: z.email(),
  timezone: z.enum(timezoneValues),
  allowed_channels: z.array(z.enum(channelValues)),
});

export const sidebarAccountsSchema = z.array(accountSummarySchema);

export type AccountParams = z.infer<typeof accountParamsSchema>;
export type AccountSummary = z.infer<typeof accountSummarySchema>;
export type FullAccountResponse = z.infer<typeof fullAccountDataSchema>;
export type SidebarAccountsResponse = z.infer<typeof sidebarAccountsSchema>;
