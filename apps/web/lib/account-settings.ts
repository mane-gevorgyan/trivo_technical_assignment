import type { FullAccountData, IAccountSettings } from "@/types/account";

export const extractAccountSettings = (
  account: FullAccountData,
): IAccountSettings => ({
  notifications: account.notifications,
  support_email: account.support_email,
  daily_email_limit: account.daily_email_limit,
  timezone: account.timezone,
  allowed_channels: account.allowed_channels,
});
