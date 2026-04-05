import type {
  FullAccountData,
  IAccount,
  IAccountSettings,
} from "@/types/account";

import { callAPI } from "./callAPI";

const ACCOUNTS_ENDPOINT = "/accounts";

export const fetchAccounts = (): Promise<IAccount[]> =>
  callAPI<IAccount[]>({
    url: ACCOUNTS_ENDPOINT,
  });

export const fetchAccountById = (accountId: string): Promise<FullAccountData> =>
  callAPI<FullAccountData>({
    url: `${ACCOUNTS_ENDPOINT}/${accountId}`,
  });

export const patchAccountSettings = (
  accountId: string,
  settingsData: Partial<IAccountSettings>,
): Promise<FullAccountData> =>
  callAPI<FullAccountData, Partial<IAccountSettings>>({
    data: settingsData,
    method: "PATCH",
    url: `${ACCOUNTS_ENDPOINT}/${accountId}/settings`,
  });
