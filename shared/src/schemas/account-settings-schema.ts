import { z } from "zod";

import {
  CHANNEL_OPTIONS,
  TIMEZONE_OPTIONS,
} from "../constants/account-settings";

const timezoneValues = TIMEZONE_OPTIONS.map((option) => option.value);
const channelValues = CHANNEL_OPTIONS.map((option) => option.value);

export const accountSettingsSchema = z.object({
  notifications: z.boolean(),
  support_email: z.email(),
  daily_email_limit: z.number().int().min(0),
  timezone: z.enum(timezoneValues),
  allowed_channels: z.array(z.enum(channelValues)),
});

export type AccountSettingsInput = z.infer<typeof accountSettingsSchema>;
