import type { Prisma } from "@prisma/client";
import type { FullAccountData } from "@trivo/shared/types/account";

import type { AccountSettingsPatchInput } from "../../validation/account";

export const accountWithSettingsSelect = {
  id: true,
  name: true,
  settings: {
    select: {
      notifications: true,
      supportEmail: true,
      dailyEmailLimit: true,
      timezone: true,
      allowedChannels: true,
    },
  },
} satisfies Prisma.AccountSelect;

export type AccountRecord = Prisma.AccountGetPayload<{
  select: typeof accountWithSettingsSelect;
}>;

export const flattenAccountRecord = (
  account: AccountRecord,
): FullAccountData | null => {
  if (!account.settings) {
    return null;
  }

  return {
    id: account.id,
    name: account.name,
    notifications: account.settings.notifications,
    supportEmail: account.settings.supportEmail,
    dailyEmailLimit: account.settings.dailyEmailLimit,
    timezone: account.settings.timezone as FullAccountData["timezone"],
    allowedChannels: account.settings.allowedChannels.filter(
      (value): value is FullAccountData["allowedChannels"][number] =>
        typeof value === "string",
    ),
  };
};

export const mergeAccountSettingsPatch = (
  account: FullAccountData,
  settingsPatch: AccountSettingsPatchInput,
): FullAccountData => ({
  ...account,
  notifications: settingsPatch.notifications ?? account.notifications,
  supportEmail: settingsPatch.supportEmail ?? account.supportEmail,
  dailyEmailLimit:
    settingsPatch.dailyEmailLimit ?? account.dailyEmailLimit,
  timezone: settingsPatch.timezone ?? account.timezone,
  allowedChannels: settingsPatch.allowedChannels ?? account.allowedChannels,
});

export const toPrismaSettingsPatch = (
  settingsData: AccountSettingsPatchInput,
): Prisma.AccountSettingsUpdateInput => {
  const patch: Prisma.AccountSettingsUpdateInput = {};

  if (settingsData.notifications !== undefined) {
    patch.notifications = settingsData.notifications;
  }

  if (settingsData.supportEmail !== undefined) {
    patch.supportEmail = settingsData.supportEmail;
  }

  if (settingsData.dailyEmailLimit !== undefined) {
    patch.dailyEmailLimit = settingsData.dailyEmailLimit;
  }

  if (settingsData.timezone !== undefined) {
    patch.timezone = settingsData.timezone;
  }

  if (settingsData.allowedChannels !== undefined) {
    patch.allowedChannels = {
      set: settingsData.allowedChannels,
    };
  }

  return patch;
};
