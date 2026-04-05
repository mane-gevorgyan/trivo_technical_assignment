import type { FullAccountData, IAccountSettings } from "@/types/account";

export const extractAccountSettings = (
  account: FullAccountData,
): IAccountSettings => ({
  notifications: account.notifications,
  supportEmail: account.supportEmail,
  dailyEmailLimit: account.dailyEmailLimit,
  timezone: account.timezone,
  allowedChannels: account.allowedChannels,
});
