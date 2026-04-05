import { z } from "zod";

import {
  CHANNEL_OPTIONS,
  TIMEZONE_OPTIONS,
} from "../constants/account-settings";

const timezoneValues = TIMEZONE_OPTIONS.map((option) => option.value);
const channelValues = CHANNEL_OPTIONS.map((option) => option.value);

export const accountSettingsSchema = z.object({
  notifications: z.boolean(),
  supportEmail: z.email(),
  dailyEmailLimit: z.number().int().min(0),
  timezone: z.enum(timezoneValues),
  allowedChannels: z.array(z.enum(channelValues)),
});

export type AccountSettingsInput = z.infer<typeof accountSettingsSchema>;
