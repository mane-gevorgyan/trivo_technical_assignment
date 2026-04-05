import type { FullAccountData, IAccountSettings } from "@/types/account";

import { patchAccountSettings } from "@/lib/api/account-api";

export const dispatchAccountSettingsUpdate = async (
  accountId: string,
  settingsData: Partial<IAccountSettings>,
): Promise<FullAccountData> => {
  return patchAccountSettings(accountId, settingsData);
};
